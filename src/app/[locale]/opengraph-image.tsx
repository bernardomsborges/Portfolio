import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { defaultLocale, hasLocale } from "@/i18n/config";

export const alt = `${profile.firstName} ${profile.lastName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = hasLocale(raw) ? raw : defaultLocale;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(180deg, #d4d4d4 0%, #bdbdbd 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          alignItems: "center",
          gap: 12,
          background: "#fff",
          borderRadius: 999,
          padding: "10px 22px",
          fontSize: 26,
          color: "#1f1f1f",
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 999, background: "#22c55e" }} />
        {profile.role[locale]}
      </div>
      <div style={{ display: "flex", flexDirection: "column", color: "#1f1f1f" }}>
        <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: 4, lineHeight: 1 }}>
          {profile.firstName.toUpperCase()}
        </div>
        <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: 4, lineHeight: 1 }}>
          {profile.lastName.toUpperCase()}
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: "#3f3f3f" }}>
          {profile.tagline[locale]}
        </div>
      </div>
    </div>,
    size,
  );
}
