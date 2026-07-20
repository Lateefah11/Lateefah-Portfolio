"use client"

import { useState } from "react"

interface ProjectCardProps {
  title: string
  tag: string
  image: string
  href: string
}

export function ProjectCard({ title, tag, image, href }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const isExternal = href.startsWith("http")

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group block relative w-full overflow-hidden rounded-[12px] no-underline"
      style={{ aspectRatio: "4/3", background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none"
        style={{
          background: hovered ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0)",
          backdropFilter: hovered ? "blur(6px)" : "blur(0px)",
          opacity: hovered ? 1 : 0,
        }}
      >
        <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "28px", color: "#fff" }}>
          View Project
        </span>
      </div>

      {/* Name label bar — overlaid on the image */}
      <div
        className="absolute left-3 right-3 bottom-3 flex flex-col items-start gap-0.5 rounded-[8px]"
        style={{ background: "#0A0A0A", padding: "8px", border: "0.5px solid rgba(255,255,255,0.5)" }}
      >
        <span style={{ fontFamily: "var(--font-anton)", fontSize: "14px", color: "#f9f9f9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>
          {title}
        </span>
        <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "11px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
          {tag}
        </span>
      </div>
    </a>
  )
}
