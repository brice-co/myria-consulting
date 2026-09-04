type Props = { label: string; value: string; placeholder?: string; multiline?: boolean; onChange: (value: string) => void };

export function InquiryField({ label, value, placeholder, multiline, onChange }: Props) {
  const common = "mt-1.5 w-full rounded-xl border border-[#17313a]/10 bg-white/65 px-3 py-2.5 text-sm text-[#17313a] outline-none transition placeholder:text-[#9aa2a3] focus:border-[#5d8f88]/45 focus:bg-white";
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#788689]">{label}</span>
      {multiline ? (
        <textarea value={value} rows={5} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className={`${common} resize-none`} />
      ) : (
        <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className={common} />
      )}
    </label>
  );
}
