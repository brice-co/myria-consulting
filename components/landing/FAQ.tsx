import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


export const faqItems = [
  {
    q: "What does Myria Consulting do?",
    a: "Myria Consulting designs and implements production-grade AI systems with a strong focus on governance, architecture, and scalability. We help organizations move from experimental AI to structured, reliable, and controllable systems."
  },
  {
    q: "What is the AI Governance Assessment?",
    a: "It’s a 2-minute diagnostic that evaluates how structured, controlled, and scalable your AI systems are. You receive a score, key risks, and actionable recommendations to improve your architecture."
  },
  {
    q: "What do I get after completing the assessment?",
    a: "You get an AI Governance Score (0–100), a breakdown of system gaps, risk insights, and a clear roadmap to improve your AI systems, including governance and architecture recommendations."
  },
  {
    q: "Is this relevant if we already use AI in production?",
    a: "Yes — especially. Most AI issues appear after deployment: lack of control, system drift, scaling challenges, and hidden risks. The assessment helps identify and fix these gaps."
  },
  {
    q: "How is Myria different from other AI providers?",
    a: "Most providers focus on building AI features. We design complete systems — including orchestration, memory, governance, and execution layers — to ensure long-term reliability and scalability."
  },
  {
    q: "Do you only work on voice AI systems?",
    a: "No. While we have deep expertise in real-time and voice systems, our core focus is AI system architecture and governance across use cases — including automation, copilots, and multi-agent workflows."
  },
  {
    q: "What happens after I get my score?",
    a: "You can use the recommendations internally, or work with us to design and implement a structured AI system with proper governance, architecture, and scalability."
  }
];


const FAQ = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* 🔥 HEADER */}
        <div className="text-center mb-12">
          <p className="text-sm text-cyan-400 mb-2">
            Still have questions?
          </p>

          <h2 className="text-4xl font-bold mb-4">
            AI Systems & Governance FAQ
          </h2>

          <p className="text-muted-foreground text-lg">
            Answers to help you understand your AI maturity, risks, and next steps.
          </p>
        </div>

        {/* ❓ FAQ */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border/50 rounded-lg px-4 bg-muted/20"
            >
              <AccordionTrigger className="text-left py-4">
                {item.q}
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* 🚀 CTA */}
        <div className="text-center mt-12">
          <a
            href="/start-assessment"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-8 py-4 font-medium text-white hover:bg-cyan-500 transition"
          >
            Get Your AI Governance Score
          </a>

          <p className="text-sm text-muted-foreground mt-3">
            Takes 2 minutes • Get your score and recommendations
          </p>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
