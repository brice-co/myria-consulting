import type { PlaybookContent } from "../_types/playbook";

export const playbook: PlaybookContent = {
  eyebrow: "AI-Enabled Enterprise Playbook",
  title: "Build the AI-enabled enterprise from the business outward.",
  description:
    "A practical guide to moving from business problems and operating decisions to AI opportunities, solution architecture and scalable enterprise capability.",
  previewParts: [
    {
      number: "I",
      eyebrow: "Business First",
      title: "Start with the enterprise—not the technology.",
      description:
        "Frame AI around business objectives, operating performance and the value the organization is trying to create before selecting tools or models.",
      themes: ["Business objectives", "Operating context", "Value creation"],
    },
    {
      number: "II",
      eyebrow: "Finding Enterprise Value",
      title: "Find where intelligence can change the work.",
      description:
        "Move through the value chain into processes, decisions, exceptions and investigations to identify opportunities grounded in real operating needs.",
      themes: ["Value chain", "Decisions & exceptions", "AI opportunities"],
    },
    {
      number: "III",
      eyebrow: "The Intelligence Layer",
      title: "Connect the right intelligence to the right problem.",
      description:
        "Understand how integration, intelligent automation, agents and multi-agent systems can work together instead of becoming isolated AI experiments.",
      themes: ["Integration", "Intelligent automation", "AI agents"],
    },
    {
      number: "IV",
      eyebrow: "Enterprise Capability",
      title: "Move from pilots toward AI-enabled operations.",
      description:
        "Treat architecture, governance, people and operating change as part of the capability required to scale intelligence responsibly across the enterprise.",
      themes: ["Autonomous operations", "Human accountability", "Scale"],
    },
  ],
  chapters: [
    { number: "01", title: "Business First", description: "Begin with enterprise objectives and measurable value rather than technology." },
    { number: "02", title: "Discovery", description: "Understand the operating context before defining an AI solution." },
    { number: "03", title: "Value-Chain Context", description: "Locate where value is created, delayed or lost across the enterprise." },
    { number: "04", title: "Decisions & Exceptions", description: "Find the decisions, investigations and exceptions where intelligence matters." },
    { number: "05", title: "AI Opportunities", description: "Match the problem to the right form of intelligence and automation." },
    { number: "06", title: "Solution Architecture", description: "Connect agents, software, data, workflows and specialized computation." },
    { number: "07", title: "Intelligent Automation", description: "Move beyond isolated assistants into connected operational workflows." },
    { number: "08", title: "AI Agents", description: "Use reasoning and tools to investigate, recommend and act within governed boundaries." },
    { number: "09", title: "Multi-Agent Systems", description: "Coordinate specialized intelligence around shared business outcomes." },
    { number: "10", title: "Autonomous Operations", description: "Increase operational autonomy while preserving human accountability." },
    { number: "11", title: "The AI-Enabled Enterprise", description: "Build reusable organizational and technology capability for continuous improvement." },
  ],
};
