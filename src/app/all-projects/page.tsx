"use client"

import { useState } from "react"
import Link from "next/link"

/* ─── All Projects Data ──────────────────────────────── */
const allWorks = [
  {
    id: 1,
    tag: "Web App · AI / Translation",
    title: "Sprekar",
    desc: "An AI-powered platform for seamless real-time speech translation across languages.",
    image: "/sprekar-mockup.png",
    href: "/case-study/sprekar",
    year: "2025",
  },
  {
    id: 2,
    tag: "Mobile App · Gaming",
    title: "Chopbet",
    desc: "A sports betting and gaming platform with crash games, slots and live tournaments.",
    image: "/chopbet-mockup.png",
    href: "/case-study/chopbet",
    year: "2025",
    isMockup: true,
  },
  {
    id: 3,
    tag: "Web App · Travel & Visa",
    title: "Tbils",
    desc: "A travel platform where users can search and book flights, check visa requirements, and submit visa applications in one place.",
    image: "/tbils-mockup.png",
    href: "/case-study/tbils",
    year: "2024",
  },
  {
    id: 4,
    tag: "Web App · Real Estate",
    title: "Bricklage",
    desc: "A real estate marketplace where buyers can search, compare, and explore verified properties across Nigeria.",
    image: "/Buyers dashboard/Bricklage mockup.png",
    href: "/case-study/clubarant",
    year: "2024",
  },
  {
    id: 5,
    tag: "Mobile App · Fintech",
    title: "AzuCapital",
    desc: "A fintech app empowering Africans with access to loans, savings, payments, and global banking tools — all from one app.",
    image: "/Azucapital mockup.png",
    href: "/case-study/azucapital",
    year: "2024",
  },
]

/* ─── Project Card ───────────────────────────────────── */
function ProjectCard({ work }: { work: (typeof allWorks)[0] }) {
  const [hovered, setHovered] = useState(false)

  const cardContent = (
    <div
      className="relative overflow-hidden rounded-[8px] w-full"
      style={{ aspectRatio: "16/9", background: "#141414" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={work.image}
        alt={work.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 transition-all duration-500 pointer-events-none"
        style={{
          backdropFilter: hovered ? "blur(6px)" : "blur(0px)",
          WebkitBackdropFilter: hovered ? "blur(6px)" : "blur(0px)",
          background: hovered ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(10px)",
        }}
      >
        <span
          className="text-white"
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "clamp(24px, 3vw, 44px)",
          }}
        >
          View Project
        </span>
      </div>

    </div>
  )

  return (
    <div className="flex flex-col gap-4">
      {work.href ? (
        <a
          href={work.href}
          className="block no-underline cursor-pointer"
        >
          {cardContent}
        </a>
      ) : (
        <div className="cursor-default">{cardContent}</div>
      )}

      {/* Project info below image */}
      <div className="flex items-center justify-between px-1">
        <h3
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "28px",
            lineHeight: "1.1",
            color: "#f9f9f9",
            margin: 0,
          }}
        >
          {work.title}
        </h3>
        <span
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "12px",
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            textAlign: "right",
          }}
        >
          {work.tag}
        </span>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────── */
export default function AllProjectsPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Header */}
      <div
        className="w-full flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/10"
        style={{ background: "#0D0D0D" }}
      >
        <Link
          href="/"
          className="no-underline"
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "26px",
            color: "#f9f9f9",
          }}
        >
          TEE
        </Link>
        <Link
          href="/"
          className="no-underline inline-flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "14px",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to home
        </Link>
      </div>

      {/* Page content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Page title */}
        <div className="mb-16 md:mb-20 flex flex-col items-center text-center">
          <h1
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(48px, 8vw, 96px)",
              lineHeight: 1.0,
              color: "#f9f9f9",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            All Projects
          </h1>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "16px",
              lineHeight: "1.65",
              color: "rgba(255,255,255,0.4)",
              marginTop: "20px",
              maxWidth: "480px",
            }}
          >
            A collection of digital products I&apos;ve designed — from mobile apps to web platforms, across gaming, real estate, travel, and more.
          </p>
        </div>

        {/* Projects grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ rowGap: "20px", columnGap: "32px" }}
        >
          {allWorks.map((work) => (
            <ProjectCard key={work.id} work={work} />
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div
        className="border-t border-white/10 py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ marginTop: "80px" }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "12px",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          © {new Date().getFullYear()} Lateefah Abdulrahman. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "12px",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          Designed with purpose. Built with care.
        </p>
      </div>
    </main>
  )
}
