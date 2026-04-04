"use client"

import { useState, useEffect, useRef } from "react"
import { DottedSurface } from "@/components/ui/dotted-surface"
import HorizontalScrollCarousel, { type StepCard } from "@/components/ui/horizontal-scroll-carousel"
import { AnimatedFooter } from "@/components/ui/animated-footer"

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
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
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

  return (
    <>
      {/* Nav wrapper — centres the floating pill */}
      <div
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pointer-events-none transition-all duration-500"
        style={{
          opacity: footerVisible ? 0 : 1,
          transform: footerVisible ? "translateY(-20px)" : "translateY(0)",
          pointerEvents: footerVisible ? "none" : undefined,
        }}
      >
        <nav
          className={`pointer-events-auto w-full max-w-[1200px] flex items-center justify-between transition-all duration-300 px-6 py-5 rounded-[12px] border border-[#393939] ${
            scrolled ? "bg-[#242424]/95 backdrop-blur-md" : "bg-[#242424]"
          }`}
        >
          {/* Logo */}
          <a href="#" className="no-underline shrink-0">
            <span
              className="text-[26px] leading-[22px] text-[#f9f9f9] whitespace-nowrap"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              TEE
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-5 list-none">
            {[
              { label: "Home", active: true },
              { label: "Featured works", active: false },
              { label: "About", active: false },
              { label: "All projects", active: false },
              { label: "Design approach", active: false },
              { label: "Technologies", active: false },
            ].map(({ label, active }) => {
              const href =
                label === "All projects"
                  ? "/all-projects"
                  : label === "Home"
                  ? "#"
                  : `#${label.toLowerCase().replace(/\s+/g, "-")}`
              return (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[16px] no-underline transition-colors"
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      color: active ? "#fffafa" : "#868686",
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* CTA — Anton text, no button background */}
          <a
            href="mailto:lateefahabdulrahman111@gmail.com"
            className="hidden md:inline text-[16px] leading-[22px] text-[#f9f9f9] no-underline shrink-0 hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Contact me
          </a>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-[22px] h-[2px] bg-white rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-[22px] h-[2px] bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-[22px] h-[2px] bg-white rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-[90px] left-4 right-4 z-40 bg-[#242424] border border-[#393939] rounded-[12px] flex flex-col gap-5 px-6 py-6">
          {[
            "Home",
            "Featured works",
            "About",
            "All projects",
            "Design approach",
            "Technologies",
          ].map((link, i) => {
            const mobileHref =
              link === "All projects"
                ? "/all-projects"
                : link === "Home"
                ? "#"
                : `#${link.toLowerCase().replace(/\s+/g, "-")}`
            return (
              <a
                key={link}
                href={mobileHref}
                onClick={() => setMenuOpen(false)}
                className="text-[16px] no-underline transition-colors"
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  color: i === 0 ? "#fffafa" : "#868686",
                  fontWeight: i === 0 ? 500 : 400,
                }}
              >
                {link}
              </a>
            )
          })}
          <a
            href="mailto:lateefahabdulrahman111@gmail.com"
            className="text-[16px] leading-[22px] text-[#f9f9f9] no-underline mt-2 hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Contact me
          </a>
        </div>
      )}
    </>
  )
}

/* ─── Hero ───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6 pt-24 pb-0 bg-[#1a1a1a]">
      {/* DottedSurface animated background */}
      <DottedSurface className="absolute inset-0 w-full h-full" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <span className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-white/50 mb-5">
          Product Designer
        </span>
        <h1
          className="text-[clamp(72px,12vw,140px)] leading-[1.0] tracking-[-3px] text-white font-black"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          Lateefah
          <br />
          Abdulrahman
        </h1>
      </div>
    </section>
  )
}

