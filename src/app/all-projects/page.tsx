"use client"

import { ProjectCard } from "@/components/ui/project-card"

/* ─── All Projects Data ──────────────────────────────── */
const allWorks = [
  {
    id: 1,
    tag: "Web App · Casino / Gaming",
    title: "Chopwin",
    desc: "A sports betting and casino platform with crash games, slots and live tournaments.",
    image: "/Chopwin.png",
    href: "https://relic-lock-b39.notion.site/Chopwin-35a1dfdc066a802e8cdbeb92c1c3a81a?source=copy_link",
    year: "2025",
  },
  {
    id: 2,
    tag: "Mobile App · Fintech",
    title: "AzuCapital",
    desc: "A fintech app empowering Africans with access to loans, savings, payments, and global banking tools — all from one app.",
    image: "/AzuCapital.png",
    href: "https://app.notion.com/p/AzuCapital-35a1dfdc066a80ac8a3bdafa11b58a02?source=copy_link",
    year: "2024",
  },
  {
    id: 3,
    tag: "Mobile App · AI Video Analyzer",
    title: "Afia",
    desc: "An AI-powered mobile app that analyzes video content to surface insights in real time.",
    image: "/Afia.png",
    href: "https://app.notion.com/p/Afia-3901dfdc066a8059a216dc8203f9484e?source=copy_link",
    year: "2025",
  },
  {
    id: 4,
    tag: "Mobile App · AI Translation",
    title: "Sprekar",
    desc: "An AI-powered platform for seamless real-time speech translation across languages.",
    image: "/Sprekar.png",
    href: "https://www.notion.so/Sprekar-3591dfdc066a80328ef0c9a19c7846f9?source=copy_link",
    year: "2025",
  },
  {
    id: 5,
    tag: "Mobile App · Social App",
    title: "LifeFriends",
    desc: "A social app for meeting and connecting with new people nearby.",
    image: "/LifeFriends.png",
    href: "https://www.lifefriends.co/",
    year: "2025",
  },
  {
    id: 6,
    tag: "Mobile App · Period Tracker",
    title: "Bloomia",
    desc: "A period tracking app that helps users monitor their cycle, symptoms, and wellness.",
    image: "/Bloomia.png",
    href: "/case-study/bloomia",
    year: "2025",
  },
  {
    id: 7,
    tag: "Web App · Collaboration",
    title: "MotionFarm",
    desc: "A collaboration platform for teams to plan, create, and manage work together.",
    image: "/MotionFarm.png",
    href: "/case-study/motionfarm",
    year: "2025",
  },
]

/* ─── Page ───────────────────────────────────────────── */
export default function AllProjectsPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Page content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Page title */}
        <div className="mb-16 md:mb-20 flex flex-col items-start text-left">
          <h1
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(30px, 4vw, 52px)",
              lineHeight: 1.1,
              color: "#f9f9f9",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Works
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
          style={{ rowGap: "16px", columnGap: "16px" }}
        >
          {allWorks.map((work) => (
            <ProjectCard key={work.id} title={work.title} tag={work.tag} image={work.image} href={work.href} />
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
