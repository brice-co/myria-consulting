"use client";

import { motion } from "framer-motion";
import PageShell from "@/components/layouts/PageShell";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function PrivacyPolicy() {
  return (
    <PageShell>
      <motion.header className="mb-16" {...fadeUp()}>
        <span className="inline-block text-xs font-mono tracking-widest uppercase text-primary mb-4">
          Legal
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground">Last updated: March 13, 2026</p>
      </motion.header>

      <div className="space-y-10">
        {[
          {
            title: "1. Introduction",
            content: `Myria Consulting INC ("Myria," "we," "us," or "our") is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, store, share, and protect information obtained through our website, AI platforms, workshop environments, voice agent demos, and consulting services (collectively, the "Services").

By accessing or using our Services, you consent to the practices described in this Privacy Policy. If you do not agree, please discontinue use of our Services. This policy applies to all users, including workshop participants, demo users, enterprise clients, and website visitors.`,
          },
          {
            title: "2. Information We Collect",
            content: `We collect information in the following categories:

Personal Information You Provide Directly:
• Full name, email address, phone number, and job title during registration or inquiry forms.
• Company name, company size, industry, and role when registering for workshops or consulting engagements.
• Payment and billing information when purchasing services (processed through secure third-party payment processors).
• Messages, feedback, and correspondence you send to us.

Information Collected Automatically:
• Browser type, version, and language preferences.
• Device information including operating system, hardware model, and unique device identifiers.
• IP address, approximate geolocation, and internet service provider.
• Pages visited, time spent on pages, click patterns, referral URLs, and navigation paths.
• Session identifiers and interaction timestamps.

AI Interaction Data:
• Voice recordings and transcriptions generated during voice AI demo sessions.
• Text inputs and conversational data submitted to our AI systems.
• AI system usage patterns, feature interactions, and session metadata.
• Quiz responses, assessment scores, and workshop progress data.`,
          },
          {
            title: "3. How We Use Your Information",
            content: `We use collected information for the following purposes:

Service Delivery & Operations:
• To provide, maintain, and improve our Services, including AI platform functionality.
• To process registrations, manage accounts, and fulfill service agreements.
• To personalize your experience and deliver relevant content and recommendations.

Communication:
• To send transactional communications related to your account or services.
• To provide workshop updates, scheduling information, and service notifications.
• To send marketing communications (with your consent, where required by law).
• To respond to your inquiries, support requests, and feedback.

Analytics & Improvement:
• To analyze usage patterns and improve the performance of our AI systems.
• To conduct research and development for new features and services.
• To generate aggregated, anonymized insights about platform usage.

Security & Compliance:
• To detect, prevent, and address fraud, abuse, or security incidents.
• To enforce our Terms of Service and other applicable policies.
• To comply with legal obligations, regulatory requirements, and lawful requests.

We do not sell your personal information to third parties. We do not use your personal data for automated decision-making that produces legal or similarly significant effects without appropriate safeguards.`,
          },
          {
            title: "4. Legal Basis for Processing (GDPR)",
            content: `For users in the European Economic Area (EEA), United Kingdom, and other jurisdictions requiring a legal basis, we process your personal data under the following grounds:

• Contractual Necessity: Processing required to perform our contractual obligations to you (e.g., delivering services, managing your account).
• Legitimate Interests: Processing necessary for our legitimate business interests, such as improving our services, fraud prevention, and marketing, where such interests are not overridden by your rights.
• Consent: Processing based on your explicit consent, such as marketing communications or optional data collection.
• Legal Obligation: Processing required to comply with applicable laws and regulations.

You may withdraw consent at any time without affecting the lawfulness of processing conducted prior to withdrawal.`,
          },
          {
            title: "5. Data Storage, Security & Retention",
            content: `Your data is stored on secure, encrypted infrastructure hosted by reputable cloud service providers. We implement industry-standard security measures including:

• Encryption at rest (AES-256) and in transit (TLS 1.2+).
• Role-based access controls with least-privilege principles.
• Regular security audits, vulnerability assessments, and penetration testing.
• Multi-factor authentication for administrative access.
• Automated threat detection and intrusion prevention systems.
• Secure backup and disaster recovery procedures.

Data Retention:
• Account data is retained for the duration of your account plus 30 days following deletion.
• Workshop and assessment data is retained for 24 months unless a longer period is required by law.
• Voice interaction data from demo sessions is retained for no more than 90 days unless you opt in to extended retention.
• Payment records are retained as required by applicable tax and financial regulations.
• Anonymized and aggregated data may be retained indefinitely for analytics purposes.

Despite our efforts, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security of your data.`,
          },
          {
            title: "6. AI-Specific Data Practices",
            content: `When you interact with our voice AI systems and conversational platforms, we adhere to the following practices:

• Voice Data Processing: Voice recordings are processed in real-time for response generation. Raw audio is not stored beyond the active session unless you explicitly opt in.
• Transcription Data: Conversation transcripts may be temporarily retained for quality assurance and system improvement. Identifiable transcripts are deleted within 90 days.
• Model Training: We do not use your individual conversation data to train or fine-tune AI models without your explicit, informed consent. Aggregated, anonymized interaction patterns may be used to improve system performance.
• Third-Party AI Providers: Some AI capabilities may involve third-party model providers. Data shared with these providers is governed by our data processing agreements and their respective privacy policies.
• Bias Monitoring: We periodically review AI system outputs for bias and fairness and take corrective action where necessary.`,
          },
          {
            title: "7. Sharing & Disclosure of Information",
            content: `We may share your information in the following circumstances:

• Service Providers: With trusted third-party vendors who assist in delivering our Services (e.g., cloud hosting, payment processing, email delivery, analytics). These providers are contractually obligated to protect your data and use it only for specified purposes.
• Business Transfers: In connection with a merger, acquisition, reorganization, or sale of assets, your data may be transferred as part of the transaction. We will notify you of any such change.
• Legal Requirements: When required by law, regulation, legal process, or governmental request. We will attempt to notify you unless prohibited by law.
• Protection of Rights: To protect the rights, property, or safety of Myria Consulting, our users, or the public.
• With Your Consent: In any other circumstances where you have provided explicit consent.

We do not sell, rent, or trade your personal information to third parties for their direct marketing purposes.`,
          },
          {
            title: "8. Your Rights & Choices",
            content: `Depending on your jurisdiction, you may have the following rights regarding your personal data:

• Access: Request a copy of the personal data we hold about you.
• Rectification: Request correction of inaccurate or incomplete personal data.
• Erasure: Request deletion of your personal data, subject to legal retention requirements.
• Restriction: Request that we limit the processing of your personal data.
• Portability: Request a copy of your data in a structured, machine-readable format.
• Objection: Object to processing based on legitimate interests or for direct marketing purposes.
• Withdraw Consent: Withdraw previously given consent at any time.
• Non-Discrimination: We will not discriminate against you for exercising your privacy rights.

For users in California (CCPA/CPRA): You have the right to know what personal information is collected, disclosed, or sold; the right to delete; the right to opt out of the sale or sharing of personal information; and the right to non-discrimination.

To exercise any of these rights, contact us at privacy@myriaconsulting.com. We will respond within 30 days (or as required by applicable law). We may need to verify your identity before processing your request.`,
          },
          {
            title: "9. International Data Transfers",
            content: `Your information may be transferred to and processed in countries other than your country of residence, including the United States. These countries may have different data protection laws. When we transfer data internationally, we implement appropriate safeguards, including:

• Standard Contractual Clauses (SCCs) approved by the European Commission.
• Data processing agreements with all third-party processors.
• Assessment of the legal framework in the recipient country.

By using our Services, you consent to the transfer of your information to the United States and other jurisdictions as described in this policy.`,
          },
          {
            title: "10. Children's Privacy",
            content: `Our Services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child under 18, we will take steps to delete such information promptly. If you believe a child has provided us with personal data, please contact us at privacy@myriaconsulting.com.`,
          },
          {
            title: "11. Third-Party Links & Services",
            content: `Our Services may contain links to third-party websites, applications, or services that are not operated by us. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party service before providing your personal information.`,
          },
          {
            title: "12. Changes to This Policy",
            content: `We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. We will notify you of material changes via email or through prominent notice on our platform at least 30 days before the changes take effect.

The "Last updated" date at the top of this policy indicates when it was most recently revised. Continued use of our Services after changes constitutes acceptance of the updated policy.`,
          },
          {
            title: "13. Contact Us",
            content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:

Myria Consulting INC
Email: privacy@myriaconsulting.com
Website: www.myriaconsulting.com

For data protection inquiries in the EU/EEA, you may also contact your local data protection authority.`,
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
