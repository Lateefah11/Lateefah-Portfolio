"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, User, Wrench } from "lucide-react"

export const SIDEBAR_WIDTH = 264

const navLinks = [
  { label: "Home", href: "/", Icon: Home, sectionId: "home" },
  { label: "Works", href: "/all-projects", Icon: Briefcase, sectionId: null },
  { label: "About", href: "/#about", Icon: User, sectionId: "about" },
  { label: "Tools", href: "/#technologies", Icon: Wrench, sectionId: "technologies" },
]

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26C2.167 6.443 6.601 2.01 12.053 2.01c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.463 3.488A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 6 10-6" />
    </svg>
  )
}

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lateefah-abdulrahman-634571348", Icon: LinkedInIcon },
  { label: "WhatsApp", href: "https://wa.link/2wa261", Icon: WhatsAppIcon },
  { label: "Email", href: "mailto:lateefahabdulrahman111@gmail.com", Icon: MailIcon },
]

const RESUME_URL = "https://docs.google.com/document/d/1Ou4iep9L-jh0QKcEXkNbW6BL90sfhX7DJf9YCj8RmYQ/edit?usp=sharing"

export function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  useEffect(() => {
    if (pathname !== "/") return
    const ids = navLinks.map(l => l.sectionId).filter((id): id is string => !!id)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )
    const els = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  const isActive = (link: (typeof navLinks)[number]) => {
    if (link.href === "/all-projects") return pathname === "/all-projects"
    if (pathname !== "/") return false
    return activeSection === link.sectionId
  }

  return (
    <>
      {/* ── Desktop persistent sidebar ── */}
      <aside
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-40 flex-col"
        style={{
          width: `${SIDEBAR_WIDTH}px`,
          background: "#0A0A0A",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          padding: "36px 32px",
        }}
      >
        <Link href="/" className="no-underline flex items-center gap-3 mb-10">
          <div
            className="relative overflow-hidden shrink-0 rounded-[10px]"
            style={{ width: "44px", height: "44px", background: "#181818" }}
          >
            <img
              src="/lateefah-profile.jpg"
              alt="Lateefah"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "50% 18%" }}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span style={{ fontFamily: "var(--font-anton)", fontSize: "17px", color: "#f9f9f9" }}>
              Lateefah
            </span>
            <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
              Product Designer
            </span>
          </div>
        </Link>

        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = isActive(link)
            return (
              <a
                key={link.label}
                href={link.href}
                className="no-underline flex items-center gap-3 transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "15px",
                  color: active ? "#f9f9f9" : "rgba(255,255,255,0.55)",
                  background: active ? "rgba(255,255,255,0.08)" : "transparent",
                  padding: "8px 12px",
                  margin: "0 -12px",
                  borderRadius: "10px",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#f9f9f9" }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.55)" }}
              >
                <link.Icon size={17} strokeWidth={1.75} />
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="mt-auto pt-8 flex flex-col gap-5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer no-underline inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{ background: "#fff", color: "#111", fontFamily: "var(--font-geist-sans)", fontSize: "14px", fontWeight: 600, padding: "11px 0", borderRadius: "10px" }}
          >
            My Resume
          </a>
          <div className="flex items-center gap-5">
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                <s.Icon />
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Mobile top bar (sticky, in-flow — no manual offset needed) ── */}
      <div
        className="md:hidden sticky top-0 z-40 flex items-center justify-between px-5"
        style={{ height: "60px", background: "rgba(10,10,10,0.85)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Link href="/" className="no-underline" style={{ fontFamily: "var(--font-anton)", fontSize: "20px", color: "#f9f9f9" }}>
          TEE
        </Link>
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="flex items-center justify-center rounded-full bg-white border-0 cursor-pointer"
          style={{ width: "40px", height: "40px" }}
        >
          <svg width="16" height="11" viewBox="0 0 18 12" fill="none">
            <rect x="0" y="0" width="18" height="2" rx="1" fill="#111" />
            <rect x="0" y="10" width="18" height="2" rx="1" fill="#111" />
          </svg>
        </button>
      </div>

      {/* ── Mobile drawer backdrop ── */}
      <div
        className="md:hidden fixed inset-0 z-[60] transition-all duration-400"
        style={{
          background: "rgba(0,0,0,0.55)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          backdropFilter: menuOpen ? "blur(4px)" : "blur(0px)",
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* ── Mobile drawer panel ── */}
      <div
        className="md:hidden fixed top-0 right-0 bottom-0 z-[70] flex flex-col"
        style={{
          width: "min(420px, 90vw)",
          background: "#0A0A0A",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 420ms cubic-bezier(0.25,0.46,0.45,0.94)",
          padding: "clamp(28px,5vw,48px)",
        }}
      >
        <div className="flex justify-end mb-12">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center rounded-full bg-white cursor-pointer border-0 transition-opacity hover:opacity-80"
            style={{ width: "52px", height: "52px" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="#111" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="mb-6 tracking-[0.16em] uppercase" style={{ fontFamily: "var(--font-geist-sans)", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
          Navigation
        </p>
        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "32px" }} />

        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="no-underline group flex items-center gap-3 transition-colors duration-200"
              style={{ fontFamily: "var(--font-anton)", fontSize: "clamp(30px, 6vw, 48px)", lineHeight: 1.15, color: "rgba(255,255,255,0.85)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto pt-8 flex flex-col gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer no-underline inline-flex items-center justify-center gap-2"
            style={{ background: "#fff", color: "#111", fontFamily: "var(--font-geist-sans)", fontSize: "14px", fontWeight: 600, padding: "12px 0", borderRadius: "10px" }}
          >
            My Resume
          </a>
          <div className="flex items-center gap-6">
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                <s.Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
