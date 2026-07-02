"use client"

import { BackButton } from "@/components/ui/back-button"

export default function ComingSoon() {
  return (
    <div style={{
      background: "#0D0D0D", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
    }}>
      <h1 style={{
        fontFamily: "var(--font-anton)",
        fontSize: "clamp(30px, 4vw, 52px)",
        lineHeight: 1, color: "#f9f9f9",
        letterSpacing: "-2px", textAlign: "center",
      }}>
        Coming Soon
      </h1>
      <BackButton label="Back to project detail" fallbackHref="/case-study/chopbet" />
    </div>
  )
}
