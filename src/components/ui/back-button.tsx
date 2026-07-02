"use client"

import { useRouter } from "next/navigation"

interface BackButtonProps {
  label: string
  fallbackHref: string
}

export function BackButton({ label, fallbackHref }: BackButtonProps) {
  const router = useRouter()

  return (
    <button
      onClick={() => {
        if (window.history.length > 1) {
          window.history.back()
        } else {
          router.push(fallbackHref)
        }
      }}
      style={{
        marginTop: "48px",
        fontFamily: "var(--font-geist-sans)",
        fontSize: "14px",
        color: "rgba(255,255,255,0.4)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
      </svg>
      {label}
    </button>
  )
}
