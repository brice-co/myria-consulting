import Link from "next/link";
import { guides } from "./_data/guides";

export default function GuidesPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f7f4ec", color: "#17343c", padding: "80px 7vw" }}>
      <p style={{ color: "#087876", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase" }}>Myria Guides</p>
      <h1 style={{ maxWidth: 850, fontFamily: "Georgia, serif", fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 400, lineHeight: 1 }}>
        Practical methods for turning complex problems into action.
      </h1>
      <div style={{ marginTop: 60, maxWidth: 760 }}>
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/resources/guides/${guide.slug}`} style={{ display: "block", padding: 32, border: "1px solid #dcd9d0", borderRadius: 22, color: "inherit", textDecoration: "none", background: "rgba(255,255,255,.5)" }}>
            <small>{guide.eyebrow} · {guide.readingTime}</small>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 34, fontWeight: 400 }}>{guide.title}</h2>
            <p style={{ color: "#617078", lineHeight: 1.65 }}>{guide.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
