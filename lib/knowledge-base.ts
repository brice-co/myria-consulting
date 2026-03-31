// lib/knowledge-base.ts

/**
 * IMPORTANT RULES:
 * - NEVER expose full URLs directly in voice responses
 * - Navigation and booking must be done via tools
 * - Voice agent explains actions, UI performs them
 * - Links may be shown visually, not read aloud
 */

/* -----------------------------
   WEBSITE ROUTES (UI ONLY)
-------------------------------- */

export const WEBSITE_PAGES = {
  home: "/",
  services: "/services",
  voiceAI: "/voice-ai",
  pricing: "/pricing",
  about: "/about",
  contact: "/contact",
  faq: "/faq",
  booking: "/book",
};

/* -----------------------------
   CALENDLY BOOKING ACTION
-------------------------------- */

export const BOOKING_ACTION = {
  id: "calendly_booking",
  description: "Schedule a call using Calendly",
  tool: "send_booking_link", // your existing tool
};

/* -----------------------------
   FAQ KNOWLEDGE BASE
-------------------------------- */

export const KB_FAQ = [
  {
    q: "What does Myria Consulting do?",
    a: "Myria Consulting helps organizations design and deploy AI-powered solutions, including Voice AI agents, agentic workflows, and custom AI platforms tailored to business needs.",
    page: "about",
  },
  {
    q: "What are AI Voice Agents?",
    a: "AI Voice Agents are intelligent voice assistants that can hold natural conversations, answer questions, qualify leads, and schedule meetings in real time using speech.",
    page: "voiceAI",
  },
  {
    q: "What can your Voice AI agents do?",
    a: "Our Voice AI agents can answer questions, route users to the right department, book meetings, support onboarding, and integrate with tools like Calendly, CRMs, and internal systems.",
    page: "voiceAI",
  },
  {
    q: "How do I book a call or demo?",
    a: "I can help you schedule a discovery call or a demo by opening our booking page so you can choose a time that works for you.",
    action: "calendly_booking",
  },
  {
    q: "Do you use Calendly?",
    a: "Yes. We use Calendly to handle scheduling, availability, time zones, and reminders for all calls.",
  },
  {
    q: "Is there a pricing page?",
    a: "Yes. Our pricing page explains our engagement models and what’s included in each offering.",
    page: "pricing",
  },
  {
    q: "Do you build custom solutions?",
    a: "Yes. We specialize in custom Voice AI and agentic systems designed around your business processes, users, and technology stack.",
    page: "services",
  },
];

/* -----------------------------
   PRODUCT SUMMARY (VOICE SAFE)
-------------------------------- */

export const KB_PRODUCT_SUMMARY = `
Myria Consulting provides:
- Voice-first AI agents available 24/7
- Intelligent agent routing and orchestration
- Automated meeting scheduling with Calendly
- Custom AI platforms and integrations
- Enterprise-grade architecture and security
- Advisory and implementation services
`;

/* -----------------------------
   FAQ SYSTEM PROMPT (FOR FAQ AGENT)
-------------------------------- */

export const KB_SYSTEM_MESSAGE = `
You are an FAQ Voice Assistant for Myria Consulting.

You must answer questions using ONLY the knowledge provided below.

VOICE RULES:
- Be concise and natural
- Explain concepts simply
- Do not read URLs aloud
- Do not invent information
- Do not oversell

AVAILABLE PAGES (FOR UI NAVIGATION ONLY):
${Object.keys(WEBSITE_PAGES)
  .map((k) => `- ${k}`)
  .join("\n")}

BOOKING RULES:
- Calls and demos are scheduled via Calendly
- When the user wants to book:
  - Explain that you are opening the booking page
  - Use the send_booking_link tool
- Never read or display raw booking URLs

FAQ KNOWLEDGE:
${KB_FAQ.map(
  (f) => `Q: ${f.q}\nA: ${f.a}`
).join("\n\n")}

PRODUCT OVERVIEW:
${KB_PRODUCT_SUMMARY}

STRICT RULES:
- NEVER read raw URLs aloud
- NEVER display booking URLs in text
- Use tools for navigation and booking
- If the answer is not in the knowledge base, say so
- Keep responses short and professional
- Sound like a helpful human assistant
`;