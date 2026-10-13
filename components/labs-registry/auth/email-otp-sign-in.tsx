"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { authClient } from "@/auth/auth-client";

export function EmailOtpSignIn({ returnTo = "/workspace" }: { returnTo?: string }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const safeReturnTo = useMemo(() => returnTo.startsWith("/") && !returnTo.startsWith("//") && !returnTo.includes("\\") ? returnTo : "/workspace", [returnTo]);

  async function sendOtp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setMessage("");
    const result = await authClient.emailOtp.sendVerificationOtp({ email, type: "sign-in" });
    setLoading(false);
    if (result.error) return setMessage(result.error.message ?? "Unable to send code.");
    setStep("otp");
  }

  async function verifyOtp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setMessage("");
    const result = await authClient.signIn.emailOtp({ email, otp });
    setLoading(false);
    if (result.error) return setMessage(result.error.message ?? "Invalid verification code.");
    window.location.assign(safeReturnTo);
  }

  return <div className="border border-[#12313a]/15 bg-[#fbf8f1] p-7 shadow-[0_20px_70px_rgba(18,49,58,0.05)]">
    <div className="flex size-11 items-center justify-center rounded-full bg-[#12313a] text-white">{step === "email" ? <Mail className="size-4"/> : <ShieldCheck className="size-4"/>}</div>
    <h2 className="mt-6 font-serif text-2xl text-[#12313a]">{step === "email" ? "Continue with your invited email." : "Enter your verification code."}</h2>
    {step === "email" ? <form className="mt-6" onSubmit={sendOtp}>
      <label className="text-xs uppercase tracking-[0.16em] text-[#5f6b6f]">Email address</label>
      <input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" className="mt-2 w-full border border-[#12313a]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#b9802c]"/>
      <button disabled={loading} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#12313a] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{loading ? "Sending code…" : "Send verification code"}<ArrowRight className="size-4"/></button>
    </form> : <form className="mt-6" onSubmit={verifyOtp}>
      <p className="mb-4 text-sm text-[#5f6b6f]">Code sent to {email}</p>
      <input inputMode="numeric" required value={otp} onChange={e=>setOtp(e.target.value)} placeholder="000000" className="w-full border border-[#12313a]/15 bg-white px-4 py-3 text-center text-lg tracking-[0.45em] outline-none focus:border-[#b9802c]"/>
      <button disabled={loading} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#12313a] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{loading ? "Verifying…" : "Verify and continue"}<ArrowRight className="size-4"/></button>
    </form>}
    {message && <p className="mt-4 text-sm text-red-700">{message}</p>}
  </div>;
}
