"use client"

import React from "react"

interface ShinyButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  target?: string
  rel?: string
  style?: React.CSSProperties
}

export function ShinyButton({
  children,
  href,
  onClick,
  className = "",
  target,
  rel,
  style,
}: ShinyButtonProps) {
  const cls = `shiny-btn ${className}`

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={cls} style={style}>
        <span>{children}</span>
      </a>
    )
  }

  return (
    <button onClick={onClick} className={cls} style={style}>
      <span>{children}</span>
    </button>
  )
}
