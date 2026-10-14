import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.promise;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f5f0e6", padding: 72, color: "#17171c" }}>
        <div style={{ fontSize: 34, fontWeight: 800 }}>Panier Perdu</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>{site.promise}</div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#625d56" }}>2 relances écrites pour toi · le compteur des euros récupérés</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} style={{ width: 96, height: 28, borderRadius: 4, background: i < 3 ? "#17171c" : "transparent", border: i < 3 ? "none" : "4px dashed #c73d18" }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
