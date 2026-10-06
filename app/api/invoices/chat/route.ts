// @/app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { db } from '@/db';
import { dashboardMetrics, revenueTrends, customers } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 1. Authenticate user context securely using Better Auth
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.session.activeOrganizationId) {
    return new Response(
      JSON.stringify({ error: "Unauthorized access: Active organization validation required." }), 
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const tenantOrgId = session.session.activeOrganizationId;

  // 2. Stream the AI text with native tool execution block formatting
  const result = await streamText({
    model: openai('gpt-4o'),
    messages: messages,
    system: `You are Myria AI Copilot, an internal operations partner for Myria OS. You have direct secure access to current workspace analytics under organization context ID: ${tenantOrgId}. Always prioritize summarizing metrics concisely using your structural layout tools. Keep answers direct and professional.`,
    tools: {
      
      getDashboardMetrics: tool({
        description: 'Fetch top-level tenant workspace metrics including total revenue, open invoices, and active user metrics.',
        inputSchema: z.object({}),
        execute: async () => {
          const data = await db
            .select()
            .from(dashboardMetrics)
            .where(eq(dashboardMetrics.orgId, tenantOrgId))
            .limit(1);
          return data[0] || null;
        },
      }),

      renderRevenueTrend: tool({
        description: 'Queries database for raw financial history trends and converts them into a segmented UI bar chart layout.',
        inputSchema: z.object({}),
        execute: async () => {
          const rawTrends = await db
            .select()
            .from(revenueTrends)
            .where(eq(revenueTrends.orgId, tenantOrgId))
            .orderBy(asc(revenueTrends.sortOrder));
          
          // Cast Drizzle Postgres string metrics into numeric formats safely for Recharts
          const dataset = rawTrends.map(item => ({
            monthLabel: item.monthLabel,
            productSales: Number(item.productSales),
            services: Number(item.services),
            other: Number(item.other),
          }));

          return {
            dataset,
            actions: [
              { key: 'explain_chart', label: 'Explain Chart' },
              { key: 'create_report', label: 'Generate Report' }
            ]
          };
        },
      }),

      renderTopCustomers: tool({
        description: 'Queries database to return the workspace high growth accounts matrix inside a clean UI list format.',
        inputSchema: z.object({}),
        execute: async () => {
          const rawCustomers = await db
            .select()
            .from(customers)
            .where(eq(customers.orgId, tenantOrgId))
            .orderBy(asc(customers.name));

          // Align database schema properties into the UI interface mappings (mrr and growth)
          const dataset = rawCustomers.map(item => ({
            id: item.id,
            name: item.name,
            mrr: Number(item.revenueContribution),
            growth: Number(item.changePct),
          }));

          return {
            dataset,
            actions: [
              { key: 'view_invoices', label: 'View Open Invoices' },
              { key: 'send_reminders', label: 'Send Payment Reminders' }
            ]
          };
        },
      })

    },
  });

  return result.toTextStreamResponse();
}
