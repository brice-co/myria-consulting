"use client";

import { FormEvent, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Loader2,
  Mail,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

export function AdvisorySessionInvite() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(
        "/api/advisory-experience/request-invite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            company,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to send your invitation right now.",
        );
      }

      setStatus("success");
      setMessage(data.message);
      setEmail("");
      setCompany("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your invitation right now.",
      );
    }
  }

  return (
    <section
      id="experience-myria"
      className="border-y border-border bg-card/45"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-10 lg:py-20">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
            <Sparkles size={14} aria-hidden="true" />
            Experience Myria
          </div>

          <h2 className="mt-4 max-w-2xl font-serif text-3xl tracking-tight md:text-4xl">
            Step into a 15-minute working session with
            the Myria advisory team.
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
            Bring a real business challenge and experience
            how humans and AI specialists work together in
            the same advisory room — surfacing findings,
            perspectives, decisions, and next steps.
          </p>

          <div className="mt-6 max-w-xl space-y-2 text-sm leading-6 text-muted-foreground">
            <p>
              This is a guided Myria experience, not a
              self-service consulting report.
            </p>
            <p>
              Request an invitation below. We will send a
              private participation link to your email.
            </p>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-border bg-background p-5 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-2">
            <Mail
              size={16}
              className="text-primary"
              aria-hidden="true"
            />
            <p className="text-sm font-semibold">
              Request your advisory session invitation
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label
                htmlFor="advisory-email"
                className="sr-only"
              >
                Work email
              </label>

              <input
                id="advisory-email"
                type="email"
                required
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@company.com"
                autoComplete="email"
                disabled={status === "loading"}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="advisory-company"
                className="sr-only"
              >
                Company or organization
              </label>

              <input
                id="advisory-company"
                type="text"
                value={company}
                onChange={(event) =>
                  setCompany(event.target.value)
                }
                placeholder="Company or organization (optional)"
                autoComplete="organization"
                disabled={status === "loading"}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                <Loader2
                  className="mx-auto animate-spin"
                  size={18}
                  aria-label="Sending invitation"
                />
              ) : (
                <>
                  Request invitation
                  <ArrowUpRight
                    className="ml-1 inline"
                    size={15}
                  />
                </>
              )}
            </button>
          </div>

          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            Your invitation link is personal and
            time-limited. No newsletter subscription is
            required.
          </p>

          {message && (
            <p
              role="status"
              className={`mt-4 flex items-start gap-2 text-sm ${
                status === "success"
                  ? "text-emerald-600"
                  : "text-destructive"
              }`}
            >
              {status === "success" && (
                <Check
                  size={15}
                  className="mt-0.5 shrink-0"
                />
              )}
              {message}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

export default AdvisorySessionInvite;
