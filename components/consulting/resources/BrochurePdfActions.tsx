import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Download, ExternalLink } from "lucide-react";

/**
 * Preserves the user's original Preview PDF / Download buttons.
 * Server-side presence check: no 404 probes, broken links, or client hydration.
 * When binaries are committed under public/brochures and redeployed, links
 * automatically become available on the next build.
 */
export function BrochurePdfActions({
  pdf,
  compact = false,
  locale = "en",
}: {
  pdf: string;
  compact?: boolean;
  locale?: "en" | "fr";
}) {
  if (!/^\/brochures\/[a-z0-9-]+\.pdf$/.test(pdf)) {
    return null;
  }

  const available = existsSync(join(process.cwd(), "public", pdf.slice(1)));

  if (!available) {
    return (
      <p className="mc-pdf-state">
        {locale === "fr" ? "La consultation et le téléchargement du PDF seront possibles lorsque le document sera publié." : "PDF preview and download will be available when the source document is published."}
      </p>
    );
  }

  return (
    <div className={compact ? "mc-pdf-actions mc-pdf-actions--compact" : "mc-pdf-actions"}>
      <a
        href={pdf}
        target="_blank"
        rel="noopener noreferrer"
        className="mc-pdf-button mc-pdf-button--primary"
      >
        <ExternalLink size={16} aria-hidden="true" /> {locale === "fr" ? "Consulter le PDF" : "Preview PDF"}
        <span className="sr-only">{locale === "fr" ? "(s’ouvre dans un nouvel onglet)" : "(opens in a new tab)"}</span>
      </a>
      <a href={pdf} download className="mc-pdf-button mc-pdf-button--secondary">
        <Download size={16} aria-hidden="true" /> {locale === "fr" ? "Télécharger" : "Download"}
      </a>
    </div>
  );
}
