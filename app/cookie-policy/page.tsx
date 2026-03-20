"use client";

import { motion } from "framer-motion";
import PageShell from "@/components/layouts/PageShell";
import { Cookie, Settings, BarChart3, Shield, Globe, Megaphone } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const cookieTypes = [
  {
    icon: Shield,
    name: "Strictly Necessary Cookies",
    description:
      "These cookies are essential for the operation of our website and Services. They enable core functionality such as security, authentication, session management, and network management. These cookies cannot be disabled without impacting site functionality.",
    examples:
      "Session identifiers, CSRF protection tokens, load balancer affinity, authentication state, cookie consent preferences",
    retention: "Session to 12 months",
  },
  {
    icon: Settings,
    name: "Functional Cookies",
    description:
      "Functional cookies enable enhanced features and personalization. They remember your preferences and choices to provide a more tailored experience. If you disable these cookies, some features may not function as intended.",
    examples:
      "Language and locale preferences, theme selection (dark/light mode), form auto-fill data, workshop registration state, previously viewed content, accessibility settings",
    retention: "30 days to 12 months",
  },
  {
    icon: BarChart3,
    name: "Analytics & Performance Cookies",
    description:
      "These cookies help us understand how visitors interact with our platform by collecting information about page visits, traffic sources, navigation patterns, and feature usage. The data is aggregated and anonymized wherever possible. We use this information to improve the performance and usability of our Services.",
    examples:
      "Page views and session duration, bounce rates and exit pages, feature usage frequency, performance metrics (page load times, error rates), scroll depth and click heatmaps, A/B testing variant assignments",
    retention: "30 days to 24 months",
  },
  {
    icon: Megaphone,
    name: "Marketing & Advertising Cookies",
    description:
      "Marketing cookies are used to deliver relevant content and measure the effectiveness of our campaigns and communications. We do not serve third-party display ads. These cookies help us understand which channels and messages resonate with our audience and attribute conversions accurately.",
    examples:
      "Campaign source attribution (UTM parameters), content personalization based on interests, email campaign engagement tracking, social media referral tracking, conversion tracking for workshop registrations",
    retention: "30 days to 18 months",
  },
  {
    icon: Globe,
    name: "Third-Party Cookies",
    description:
      "Some cookies are placed by third-party services that appear on our pages. These third parties may use cookies to build a profile of your interests and show you relevant content on other sites. We do not control these cookies and their use is governed by the respective third party's privacy policy.",
    examples:
      "Embedded video players (e.g., YouTube, Vimeo), social media widgets and share buttons, third-party analytics services, customer support chat tools",
    retention: "Varies by provider",
  },
];

export default function CookiePolicy() {
  return (
    <PageShell>
      <motion.header className="mb-16" {...fadeUp()}>
        <span className="inline-block text-xs font-mono tracking-widest uppercase text-primary mb-4">
          Legal
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-sm text-muted-foreground">Last updated: March 13, 2026</p>
      </motion.header>

      {/* Introduction */}
      <motion.section className="mb-12 space-y-4" {...fadeUp(0.1)}>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          Myria Consulting INC ("Myria," "we," "us," or "our") uses cookies and similar tracking
          technologies to provide, protect, and improve our website, AI platforms, and related
          services (collectively, the "Services"). This Cookie Policy explains what cookies are,
          what types we use, why we use them, and how you can manage your preferences.
        </p>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          By continuing to use our Services, you consent to the use of cookies as described in this
          policy. You can change your cookie preferences at any time using the methods described in
          the "Managing Your Preferences" section below.
        </p>
      </motion.section>

      {/* What Are Cookies */}
      <motion.section className="mb-12 space-y-4" {...fadeUp(0.15)}>
        <h2 className="text-xl font-semibold text-foreground">What Are Cookies?</h2>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          Cookies are small text files that are stored on your device (computer, tablet, or mobile
          phone) when you visit a website. They are widely used to make websites work efficiently,
          provide reporting information, and assist with personalization. Cookies set by the website
          operator are called "first-party cookies." Cookies set by parties other than the website
          operator are called "third-party cookies."
        </p>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          We also use similar technologies such as pixel tags, web beacons, local storage, and
          session storage, which function similarly to cookies. References to "cookies" in this
          policy include these similar technologies unless otherwise specified.
        </p>
      </motion.section>

      {/* Cookie Types */}
      <motion.section className="mb-14" {...fadeUp(0.2)}>
        <h2 className="text-xl font-semibold text-foreground mb-6">Types of Cookies We Use</h2>
        <div className="space-y-5">
          {cookieTypes.map((cookie, i) => {
            const Icon = cookie.icon;
            return (
              <motion.div
                key={cookie.name}
                {...fadeUp(0.25 + i * 0.08)}
                className="rounded-xl border border-border bg-card p-6 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{cookie.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cookie.description}
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      <span className="font-medium text-muted-foreground">Examples:</span>{" "}
                      {cookie.examples}
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      <span className="font-medium text-muted-foreground">Retention:</span>{" "}
                      {cookie.retention}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Additional Sections */}
      <div className="space-y-10">
        {[
          {
            title: "How We Use Cookies for AI Services",
            content: `Our AI platforms and voice agent demos may use cookies and similar technologies to:

• Maintain session state during real-time voice AI interactions.
• Store your workshop progress and assessment completion status.
• Remember your AI demo preferences and configuration settings.
• Track feature usage to improve AI system performance and accuracy.
• Ensure secure authentication during interactive AI sessions.

These cookies are essential for delivering a seamless AI experience and are classified as Strictly Necessary or Functional cookies depending on their specific purpose.`,
          },
          {
            title: "Managing Your Preferences",
            content: `You have several options for managing cookies:

Browser Settings: Most web browsers allow you to control cookies through their settings. You can typically find these in the "Options," "Preferences," or "Settings" menu of your browser. You can set your browser to block or delete cookies, although this may impact the functionality of our Services.

Common browser cookie management links:
• Google Chrome: chrome://settings/cookies
• Mozilla Firefox: about:preferences#privacy
• Safari: Preferences → Privacy
• Microsoft Edge: edge://settings/privacy

Do Not Track: Some browsers offer a "Do Not Track" (DNT) signal. We currently do not respond to DNT signals, but we honor your cookie preferences as set through the methods described above.

Opt-Out of Analytics: You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.

Contact Us: You can also contact us at privacy@myriaconsulting.com to request information about the cookies we have stored or to request deletion of cookie data associated with your account.

Please note that disabling Strictly Necessary cookies may prevent you from using certain features of our Services, including authentication, AI demos, and workshop tools.`,
          },
          {
            title: "Cookie Consent",
            content: `Where required by law (e.g., under the EU ePrivacy Directive or GDPR), we obtain your consent before placing non-essential cookies on your device. You can modify or withdraw your consent at any time.

Essential cookies that are strictly necessary for the operation of our Services do not require consent but are disclosed in this policy for transparency.`,
          },
          {
            title: "Updates to This Policy",
            content: `We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements. The "Last updated" date at the top indicates the most recent revision. We encourage you to review this policy periodically. Material changes will be communicated through our website or via email.`,
          },
          {
            title: "Contact Us",
            content: `If you have questions about this Cookie Policy or our use of cookies, please contact us at:

Myria Consulting INC
Email: privacy@myriaconsulting.com
Website: www.myriaconsulting.com`,
          },
        ].map((section, i) => (
          <motion.section key={section.title} {...fadeUp(0.6 + i * 0.05)}>
            <h2 className="text-xl font-semibold text-foreground mb-3">{section.title}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </motion.section>
        ))}
      </div>
    </PageShell>
  );
}