/* ─── Projects Section ───────────────────────────────── */
const works = [
  {
    id: 1,
    tag: "Mobile App · Gaming",
    title: "Chopbet",
    desc: "A sports betting and gaming platform with crash games, slots and live tournaments.",
    image: "",
    isMockup: true,
    year: "2025",
  },
  {
    id: 2,
    tag: "Web App · AI / Translation",
    title: "Sprekar",
    desc: "An AI-powered platform for seamless real-time speech translation across languages.",
    image: "/sprekar-mockup.png",
    href: "https://www.sprekar.com/en",
    year: "2025",
  },
  {
    id: 3,
    tag: "Web App · Real Estate",
    title: "Tbils",
    desc: "A transparent real estate platform connecting diaspora Nigerians with verified property listings.",
    image: "/tbils-mockup.png",
    href: "https://www.tbils.com/",
    year: "2024",
  },
  {
    id: 4,
    tag: "Web App · F&B / SaaS",
    title: "Clubarant",
    desc: "A digital menu and QR ordering platform helping restaurants, bars, and lounges manage menus and boost sales.",
    image: "/clubarant-mockup.png",
    href: "https://www.clubarant.com/",
    year: "2024",
  },
  {
    id: 5,
    tag: "Mobile App · Social",
    title: "IYXN Community",
    desc: "A community-focused social app connecting people around shared cultural interests and values.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
    year: "2024",
  },
  {
    id: 6,
    tag: "Mobile + Web · Travel",
    title: "Explore Nigeria",
    desc: "A location-based travel companion helping users discover hidden gems across Nigerian cities.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop&q=80",
    year: "2023",
  },
]

/* ─── iPhone Mockup Card (Chopbet) ───────────────────── */
function MockupCard({ work }: { work: (typeof works)[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href="https://chopwin.sl/"
      target="_blank"
      rel="noopener noreferrer"
      className="relative overflow-hidden cursor-pointer w-full h-full block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: "#1a1a1a" }}
    >
      {/* 3D iPhone render image — fills the card, slight scale on hover */}
      <img
        src="/chopbet-mockup.png"
        alt="Chopbet app mockup"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 z-20 transition-all duration-500 pointer-events-none"
        style={{
          backdropFilter: hovered ? "blur(6px)" : "blur(0px)",
          WebkitBackdropFilter: hovered ? "blur(6px)" : "blur(0px)",
          background: hovered ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
        }}
      />
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none transition-all duration-500"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(10px)" }}>
        <h3 className="text-white font-black tracking-tight text-center px-6 leading-tight"
          style={{ fontFamily: "var(--font-anton)", fontSize: "clamp(28px,4vw,52px)" }}>
          {work.title}
        </h3>
      </div>
    </a>
  )
}

