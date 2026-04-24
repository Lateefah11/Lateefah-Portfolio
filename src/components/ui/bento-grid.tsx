"use client";

import { cn } from "@/lib/utils";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

interface BentoGridProps {
  items: BentoItem[];
}

function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-7xl mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative p-5 rounded-2xl overflow-hidden transition-all duration-300",
            "border border-white/10 bg-[#111111]",
            "hover:-translate-y-0.5 will-change-transform",
            "col-span-1",
            item.hasPersistentHover && "-translate-y-0.5"
          )}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
        >
          {/* Dot-grid overlay on hover */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:4px_4px]" />
          </div>

          <div className="relative flex flex-col space-y-4">
            {/* Icon + status row */}
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/8 group-hover:bg-white/12 transition-all duration-300">
                {item.icon}
              </div>
              {item.status && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/8 text-white/50 transition-colors duration-300 group-hover:bg-white/14 group-hover:text-white/70">
                  {item.status}
                </span>
              )}
            </div>

            {/* Title + description */}
            <div className="space-y-2">
              <h3
                className="text-white font-semibold tracking-tight text-[15px] leading-snug"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {item.title}
                {item.meta && (
                  <span className="ml-2 text-xs text-white/35 font-normal">
                    {item.meta}
                  </span>
                )}
              </h3>
              <p
                className="text-sm text-white/45 leading-relaxed"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {item.description}
              </p>
            </div>

            {/* Tags + CTA row */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/35">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md bg-white/6 transition-all duration-200 hover:bg-white/12 hover:text-white/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Gradient border glow on hover */}
          <div
            className={cn(
              "absolute inset-0 -z-10 rounded-2xl p-px bg-gradient-to-br from-transparent via-white/8 to-transparent",
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100",
              "transition-opacity duration-300"
            )}
          />
        </div>
      ))}
    </div>
  );
}

export { BentoGrid };
