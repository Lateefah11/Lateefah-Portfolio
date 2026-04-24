"use client"

import { useState, useEffect, useRef } from "react"
import { ParticleSphere } from "@/components/ui/particle-sphere"
import { AnimatedFooter } from "@/components/ui/animated-footer"
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid"

/* ─── Reveal Hook ────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

/* ─── Navbar ─────────────────────────────────────────── */
const navLinks = [
  { label: "Home",           href: "#" },
  { label: "Featured works", href: "#featured-works" },
  { label: "About",          href: "#about" },
  { label: "Tool box",       href: "#technologies" },
]

function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sentinel = document.getElementById("footer-sentinel")
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      {/* ── Transparent top bar (pre-scroll) ── */}
      <div
        className="fixed top-6 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 pointer-events-none transition-all duration-500"
        style={{
          opacity: scrolled || footerVisible ? 0 : 1,
          transform: scrolled ? "translateY(-12px)" : "translateY(0)",
        }}
      >
        {/* Logo */}
        <a href="#" className="pointer-events-auto no-underline">
          <span
            className="text-[26px] leading-[22px] text-[#f9f9f9]"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            TEE
          </span>
        </a>

        {/* Centre nav links */}
        <ul className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-7 list-none pointer-events-auto">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="no-underline transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.55)",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Spacer to keep logo left-aligned */}
        <div className="w-[52px]" />
      </div>

      {/* ── Hamburger FAB (post-scroll) ── */}
      <button
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
        className="pointer-events-auto fixed top-6 right-6 z-50 flex items-center justify-center rounded-full bg-white shadow-lg transition-all duration-400 cursor-pointer border-0"
        style={{
          width: "52px",
          height: "52px",
          opacity: !footerVisible ? 1 : 0,
          transform: !footerVisible ? "scale(1)" : "scale(0.8)",
          pointerEvents: !footerVisible ? "auto" : "none",
          transitionProperty: "opacity, transform",
          transitionDuration: "350ms",
          transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="0"  width="18" height="2" rx="1" fill="#111" />
          <rect x="0" y="10" width="18" height="2" rx="1" fill="#111" />
        </svg>
      </button>

      {/* ── Side drawer backdrop ── */}
      <div
        className="fixed inset-0 z-[60] transition-all duration-400"
        style={{
          background: "rgba(0,0,0,0.55)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          backdropFilter: menuOpen ? "blur(4px)" : "blur(0px)",
          transitionProperty: "opacity, backdrop-filter",
          transitionDuration: "380ms",
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* ── Side drawer panel ── */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[70] flex flex-col"
        style={{
          width: "min(420px, 90vw)",
          background: "#0A0A0A",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 420ms cubic-bezier(0.25,0.46,0.45,0.94)",
          padding: "clamp(28px,5vw,48px)",
        }}
      >
        {/* Close button */}
        <div className="flex justify-end mb-12">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center rounded-full bg-white cursor-pointer border-0 transition-opacity hover:opacity-80"
            style={{ width: "52px", height: "52px" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Navigation label */}
        <p
          className="mb-6 tracking-[0.16em] uppercase"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "11px",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Navigation
        </p>
        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "32px" }} />

        {/* Nav items */}
        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="no-underline group flex items-center gap-3 transition-colors duration-200"
              style={{
                fontFamily: "var(--font-anton)",
                fontSize: "clamp(32px, 6vw, 52px)",
                lineHeight: 1.15,
                color: "rgba(255,255,255,0.85)",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div className="mt-auto pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p
            className="mb-4 tracking-[0.16em] uppercase"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Contact me
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: "LinkedIn",  href: "https://www.linkedin.com/in/lateefah-abdulrahman-634571348" },
              { label: "WhatsApp", href: "https://wa.link/2wa261" },
              { label: "Email",    href: "mailto:lateefahabdulrahman111@gmail.com" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.45)",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Hero ───────────────────────────────────────────── */
function Hero() {
  const outerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={outerRef} style={{ height: "210vh", position: "relative" }}>
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6 bg-[#0D0D0D]">

        {/* Particle sphere background */}
        <ParticleSphere
          className="absolute inset-0 w-full h-full"
          outerRef={outerRef}
        />

        {/* Hero text — always visible, animation plays behind */}
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-white/50 mb-5">
            Product Designer
          </span>
          <h1
            className="text-[clamp(44px,13vw,140px)] leading-[1.0] tracking-[-1px] md:tracking-[-3px] text-white font-black"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Lateefah
            <br />
            Abdulrahman
          </h1>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span
            className="text-white/35 text-[10px] tracking-[0.18em] uppercase"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Scroll
          </span>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="animate-bounce">
            <path d="M1 1L8 8L15 1" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

      </section>
    </div>
  )
}

/* ─── Scrolling Skills Marquee ───────────────────────── */
const row1 = [
  { label: "Product Design",    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6h12M6 10h12M6 14h8" /> },
  { label: "UX Design",         icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 16v-3z" /> },
  { label: "Mobile Apps",       icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /> },
  { label: "Web Apps",          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
  { label: "Design Systems",    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
  { label: "User Research",     icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" /> },
  { label: "Wireframing",       icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5h16M4 9h10M4 13h6M4 17h4" /> },
]

const row2 = [
  { label: "Figma",             icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5zM12 2h3.5a3.5 3.5 0 110 7H12V2zM12 12.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zM5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 11-7 0zM5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z" /> },
  { label: "Prototyping",       icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
  { label: "Visual Design",     icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /> },
  { label: "Brand Identity",    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /> },
  { label: "UI Design",         icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /> },
  { label: "Interaction Design", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /> },
  { label: "Usability Testing", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
]

function SkillTag({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 shrink-0"
      style={{
        background: "#1e1e1e",
        border: "1px solid #2e2e2e",
        borderRadius: "100px",
        padding: "10px 20px",
        marginRight: "12px",
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)">
        {icon}
      </svg>
      <span
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "14px",
          fontWeight: 400,
          color: "rgba(255,255,255,0.75)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* ─── Cursor Follow Label ────────────────────────────── */
function CursorLabel() {
  const labelRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -300, y: -300 })
  const target = useRef({ x: -300, y: -300 })
  const visible = useRef(false)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const label = labelRef.current
    if (!label) return

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const setVisible = (next: boolean) => {
      if (next === visible.current) return
      visible.current = next
      label.style.opacity = next ? "1" : "0"
      label.style.transform = next ? "scale(1)" : "scale(0.88)"
    }

    const tick = () => {
      // Re-check hit every frame so scroll moves are caught without mouse movement
      const el = document.elementFromPoint(target.current.x, target.current.y)
      const over = !!(el as Element | null)?.closest?.("[data-cursor-label]")
      setVisible(over)

      // Lerp — lag behind cursor for premium feel
      pos.current.x += (target.current.x - pos.current.x) * 0.1
      pos.current.y += (target.current.y - pos.current.y) * 0.1
      label.style.left = `${pos.current.x + 18}px`
      label.style.top = `${pos.current.y + 16}px`
      rafId.current = requestAnimationFrame(tick)
    }

    document.addEventListener("mousemove", onMove)
    rafId.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener("mousemove", onMove)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={labelRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        transform: "scale(0.88)",
        transition: "opacity 0.22s ease, transform 0.22s ease",
        background: "#fff",
        color: "#111",
        padding: "9px 20px",
        borderRadius: "999px",
        fontFamily: "var(--font-geist-sans)",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.01em",
        boxShadow: "0 4px 20px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08)",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      See Details →
    </div>
  )
}

/* ─── Projects Section ───────────────────────────────── */
const works = [
  {
    id: 1,
    tag: "Web App · AI / Translation",
    title: "Sprekar",
    image: "/sprekar-mockup.png",
    href: "/case-study/sprekar",
    year: "2025",
  },
  {
    id: 2,
    tag: "Mobile App · Gaming",
    title: "Chopbet",
    image: "/chopbet-mockup.png",
    href: "/case-study/chopbet",
    year: "2025",
    isMockup: true,
  },
  {
    id: 3,
    tag: "Web App · Travel & Visa",
    title: "Tbils",
    image: "/tbils-mockup.png",
    href: "/case-study/tbils",
    year: "2024",
  },
  {
    id: 4,
    tag: "Web App · Real Estate",
    title: "Bricklage",
    image: "/Buyers dashboard/Bricklage mockup.png",
    href: "/case-study/clubarant",
    year: "2024",
  },
  {
    id: 5,
    tag: "Mobile App · Fintech",
    title: "AzuCapital",
    image: "/Azucapital mockup.png",
    href: "/case-study/azucapital",
    year: "2024",
  },
]

/* ─── Projects Section — Editorial List ─────────────── */
function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [previewTop, setPreviewTop] = useState(0)
  const { ref, visible } = useReveal()
  const listRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const PREVIEW_H = 240

  const handleRowEnter = (i: number) => {
    setActiveIndex(i)
    const row = rowRefs.current[i]
    const list = listRef.current
    if (!row || !list) return
    const rowRect = row.getBoundingClientRect()
    const listRect = list.getBoundingClientRect()
    const rowCenterY = rowRect.top - listRect.top + rowRect.height / 2
    setPreviewTop(rowCenterY - PREVIEW_H / 2)
  }

  return (
    <section
      id="featured-works"
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        background: "#0D0D0D",
        padding: "clamp(40px, 8vh, 100px) clamp(20px, 5vw, 200px)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Desktop: list with floating preview */}
        <div ref={listRef} className="hidden md:block relative">
          {/* Floating image preview — follows hovered row vertically */}
          <div
            className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2"
            style={{
              width: "340px",
              height: `${PREVIEW_H}px`,
              top: previewTop,
              transition: "top 350ms cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
          >
            {works.map((work, i) => (
              <div
                key={work.id}
                className="absolute inset-0 rounded-[12px] overflow-hidden"
                style={{
                  opacity: activeIndex === i ? 1 : 0,
                  transform: activeIndex === i ? "scale(1) translateY(0px)" : "scale(0.97) translateY(10px)",
                  transition: "opacity 350ms cubic-bezier(0.25,0.46,0.45,0.94), transform 350ms cubic-bezier(0.25,0.46,0.45,0.94)",
                }}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Project rows */}
          {works.map((work, i) => (
            <a
              key={work.id}
              ref={el => { rowRefs.current[i] = el }}
              href={work.href}
              data-cursor-label="true"
              className="group flex items-center justify-between no-underline"
              style={{
                padding: "clamp(22px, 3.5vw, 36px) 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                transition: "opacity 300ms ease",
                opacity: activeIndex === null ? 1 : activeIndex === i ? 1 : 0.28,
              }}
              onMouseEnter={() => handleRowEnter(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Left: title */}
              <span
                style={{
                  fontFamily: "var(--font-anton)",
                  fontSize: "clamp(36px, 5.5vw, 76px)",
                  lineHeight: 1,
                  color: activeIndex === i ? "#f9f9f9" : "rgba(255,255,255,0.75)",
                  letterSpacing: "-0.5px",
                  transition: "color 300ms ease",
                }}
              >
                {work.title}
              </span>

              {/* Right: meta */}
              <div className="flex flex-col items-end gap-1 shrink-0 ml-8">
                <span
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "13px",
                    color: activeIndex === i ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
                    letterSpacing: "0.04em",
                    transition: "color 300ms ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {work.tag}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.08em",
                    transition: "color 300ms ease",
                  }}
                >
                  {work.year}
                </span>
              </div>
            </a>
          ))}

        </div>

        {/* Mobile: image + title stacked, no wrapper card */}
        <div className="md:hidden flex flex-col gap-8">
          {works.map((work) => (
            <a key={work.id} href={work.href} className="block no-underline">
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", borderRadius: "12px" }}>
                <img
                  src={work.image}
                  alt={work.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between mt-3 px-1">
                <span
                  style={{
                    fontFamily: "var(--font-anton)",
                    fontSize: "24px",
                    color: "#f9f9f9",
                    lineHeight: 1,
                  }}
                >
                  {work.title}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.06em",
                    textAlign: "right",
                    maxWidth: "120px",
                  }}
                >
                  {work.tag}
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ─── About Section ──────────────────────────────────── */
const skills = [
  "Product Design", "UX Design", "Figma", "Framer",
  "Photoshop", "Spline", "User Research", "Design Systems", "Claude",
]

function AboutSection() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        background: "#0D0D0D",
        paddingTop: "clamp(40px, 10vh, 120px)",
        paddingBottom: "clamp(40px, 10vh, 100px)",
        paddingLeft: "clamp(20px, 5vw, 200px)",
        paddingRight: "clamp(20px, 5vw, 200px)",
      }}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-10 md:gap-16 items-stretch">

        {/* ── Left: Photo ── */}
        <div
          className="relative overflow-hidden w-full"
          style={{
            borderRadius: "12px",
            background: "#181818",
            border: "1px solid rgba(255,255,255,0.08)",
            minHeight: "420px",
          }}
        >
          <img
            src="/lateefah-profile.jpg"
            alt="Lateefah Abdulrahman"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>

        {/* ── Right: Content ── */}
        <div className="flex flex-col gap-6 md:gap-7">

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.05,
              color: "#f9f9f9",
              margin: 0,
            }}
          >
            Meet Lateefah
          </h2>

          {/* Bio */}
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(15px, 1.6vw, 17px)",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
            }}
          >
            I&apos;m Lateefah, a product designer who enjoys untangling complex problems and turning them into thoughtful, scalable digital experiences, always balancing real user needs with meaningful business goals.
            <br /><br />
            I wear many hats, UI/UX designer by profession, charcoal artist and a reader by passion.
            <br /><br />
            Each role fuels a different side of me: I create with purpose, connect with people, compete with heart, and give back with intention.
          </p>

          {/* Experience */}
          <div
            className="flex flex-col gap-4 pt-5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            {/* Current role */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
                <span className="w-[8px] h-[8px] rounded-full" style={{ background: "#e16d00" }} />
                <span className="w-[1px] flex-1" style={{ background: "rgba(255,255,255,0.1)", minHeight: "20px" }} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "15px", fontWeight: 600, color: "#f9f9f9" }}>
                  Product Designer
                </span>
                <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
                  Choplife · Currently
                </span>
              </div>
            </div>

            {/* Stat */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center shrink-0 pt-1">
                <span className="w-[8px] h-[8px] rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "15px", fontWeight: 600, color: "#f9f9f9" }}>
                  4+ Years Experience
                </span>
                <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
                  Creative & product design industry
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="mailto:lateefahabdulrahman111@gmail.com"
            className="btn-shimmer self-start inline-flex items-center gap-2 no-underline transition-opacity hover:opacity-80"
            style={{
              background: "#e16d00",
              color: "#fff",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "14px",
              fontWeight: 600,
              padding: "13px 30px",
              borderRadius: "12px",
            }}
          >
            Contact me
          </a>
        </div>
      </div>

    </section>
  )
}


/* ─── Services ───────────────────────────────────────── */
const serviceItems: BentoItem[] = [
  {
    title: "UX & Product Design",
    description: "End-to-end product design — from discovery and research to wireframes, prototypes, and polished high-fidelity UI that solves real user problems.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    status: "Core service",
    tags: ["Research", "Prototyping", "UI"],
    hasPersistentHover: true,
  },
  {
    title: "Mobile & Web App Design",
    description: "Intuitive, pixel-perfect interfaces for mobile and web applications, designed with performance, accessibility, and developer handoff in mind.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    status: "Available",
    tags: ["Mobile", "Web", "Handoff"],
  },
  {
    title: "Design Systems",
    description: "Scalable component libraries and design systems that keep product teams consistent, efficient, and aligned across every platform and touchpoint.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    status: "Available",
    tags: ["Components", "Tokens"],
  },
  {
    title: "User Research & Testing",
    description: "In-depth user research, usability testing, and insight synthesis that ground every design decision in real behaviour and validated assumptions.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    status: "Available",
    tags: ["Research", "Testing"],
  },
]

function ServicesSection() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        background: "#0D0D0D",
        padding: "clamp(40px, 8vh, 100px) clamp(20px, 5vw, 200px)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <h2
          className="text-center"
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "clamp(36px, 5vw, 60px)",
            lineHeight: 1.05,
            color: "#f9f9f9",
            fontWeight: 400,
            margin: "0 0 90px",
          }}
        >
          My design services
        </h2>
        <BentoGrid items={serviceItems} />

        {/* Scrolling skills marquee */}
        <div className="relative w-full overflow-hidden mt-16 md:mt-20">
          {/* Left fade */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
            style={{
              width: "clamp(48px, 15vw, 480px)",
              background: "linear-gradient(to right, #0D0D0D 0%, transparent 100%)",
            }}
          />
          {/* Right fade */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
            style={{
              width: "clamp(48px, 15vw, 480px)",
              background: "linear-gradient(to left, #0D0D0D 0%, transparent 100%)",
            }}
          />
          {/* Row 1 — scrolls left */}
          <div className="flex w-max marquee-left mb-3">
            {[...row1, ...row1].map((item, i) => (
              <SkillTag key={i} label={item.label} icon={item.icon} />
            ))}
          </div>
          {/* Row 2 — scrolls right */}
          <div className="flex w-max marquee-right">
            {[...row2, ...row2].map((item, i) => (
              <SkillTag key={i} label={item.label} icon={item.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Technologies ───────────────────────────────────── */
const techTools = [
  { name: "Figma",      category: "Interface Design Tool",  icon: "/tech-icons/figma.png" },
  { name: "Notion",     category: "Productivity Tool",      icon: "/tech-icons/notion.png" },
  { name: "Framer",     category: "No Code Design Tool",    icon: "/tech-icons/framer.png" },
  { name: "Photoshop",  category: "Image Editing Tool",     icon: "/tech-icons/photoshop.png" },
  { name: "Slack",      category: "Productivity Tool",      icon: "/tech-icons/slack.png" },
  { name: "Claude",     category: "Claude Code",             icon: "/tech-icons/claude.png" },
  { name: "Jira",       category: "Project Management",     icon: "/tech-icons/jira.png" },
  { name: "Spline",     category: "3D Design Tool",         icon: "/tech-icons/spline.png" },
]

function TechSection() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="technologies"
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{
        background: "#0D0D0D",
        padding: "clamp(40px, 8vh, 100px) clamp(20px, 5vw, 200px)",
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Heading */}
        <h2
          className="text-center"
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "clamp(36px, 5vw, 60px)",
            lineHeight: 1.05,
            color: "#f9f9f9",
            fontWeight: 400,
            margin: "0 0 90px",
          }}
        >
          Tool box
        </h2>

        {/* Logo grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {techTools.map((tool) => (
            <div
              key={tool.name}
              className="group relative flex flex-col items-center justify-center rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.1)",
                aspectRatio: "4/3",
                padding: "clamp(20px, 3vw, 36px)",
              }}
            >
              {/* Dot-grid texture — matches bento cards */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:4px_4px]" />
              </div>

              <img
                src={tool.icon}
                alt={tool.name}
                className="relative w-10 h-10 object-contain transition-all duration-300"
                style={{
                  filter: "brightness(0) invert(1)",
                  opacity: 0.95,
                }}
              />
              <span
                className="relative mt-3 transition-colors duration-300 group-hover:text-white/60"
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.28)",
                  letterSpacing: "0.04em",
                }}
              >
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Section ────────────────────────────────────── */
function CTASection() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-16 md:py-24 px-6 md:px-10 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ background: "#0A0A0A" }}
    >
      <h2
        className="text-[clamp(30px,6vw,64px)] font-extrabold tracking-[-1px] md:tracking-[-2px] leading-[1.1] text-white max-w-[600px] mx-auto mb-5"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Have a product
        <br />
        challenge in mind?
      </h2>
      <p className="text-[14px] leading-[1.7] text-white/45 max-w-[400px] mx-auto mb-9">
        I&apos;m always open to meaningful projects, collaborations, and product design
        conversations. Let&apos;s build something together that creates real impact.
      </p>
      <a
        href="mailto:lateefahabdulrahman111@gmail.com"
        className="btn-shimmer inline-flex items-center gap-2 bg-[#e8722a] text-white text-[13.5px] font-semibold px-8 py-3.5 rounded-lg hover:bg-[#d4641e] transition-colors no-underline"
      >
        Connect with me
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────── */
function Footer() {
  const socialLinks: { icon: React.ReactNode; href: string; label: string }[] = []

  const navColumns = [
    {
      heading: "Work",
      links: [
        { label: "Featured works", href: "#featured-works" },
        { label: "All projects", href: "/all-projects" },
      ],
    },
    {
      heading: "Info",
      links: [
        { label: "About", href: "#about" },
        { label: "Tool box", href: "#technologies" },
      ],
    },
    {
      heading: "Connect",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/lateefah-abdulrahman-634571348", external: true },
        { label: "Email me", href: "mailto:lateefahabdulrahman111@gmail.com" },
      ],
    },
  ]

  return (
    <AnimatedFooter
      brandName="LATEEFAH"
      tagline="Designed with purpose. Built with care."
      socialLinks={socialLinks}
      navColumns={navColumns}
      ctaHref="mailto:lateefahabdulrahman111@gmail.com"
      ctaLabel="Connect with me"
    />
  )
}

/* ─── Floating Resume Button ─────────────────────────── */
function ResumeButton() {
  return (
    <a
      href="https://docs.google.com/document/d/1Ou4iep9L-jh0QKcEXkNbW6BL90sfhX7DJf9YCj8RmYQ/edit?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 no-underline"
      style={{
        background: "#e16d00",
        color: "#fff",
        borderRadius: "100px",
        padding: "11px 16px",
        boxShadow: "0 4px 24px rgba(225,109,0,0.35)",
        fontFamily: "var(--font-geist-sans)",
        fontSize: "14px",
        fontWeight: 600,
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <span className="hidden md:inline">Resume</span>
    </a>
  )
}

/* ─── Page ───────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <CursorLabel />
      <Navbar />
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <ServicesSection />
      <TechSection />
      <Footer />
      <ResumeButton />
    </main>
  )
}
