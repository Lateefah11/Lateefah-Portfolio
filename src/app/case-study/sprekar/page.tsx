"use client"

import Link from "next/link"

export default function SprekarCaseStudy() {
  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh", overflowX: "hidden", color: "#f9f9f9" }}>

      {/* ── Back nav ── */}
      <div className="cs-back-nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "24px 48px", display: "flex", alignItems: "center",
        background: "linear-gradient(to bottom, rgba(13,13,13,0.9) 0%, transparent 100%)",
        pointerEvents: "none",
      }}>
        <Link href="/" style={{
          color: "rgba(255,255,255,0.5)", textDecoration: "none",
          fontFamily: "var(--font-geist-sans)", fontSize: "14px",
          display: "flex", alignItems: "center", gap: "8px",
          pointerEvents: "all", transition: "opacity 0.2s",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </Link>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1: HERO
      ══════════════════════════════════════════ */}
      <section className="cs-hero" style={{ padding: "43px 135px 0", background: "#0D0D0D" }}>
        <p style={{
          fontFamily: "'Iowan Old Style', 'Georgia', serif",
          fontSize: "20px", lineHeight: "25px",
          color: "#bfbfbf", fontStyle: "italic",
        }}>
          AI for Real-Time Translations
        </p>
        <h1 style={{
          fontFamily: "var(--font-anton)",
          fontSize: "147px", lineHeight: "167px",
          color: "#f9f9f9", letterSpacing: "-1px",
        }}>
          Sprekar
        </h1>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2: HERO MOCKUP
      ══════════════════════════════════════════ */}
      <section className="cs-mockup" style={{ background: "#0D0D0D", padding: "0 135px 60px" }}>
        <div style={{ width: "100%", borderRadius: "24px", overflow: "hidden" }}>
          <img
            src="/header.png"
            alt="Sprekar hero mockup"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3: META + OVERVIEW
      ══════════════════════════════════════════ */}
      <section className="cs-meta" style={{
        background: "#0D0D0D", padding: "60px 135px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {[
            { label: "Organization", value: "Craysoft" },
            { label: "Sector",       value: "AI translation" },
            { label: "Role",         value: "Lead designer" },
            { label: "Platform",     value: "Mobile app" },
            { label: "Focus",        value: "Communication, UX, Interaction Design" },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ fontFamily: "'Iowan Old Style', Georgia, serif", fontSize: "20px", lineHeight: "25px", color: "#a4a4a4", fontStyle: "italic" }}>{item.label}</p>
              <p style={{ fontFamily: "var(--font-anton)", fontSize: "24px", lineHeight: "34px", color: "#f9f9f9" }}>{item.value}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h2 style={{ fontFamily: "var(--font-anton)", fontSize: "36px", lineHeight: "45px", color: "#f9f9f9" }}>
            Designing a More Human Way to Communicate Digitally
          </h2>
          <div style={{ fontFamily: "var(--font-geist-sans)", fontSize: "16px", color: "#c3c3c3" }}>
            <p style={{ lineHeight: "25px", marginBottom: "25px" }}>
              Sprekar is a digital communication platform designed to help users express themselves more clearly, confidently, and authentically in online conversations.
            </p>
            <p style={{ lineHeight: "25px" }}>
              In a world where communication is fast but often misunderstood, Sprekar focuses on bridging the gap between intention and expression — making conversations feel more natural, structured, and meaningful.
            </p>
          </div>
          <div className="cs-links" style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
            <Link href="/case-study/sprekar/coming-soon" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <span style={{ fontFamily: "var(--font-anton)", fontSize: "24px", lineHeight: "34px", color: "#ffac5f", textDecoration: "underline", whiteSpace: "nowrap" }}>Read Full Case Study</span>
              <span style={{ color: "#ffac5f", fontSize: "20px" }}>↗</span>
            </Link>
            <a href="https://sprekar.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <span style={{ fontFamily: "var(--font-anton)", fontSize: "24px", lineHeight: "34px", color: "#ffac5f", textDecoration: "underline", whiteSpace: "nowrap" }}>Live website</span>
              <span style={{ color: "#ffac5f", fontSize: "20px" }}>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          IMAGE SECTIONS — full width, 16px gaps
      ══════════════════════════════════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

        <section style={{ width: "100%", background: "#1e1e1e", lineHeight: 0 }}>
          <img src="/mobile mockup.png" alt="Sprekar app in hand" style={{ width: "100%", height: "auto", display: "block" }} />
        </section>

        <section style={{ width: "100%", background: "#1e1e1e", lineHeight: 0 }}>
          <img src="/Tab mockup.png" alt="Sprekar tablet" style={{ width: "100%", height: "auto", display: "block" }} />
        </section>

        <section style={{ width: "100%", background: "#1e1e1e", lineHeight: 0 }}>
          <img src="/desktop lander.png" alt="Sprekar desktop" style={{ width: "100%", height: "auto", display: "block" }} />
        </section>

        <section style={{ width: "100%", background: "#1e1e1e", lineHeight: 0 }}>
          <img src="/admin sign up.png" alt="Sprekar sign up" style={{ width: "100%", height: "auto", display: "block" }} />
        </section>

        <section style={{ width: "100%", background: "#1e1e1e", lineHeight: 0 }}>
          <img src="/mobile screens.png" alt="Sprekar mobile screens" style={{ width: "100%", height: "auto", display: "block" }} />
        </section>

        <section style={{ width: "100%", background: "#1e1e1e", lineHeight: 0 }}>
          <img src="/mobile.png" alt="Sprekar conversation" style={{ width: "100%", height: "auto", display: "block" }} />
        </section>

        <section style={{ width: "100%", background: "#1e1e1e", lineHeight: 0 }}>
          <img src="/Frame 1686566171.png" alt="Sprekar moodboard" style={{ width: "100%", height: "auto", display: "block" }} />
        </section>

        <section style={{ width: "100%", background: "#1e1e1e", lineHeight: 0 }}>
          <img src="/admin pages.png" alt="Sprekar dashboard" style={{ width: "100%", height: "auto", display: "block" }} />
        </section>

      </div>

      {/* ══════════════════════════════════════════
          SEE OTHER PROJECTS
      ══════════════════════════════════════════ */}
      <section className="cs-other" style={{ background: "#0D0D0D", padding: "100px 135px 80px" }}>
        <p style={{
          fontFamily: "'Iowan Old Style', Georgia, serif",
          fontSize: "20px", lineHeight: "25px",
          color: "#a4a4a4", fontStyle: "italic", marginBottom: "12px",
        }}>
          Explore more work
        </p>
        <h2 style={{
          fontFamily: "var(--font-anton)",
          fontSize: "clamp(40px, 6vw, 80px)",
          lineHeight: 1, color: "#f9f9f9",
          letterSpacing: "-1px", marginBottom: "60px",
        }}>
          Other Projects
        </h2>
        <div className="cs-other-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {[
            { title: "Chopwin",   tag: "Mobile App · Gaming",        image: "/chopbet-mockup.png",                      href: "/case-study/chopbet" },
            { title: "Tbils",     tag: "Web App · Travel & Visa",    image: "/tbils-mockup.png",                        href: "/case-study/tbils" },
            { title: "Bricklage", tag: "Web App · Real Estate",      image: "/Buyers dashboard/Bricklage mockup.png",   href: "/case-study/clubarant" },
          ].map((p) => <OtherProjectCard key={p.title} {...p} />)}
        </div>
      </section>

    </div>
  )
}

