import { TrendingUp } from "lucide-react";

import {
  spreadsheetInsight,
  spreadsheetRows,
} from "../data/spreadsheet-data";
import { AIAssistantCard } from "@/experience/collaborative-workspace/ai-assistant-card";

export function SpreadsheetWorkspace() {
  return (
    <div className="grid h-full grid-cols-[1fr_230px]">
      <div className="overflow-hidden p-6">
        <div className="rounded-xl border border-border bg-white">
          <div className="border-b border-border px-4 py-3">
            <span className="text-xs font-semibold">
              Revenue Forecast
            </span>
          </div>

          <table className="w-full text-left text-[10px]">
            <thead className="bg-muted/40 text-muted-foreground">
              <tr>
                <th className="p-3">Region</th>
                <th className="p-3">Q1</th>
                <th className="p-3">Q2</th>
                <th className="p-3">Q3</th>
                <th className="p-3">Q4</th>
              </tr>
            </thead>

            <tbody>
              {spreadsheetRows.map((row) => (
                <tr
                  key={row.region}
                  className="border-t border-border"
                >
                  <td className="p-3 font-medium">
                    {row.region}
                  </td>
                  <td className="p-3">{row.q1}</td>
                  <td className="p-3">{row.q2}</td>
                  <td className="p-3">{row.q3}</td>

                  <td className="bg-primary/5 p-3 font-semibold text-primary">
                    {row.q4}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <aside className="border-l border-border bg-card/60 p-4">
        <AIAssistantCard eyebrow="AI ANALYSIS">
          <div className="mb-2 flex items-center gap-2 text-foreground">
            <TrendingUp
              size={13}
              className="text-primary"
            />
            <strong>Growth detected</strong>
          </div>

          {spreadsheetInsight}

          <button className="mt-3 rounded-md border px-2 py-1 text-[9px]">
            Create insight
          </button>
        </AIAssistantCard>
      </aside>
    </div>
  );
}