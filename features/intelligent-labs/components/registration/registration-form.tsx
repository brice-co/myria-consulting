"use client";

import { useState, type FormEvent } from "react";
import type { LabId } from "../../constants/labs";
import { LabSelection } from "./lab-selection";
import { ParticipantFields } from "./participant-fields";
import { RegistrationSuccess } from "./registration-success";

type Motivation = "collaboration" | "business" | "architecture" | "curiosity";

type FormValues = {
  name: string;
  email: string;
  company: string;
  role: string;
  motivation: Motivation;
  notes: string;
  consent: boolean;
  website: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  role: "",
  motivation: "collaboration",
  notes: "",
  consent: false,
  website: "",
};

export function RegistrationForm() {
  const [form, setForm] = useState<FormValues>(initialValues);
  const [preferences, setPreferences] = useState<LabId[]>([]);
  const [pending, setPending] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleLab(labId: LabId) {
    setPreferences((current) => {
      if (current.includes(labId)) {
        return current.filter((value) => value !== labId);
      }
      return current.length < 2 ? [...current, labId] : current;
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (preferences.length !== 2) {
      setError("Please select exactly two Labs.");
      return;
    }

    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/labs-registry/labs/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, preferences }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error ?? "Registration failed.");
      }
      setComplete(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (complete) {
    return <RegistrationSuccess />;
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-9 rounded-3xl border border-[#ded8cb] bg-white p-6 shadow-sm sm:p-9"
    >
      <LabSelection preferences={preferences} onToggle={toggleLab} />
      <ParticipantFields
        name={form.name}
        email={form.email}
        company={form.company}
        role={form.role}
        onChange={(field, value) => update(field, value)}
      />
      <label className="block text-sm font-semibold text-[#12313a]">
        What brings you to the Labs?
        <select
          value={form.motivation}
          onChange={(event) => update("motivation", event.target.value as Motivation)}
          className="mt-2 w-full rounded-xl border border-[#ded8cb] bg-white px-4 py-3"
        >
          <option value="collaboration">Explore potential collaboration</option>
          <option value="business">Explore business applications</option>
          <option value="architecture">Explore technical architecture</option>
          <option value="curiosity">Learn about Intelligent Labs</option>
        </select>
      </label>
      <label className="block text-sm font-semibold text-[#12313a]">
        What would you like to explore? (optional)
        <textarea
          value={form.notes}
          maxLength={1000}
          rows={3}
          onChange={(event) => update("notes", event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#ded8cb] px-4 py-3"
        />
      </label>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </label>
      </div>
      <label className="flex items-start gap-3 text-sm leading-6 text-[#5f6b6f]">
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(event) => update("consent", event.target.checked)}
          className="mt-1"
        />
        I agree that Myria may use my details to manage my registration and contact
        me about the selected Labs. This does not subscribe me to marketing emails.
      </label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={pending || preferences.length !== 2}
        className="w-full rounded-full bg-[#12313a] px-6 py-4 text-sm font-semibold text-white disabled:opacity-50"
      >
        {pending ? "Submitting registration..." : "Register interest"}
      </button>
    </form>
  );
}
