"use client"

import Link from "next/link"

export default function TbilsCaseStudy() {
  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh", overflowX: "hidden", color: "#f9f9f9" }}>

      {/* ── Back nav ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "24px 48px", display: "flex", alignItems: "center",
        background: "linear-gradient(to bottom, rgba(13,13,13,0.9) 0%, transparent 100%)",
        pointerEvents: "none",
      }}>
        <Link href="/" style={{
          color: "rgba(255,255,255,0.5)", textDecoration: "none",
          fontFamily: "var(--font-geist-sans)", fontSize: "14px",
          display: "flex", alignItems: "center", gap: "8px",
          pointerEvents: "all",
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
      <section style={{ padding: "43px 135px 0", background: "#0D0D0D" }}>
        <p style={{
          fontFamily: "'Iowan Old Style', 'Georgia', serif",
          fontSize: "20px", lineHeight: "25px",
          color: "#bfbfbf", fontStyle: "italic",
        }}>
          Travel booking startup
        </p>
        <h1 style={{
          fontFamily: "var(--font-anton)",
          fontSize: "147px", lineHeight: "167px",
          color: "#f9f9f9", letterSpacing: "-1px",
        }}>
          Tbils
        </h1>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2: HERO MOCKUP — tbils-hero.png
      ══════════════════════════════════════════ */}
      <section style={{ background: "#0D0D0D", padding: "0 135px 60px" }}>
        <div style={{ width: "100%", borderRadius: "24px", overflow: "hidden" }}>
          <img
            src="/tbils-hero.png"
            alt="Tbils hero mockup"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3: META + OVERVIEW
      ══════════════════════════════════════════ */}
      <section style={{ background: "#0D0D0D", padding: "60px 135px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
        {/* Left: Meta */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {[
            { label: "Organization", value: "Tbils" },
            { label: "Sector",       value: "Travel" },
            { label: "Role",         value: "Product Designer" },
            { label: "Platform",     value: "Web and Mobile responsive" },
            { label: "Focus",        value: "UX, Information Architecture, User Flows" },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ fontFamily: "'Iowan Old Style', Georgia, serif", fontSize: "20px", lineHeight: "25px", color: "#a4a4a4", fontStyle: "italic" }}>{item.label}</p>
              <p style={{ fontFamily: "var(--font-anton)", fontSize: "24px", lineHeight: "34px", color: "#f9f9f9" }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Right: Overview */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h2 style={{ fontFamily: "var(--font-anton)", fontSize: "36px", lineHeight: "45px", color: "#f9f9f9" }}>
            Designing a Seamless Experience for Travel and Process Management
          </h2>
          <div style={{ fontFamily: "var(--font-geist-sans)", fontSize: "16px", color: "#c3c3c3" }}>
            <p style={{ lineHeight: "25px", marginBottom: "25px" }}>
              Tbils is a travel platform where users can search and book flights, check visa requirements, and submit visa applications — all in one place.
            </p>
            <p style={{ lineHeight: "25px" }}>
              The design focused on unifying a fragmented travel workflow, making it seamless to go from destination discovery to booking to visa submission without switching between tools or services.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
            <Link href="/case-study/tbils/coming-soon" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <span style={{ fontFamily: "var(--font-anton)", fontSize: "24px", lineHeight: "34px", color: "#ffac5f", textDecoration: "underline", whiteSpace: "nowrap" }}>Read Full Case Study</span>
              <span style={{ color: "#ffac5f", fontSize: "20px" }}>↗</span>
            </Link>
            <a href="https://www.tbils.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
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

        {/* Desktop web app */}
        <section style={{ width: "100%", background: "#1e1e1e", lineHeight: 0 }}>
          <img src="/tbils-desktop..png" alt="Tbils desktop app" style={{ width: "100%", height: "auto", display: "block" }} />
        </section>

        {/* Services grid */}
        <section style={{ width: "100%", background: "#1e1e1e", lineHeight: 0 }}>
          <img src="/tbils-services.png" alt="Tbils services" style={{ width: "100%", height: "auto", display: "block" }} />
        </section>

        {/* Mobile screens */}
        <section style={{ width: "100%", background: "#1e1e1e", lineHeight: 0 }}>
          <img src="/tbils-mobile-screens.png" alt="Tbils mobile screens" style={{ width: "100%", height: "auto", display: "block" }} />
        </section>

        {/* Moodboard / design system */}
        <section style={{ width: "100%", background: "#1e1e1e", lineHeight: 0 }}>
          <img src="/tbils-moodboard.png" alt="Tbils design system" style={{ width: "100%", height: "auto", display: "block" }} />
        </section>

        {/* Passport / visa */}
        <section style={{ width: "100%", background: "#1e1e1e", lineHeight: 0 }}>
          <img src="/tbils-passport.png" alt="Tbils visa application" style={{ width: "100%", height: "auto", display: "block" }} />
        </section>

        {/* Study abroad */}
        <section style={{ width: "100%", background: "#1e1e1e", lineHeight: 0 }}>
          <img src="/tbils-visa.png" alt="Tbils study abroad visa" style={{ width: "100%", height: "auto", display: "block" }} />
        </section>

      </div>

      {/* ══════════════════════════════════════════
          SEE OTHER PROJECTS
      ══════════════════════════════════════════ */}
      <section style={{ background: "#0D0D0D", padding: "100px 135px 80px" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {[
            { title: "Sprekar",   tag: "Web App · AI / Translation", image: "/sprekar-mockup.png",   href: "/case-study/sprekar" },
            { title: "Chopwin",   tag: "Mobile App · Gaming",         image: "/chopbet-mockup.png",   href: "/case-study/chopbet" },
            { title: "Bricklage", tag: "Web App · Real Estate",        image: "/Buyers dashboard/Bricklage mockup.png", href: "/case-study/clubarant" },
          ].map((project) => (
            <OtherProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

    </div>
  )
}

function OtherProjectCard({ title, tag, image, href }: {
  title: string; tag: string; image: string; href: string
}) {
  return (
    <a href={href} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{
        width: "100%", aspectRatio: "16/9",
        background: "#141414", borderRadius: "12px",
        overflow: "hidden", position: "relative",
      }}
        onMouseEnter={(e) => {
          const img = e.currentTarget.querySelector("img") as HTMLImageElement
          if (img) img.style.transform = "scale(1.05)"
          const overlay = e.currentTarget.querySelector(".overlay") as HTMLElement
          if (overlay) overlay.style.opacity = "1"
        }}
        onMouseLeave={(e) => {
          const img = e.currentTarget.querySelector("img") as HTMLImageElement
          if (img) img.style.transform = "scale(1)"
          const overlay = e.currentTarget.querySelector(".overlay") as HTMLElement
          if (overlay) overlay.style.opacity = "0"
        }}
      >
        <img src={image} alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }}
        />
        <div className="overlay" style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
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
