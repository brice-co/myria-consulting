"use client";

type Props = {
  name: string;
  email: string;
  company: string;
  role: string;
  onChange: (field: "name" | "email" | "company" | "role", value: string) => void;
};

export function ParticipantFields({ name, email, company, role, onChange }: Props) {
  const fields = [
    { key: "name", label: "Full name", value: name, type: "text" },
    { key: "email", label: "Business email", value: email, type: "email" },
    { key: "company", label: "Company", value: company, type: "text" },
    { key: "role", label: "Professional role", value: role, type: "text" },
  ] as const;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {fields.map((field) => (
        <label key={field.key} className="block text-sm font-semibold text-[#12313a]">
          {field.label}
          <input
            required
            type={field.type}
            value={field.value}
            maxLength={field.key === "email" ? 254 : 120}
            onChange={(event) => onChange(field.key, event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#ded8cb] px-4 py-3"
          />
        </label>
      ))}
    </div>
  );
}
