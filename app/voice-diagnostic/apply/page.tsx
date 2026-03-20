"use client";

import { useState } from "react";

export default function VoiceDiagnosticApplication() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<any>({
    companyName: "",
    email: "",
    industry: "",
    orgSize: "",
    contactTitle: "",
    useCase: "",
    channel: "",
    monthlyInteractions: "",
    concurrentSessions: "",
    infrastructure: "",
    realtimeInfra: "",
    regulatory: "",
    piiLevel: "",
    engineeringTeam: "",
    realtimeExperience: "",
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
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-semibold mb-4">
            Application Received
          </h1>
          <p className="text-neutral-400">
            Our team will review your submission within 2–3 business days.
            If aligned, you will receive a scheduling link for the diagnostic session.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold mb-6">
            Voice Architecture Diagnostic Application
          </h1>
          <p className="text-neutral-400">
            This diagnostic is designed for organizations preparing to evaluate
            or deploy realtime Voice AI infrastructure.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);

            try {
              const res = await fetch("/api/voice-diagnostic", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              });

              if (!res.ok) {
                throw new Error("Submission failed");
              }

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

          {/* SECTION 1 */}
          <SectionTitle title="Organization Profile" />

          <Input label="Company Name" name="companyName" required updateField={updateField} />
          <Input label="Primary Contact Email" name="email" type="email" required updateField={updateField} />
          <Input label="Industry" name="industry" updateField={updateField} />
          <Input label="Organization Size (Employees)" name="orgSize" updateField={updateField} />
          <Input label="Primary Contact Title" name="contactTitle" updateField={updateField} />

          {/* SECTION 2 */}
          <SectionTitle title="Voice AI Use Case" />

          <Textarea label="Describe your intended Voice AI use case" name="useCase" required updateField={updateField} />

          <Select label="Primary Channel" name="channel" updateField={updateField} options={[
            "Web Browser Voice",
            "Telephony (SIP / PSTN)",
            "Mobile Application",
            "Internal Operations",
            "Multichannel Deployment"
          ]} />

          <Input label="Estimated Monthly Voice Interactions" name="monthlyInteractions" updateField={updateField} />
          <Input label="Expected Peak Concurrent Sessions" name="concurrentSessions" updateField={updateField} />

          {/* SECTION 3 */}
          <SectionTitle title="Current Technical Environment" />

          <Textarea label="Infrastructure Stack" name="infrastructure" updateField={updateField} />

          <Select label="Existing Realtime Infrastructure" name="realtimeInfra" updateField={updateField} options={[
            "None",
            "WebSocket only",
            "WebRTC experience",
            "Telephony integration in place",
            "Event-driven architecture implemented"
          ]} />

          {/* SECTION 4 */}
          <SectionTitle title="Governance & Compliance" />

          <Select label="Regulatory Environment" name="regulatory" updateField={updateField} options={[
            "None",
            "GDPR considerations",
            "HIPAA exposure",
            "SOC 2 required",
            "Multiple regulatory constraints"
          ]} />

          <Select label="PII Sensitivity Level" name="piiLevel" updateField={updateField} options={[
            "Low",
            "Moderate",
            "High"
          ]} />

          {/* SECTION 5 */}
          <SectionTitle title="Internal Capability" />

          <Select label="Engineering Team" name="engineeringTeam" updateField={updateField} options={[
            "None",
            "<10",
            "10–50",
            "Enterprise"
          ]} />

          <Select label="Realtime Experience" name="realtimeExperience" updateField={updateField} options={[
            "None",
            "Limited",
            "WebSocket",
            "WebRTC"
          ]} />

          {/* SECTION 6 */}
          <SectionTitle title="Investment & Timeline" />

          <Select label="Budget Range" name="budgetRange" required updateField={updateField} options={[
            "<50k",
            "50k–150k",
            "150k–500k",
            "500k+"
          ]} />

          <Select label="Timeline" name="timeline" updateField={updateField} options={[
            "3–6 months",
            "1–3 months",
            "Immediate"
          ]} />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-chart-1 py-4 rounded-full font-medium"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>
      </div>
    </main>
  );
}

/* ---------- Components ---------- */

function SectionTitle({ title }: { title: string }) {
  return <h2 className="text-2xl font-semibold border-b border-neutral-800 pb-4">{title}</h2>;
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
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}