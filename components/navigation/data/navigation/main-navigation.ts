import {

  BrainCircuit,
  Building2,
  FileText,
  Layers3,
  Library,
  MessageSquareText,
  Network,
  PlayCircle,
  Presentation,
  Radio,
  Sparkles,
  Workflow,
} from "lucide-react";

export type NavigationItem = {
  title: string;
  description: string;
  href: string;
  icon?: typeof Layers3;
};

export type NavigationFeature = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

export type NavigationGroup = {
  label: string;
  href?: string;
  items?: NavigationItem[];
  feature?: NavigationFeature;
};

export const mainNavigation: NavigationGroup[] = [
  {
    label: "Services",
    href: "/labs",
    items: [
      {
        title: "AI Advisory",
        description:
          "Specialized AI advisors supporting structured business thinking.",
        href: "/labs/discovery",
        icon: BrainCircuit,
      },
      {
        title: "Fractional CTO",
        description:
          "An embedded AI-native CTO partner for founding teams.",
        href: "/services/fractional-cto",
        icon: MessageSquareText,
      },
      
      
    ],
    feature: {
      eyebrow: "MYRIA SERVICES",
      title: "From business challenge to coordinated action.",
      description:
        "Where People and AI work together.",
      href: "/experience/interactive-workspace",
      cta: "Explore the Experience",
    },
  },

  

  {
    label: "Use Cases",
    href: "/use-cases",
    items: [
      {
        title: "Lead Capture & Qualification",
        description:
          "Engage, understand, qualify and route inbound opportunities.",
        href: "/use-cases/sales",
        icon: Radio,
      },
      {
        title: "Customer Support",
        description:
          "AI-assisted service connected to knowledge and business systems.",
        href: "/use-cases/support",
        icon: MessageSquareText,
      },
      
      {
        title: "Intelligent Operations",
        description:
          "Identify exceptions and coordinate operational responses.",
        href: "/use-cases/operations",
        icon: Workflow,
      },
      {
        title: "Finance & Receivables",
        description:
          "Turn financial signals into prioritized actions.",
        href: "/use-cases/invoices",
        icon: Building2,
      },
      
    ],
    feature: {
      eyebrow: "SEE IT IN CONTEXT",
      title: "What could collaborative intelligence do?",
      description:
        "Explore practical scenarios across customer, operations, finance and enterprise work.",
      href: "/use-cases",
      cta: "Explore use cases",
    },
  },

  {
    label: "Experience",
    href: "/experience/interactive-workspace",
    items: [
      {
        title: "Interactive Demos",
        description:
          "Experience collaborative AI directly in the browser.",
        href: "/experience/interactive-workspace",
        icon: Sparkles,
      },
      {
        title: "Myria Workspace",
        description:
          "Enter the collaborative workspace experience.",
        href: "/experience/workspace",
        icon: Layers3,
      },
      {
        title: "Video Gallery",
        description:
          "Watch agents, workspaces and workflows in action.",
        href: "/experience/videos",
        icon: PlayCircle,
      },
      {
        title: "Advisory Labs",
        description:
          "Explore structured consulting experiences powered by Myria.",
        href: "/experience/ai-advisory",
        icon: Presentation,
      },
    ],
    feature: {
      eyebrow: "DON'T JUST READ ABOUT IT",
      title: "Experience how Myria works.",
      description:
        "See people and AI think, collaborate and act together.",
      href: "/experience/interactive-workspace",
      cta: "Explore the experience",
    },
  },

  {
    label: "Resources",
    href: "/",
    items: [
      {
        title: "AI-Enabled Enterprise Playbook",
        description:
          "A practical guide to building the AI-enabled enterprise.",
        href: "/resources/playbook",
        icon: Library,
      },
      
      {
        title: "Guides",
        description:
          "Practical frameworks for AI and transformation leaders.",
        href: "/resources/guides",
        icon: FileText,
      },
      {
        title: "Architecture",
        description:
          "Understand the systems behind collaborative intelligence.",
        href: "/resources/architecture",
        icon: Network,
      },
    ],
    feature: {
      eyebrow: "MYRIA THINKING",
      title: "Understand the AI-enabled enterprise.",
      description:
        "Explore how Myria is enabling the next operating model.",
      href: "/experience/myria-os",
      cta: "Explore Myria OS",
    },
  },
];