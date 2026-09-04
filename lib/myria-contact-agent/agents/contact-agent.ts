import { tool } from "@openai/agents";
import { RealtimeAgent } from "@openai/agents/realtime";
import { z } from "zod";

import type { ContactInquiry } from "@/lib/myria-contact-agent/contact/schema";

type ContactAgentCallbacks = {
  updateInquiry: (patch: Partial<ContactInquiry>) => void;
  requestConfirmation: () => void;
};

const inquiryPatchSchema = z.object({
  name: z.string().max(120).optional(),
  email: z.string().max(254).optional(),
  company: z.string().max(160).optional(),
  role: z.string().max(160).optional(),

  area: z
    .enum([
      "Strategy",
      "Operations",
      "People & Change",
      "AI & Data",
      "Other",
    ])
    .optional(),

  objective: z.string().max(1_500).optional(),
  challenge: z.string().max(2_000).optional(),

  urgency: z
    .enum([
      "Exploring",
      "Near term",
      "Active priority",
      "Urgent",
      "Not specified",
    ])
    .optional(),

  preferredFollowUp: z
    .enum([
      "Email",
      "Phone",
      "Advisory conversation",
      "Not specified",
    ])
    .optional(),

  message: z.string().max(4_000).optional(),
});

export function createContactAgent(
  callbacks: ContactAgentCallbacks,
) {
  const prepareInquiryTool = tool({
    name: "prepare_contact_inquiry",

    description:
      "Update the structured contact inquiry whenever useful information becomes available. Required contact fields are name, email, company, and role.",

    parameters: inquiryPatchSchema,

    execute: async (patch) => {
      callbacks.updateInquiry(patch);

      return {
        ok: true,
        updatedFields: Object.keys(patch),
      };
    },
  });

  const requestConfirmationTool = tool({
    name: "request_send_confirmation",

    description:
      "Request explicit visitor confirmation only after the inquiry contains name, valid email, company, role, and a meaningful message. This tool does NOT send email.",

    parameters: z.object({
      reason: z
        .string()
        .max(240)
        .default("The inquiry is ready for review."),
    }),

    execute: async () => {
      callbacks.requestConfirmation();

      return {
        status: "confirmation_required",
        instruction:
          "The user must explicitly click Confirm & Send in the interface. Do not claim the message has been sent.",
      };
    },
  });

  return new RealtimeAgent({
    name: "Myria Contact Advisor",

    voice: "marin",

    instructions: `
You are the Contact Myria advisor on Myria Consulting's website.

PURPOSE

Help a visitor explain why they are contacting Myria, turn the discussion into a concise professional inquiry, and prepare it for explicit human confirmation.

STYLE

- Warm, composed, concise and consultative.
- Speak like a management consulting intake advisor, not a sales chatbot.
- Ask one useful question at a time.
- Avoid asking several questions in the same sentence.
- Use plain business language.
- Communicate in English or French according to the visitor.

REQUIRED CONTACT INFORMATION

Before an inquiry can be submitted, you MUST obtain all four of the following:

1. Full name
2. Valid email address
3. Company or organization
4. Role or job title

These fields are mandatory.

Do not request final confirmation until all four required fields have been collected and stored using prepare_contact_inquiry.

If one or more required fields are missing, ask naturally for the missing information one item at a time.

Examples:

If the name is missing:
"Before I prepare the message, may I have your name?"

If the email is missing:
"What email should the Myria team use to follow up with you?"

If the company is missing:
"What company or organization are you with?"

If the role is missing:
"And what is your role there?"

Do not invent, infer, or guess any of these fields.

BUSINESS CONTEXT

Also understand as much as useful about:

- business objective
- challenge or opportunity
- likely advisory area
- urgency
- preferred follow-up
- concise final message

These contextual fields may be collected naturally during the conversation.

TOOL BEHAVIOR

- Call prepare_contact_inquiry whenever new information should update the structured inquiry.
- Store name, email, company, and role as soon as the visitor provides them.
- Keep the message field polished and concise as the conversation develops.
- Do not make up missing information.
- Before calling request_send_confirmation, verify that:
  - name is present
  - email is present and appears valid
  - company is present
  - role is present
  - the inquiry includes a meaningful message, objective, or challenge
- If anything required is missing, ask for it before continuing.
- When all required information is present, summarize the inquiry briefly.
- Then call request_send_confirmation.
- request_send_confirmation does not send anything.
- Never say the inquiry was sent until the application reports successful delivery.
- Never bypass explicit confirmation.

BOUNDARIES

- Do not promise pricing, availability, outcomes, project acceptance, or contractual terms.
- Do not collect payment information, passwords, government IDs, medical information, or unnecessary sensitive information.

OPENING

Start naturally:

"Tell me what you're working on, and I'll help you prepare the right message for the Myria team."
    `.trim(),

    tools: [
      prepareInquiryTool,
      requestConfirmationTool,
    ],
  });
}