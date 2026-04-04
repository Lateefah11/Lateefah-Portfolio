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

const CARD_W = 329
const CARD_GAP = 31
const TITLE_EXTRA_MARGIN = 92 - 31
const PL = 40

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
          className="flex items-center gap-[31px] pl-10"
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

const StepCardItem = ({ card }: { card: StepCard }) => {
  if (card.isStat) {
    return (
      <div
        className="shrink-0 overflow-hidden flex items-start"
        style={{
          width: "329px",
          height: "437px",
          background: "#272727",
          border: "1px solid #393939",
          borderRadius: "16px",
          padding: "24px 20px",
        }}
      >
        <div className="flex flex-col w-full" style={{ gap: "118px" }}>
          {/* Empty step label placeholder (opacity 0 in Figma) */}
          <div style={{ height: "26px" }} />
          {/* Stat content */}
          <div className="flex flex-col items-start w-full" style={{ gap: "8px" }}>
            {/* Stars */}
            <div style={{ fontSize: "22px", letterSpacing: "4px", color: "#f9f9f9" }}>★ ★ ★ ★ ★</div>
            {/* 97% */}
            <p
              style={{
                fontFamily: "var(--font-anton)",
                fontSize: "36px",
                lineHeight: "48px",
                color: "#f9f9f9",
              }}
            >
              97%
            </p>
            {/* Sub-label */}
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "16px",
                lineHeight: "25px",
                color: "#b3b3b3",
                fontWeight: 400,
              }}
            >
              Clients hire again for future work
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="shrink-0 overflow-hidden flex items-start"
      style={{
        width: "329px",
        height: "437px",
        background: "#272727",
        border: "1px solid #393939",
        borderRadius: "16px",
        padding: "24px 20px",
      }}
    >
      <div className="flex flex-col w-full" style={{ gap: "118px" }}>
        {/* Step number — orange gradient */}
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "28px",
            lineHeight: "26px",
            fontWeight: 400,
            background: "linear-gradient(180deg, #e16d00 28.75%, #9c0f02 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {card.num}
        </p>

        {/* Title + desc */}
        <div className="flex flex-col w-full" style={{ gap: "8px" }}>
          <p
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "36px",
              lineHeight: "48px",
              color: "#f9f9f9",
            }}
          >
            {card.title}
          </p>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "16px",
              lineHeight: "25px",
              color: "#b3b3b3",
              fontWeight: 400,
            }}
          >
            {card.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HorizontalScrollCarousel
