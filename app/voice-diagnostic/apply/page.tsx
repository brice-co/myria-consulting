"use client";

import { useState } from "react";

export default function AIArchitectureDiagnosticLab() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<any>({
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
    budgetRange: "",
    timeline: "",
  });

  function updateField(name: string, value: string) {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
        <div className="max-w-xl text-center space-y-6">
          <h1 className="text-3xl font-semibold">
            Application Received
          </h1>
          <p className="text-neutral-400">
            Your submission is under review.
            We assess fit based on system complexity, readiness, and alignment.
          </p>
          <p className="text-neutral-500 text-sm">
            If selected, you will receive an invitation to the AI Architecture Diagnostic Lab.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-3xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl font-semibold">
            AI Architecture Diagnostic Lab
          </h1>

          <p className="text-neutral-400 max-w-2xl mx-auto">
            A structured assessment for organizations building or scaling AI systems.
            We evaluate architecture, governance, and operational readiness — before costly decisions are made.
          </p>

          <p className="text-neutral-500 text-sm max-w-xl mx-auto">
            This is not a generic workshop.  
            It is a selective diagnostic designed for teams serious about deploying AI systems in production.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);

            try {
              const res = await fetch("/api/ai-architecture-diagnostic", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              });

              if (!res.ok) throw new Error("Submission failed");

              setSubmitted(true);
            } catch (err) {
              console.error(err);
              alert("Something went wrong. Please try again.");
            } finally {
              setLoading(false);
            }
          }}
          className="space-y-12"
        >

          {/* ORGANIZATION */}
          <SectionTitle title="Organization Profile" />

          <Input label="Company Name" name="companyName" required updateField={updateField} />
          <Input label="Primary Contact Email" name="email" type="email" required updateField={updateField} />
          <Input label="Industry" name="industry" updateField={updateField} />
          <Input label="Organization Size" name="orgSize" updateField={updateField} />
          <Input label="Primary Contact Role" name="contactTitle" updateField={updateField} />

          {/* AI SYSTEM */}
          <SectionTitle title="AI System Context" />

          <Textarea
            label="What are you trying to build or improve with AI?"
            name="useCase"
            required
            updateField={updateField}
          />

          <Select
            label="Scope of AI Initiative"
            name="aiScope"
            updateField={updateField}
            options={[
              "Single workflow automation",
              "Customer-facing system",
              "Internal operations",
              "Multi-agent system",
              "Enterprise-wide platform",
            ]}
          />

          <Input label="Estimated Users or Interactions per Month" name="users" updateField={updateField} />

          <Textarea
            label="Core Systems Involved (CRM, APIs, Data Sources)"
            name="systems"
            updateField={updateField}
          />

          {/* ARCHITECTURE */}
          <SectionTitle title="Architecture & Infrastructure" />

          <Textarea
            label="Current Infrastructure Stack"
            name="infrastructure"
            updateField={updateField}
          />

          <Select
            label="Architecture Maturity"
            name="architectureMaturity"
            updateField={updateField}
            options={[
              "No formal architecture",
              "Prototype / MVP",
              "Partially structured",
              "Production system",
              "Scaled multi-system environment",
            ]}
          />

          {/* GOVERNANCE */}
          <SectionTitle title="Governance & Risk" />

          <Select
            label="Regulatory Environment"
            name="regulatory"
            updateField={updateField}
            options={[
              "None",
              "GDPR",
              "HIPAA",
              "SOC2",
              "Multiple regulatory constraints",
            ]}
          />

          <Select
            label="PII / Data Sensitivity"
            name="piiLevel"
            updateField={updateField}
            options={[
              "Low",
              "Moderate",
              "High",
            ]}
          />

          {/* CAPABILITY */}
          <SectionTitle title="Internal Capability" />

          <Select
            label="Engineering Team Size"
            name="engineeringTeam"
            updateField={updateField}
            options={[
              "None",
              "<10",
              "10–50",
              "50+",
            ]}
          />

          <Select
            label="AI / Systems Experience"
            name="aiExperience"
            updateField={updateField}
            options={[
              "None",
              "Early experimentation",
              "Some production experience",
              "Advanced systems experience",
            ]}
          />

          {/* INVESTMENT */}
          <SectionTitle title="Investment & Timeline" />

          <Select
            label="Budget Range"
            name="budgetRange"
            required
            updateField={updateField}
            options={[
              "<50k",
              "50k–150k",
              "150k–500k",
              "500k+",
            ]}
          />

          <Select
            label="Timeline"
            name="timeline"
            updateField={updateField}
            options={[
              "Immediate",
              "1–3 months",
              "3–6 months",
              "Exploration phase",
            ]}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 text-black py-4 rounded-full font-medium hover:bg-emerald-400 transition"
          >
            {loading ? "Submitting..." : "Apply for Diagnostic Lab"}
          </button>
        </form>
      </div>
    </main>
  );
}

/* ---------- Components ---------- */

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-2xl font-semibold border-b border-neutral-800 pb-4">
      {title}
    </h2>
  );
}

function Input({ label, name, updateField, ...props }: any) {
  return (
    <div>
      <label className="text-sm text-neutral-400">{label}</label>
      <input
        {...props}
        onChange={(e) => updateField(name, e.target.value)}
        className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-lg"
      />
    </div>
  );
}

function Textarea({ label, name, updateField, ...props }: any) {
  return (
    <div>
      <label className="text-sm text-neutral-400">{label}</label>
      <textarea
        {...props}
        onChange={(e) => updateField(name, e.target.value)}
        className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-lg"
      />
    </div>
  );
}

function Select({ label, name, options, updateField, ...props }: any) {
  return (
    <div>
      <label className="text-sm text-neutral-400">{label}</label>
      <select
        {...props}
        onChange={(e) => updateField(name, e.target.value)}
        className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-lg"
      >
        <option value="">Select</option>
        {options.map((o: string) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}