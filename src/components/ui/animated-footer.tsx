"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface AnimatedFooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  email?: string;
  className?: string;
}

export const AnimatedFooter = ({
  brandName = "TEE",
  brandDescription = "Product designer crafting thoughtful, scalable digital experiences.",
  socialLinks = [],
  navLinks = [],
  email,
  className,
}: AnimatedFooterProps) => {
  return (
    <section id="footer-sentinel" className={cn("relative w-full mt-0 overflow-hidden bg-black", className)}>
      <footer className="border-t border-white/10 bg-black relative">
        <div className="max-w-7xl flex flex-col justify-between mx-auto relative p-4 py-10" style={{ minHeight: "100vh" }}>

          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center">

              {/* Brand name */}
              <div className="space-y-3 flex flex-col items-center flex-1">
                <span
                  className="text-white text-3xl"
                  style={{ fontFamily: "var(--font-anton)", fontSize: "clamp(28px,4vw,40px)" }}
                >
                  {brandName}
                </span>
                <p
                  className="text-center max-w-sm px-4 sm:px-0"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "14px",
                    lineHeight: "1.65",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {brandDescription}
                </p>
              </div>

              {/* Social links */}
              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-5 gap-5">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#e16d00")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                    >
                      <div className="w-5 h-5 hover:scale-110 duration-300">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </a>
                  ))}
                </div>
              )}

              {/* Nav links */}
              {navLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-6 px-4">
                  {navLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="transition-colors duration-300 no-underline"
                      style={{
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.45)",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-20 md:mt-24 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0">
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
        </div>

        {/* Large background brand text */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none select-none text-center leading-none overflow-hidden"
          style={{
            fontSize: "clamp(100px, 28vw, 350px)",
            width: "100%",
            height: "clamp(80px, 20vw, 260px)",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "var(--font-anton)",
          }}
        >
          LATEEFAH
        </div>

      </footer>
    </section>
  );
};
