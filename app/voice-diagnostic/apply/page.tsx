"use client";

import { useMemo, useState } from "react";
import {
  diagnosticSchema,
  AI_SCOPE_OPTIONS,
  ARCHITECTURE_MATURITY_OPTIONS,
  REGULATORY_OPTIONS,
  PII_LEVEL_OPTIONS,
  ENGINEERING_TEAM_OPTIONS,
  AI_EXPERIENCE_OPTIONS,
  BUDGET_RANGE_OPTIONS,
  TIMELINE_OPTIONS,
  type DiagnosticInput,
} from "@/lib/validation/diagnostic";

type FieldErrors = Partial<Record<keyof DiagnosticInput, string[]>>;

const initialFormData: DiagnosticInput = {
  companyName: "",
  email: "",
  industry: "",
  orgSize: "",
  contactTitle: "",
  useCase: "",
  aiScope: "",
  users: "",
  systems: "",
  infrastructure: "",
  architectureMaturity: "",
  regulatory: "",
  piiLevel: "",
  engineeringTeam: "",
  aiExperience: "",
  budgetRange: "<50k",
  timeline: "",
  website: "", // honeypot
};

export default function AIArchitectureDiagnosticLab() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState<DiagnosticInput>(initialFormData);

  function updateField<K extends keyof DiagnosticInput>(
    name: K,
    value: DiagnosticInput[K]
  ) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

    if (submitError) setSubmitError("");
  }

  function validateClient(): boolean {
    const parsed = diagnosticSchema.safeParse(formData);

    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors as FieldErrors);
      return false;
    }

    setFieldErrors({});
    return true;
  }

  const isSubmitDisabled = useMemo(() => {
    return loading;
  }, [loading]);

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
        <div className="max-w-xl text-center space-y-6">
          <h1 className="text-3xl font-semibold">Application Received</h1>
          <p className="text-neutral-400">
            Your submission is under review. We assess fit based on system
            complexity, readiness, and alignment.
          </p>
          <p className="text-neutral-500 text-sm">
            If selected, you will receive an invitation to the AI Architecture
            Diagnostic Lab.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl font-semibold">
            AI Architecture Diagnostic Lab
          </h1>

          <p className="text-neutral-400 max-w-2xl mx-auto">
            A structured assessment for organizations building or scaling AI
            systems. We evaluate architecture, governance, and operational
            readiness before costly decisions are made.
          </p>

          <p className="text-neutral-500 text-sm max-w-xl mx-auto">
            This is not a generic workshop. It is a selective diagnostic
            designed for teams serious about deploying AI systems in production.
          </p>
        </div>

        <form
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            setSubmitError("");

            const valid = validateClient();
            if (!valid) return;

            setLoading(true);

            try {
              const res = await fetch("/api/ai-architecture-diagnostic", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              });

              const data = await res.json().catch(() => null);

              if (!res.ok) {
                if (data?.fieldErrors) {
                  setFieldErrors(data.fieldErrors as FieldErrors);
                }

                setSubmitError(
                  data?.error || "Something went wrong. Please try again."
                );
                return;
              }

              setSubmitted(true);
            } catch (error) {
              console.error(error);
              setSubmitError("Something went wrong. Please try again.");
            } finally {
              setLoading(false);
            }
          }}
          className="space-y-12"
        >
          <SectionTitle title="Organization Profile" />

          <Input
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={updateField}
            error={fieldErrors.companyName?.[0]}
            required
          />

          <Input
            label="Primary Contact Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={updateField}
            error={fieldErrors.email?.[0]}
            required
          />

          <Input
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={updateField}
            error={fieldErrors.industry?.[0]}
          />

          <Input
            label="Organization Size"
            name="orgSize"
            value={formData.orgSize}
            onChange={updateField}
            error={fieldErrors.orgSize?.[0]}
          />

          <Input
            label="Primary Contact Role"
            name="contactTitle"
            value={formData.contactTitle}
            onChange={updateField}
            error={fieldErrors.contactTitle?.[0]}
          />

          <SectionTitle title="AI System Context" />

          <Textarea
            label="What are you trying to build or improve with AI?"
            name="useCase"
            value={formData.useCase}
            onChange={updateField}
            error={fieldErrors.useCase?.[0]}
            required
            rows={6}
          />

          <Select
            label="Scope of AI Initiative"
            name="aiScope"
            value={formData.aiScope}
            onChange={updateField}
            options={AI_SCOPE_OPTIONS}
            error={fieldErrors.aiScope?.[0]}
          />

          <Input
            label="Estimated Users or Interactions per Month"
            name="users"
            value={formData.users}
            onChange={updateField}
            error={fieldErrors.users?.[0]}
          />

          <Textarea
            label="Core Systems Involved (CRM, APIs, Data Sources)"
            name="systems"
            value={formData.systems}
            onChange={updateField}
            error={fieldErrors.systems?.[0]}
            rows={4}
          />

          <SectionTitle title="Architecture & Infrastructure" />

          <Textarea
            label="Current Infrastructure Stack"
            name="infrastructure"
            value={formData.infrastructure}
            onChange={updateField}
            error={fieldErrors.infrastructure?.[0]}
            rows={4}
          />

          <Select
            label="Architecture Maturity"
            name="architectureMaturity"
            value={formData.architectureMaturity}
            onChange={updateField}
            options={ARCHITECTURE_MATURITY_OPTIONS}
            error={fieldErrors.architectureMaturity?.[0]}
          />

          <SectionTitle title="Governance & Risk" />

          <Select
            label="Regulatory Environment"
            name="regulatory"
            value={formData.regulatory}
            onChange={updateField}
            options={REGULATORY_OPTIONS}
            error={fieldErrors.regulatory?.[0]}
          />

          <Select
            label="PII / Data Sensitivity"
            name="piiLevel"
            value={formData.piiLevel}
            onChange={updateField}
            options={PII_LEVEL_OPTIONS}
            error={fieldErrors.piiLevel?.[0]}
          />

          <SectionTitle title="Internal Capability" />

          <Select
            label="Engineering Team Size"
            name="engineeringTeam"
            value={formData.engineeringTeam}
            onChange={updateField}
            options={ENGINEERING_TEAM_OPTIONS}
            error={fieldErrors.engineeringTeam?.[0]}
          />

          <Select
            label="AI / Systems Experience"
            name="aiExperience"
            value={formData.aiExperience}
            onChange={updateField}
            options={AI_EXPERIENCE_OPTIONS}
            error={fieldErrors.aiExperience?.[0]}
          />

          <SectionTitle title="Investment & Timeline" />

          <Select
            label="Budget Range"
            name="budgetRange"
            value={formData.budgetRange}
            onChange={updateField}
            options={BUDGET_RANGE_OPTIONS}
            error={fieldErrors.budgetRange?.[0]}
            required
          />

          <Select
            label="Timeline"
            name="timeline"
            value={formData.timeline}
            onChange={updateField}
            options={TIMELINE_OPTIONS}
            error={fieldErrors.timeline?.[0]}
          />

          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              autoComplete="off"
              tabIndex={-1}
              value={formData.website ?? ""}
              onChange={(e) => updateField("website", e.target.value)}
            />
          </div>

          {submitError ? (
            <div className="rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {submitError}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full bg-emerald-500 text-black py-4 rounded-full font-medium hover:bg-emerald-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Apply for Diagnostic Lab"}
          </button>
        </form>
      </div>
    </main>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-2xl font-semibold border-b border-neutral-800 pb-4">
      {title}
    </h2>
  );
}

