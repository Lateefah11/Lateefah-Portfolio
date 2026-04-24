"use client"

import Link from "next/link"

export default function ComingSoon() {
  return (
    <div style={{
      background: "#0D0D0D", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
    }}>
      <h1 style={{
        fontFamily: "var(--font-anton)",
        fontSize: "clamp(64px, 12vw, 160px)",
        lineHeight: 1, color: "#f9f9f9",
        letterSpacing: "-2px", textAlign: "center",
      }}>
        Coming Soon
      </h1>
      <Link href="/case-study/clubarant" style={{
        marginTop: "48px", fontFamily: "var(--font-geist-sans)",
        fontSize: "14px", color: "rgba(255,255,255,0.4)",
        textDecoration: "none", display: "flex", alignItems: "center", gap: "8px",
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back to project detail
      </Link>
    </div>
  )
}
