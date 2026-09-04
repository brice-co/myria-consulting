import { z } from "zod";

import type { ContactInquiry } from "./schema";

export function buildInquiryMessage(
  inquiry: ContactInquiry,
) {
  const sections: string[] = [];

  if (inquiry.message.trim()) {
    sections.push(inquiry.message.trim());
  }

  if (inquiry.objective.trim()) {
    sections.push(
      `Business objective:\n${inquiry.objective.trim()}`,
    );
  }

  if (inquiry.challenge.trim()) {
    sections.push(
      `Challenge or opportunity:\n${inquiry.challenge.trim()}`,
    );
  }

  if (
    inquiry.area &&
    inquiry.area !== "Other"
  ) {
    sections.push(
      `Advisory area:\n${inquiry.area}`,
    );
  }

  if (
    inquiry.urgency &&
    inquiry.urgency !== "Not specified"
  ) {
    sections.push(
      `Timing:\n${inquiry.urgency}`,
    );
  }

  if (
    inquiry.preferredFollowUp &&
    inquiry.preferredFollowUp !== "Not specified"
  ) {
    sections.push(
      `Preferred follow-up:\n${inquiry.preferredFollowUp}`,
    );
  }

  return sections.join("\n\n");
}

const emailSchema = z.string().email();

export function isInquiryReady(
  inquiry: ContactInquiry,
) {
  const validEmail = emailSchema.safeParse(
    inquiry.email.trim(),
  ).success;

  return Boolean(
    inquiry.name.trim().length >= 2 &&
      validEmail &&
      inquiry.company.trim().length >= 2 &&
      inquiry.role.trim().length >= 2 &&
      (
        inquiry.message.trim() ||
        inquiry.objective.trim() ||
        inquiry.challenge.trim()
      ),
  );
}