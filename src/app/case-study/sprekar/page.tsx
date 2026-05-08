"use client"

import Link from "next/link"

export default function SprekarCaseStudy() {
  return (
    <div style={{
      background: "#0D0D0D", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 20px",
    }}>

      {/* ── Back nav ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "24px 48px", display: "flex", alignItems: "center",
        background: "linear-gradient(to bottom, rgba(13,13,13,0.95) 0%, transparent 100%)",
      }}>
        <Link href="/" style={{
          color: "rgba(255,255,255,0.5)", textDecoration: "none",
          fontFamily: "var(--font-geist-sans)", fontSize: "14px",
          display: "flex", alignItems: "center", gap: "8px",
          transition: "color 0.2s",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </Link>
      </div>

      {/* ── Content ── */}
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <p style={{
          fontFamily: "'Iowan Old Style', Georgia, serif",
          fontSize: "18px", color: "#a4a4a4", fontStyle: "italic",
          marginBottom: "16px",
        }}>
          Mobile App · AI / Translation
        </p>
        <h1 style={{
          fontFamily: "var(--font-anton)",
          fontSize: "clamp(72px, 14vw, 140px)",
          lineHeight: 1, color: "#f9f9f9",
          letterSpacing: "-2px", marginBottom: "32px",
        }}>
          Sprekar
        </h1>
        <p style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "16px", lineHeight: "26px",
          color: "#c3c3c3", marginBottom: "48px",
        }}>
          The full case study is hosted on Notion. Click below to read the complete breakdown — research, process, and final designs.
        </p>

        <a
          href="https://www.notion.so/Sprekar-3591dfdc066a80328ef0c9a19c7846f9"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            fontFamily: "var(--font-anton)", fontSize: "20px",
            color: "#0D0D0D", background: "#f9f9f9",
            padding: "16px 36px", borderRadius: "100px",
            textDecoration: "none", letterSpacing: "0.5px",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Read Case Study
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

    </div>
  )
}