type BaseFieldProps<K extends keyof DiagnosticInput> = {
  label: string;
  name: K;
  value: DiagnosticInput[K];
  onChange: (name: K, value: DiagnosticInput[K]) => void;
  error?: string;
  required?: boolean;
};

function Input<K extends keyof DiagnosticInput>({
  label,
  name,
  value,
  onChange,
  error,
  required,
  type = "text",
}: BaseFieldProps<K> & { type?: string }) {
  return (
    <div className="space-y-2">
      <label htmlFor={String(name)} className="text-sm text-neutral-400">
        {label}
        {required ? <span className="text-red-400"> *</span> : null}
      </label>

      <input
        id={String(name)}
        name={String(name)}
        type={type}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(name, e.target.value as DiagnosticInput[K])}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${String(name)}-error` : undefined}
        className={`w-full bg-neutral-900 border p-3 rounded-lg outline-none transition ${
          error
            ? "border-red-500 focus:border-red-400"
            : "border-neutral-800 focus:border-neutral-600"
        }`}
      />

      {error ? (
        <p id={`${String(name)}-error`} className="text-sm text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Textarea<K extends keyof DiagnosticInput>({
  label,
  name,
  value,
  onChange,
  error,
  required,
  rows = 5,
}: BaseFieldProps<K> & { rows?: number }) {
  return (
    <div className="space-y-2">
      <label htmlFor={String(name)} className="text-sm text-neutral-400">
        {label}
        {required ? <span className="text-red-400"> *</span> : null}
      </label>

      <textarea
        id={String(name)}
        name={String(name)}
        rows={rows}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(name, e.target.value as DiagnosticInput[K])}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${String(name)}-error` : undefined}
        className={`w-full bg-neutral-900 border p-3 rounded-lg outline-none transition ${
          error
            ? "border-red-500 focus:border-red-400"
            : "border-neutral-800 focus:border-neutral-600"
        }`}
      />

      {error ? (
        <p id={`${String(name)}-error`} className="text-sm text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Select<K extends keyof DiagnosticInput>({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required,
}: BaseFieldProps<K> & { options: readonly string[] }) {
  return (
    <div className="space-y-2">
      <label htmlFor={String(name)} className="text-sm text-neutral-400">
        {label}
        {required ? <span className="text-red-400"> *</span> : null}
      </label>

      <select
        id={String(name)}
        name={String(name)}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(name, e.target.value as DiagnosticInput[K])}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${String(name)}-error` : undefined}
        className={`w-full bg-neutral-900 border p-3 rounded-lg outline-none transition ${
          error
            ? "border-red-500 focus:border-red-400"
            : "border-neutral-800 focus:border-neutral-600"
        }`}
      >
        <option value="">{required ? "Select one" : "Select"}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error ? (
        <p id={`${String(name)}-error`} className="text-sm text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}