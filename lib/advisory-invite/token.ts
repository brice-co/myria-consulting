import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";

const DEFAULT_TTL_SECONDS = 60 * 60;

export type AdvisoryInvitePayload = {
  email: string;
  company?: string;
  issuedAt: number;
  expiresAt: number;
  purpose: "myria-advisory-experience";
};

function getSecret() {
  const secret = process.env.ADVISORY_INVITE_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "ADVISORY_INVITE_SECRET must be configured with at least 32 characters.",
    );
  }

  return secret;
}

function encode(value: string) {
  return Buffer.from(value, "utf8").toString(
    "base64url",
  );
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString(
    "utf8",
  );
}

function sign(encodedPayload: string) {
  return createHmac("sha256", getSecret())
    .update(encodedPayload)
    .digest("base64url");
}

export function createAdvisoryInviteToken(input: {
  email: string;
  company?: string;
  ttlSeconds?: number;
}) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt =
    issuedAt +
    (input.ttlSeconds ?? DEFAULT_TTL_SECONDS);

  const payload: AdvisoryInvitePayload = {
    email: input.email,
    company: input.company || undefined,
    issuedAt,
    expiresAt,
    purpose: "myria-advisory-experience",
  };

  const encodedPayload = encode(
    JSON.stringify(payload),
  );
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdvisoryInviteToken(
  token: string,
): AdvisoryInvitePayload | null {
  try {
    const [encodedPayload, signature] =
      token.split(".");

    if (!encodedPayload || !signature) {
      return null;
    }

    const expectedSignature = sign(encodedPayload);

    const received = Buffer.from(signature);
    const expected = Buffer.from(expectedSignature);

    if (
      received.length !== expected.length ||
      !timingSafeEqual(received, expected)
    ) {
      return null;
    }

    const payload = JSON.parse(
      decode(encodedPayload),
    ) as AdvisoryInvitePayload;

    const now = Math.floor(Date.now() / 1000);

    if (
      payload.purpose !==
        "myria-advisory-experience" ||
      !payload.email ||
      payload.expiresAt <= now
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
