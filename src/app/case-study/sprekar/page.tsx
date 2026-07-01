"use client"

export default function SprekarCaseStudy() {
  return (
    <div style={{
      background: "#0D0D0D", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 20px", position: "relative",
    }}>

      {/* ── Mockup image ── */}
      <img
        src="/sprekar-mockup.png"
        alt="Sprekar"
        style={{
          width: "100%", maxWidth: "680px",
          height: "auto", display: "block",
          marginBottom: "48px", borderRadius: "16px",
          opacity: 0.9,
        }}
      />

      {/* ── Title + CTA ── */}
      <h1 style={{
        fontFamily: "var(--font-anton)",
        fontSize: "clamp(30px, 4vw, 52px)",
        lineHeight: 1, color: "#f9f9f9",
        letterSpacing: "-2px", textAlign: "center",
        marginBottom: "20px",
      }}>
        Sprekar
      </h1>

      <p style={{
        fontFamily: "var(--font-geist-sans)",
        fontSize: "15px", color: "#888",
        textAlign: "center", marginBottom: "40px",
      }}>
        Full case study hosted on Notion
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <a
          href="https://www.notion.so/Sprekar-3591dfdc066a80328ef0c9a19c7846f9?source=copy_link"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            fontFamily: "var(--font-anton)", fontSize: "18px", letterSpacing: "0.5px",
            color: "#0D0D0D", background: "#f9f9f9",
            padding: "14px 32px", borderRadius: "100px",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Read Case Study
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>

        <a
          href="https://sprekar.com/en"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            fontFamily: "var(--font-anton)", fontSize: "18px", letterSpacing: "0.5px",
            color: "#f9f9f9", background: "transparent",
            padding: "14px 32px", borderRadius: "100px",
            textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.25)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
        >
          Visit Site
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

    </div>
  )
}
