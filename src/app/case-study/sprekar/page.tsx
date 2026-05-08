"use client"

import Link from "next/link"

export default function SprekarCaseStudy() {
  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── Back nav ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "linear-gradient(to bottom, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.7) 100%)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      }}>
        <Link href="/" style={{
          color: "rgba(255,255,255,0.6)", textDecoration: "none",
          fontFamily: "var(--font-geist-sans)", fontSize: "14px",
          display: "flex", alignItems: "center", gap: "8px",
          transition: "color 0.2s",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </Link>
        <a
          href="https://www.notion.so/Sprekar-3591dfdc066a80328ef0c9a19c7846f9"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "rgba(255,255,255,0.5)", textDecoration: "none",
            fontFamily: "var(--font-geist-sans)", fontSize: "13px",
            display: "flex", alignItems: "center", gap: "6px",
          }}
        >
          Open in Notion
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      {/* ── Notion embed ── */}
      <iframe
        src="https://www.notion.so/Sprekar-3591dfdc066a80328ef0c9a19c7846f9"
        style={{
          flex: 1,
          width: "100%",
          height: "100vh",
          border: "none",
          marginTop: "60px",
          background: "#fff",
        }}
        title="Sprekar Case Study"
      />

    </div>
  )
}
