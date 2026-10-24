"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink } from "lucide-react";

type PdfStatus = "checking" | "available" | "unavailable";

/**
 * Restore the supplied brochure's Preview PDF and Download actions.
 * Do not send visitors to a missing file before the binary asset is deployed.
 */
export function BrochurePdfActions({
  pdf,
  compact = false,
}: {
  pdf: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<PdfStatus>("checking");

  useEffect(() => {
    let active = true;
    fetch(pdf, { method: "HEAD", cache: "no-store" })
      .then((response) => {
        if (active) {
          const mime = response.headers.get("content-type") ?? "";
          setStatus(response.ok && mime.includes("pdf") ? "available" : "unavailable");
        }
      })
      .catch(() => { if (active) setStatus("unavailable"); });

    return () => { active = false; };
  }, [pdf]);

  if (status !== "available") {
    return (
      <div className="mc-pdf-state" role="status" aria-live="polite">
        {status === "checking" ? "Checking document availability…" : "PDF preview and download will be available when the document is uploaded."}
      </div>
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
        <ExternalLink size={16} aria-hidden="true" /> Preview PDF
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      <a
        href={pdf}
        download
        className="mc-pdf-button mc-pdf-button--secondary"
      >
        <Download size={16} aria-hidden="true" /> Download
      </a>
    </div>
  );
}
