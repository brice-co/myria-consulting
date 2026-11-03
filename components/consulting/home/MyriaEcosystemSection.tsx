const sites = [
  {
    "id": "consulting",
    "title": "Myria Consulting",
    "label": "ADVISORY",
    "url": "https://myriaconsulting.com/",
    "description": "Management advisory, business transformation, and operational performance."
  },
  {
    "id": "systems",
    "title": "Myria Intelligent Systems",
    "label": "INTELLIGENT SYSTEMS",
    "url": "https://systems.myriaconsulting.com/",
    "description": "Collaborative workspaces, AI advisors, integrated workflows, and operational execution."
  },
  {
    "id": "chat",
    "title": "MyriaChat",
    "label": "VOICE AI",
    "url": "https://myriachat.com/",
    "description": "Real-time conversational AI connecting people, information, and business workflows."
  }
] as const;

export function MyriaEcosystemSection() {
  return (
    <section id="ecosystem" aria-labelledby="myria-ecosystem-title" className="bg-[#f0ece3] px-6 py-20 text-[#173039]">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#667a78]">The Myria ecosystem</p>
        <h2 id="myria-ecosystem-title" className="font-serif text-4xl leading-tight md:text-5xl">Three disciplines. <em>One connected ecosystem.</em></h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-[#435a5c]">Distinct capabilities connecting business strategy, intelligent execution, and human interaction.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {sites.map((site, index) => {
            const current = site.id === "consulting";
            const body = <><span className="text-xs font-semibold tracking-[0.12em] text-[#667a78]">{String(index + 1).padStart(2, "0")} / {site.label}</span><h3 className="mt-5 font-serif text-2xl">{site.title}</h3><p className="mt-4 text-sm leading-7 text-[#435a5c]">{site.description}</p><span className="mt-auto pt-6 text-xs font-semibold tracking-wide">{current ? "CURRENT SITE" : "EXPLORE ↗"}</span></>;
            return current ? <div key={site.id} aria-current="location" className="flex min-h-60 flex-col rounded-xl border border-[#a87532] bg-[#f7f4ee] p-6">{body}</div> : <a key={site.id} href={site.url} className="flex min-h-60 flex-col rounded-xl border border-[#d0c8ba] p-6 transition-colors hover:bg-[#f7f4ee] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173039]">{body}</a>;
          })}
        </div>
      </div>
    </section>
  );
}
