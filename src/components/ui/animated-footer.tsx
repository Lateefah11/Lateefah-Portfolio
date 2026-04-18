"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface NavColumn {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface AnimatedFooterProps {
  brandName?: string;
  copyright?: string;
  tagline?: string;
  socialLinks?: SocialLink[];
  navColumns?: NavColumn[];
  className?: string;
}

export const AnimatedFooter = ({
  brandName = "LATEEFAH",
  copyright,
  tagline,
  socialLinks = [],
  navColumns = [],
  className,
}: AnimatedFooterProps) => {
  const year = new Date().getFullYear();
  const copyrightText = copyright ?? `© Lateefah Abdulrahman ${year}`;

  return (
    <section
      id="footer-sentinel"
      className={cn("relative w-full overflow-hidden", className)}
      style={{ background: "#000" }}
    >
      <footer>
        {/* ── Top area: copyright+socials left | nav columns right ── */}
        <div
          className="flex flex-col md:flex-row md:justify-between"
          style={{
            padding: "clamp(36px,5vw,60px) clamp(20px,5vw,56px) clamp(44px,6vw,72px)",
          }}
        >
          {/* Left column */}
          <div className="flex flex-col gap-5 mb-12 md:mb-0">
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "13px",
                color: "rgba(255,255,255,0.45)",
                margin: 0,
              }}
            >
              {copyrightText}
            </p>

            {tagline && (
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.25)",
                  margin: 0,
                }}
              >
                {tagline}
              </p>
            )}

            {/* Social icons */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >
                    <div className="w-[18px] h-[18px]">{link.icon}</div>
                    <span className="sr-only">{link.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right: nav columns */}
          {navColumns.length > 0 && (
            <div className="grid grid-cols-2 md:flex md:flex-row gap-x-8 gap-y-8 md:gap-x-[clamp(32px,5vw,72px)]">
              {navColumns.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-[10px]">
                  {/* Column heading */}
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                      margin: 0,
                      marginBottom: "6px",
                    }}
                  >
                    {col.heading}
                  </p>

                  {/* Links */}
                  {col.links.map((link, li) => (
                    <a
                      key={li}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="no-underline transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.6)",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Giant brand name — full width, centered ── */}
        <div
          className="w-full overflow-hidden select-none pointer-events-none text-center"
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "27vw",
            color: "#fff",
            opacity: 1,
            lineHeight: 0.83,
            whiteSpace: "nowrap",
          }}
        >
          {brandName}
        </div>
      </footer>
    </section>
  );
};
