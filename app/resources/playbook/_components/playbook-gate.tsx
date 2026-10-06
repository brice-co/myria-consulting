"use client";
import { FormEvent, useState } from "react";

type State = "idle" | "submitting" | "success" | "error";
export function PlaybookGate() {
  const [state, setState] = useState<State>("idle");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("submitting"); setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = { name: String(form.get("name") ?? ""), company: String(form.get("company") ?? ""), email: String(form.get("email") ?? ""), website: String(form.get("website") ?? "") };
    setEmail(payload.email);
    try {
      const response = await fetch("/api/resources/playbook/request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error ?? "Unable to send the Playbook.");
      setState("success");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to send the Playbook."); setState("error"); }
  }

  return (
    <section id="get-playbook" className="scroll-mt-8 bg-[#f2eee4]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
        <div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0b7c78]">Continue with the complete edition</p><h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight md:text-5xl">Take the Playbook with you.</h2><p className="mt-6 max-w-xl leading-7 text-[#667274]">Receive the complete PDF by email, together with access to the digital edition and a direct path into the Myria Labs when you want to apply the thinking.</p></div>
        <div className="rounded-[28px] border border-[#d6d0c4] bg-[#f8f5ed] p-7 md:p-9">
          {state === "success" ? <div className="py-8"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0b7c78]">Check your inbox</p><h3 className="mt-4 font-serif text-3xl">The Playbook is on its way.</h3><p className="mt-4 leading-7 text-[#667274]">We sent the complete edition to <strong className="text-[#173039]">{email}</strong>.</p></div> :
          <form onSubmit={submit} className="grid gap-5">
            <div><label htmlFor="name" className="text-sm font-medium">Name</label><input id="name" name="name" required minLength={2} className="mt-2 w-full rounded-xl border border-[#d2cdc1] bg-white px-4 py-3 outline-none focus:border-[#0b7c78]" /></div>
            <div><label htmlFor="company" className="text-sm font-medium">Company</label><input id="company" name="company" required minLength={2} className="mt-2 w-full rounded-xl border border-[#d2cdc1] bg-white px-4 py-3 outline-none focus:border-[#0b7c78]" /></div>
            <div><label htmlFor="email" className="text-sm font-medium">Business email</label><input id="email" name="email" type="email" required className="mt-2 w-full rounded-xl border border-[#d2cdc1] bg-white px-4 py-3 outline-none focus:border-[#0b7c78]" /></div>
            <div className="hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
            {state === "error" ? <p role="alert" className="text-sm text-red-700">{message}</p> : null}
            <button disabled={state === "submitting"} className="mt-2 rounded-full bg-[#173039] px-6 py-3.5 text-sm font-semibold text-[#f8f5ed] disabled:opacity-60">{state === "submitting" ? "Sending…" : "Send me the Playbook →"}</button>
            <p className="text-xs leading-5 text-[#778184]">By requesting the Playbook, you agree to receive this resource and directly related follow-up from Myria. You can opt out at any time.</p>
          </form>}
        </div>
      </div>
    </section>
  );
}
