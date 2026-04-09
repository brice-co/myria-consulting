import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqItems = [
  {
    q: "What does Myria Consulting do?",
    a: "Myria Consulting helps organizations design and implement production-grade AI systems with a strong focus on architecture, governance, scalability, and operational readiness. We help teams move from fragmented experimentation to structured, reliable, and controllable AI systems.",
  },
  {
    q: "What is AI Architecture Labs?",
    a: "AI Architecture Labs is a paid 2–4 week advisory engagement designed to assess how your AI system is structured, governed, secured, and operated. It helps you understand what is strong, what is fragile, and what needs to be addressed before scaling further.",
  },
  {
    q: "What do we receive as part of the engagement?",
    a: "Depending on scope, clients receive structured findings, architecture and risk insights, a breakdown of key gaps, executive-ready outputs such as dashboard views and reports, and a prioritized roadmap for next steps.",
  },
  {
    q: "Is this relevant if we already use AI in production?",
    a: "Yes — especially. Many of the most important problems only appear after deployment, including governance gaps, system drift, operational fragility, scaling issues, and hidden risk. AI Architecture Labs helps surface those issues before they become larger operational problems.",
  },
  {
    q: "How is Myria different from other AI providers?",
    a: "Many providers focus on building AI features or prototypes. Myria focuses on the full system: architecture, orchestration, governance, memory, control boundaries, observability, and execution layers. The goal is not just to make AI work, but to make it reliable and scalable in real-world environments.",
  },
  {
    q: "Do you only work on voice AI systems?",
    a: "No. While Myria has deep expertise in real-time and voice systems, the broader focus is AI system architecture across use cases, including copilots, automation, retrieval-based systems, and multi-agent workflows.",
  },
  {
    q: "Who is AI Architecture Labs for?",
    a: "It is designed for organizations that are exploring, piloting, or already deploying AI and need more clarity before scaling further. It is especially valuable for teams facing growing complexity, governance concerns, reliability issues, or uncertainty around what to fix next.",
  },
  {
    q: "What happens after the lab?",
    a: "After the engagement, your team has a clearer view of system maturity, risk areas, and priorities. From there, you can use the findings internally or continue with Myria for deeper architecture, implementation, or governance support.",
  },
];

const FAQ = () => {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm text-cyan-400">
            Still have questions?
          </p>

          <h2 className="mb-4 text-4xl font-bold">
            AI Architecture Labs FAQ
          </h2>

          <p className="text-lg text-muted-foreground">
            Answers to help you understand the engagement, the outcomes, and when it makes sense to bring Myria in.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border border-border/50 bg-muted/20 px-4"
            >
              <AccordionTrigger className="py-4 text-left">
                {item.q}
              </AccordionTrigger>

              <AccordionContent className="pb-4 leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <a
            href="/voice-diagnostic/apply"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-8 py-4 font-medium text-white transition hover:bg-cyan-500"
          >
            Book an AI Architecture Lab
          </a>

          <p className="mt-3 text-sm text-muted-foreground">
            Paid advisory engagement · Typical duration: 2–4 weeks
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;