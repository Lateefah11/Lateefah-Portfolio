"use client"

import { motion, useTransform, useScroll } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type React from "react"

export type StepCard = {
  id: number
  num: string
  title: string
  desc: string
  url?: string
  isStat?: boolean
}

const TITLE_EXTRA_MARGIN = 92 - 31

const HorizontalScrollCarousel = ({ cards, title, bgImage }: { cards: StepCard[]; title?: React.ReactNode; bgImage?: string }) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: targetRef })

  // Measure the actual rendered strip width so framer gets real px numbers
  const [travel, setTravel] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (stripRef.current) {
        const stripW = stripRef.current.scrollWidth
        setTravel(Math.max(0, stripW - window.innerWidth))
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [cards, title])

  // Pure numbers — framer interpolates these smoothly
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel])

  // Section scroll height = 1 viewport + travel distance
  const scrollH = travel > 0 ? `calc(100vh + ${travel}px)` : "100vh"

  return (
    <div ref={targetRef} className="relative" style={{ height: scrollH }}>
      <div
        className="sticky top-0 flex h-screen items-center overflow-hidden"
        style={bgImage ? { backgroundImage: `url('${bgImage}')`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        <motion.div
          ref={stripRef}
          style={{ x }}
          className="flex items-center gap-[20px] md:gap-[31px] pl-5 md:pl-10"
        >
          {title && (
            <div className="shrink-0" style={{ marginRight: `${TITLE_EXTRA_MARGIN}px` }}>
              {title}
            </div>
          )}
          {cards.map((card) => (
            <StepCardItem card={card} key={card.id} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

const CARD_STYLE: React.CSSProperties = {
  width: "clamp(220px, 72vw, 329px)",
  height: "clamp(300px, 58vw, 437px)",
  background: "#272727",
  border: "1px solid #393939",
  borderRadius: "16px",
  padding: "clamp(16px, 3vw, 24px) clamp(14px, 3vw, 20px)",
}

const StepCardItem = ({ card }: { card: StepCard }) => {
  if (card.isStat) {
    return (
      <div className="shrink-0 overflow-hidden flex flex-col justify-between" style={CARD_STYLE}>
        {/* Empty placeholder keeps layout consistent with step cards */}
        <div />
        {/* Stat content pinned to bottom */}
        <div className="flex flex-col items-start w-full" style={{ gap: "8px" }}>
          <div style={{ fontSize: "clamp(16px, 4vw, 22px)", letterSpacing: "4px", color: "#f9f9f9" }}>★ ★ ★ ★ ★</div>
          <p
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(28px, 6vw, 36px)",
              lineHeight: "1.3",
              color: "#f9f9f9",
              margin: 0,
            }}
          >
            97%
          </p>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(13px, 3vw, 16px)",
              lineHeight: "1.55",
              color: "#b3b3b3",
              fontWeight: 400,
              margin: 0,
            }}
          >
            Clients hire again for future work
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="shrink-0 overflow-hidden flex flex-col justify-between" style={CARD_STYLE}>
      {/* Step number — orange gradient */}
      <p
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "clamp(20px, 4.5vw, 28px)",
          lineHeight: "1",
          fontWeight: 400,
          background: "linear-gradient(180deg, #e16d00 28.75%, #9c0f02 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          margin: 0,
        }}
      >
        {card.num}
      </p>

      {/* Title + desc pinned to bottom */}
      <div className="flex flex-col w-full" style={{ gap: "8px" }}>
        <p
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "clamp(24px, 5.5vw, 36px)",
            lineHeight: "1.25",
            color: "#f9f9f9",
            margin: 0,
          }}
        >
          {card.title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "clamp(13px, 3vw, 16px)",
            lineHeight: "1.55",
            color: "#b3b3b3",
            fontWeight: 400,
            margin: 0,
          }}
        >
          {card.desc}
        </p>
      </div>
    </div>
  )
}

export default HorizontalScrollCarousel