/* ─── Work Card ──────────────────────────────────────── */
function WorkCard({ work }: { work: (typeof works)[0] }) {
  const [hovered, setHovered] = useState(false)

  const inner = (
    <>
      <img
        src={work.image}
        alt={work.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
      />
      <div className="absolute inset-0 transition-all duration-500"
        style={{
          backdropFilter: hovered ? "blur(6px)" : "blur(0px)",
          WebkitBackdropFilter: hovered ? "blur(6px)" : "blur(0px)",
          background: hovered ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center transition-all duration-500"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0px)" : "translateY(10px)" }}>
        <h3 className="text-white text-[clamp(22px,3vw,42px)] font-black tracking-tight text-center px-6 leading-tight"
          style={{ fontFamily: "var(--font-anton)" }}>
          {work.title}
        </h3>
      </div>
    </>
  )

  if (work.href) {
    return (
      <a
        href={work.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative overflow-hidden cursor-pointer w-full h-full block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {inner}
      </a>
    )
  }

  return (
    <div
      className="relative overflow-hidden cursor-pointer w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </div>
  )
}

function ProjectsSection() {
  const shown = works.slice(0, 4)

  return (
    <section id="featured-works" className="relative bg-[#111111] p-2">
      {/*
        2-column grid with 8px gap (gap-2).
        The section has p-2 so there's also 8px around the outside edges.
        "See all works" pill floats absolutely at the center seam.
      */}
      <div className="relative grid grid-cols-2 gap-2" style={{ gridTemplateRows: "600px 600px" }}>

        {shown.map((work) =>
          work.isMockup ? (
            <MockupCard key={work.id} work={work} />
          ) : (
            <WorkCard key={work.id} work={work} />
          )
        )}

        {/* "See all works" pill — dead center at the row seam */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <a
            href="/all-projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-[14px] font-semibold no-underline shadow-xl hover:bg-[#111] hover:text-white transition-all duration-300 whitespace-nowrap"
          >
            See all works
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── About Section ──────────────────────────────────── */
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const text =
    "I'm Lateefah, a product designer who enjoys untangling complex problems and turning them into thoughtful, scalable digital experiences always balancing real user needs with meaningful business goals."
  const words = text.split(" ")
  const totalWords = words.length
  // Spread the stagger across 2400ms total so each word animates at even intervals
  const totalStagger = 2400
  const perWord = totalStagger / totalWords

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/about-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "120px 48px",
      }}
    >
      <p
        className="text-center max-w-[881px] w-full"
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "clamp(22px, 3.2vw, 36px)",
          lineHeight: "1.6",
          fontWeight: 400,
          marginBottom: "60px",
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            style={{
              color: visible ? "#1a1a1a" : "#adadad",
              transition: `color 700ms ease`,
              transitionDelay: visible ? `${i * perWord}ms` : "0ms",
              display: "inline",
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>

      {/* View all works button */}
      <a
        href="/all-projects"
        className="relative overflow-hidden inline-flex items-center justify-center no-underline"
        style={{
          padding: "9px 41px",
          borderRadius: "12px",
          border: "1px solid #ff8411",
          background: "#e16d00",
          boxShadow: "inset 0px 0px 10.1px 3px rgba(255,255,255,0.47)",
          fontFamily: "var(--font-geist-sans)",
          fontSize: "16px",
          fontWeight: 600,
          color: "#f9f9f9",
          whiteSpace: "nowrap",
        }}
      >
        View all works
      </a>
    </section>
  )
}

/* ─── Design Approach ────────────────────────────────── */
const approachSteps: StepCard[] = [
  {
    id: 1,
    num: "Step 1",
    title: "Problem-first thinking",
    desc: "I focus on understanding user pain points and business constraints before jumping into solutions.",
  },
  {
    id: 2,
    num: "Step 2",
    title: "Designing for real-world use",
    desc: "My designs consider edge cases, scalability, and handoff to developers.",
  },
  {
    id: 3,
    num: "Step 3",
    title: "Collaboration & clarity",
    desc: "I communicate decisions clearly with stakeholders, PMs, and engineers.",
  },
  {
    id: 4,
    num: "Step 4",
    title: "97%",
    desc: "Clients hire again for future work",
    isStat: true,
  },
]

function ApproachSection() {
  return (
    <section id="design-approach">
      <HorizontalScrollCarousel
        cards={approachSteps}
        bgImage="/approach-bg.png"
        title={
          <h2
            className="text-[clamp(32px,4vw,52px)] text-white"
            style={{
              fontFamily: "var(--font-anton)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "0px",
            }}
          >
            My design
            <br />
            process
          </h2>
        }
      />
    </section>
  )
}

/* ─── Stats ──────────────────────────────────────────── */
function StatsSection() {
  const stats = [
    { number: "20", suffix: "+", label: "Successful projects completed", first: true },
    { number: "4",  suffix: "+", label: "Years of experience in the creative industry", first: false },
    { number: "99", suffix: "%", label: "Customer satisfaction rate", first: false },
    { number: "10", suffix: "M", label: "In Client revenue growth", first: false },
  ]

  return (
    <section className="w-full overflow-hidden" style={{ background: "#1a1a1a" }}>
      <div className="flex items-center w-full" style={{ padding: "0 60px" }}>
        {stats.map((stat) => (
          <div
            key={stat.number + stat.suffix}
            className="relative overflow-hidden shrink-0 flex-1"
            style={{
              height: "286px",
              borderLeft: stat.first ? "none" : "1px solid #303030",
            }}
          >
            <div
              className="absolute flex flex-col items-start"
              style={{
                left: stat.first ? "30px" : "29px",
                top: "96px",
                width: "244px",
                gap: "40px",
              }}
            >
              {/* Number + suffix */}
              <p
                style={{
                  fontFamily: "var(--font-anton)",
                  fontSize: "64px",
                  lineHeight: "48px",
                  color: "#f9f9f9",
                  margin: 0,
                }}
              >
                <span>{stat.number}</span>
                <span style={{ color: "#e16d00" }}>{stat.suffix}</span>
              </p>
              {/* Label */}
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "20px",
                  lineHeight: "25px",
                  color: "#b3b3b3",
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Technologies ───────────────────────────────────── */
const techTools = [
  { num: "1", name: "Figma",      icon: "/tech-icons/figma.png" },
  { num: "2", name: "Framer",     icon: "/tech-icons/framer.png" },
  { num: "3", name: "Photoshop",  icon: "/tech-icons/photoshop.png" },
  { num: "4", name: "Slack",      icon: "/tech-icons/slack.png" },
  { num: "5", name: "Claude",     icon: "/tech-icons/claude.png" },
  { num: "6", name: "Notion",     icon: "/tech-icons/notion.png" },
  { num: "7", name: "Jira",       icon: "/tech-icons/jira.png" },
  { num: "8", name: "Spline",     icon: "/tech-icons/spline.png" },
]

/* Single tech card — 253×188px, border #dedede, number badge top-left, name bottom-right */
function TechCard({ tool }: { tool: (typeof techTools)[0] }) {
  return (
    <div
      className="relative overflow-hidden shrink-0"
      style={{
        width: "253px",
        height: "188px",
        border: "1px solid #dedede",
      }}
    >
      {/* Number badge — top-left */}
      <div
        className="absolute top-0 left-0 flex items-center justify-center overflow-hidden"
        style={{
          background: "#dedede",
          padding: "6px 20px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "16px",
            lineHeight: "25px",
            color: "#636363",
            fontWeight: 400,
            margin: 0,
          }}
        >
          {tool.num}
        </p>
      </div>

      {/* Icon — centered */}
      <div
        className="absolute"
        style={{
          width: "70px",
          height: "70px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain" />
      </div>

      {/* Name — bottom-right */}
      <div
        className="absolute bottom-0 left-0 flex items-center justify-end"
        style={{
          width: "253px",
          padding: "12px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "16px",
            lineHeight: "normal",
            color: "#424242",
            fontWeight: 400,
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {tool.name}
        </p>
      </div>
    </div>
  )
}

function TechSection() {
  const { ref, visible } = useReveal()
  const row1 = techTools.slice(0, 5)
  const row2 = techTools.slice(5, 8)

  return (
    <section
      id="technologies"
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative flex flex-col items-center justify-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{
        backgroundImage: "url('/tech-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "80px 40px",
      }}
    >
      {/* Section title */}
      <p
        style={{
          fontFamily: "var(--font-anton)",
          fontSize: "64px",
          lineHeight: "48px",
          color: "#242424",
          fontWeight: 400,
          fontStyle: "normal",
          whiteSpace: "nowrap",
          marginBottom: "90px",
        }}
      >
        Technologies
      </p>

      <div
        className="flex flex-col"
        style={{ gap: "20px" }}
      >
        {/* Row 1 — 5 cards */}
        <div className="flex items-center">
          {row1.map((tool) => (
            <TechCard key={tool.name} tool={tool} />
          ))}
        </div>
        {/* Row 2 — 3 cards, centered */}
        <div className="flex items-center justify-center">
          {row2.map((tool) => (
            <TechCard key={tool.name} tool={tool} />
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
      className={`bg-[#111] py-24 px-10 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <h2
        className="text-[clamp(36px,6vw,64px)] font-extrabold tracking-[-2px] leading-[1.1] text-white max-w-[600px] mx-auto mb-5"
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
        href="mailto:hello@lateefah.com"
        className="inline-flex items-center gap-2 bg-[#e8722a] text-white text-[13.5px] font-semibold px-8 py-3.5 rounded-lg hover:bg-[#d4641e] transition-colors no-underline"
      >
        Connect with me
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────── */
function Footer() {
  const socialLinks = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: "https://www.linkedin.com/in/lateefah-abdulrahman-634571348",
      label: "LinkedIn",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      href: "mailto:lateefahabdulrahman111@gmail.com",
      label: "Email",
    },
  ]

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Featured works", href: "#featured-works" },
    { label: "About", href: "#about" },
    { label: "Design approach", href: "#design-approach" },
    { label: "Technologies", href: "#technologies" },
  ]

  return (
    <AnimatedFooter
      brandName="TEE"
      brandDescription="Product designer who untangles complex problems and turns them into thoughtful, scalable digital experiences."
      socialLinks={socialLinks}
      navLinks={navLinks}
    />
  )
}

/* ─── Page ───────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <ApproachSection />
      <StatsSection />
      <TechSection />
      <Footer />
    </main>
  )
}
