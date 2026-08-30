import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./store";
import { faNum } from "./data";

/* ------------------------------------------------------------------ */
/*  آیکون‌ها — همه SVG درون‌خطی                                          */
/* ------------------------------------------------------------------ */

type IconProps = { size?: number; className?: string; strokeWidth?: number };

const base = (p: IconProps) => ({
  width: p.size ?? 18,
  height: p.size ?? 18,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: p.strokeWidth ?? 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: p.className,
});

export const IconFlame = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2.5c1 3-1.6 4.6-1.6 7.2a3.6 3.6 0 0 0 7.2.5c1.7 1.7 2.4 3.7 2.4 5.6a8 8 0 1 1-16 0c0-4 3-6.6 4.6-9C9.8 4.6 10.5 3 12 2.5z" />
    <path d="M12 21.5a3.8 3.8 0 0 1-3.8-3.8c0-1.9 1.4-3 2.3-4.2.9 1.2 5.3 2 5.3 4.4a3.8 3.8 0 0 1-3.8 3.6z" />
  </svg>
);

export const IconCart = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2.5 3.5h2.2l2.5 12.2a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.3l1.7-8.2H6" />
    <circle cx="9.6" cy="20.4" r="1.4" />
    <circle cx="17.2" cy="20.4" r="1.4" />
  </svg>
);

export const IconSearch = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20.5 20.5-3.8-3.8" />
  </svg>
);

export const IconMenu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h11" />
  </svg>
);

export const IconX = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
  </svg>
);

export const IconPlus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const IconTrash = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 6.5h16M9.5 6V4.5A1.5 1.5 0 0 1 11 3h2a1.5 1.5 0 0 1 1.5 1.5V6M6.5 6.5l.8 12A2 2 0 0 0 9.3 20.5h5.4a2 2 0 0 0 2-1.9l.8-12.1M10 10.5v6M14 10.5v6" />
  </svg>
);

export const IconPencil = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 20h4.5L20 8.5a2.1 2.1 0 0 0-3-3L5.5 17 4 20z" />
    <path d="m14.5 7 3 3" />
  </svg>
);

export const IconArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h16M13.5 5.5 20 12l-6.5 6.5" />
  </svg>
);

export const IconArrowLeft = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 12H4M10.5 5.5 4 12l6.5 6.5" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 5 5L19.5 7" />
  </svg>
);

export const IconAlert = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5 2.5 20h19L12 3.5zM12 10v4.5M12 17.6v.1" />
  </svg>
);

export const IconBox = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4v-9zM3.5 7.5 12 11.5l8.5-4M12 11.5v9" />
  </svg>
);

export const IconTruck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2.5 5.5h11v11h-11zM13.5 9.5H18l3.5 3.5v3.5h-8" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);

export const IconStar = (p: IconProps & { filled?: boolean }) => (
  <svg {...base(p)} fill={p.filled ? "currentColor" : "none"}>
    <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.9-5.2-2.7-5.2 2.7 1-5.9L3.5 9.7l5.9-.9L12 3.5z" />
  </svg>
);

export const IconLogout = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9.5 4.5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3.5M15 8l4 4-4 4M19 12H10" />
  </svg>
);

export const IconChart = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4v16h16M8.5 16v-5M12.5 16V7.5M16.5 16v-3" />
  </svg>
);

export const IconReceipt = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 3.5h12v17l-2.4-1.6-2.4 1.6-2.4-1.6L8.4 20.5 6 18.9v-15.4zM9 8h6M9 11.5h6M9 15h3.5" />
  </svg>
);

export const IconTag = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m3.5 11.5 8-8H20v8.5l-8 8a2 2 0 0 1-2.8 0l-5.7-5.7a2 2 0 0 1 0-2.8zM16 8h.1" />
  </svg>
);

export const IconEye = (p: IconProps & { off?: boolean }) => (
  <svg {...base(p)}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
    {p.off && <path d="M4 20 20 4" />}
  </svg>
);

export const IconLock = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="10.5" width="14" height="10" rx="2" />
    <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7M12 14.5v2.5" />
  </svg>
);

export const IconMapPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21.5s-7-6.3-7-11.5a7 7 0 0 1 14 0c0 5.2-7 11.5-7 11.5z" />
    <circle cx="12" cy="9.8" r="2.6" />
  </svg>
);

export const IconPhone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5.5 3.5h4l1.5 4.5-2.3 1.8a13 13 0 0 0 5.5 5.5l1.8-2.3 4.5 1.5v4a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3.5 5.5a2 2 0 0 1 2-2z" />
  </svg>
);

