"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatedFooter } from "@/components/ui/animated-footer"
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid"
import { ProjectCard } from "@/components/ui/project-card"

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

/* ─── Hero ───────────────────────────────────────────── */
function Hero() {

  return (
    <section
      id="home"
      className="px-6 md:px-12"
      style={{ background: "#0D0D0D", paddingTop: "clamp(48px, 7vh, 90px)", paddingBottom: "clamp(32px, 5vh, 56px)" }}
    >
      <div className="max-w-[820px]">
        <span
          className="inline-flex items-center gap-2 mb-6"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "13px",
            color: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "100px",
            padding: "6px 14px",
          }}
        >
          <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: "#3ecf5f" }} />
          Available for work
        </span>

        <h1
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "clamp(30px, 4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.5px",
            color: "#f9f9f9",
            fontWeight: 400,
            margin: "0 0 18px",
          }}
        >
          Hey, I&apos;m Lateefah.
          <br />
          I design products people trust.
        </h1>

        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "clamp(14px, 1.3vw, 16px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)",
            maxWidth: "560px",
            margin: "0 0 28px",
          }}
        >
          I&apos;m a product designer with 7+ years of experience across fintech, e-commerce, marketplaces, and AI; designing for B2C and B2B, across mobile and web.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:lateefahabdulrahman111@gmail.com"
            className="btn-shimmer no-underline inline-flex items-center gap-2"
            style={{
              background: "#e16d00",
              color: "#fff",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "14px",
              fontWeight: 600,
              padding: "13px 28px",
              borderRadius: "10px",
            }}
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
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

/* ─── Projects Section ───────────────────────────────── */
const works = [
  {
    id: 1,
    tag: "Web App · Casino / Gaming",
    title: "Chopwin",
    image: "/Chopwin.png",
    href: "https://relic-lock-b39.notion.site/Chopwin-35a1dfdc066a802e8cdbeb92c1c3a81a?source=copy_link",
    year: "2025",
  },
  {
    id: 2,
    tag: "Mobile App · Fintech",
    title: "AzuCapital",
    image: "/AzuCapital.png",
    href: "/case-study/azucapital",
    year: "2024",
  },
  {
    id: 3,
    tag: "Mobile App · AI Video Analyzer",
    title: "Afia",
    image: "/Afia.png",
    href: "https://app.notion.com/p/Afia-3901dfdc066a8059a216dc8203f9484e?source=copy_link",
    year: "2025",
  },
  {
    id: 4,
    tag: "Mobile App · AI Translation",
    title: "Sprekar",
    image: "/Sprekar.png",
    href: "https://www.notion.so/Sprekar-3591dfdc066a80328ef0c9a19c7846f9?source=copy_link",
    year: "2025",
  },
  {
    id: 5,
    tag: "Mobile App · Social App",
    title: "LifeFriends",
    image: "/LifeFriends.png",
    href: "https://www.lifefriends.co/",
    year: "2025",
  },
  {
    id: 6,
    tag: "Mobile App · Period Tracker",
    title: "Bloomia",
    image: "/Bloomia.png",
    href: "/case-study/bloomia",
    year: "2025",
  },
  {
    id: 7,
    tag: "Web App · Collaboration",
    title: "MotionFarm",
    image: "/MotionFarm.png",
    href: "/case-study/motionfarm",
    year: "2025",
  },
]

/* ─── Projects Section — Editorial List ─────────────── */
function ProjectsSection() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="featured-works"
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        background: "#0D0D0D",
        padding: "clamp(40px, 8vh, 100px) clamp(20px, 5vw, 100px)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4" style={{ marginBottom: "56px" }}>
          <h2
            className="section-heading"
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "32px",
              lineHeight: 1.05,
              color: "#f9f9f9",
              fontWeight: 400,
              margin: 0,
            }}
          >
            Selected work
          </h2>
          <a
            href="/all-projects"
            className="no-underline transition-colors duration-200"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "14px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
              border: "1.5px solid rgba(255,255,255,0.18)",
              borderRadius: "10px",
              padding: "9px 20px",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#f9f9f9")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          >
            All projects
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "8px" }}>
          {works.slice(0, 3).map((work) => (
            <ProjectCard key={work.id} title={work.title} tag={work.tag} image={work.image} href={work.href} />
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

const experience = [
  {
    title: "Product Designer",
    company: "Choplife",
    duration: "2024 – Till date",
    summary: "Designing end-to-end web and mobile experiences that helped grow the user base 1060% (5K→58K), while partnering with product and engineering to scope and ship iterative solutions.",
  },
  {
    title: "Lead Product Designer",
    company: "Rogue Dev Tech",
    duration: "2022 – 2024",
    summary: "Led end-to-end product design across mobile and web, building reusable design systems and shipping flows and prototypes that improved onboarding and engagement.",
  },
  {
    title: "UI/UX Designer",
    company: "LifeFriends",
    duration: "2019 – 2022",
    summary: "Supported senior designers on wireframes and prototypes for early-stage products, applying UX and accessibility best practices across cross-functional teams.",
  },
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
            minHeight: "320px",
          }}
        >
          <img
            src="/lateefah-profile.jpg"
            alt="Lateefah Abdulrahman"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "50% 18%" }}
          />
        </div>

        {/* ── Right: Content ── */}
        <div className="flex flex-col gap-6 md:gap-7">

          {/* Heading */}
          <h2
            className="section-heading"
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "32px",
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
        </div>
      </div>

      {/* ── Experience + CTA — full width, below the photo/bio row ── */}
      <div className="max-w-[1200px] mx-auto" style={{ marginTop: "clamp(40px, 6vh, 64px)" }}>
        <h3
          className="section-heading"
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "32px",
            color: "#f9f9f9",
            fontWeight: 400,
            margin: "0 0 8px",
          }}
        >
          Work experience
        </h3>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {experience.map((role, i) => (
            <div
              key={role.company}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,260px)_1fr] gap-x-10 gap-y-2"
              style={{
                padding: "24px 0",
                borderBottom: i < experience.length - 1 ? "1px dashed rgba(255,255,255,0.18)" : "none",
              }}
            >
              <div className="flex flex-col gap-1">
                <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
                  {role.company} · {role.duration}
                </span>
                <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "17px", fontWeight: 500, color: "#f9f9f9" }}>
                  {role.title}
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: 0, alignSelf: "center" }}>
                {role.summary}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="mailto:lateefahabdulrahman111@gmail.com"
          className="btn-shimmer inline-flex items-center gap-2 no-underline transition-opacity hover:opacity-80"
          style={{
            background: "#e16d00",
            color: "#fff",
            fontFamily: "var(--font-geist-sans)",
            fontSize: "14px",
            fontWeight: 600,
            padding: "13px 30px",
            borderRadius: "12px",
            marginTop: "28px",
          }}
        >
          Contact me
        </a>
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
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        background: "#0D0D0D",
        padding: "clamp(40px, 8vh, 100px) clamp(20px, 5vw, 200px)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <h2
          className="section-heading"
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "32px",
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
          className="section-heading"
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "32px",
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
      tagline="Designed with purpose. Built with care."
      socialLinks={socialLinks}
      navColumns={navColumns}
      ctaHref="mailto:lateefahabdulrahman111@gmail.com"
      ctaLabel="Connect with me"
    />
  )
}

/* ─── Floating Resume Button ─────────────────────────── */
/* ─── Page ───────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <ServicesSection />
      <TechSection />
      <Footer />
    </main>
  )
}
