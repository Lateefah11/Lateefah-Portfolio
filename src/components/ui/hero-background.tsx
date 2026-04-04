"use client"

import { MeshGradient } from "@paper-design/shaders-react"

export function HeroBackground() {
  return (
    <>
      {/* MeshGradient shader — replaces the static radial-gradient hero background */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#1a1a1a", "#1a1a1a", "#1a1a1a", "#1a1a1a", "#1a1a1a"]}
        speed={0.4}
        distortion={0.3}
      />
      {/* Subtle left/right vignette bands to match Figma design */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)",
        }}
      />
    </>
  )
}
