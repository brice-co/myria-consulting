import Link from "next/link";
import { RegistrationForm } from "@/features/intelligent-labs/components/registration/registration-form";

export const metadata = {
  title: "Register | Myria Intelligent Labs",
};

export default function LabRegistrationPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e7] px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/experience/interactive-workspace"
          className="text-sm text-[#5f6b6f]"
        >
          ← Explore Myria Intelligent Labs
        </Link>
        <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-[#b9802c]">
          Invitation to explore
        </p>
        <h1 className="mb-9 mt-4 font-serif text-5xl text-[#12313a]">
          Register your interest.
        </h1>
        <RegistrationForm />
      </div>
    </main>
  );
}
