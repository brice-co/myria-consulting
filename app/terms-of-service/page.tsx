"use client";

import { motion } from "framer-motion";
import PageShell from "@/components/layouts/PageShell";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function TermsOfService() {
  return (
    <PageShell>
      <motion.header className="mb-16" {...fadeUp()}>
        <span className="inline-block text-xs font-mono tracking-widest uppercase text-primary mb-4">
          Legal
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground">Last updated: March 13, 2026</p>
      </motion.header>

      <div className="space-y-10">
        {[
          {
            title: "1. Acceptance of Terms",
            content: `By accessing or using any services provided by Myria Consulting INC ("Myria," "we," "us," or "our"), including but not limited to our website, AI platforms, voice agent demos, workshop environments, and consulting deliverables (collectively, the "Services"), you ("User," "you," or "your") agree to be bound by these Terms of Service ("Terms"). If you are accepting these Terms on behalf of a company or other legal entity, you represent and warrant that you have the authority to bind that entity. If you do not agree to these Terms, you must discontinue use of the Services immediately.

These Terms constitute a legally binding agreement between you and Myria Consulting. We reserve the right to update or modify these Terms at any time. Material changes will be communicated via email or through prominent notice on our platform. Your continued use of the Services following any such modification constitutes acceptance of the revised Terms.`,
          },
          {
            title: "2. Description of Services",
            content: `Myria Consulting provides voice-first AI consulting, architecture design, real-time voice agent development, educational workshops, AI readiness assessments, and ongoing operational advisory services. Our platform may include interactive demos, scoring tools, document generation, and integration with third-party AI providers.

Service availability, features, and pricing are subject to change without prior notice. We do not guarantee uninterrupted, error-free, or secure access to any part of the Services. Certain features may be offered on a beta or preview basis and are provided "as is" without any warranty. We reserve the right to discontinue, suspend, or modify any Service or feature at our sole discretion.`,
          },
          {
            title: "3. Eligibility & Account Registration",
            content: `You must be at least 18 years of age to use the Services. By registering for an account or workshop, you agree to provide accurate, current, and complete information. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account.

You must notify us immediately of any unauthorized use of your account or any other security breach. Myria Consulting will not be liable for any loss or damage arising from your failure to safeguard your login credentials.`,
          },
          {
            title: "4. User Responsibilities & Acceptable Use",
            content: `You agree to use the Services only for lawful purposes and in accordance with these Terms. You shall not:

• Use the Services to transmit harmful, offensive, defamatory, or illegal content through our AI systems.
• Attempt to reverse-engineer, decompile, disassemble, or otherwise derive the source code of any proprietary technology, algorithms, or models used in our Services.
• Interfere with or disrupt the integrity or performance of the Services or any related infrastructure.
• Use automated scripts, bots, or crawlers to access the Services without our express written consent.
• Misrepresent your identity or affiliation when using the Services.
• Resell, sublicense, or redistribute any part of the Services without prior written authorization.
• Attempt to gain unauthorized access to other users' accounts, data, or systems connected to the Services.

We reserve the right to investigate and take appropriate legal action against anyone who violates these provisions, including terminating access and reporting to law enforcement authorities.`,
          },
          {
            title: "5. Intellectual Property Rights",
            content: `All content, technology, methodologies, frameworks, documentation, training materials, workshop curricula, system architectures, branding, trademarks, and software provided by Myria Consulting are protected by applicable intellectual property laws and remain the exclusive property of Myria Consulting INC unless explicitly transferred through a separate written agreement.

You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your internal business purposes only. This license does not include the right to reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content or materials provided through the Services.

Any feedback, suggestions, or ideas you submit regarding the Services may be used by Myria Consulting without obligation, compensation, or attribution to you. By submitting feedback, you grant us a perpetual, irrevocable, worldwide, royalty-free license to use such feedback for any purpose.`,
          },
          {
            title: "6. Workshop & Training Materials",
            content: `Workshop materials, including but not limited to slide decks, quizzes, scoring methodologies, assessment frameworks, and supplementary documentation, are provided exclusively for participants' personal educational use. Redistribution, recording, or commercial use of workshop materials is strictly prohibited without express written consent.

Workshop registrations are non-transferable. Cancellation and refund policies, if applicable, will be communicated at the time of registration. We reserve the right to modify workshop content, schedules, or formats at any time.`,
          },
          {
            title: "7. AI System Disclaimers & Limitations",
            content: `Our AI systems, including but not limited to voice agents, conversational interfaces, and automated assessment tools, generate responses based on probabilistic language models and should not be construed as professional, legal, medical, financial, or any other form of expert advice.

You expressly acknowledge and agree that:

• AI-generated outputs may contain inaccuracies, biases, or incomplete information.
• Voice AI systems may occasionally produce unexpected, irrelevant, or inappropriate responses.
• Real-time AI interactions are subject to latency, network conditions, and model limitations.
• Myria Consulting does not guarantee the accuracy, completeness, or reliability of any AI-generated output.
• You are solely responsible for evaluating and verifying any AI-generated content before relying upon it for decision-making.

Myria Consulting shall not be held liable for any actions taken, decisions made, or consequences arising from reliance on AI system outputs.`,
          },
          {
            title: "8. Confidentiality",
            content: `Each party agrees to maintain the confidentiality of any proprietary or confidential information disclosed during the course of the engagement. Confidential information includes, but is not limited to, business strategies, technical architectures, pricing, client lists, and any information marked as confidential.

This obligation does not apply to information that: (a) is or becomes publicly available through no fault of the receiving party; (b) was known to the receiving party prior to disclosure; (c) is independently developed without reference to confidential information; or (d) is required to be disclosed by law or legal process, provided reasonable notice is given.`,
          },
          {
            title: "9. Payment Terms",
            content: `For paid Services, fees are due as specified in the applicable service agreement, statement of work, or invoice. All fees are non-refundable unless otherwise stated in writing. Late payments may incur interest at the rate of 1.5% per month or the maximum rate permitted by law, whichever is lower.

You are responsible for all applicable taxes, duties, and fees associated with your use of the Services, excluding taxes based on Myria Consulting's net income. We reserve the right to suspend access to paid Services for overdue accounts.`,
          },
          {
            title: "10. Limitation of Liability",
            content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, MYRIA CONSULTING AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, GOODWILL, OR BUSINESS OPPORTUNITY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER LEGAL THEORY.

OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU TO MYRIA CONSULTING DURING THE TWELVE (12) MONTHS PRECEDING THE CLAIM.

SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU IN FULL.`,
          },
          {
            title: "11. Indemnification",
            content: `You agree to indemnify, defend, and hold harmless Myria Consulting, its affiliates, officers, directors, employees, and agents from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to: (a) your use of the Services; (b) your violation of these Terms; (c) your violation of any third-party rights; or (d) any content you submit or transmit through the Services.`,
          },
          {
            title: "12. Termination",
            content: `We reserve the right to suspend or terminate your access to the Services at our sole discretion, with or without cause and with or without notice. You may terminate your account at any time by contacting us at legal@myriaconsulting.com.

Upon termination: (a) your right to use the Services ceases immediately; (b) we may delete your account data after a reasonable retention period; (c) any outstanding payment obligations survive termination; and (d) provisions that by their nature should survive termination—including intellectual property, limitation of liability, indemnification, and governing law—will remain in full force and effect.`,
          },
          {
            title: "13. Dispute Resolution & Arbitration",
            content: `Any dispute, controversy, or claim arising out of or relating to these Terms or the Services shall be resolved through binding arbitration administered by the ADR Institute of Canada under its Arbitration Rules. The arbitration shall be conducted in Montreal, Quebec, Canada, and the arbitrator's decision shall be final and binding.

You agree that any arbitration shall be conducted on an individual basis and not as a class, consolidated, or representative action. You waive any right to participate in a class action lawsuit or class-wide arbitration against Myria Consulting.

Notwithstanding the above, either party may seek injunctive or equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement of intellectual property rights.`,
          },
          {
            title: "14. Governing Law",
            content: `These Terms shall be governed by and construed in accordance with the laws of the Province of Quebec and the federal laws of Canada applicable therein, without regard to conflict of law provisions. You consent to the exclusive jurisdiction of the courts located in the judicial district of Montreal, Quebec, Canada for any matters not subject to arbitration.`,
          },
          {
            title: "15. Severability",
            content: `If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the original intent.`,
          },
          {
            title: "16. Entire Agreement",
            content: `These Terms, together with any applicable service agreements, statements of work, and our Privacy Policy, constitute the entire agreement between you and Myria Consulting regarding the Services and supersede all prior or contemporaneous communications, proposals, and agreements, whether oral or written.

No waiver of any provision of these Terms shall be deemed a further or continuing waiver of such provision or any other provision.`,
          },
          {
            title: "17. Contact Information",
            content: `If you have questions about these Terms, please contact us at:

Myria Consulting INC
Email: legal@myriaconsulting.com
Website: www.myriaconsulting.com`,
          },
        ].map((section, i) => (
          <motion.section key={section.title} {...fadeUp(0.1 + i * 0.05)}>
            <h2 className="text-xl font-semibold text-foreground mb-3">{section.title}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
          </motion.section>
        ))}
      </div>
    </PageShell>
  );
}