export const IconMail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const IconLeaf = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15zM5 19c2-4 5-7 9-9" />
  </svg>
);

export const IconShield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21.5s-8-3.6-8-9.5V5.5L12 2.5l8 3v6.5c0 5.9-8 9.5-8 9.5z" />
    <path d="m8.7 11.8 2.4 2.4 4.4-4.6" />
  </svg>
);

export const IconSparkle = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5 14 9.5 20 11.5 14 13.5 12 19.5 10 13.5 4 11.5 10 9.5 12 3.5z" />
    <path d="M18.5 3.5v3.2M16.9 5.1h3.2M5.5 17.3v2.6M4.2 18.6h2.6" />
  </svg>
);

export const IconUsers = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <path d="M15.5 5.6a3.2 3.2 0 0 1 0 4.8M17.6 14.9c1.6.8 2.9 2.4 2.9 4.6" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Scroll reveal                                                      */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  امتیاز ستاره‌ای                                                      */
/* ------------------------------------------------------------------ */

export function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-ember">
      {[1, 2, 3, 4, 5].map((i) => (
        <IconStar key={i} size={size} filled={i <= Math.round(rating)} strokeWidth={1.4} />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Toasts                                                             */
/* ------------------------------------------------------------------ */

export function ToastViewport() {
  const { toasts, dismissToast } = useStore();
  return (
    <div className="fixed bottom-6 start-6 z-[90] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismissToast(t.id)}
          className={`pointer-events-auto flex items-center gap-2.5 rounded-sm border px-4 py-3 text-start text-sm shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-transform hover:-translate-y-0.5 animate-rise cursor-pointer ${
            t.kind === "ok"
              ? "border-ember/40 bg-[#241a0e]/95 text-ember2"
              : t.kind === "warn"
              ? "border-rust bg-[#2a140c]/95 text-[#f0b49a]"
              : "border-line2 bg-panel/95 text-parch"
          }`}
        >
          {t.kind === "ok" ? <IconCheck size={14} /> : t.kind === "warn" ? <IconAlert size={14} /> : <IconFlame size={14} />}
          {t.msg}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  قطعه‌های کوچک                                                        */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  kicker,
  title,
  right,
}: {
  kicker: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6 flex-wrap">
      <div>
        <p className="text-xs font-bold text-copper flex items-center gap-2">
          <span className="inline-block h-px w-8 bg-copper" />
          {kicker}
        </p>
        <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mt-3 text-cream">
          {title}
        </h2>
      </div>
      {right}
    </div>
  );
}

export function QtyStepper({
  qty,
  setQty,
  max = 99,
  compact = false,
}: {
  qty: number;
  setQty: (q: number) => void;
  max?: number;
  compact?: boolean;
}) {
  const btn = `grid place-items-center border border-line2 text-fog hover:text-ember hover:border-ember transition-colors cursor-pointer ${
    compact ? "h-7 w-7" : "h-10 w-10"
  }`;
  return (
    <div className="inline-flex items-stretch" dir="ltr">
      <button aria-label="کاهش تعداد" className={`${btn} rounded-l-sm`} onClick={() => setQty(qty - 1)}>
        <IconMinus size={compact ? 12 : 14} />
      </button>
      <span
        className={`${
          compact ? "h-7 min-w-8 px-1 text-xs" : "h-10 min-w-12 px-2 text-sm"
        } grid place-items-center border-y border-line2 font-bold text-cream bg-panel`}
      >
        {faNum(Math.max(1, Math.min(qty, max)))}
      </span>
      <button
        aria-label="افزایش تعداد"
        className={`${btn} rounded-r-sm`}
        onClick={() => setQty(Math.min(qty + 1, max))}
      >
        <IconPlus size={compact ? 12 : 14} />
      </button>
    </div>
  );
}

export const STATUS_FA: Record<string, string> = {
  pending: "در انتظار",
  shipped: "ارسال شد",
  delivered: "تحویل شد",
  cancelled: "لغو شد",
};

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "text-ember border-ember/40 bg-ember/10",
    shipped: "text-[#8fb8d8] border-[#8fb8d8]/40 bg-[#8fb8d8]/10",
    delivered: "text-jade border-jade/40 bg-jade/10",
    cancelled: "text-[#d98a7a] border-[#d98a7a]/40 bg-[#d98a7a]/10",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[11px] font-semibold ${
        map[status] ?? "text-fog border-line"
      }`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {STATUS_FA[status] ?? status}
    </span>
  );
}
