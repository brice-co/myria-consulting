import { ImageResponse } from "next/og";

export const alt = "Myria Consulting — Management Advisory & Intelligent Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** A locally generated, brand-consistent social preview without external assets. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#142b35",
          color: "#f7f4ee",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 76,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: 21, fontWeight: 600, letterSpacing: 4 }}>
            MYRIA CONSULTING
          </span>
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: 15, color: "#e6c49e", marginTop: 15, letterSpacing: 3 }}>
            MANAGEMENT ADVISORY / INTELLIGENT SYSTEMS
          </span>
        </div>
        <div style={{ fontSize: 75, lineHeight: 1.08, letterSpacing: -2 }}>
          Better decisions.
          <br />
          <span style={{ color: "#e5c29f" }}>Stronger execution.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Arial, sans-serif", fontSize: 18 }}>
          <span>Think deeper. Organize intelligently. Improve continuously.</span>
          <span>myriaconsulting.com</span>
        </div>
      </div>
    ),
    size,
  );
}