function OtherProjectCard({ title, tag, image, href }: { title: string; tag: string; image: string; href: string }) {
  return (
    <a href={href} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ width: "100%", aspectRatio: "16/9", background: "#141414", borderRadius: "12px", overflow: "hidden", position: "relative" }}
        onMouseEnter={(e) => {
          const img = e.currentTarget.querySelector("img") as HTMLImageElement
          if (img) img.style.transform = "scale(1.05)"
          const ov = e.currentTarget.querySelector(".overlay") as HTMLElement
          if (ov) ov.style.opacity = "1"
        }}
        onMouseLeave={(e) => {
          const img = e.currentTarget.querySelector("img") as HTMLImageElement
          if (img) img.style.transform = "scale(1)"
          const ov = e.currentTarget.querySelector(".overlay") as HTMLElement
          if (ov) ov.style.opacity = "0"
        }}
      >
        <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }} />
        <div className="overlay" style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0, transition: "opacity 0.4s ease",
        }}>
          <span style={{ fontFamily: "var(--font-anton)", fontSize: "clamp(18px, 2.5vw, 32px)", color: "white" }}>View Project</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
        <span style={{ fontFamily: "var(--font-anton)", fontSize: "24px", color: "#f9f9f9" }}>{title}</span>
        <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "right" }}>{tag}</span>
      </div>
    </a>
  )
}
