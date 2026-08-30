import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, faD, faNum, fmt, IMG } from "../data";
import { useStore } from "../store";
import { MarqueeStrip, ProductCard } from "../chrome";
import {
  IconArrowLeft,
  IconCheck,
  IconFlame,
  IconLeaf,
  IconShield,
  IconSparkle,
  IconTruck,
  IconUsers,
  Reveal,
  SectionHeading,
} from "../ui";

/* آیکون موج‌دار نارنجیِ امضای تم */
const Squiggle = () => (
  <svg width="30" height="20" viewBox="0 0 81 48" fill="none" className="shrink-0">
    <path
      d="M71.16 43C81.45 32.24 74.3 5 59.35 5C38.58 5 39.4 43 19.04 43C4.09 43 0.6 15.76 10.89 5"
      stroke="#F59520"
      strokeWidth="9"
      strokeLinecap="round"
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  اسلایدر قهرمان                                                      */
/* ------------------------------------------------------------------ */

const SLIDES = [
  { image: IMG.hero, cat: "سیگار برگ", title: "سیگار برگ‌های کهنه‌شده", desc: "از هاوانا تا والنسیا" },
  { image: IMG.hookah, cat: "قلیان", title: "قلیان میدنایت", desc: "شیشهٔ استانبول، کامِ نرم" },
  { image: IMG.pipe, cat: "پیپ", title: "پیپ‌های تراشِ دست", desc: "بریارِ کالابریا" },
];

function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 5000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line">
      <div className="relative h-[340px] sm:h-[440px] lg:h-[520px]">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === active ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-ink/90 via-ink/40 to-transparent" />
            <div className="absolute inset-y-0 start-0 w-full md:w-2/3 flex flex-col justify-center px-7 md:px-14 z-10">
              <span className="w-fit bg-ember text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
                {s.cat}
              </span>
              <h2 className="font-display text-4xl md:text-6xl text-white mt-4 leading-[1.05] drop-shadow-lg">
                {s.title}
              </h2>
              <p className="text-white/90 mt-3 text-sm md:text-base font-semibold">{s.desc}</p>
              <Link to={`/shop?cat=${encodeURIComponent(s.cat)}`} className="btn-ember mt-6 w-fit">
                دیدن محصولات <IconArrowLeft size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* نقاط ناوبری */}
      <div className="absolute bottom-5 inset-x-0 z-20 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`اسلاید ${faNum(i + 1)}`}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === active ? "w-8 bg-ember" : "w-2.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  شمارش معکوس                                                         */
/* ------------------------------------------------------------------ */

function useCountdown() {
  const target = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    d.setHours(23, 59, 59, 0);
    return d.getTime();
  }, []);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/* ------------------------------------------------------------------ */
/*  صفحهٔ اصلی                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  const { products } = useStore();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const offers = products.filter((p) => p.oldPrice).slice(0, 6);
  const newest = [...products].slice(0, 8);

  const catCounts = CATEGORIES.map((c) => ({
    cat: c,
    count: products.filter((p) => p.category === c).length,
  }));

  const countdown = useCountdown();

  const features = [
    { icon: <IconTruck size={20} />, title: "ارسال به سراسر کشور", desc: "با پست پیشتاز" },
    { icon: <IconFlame size={20} />, title: "ارسال سریع سفارش‌ها", desc: "پس از ثبت سفارش" },
    { icon: <IconCheck size={20} />, title: "خرید حضوری", desc: "خرید و مشاورهٔ حضوری" },
    { icon: <IconUsers size={20} />, title: "مشاورهٔ قبل از خرید", desc: "با تماس و پشتیبانی" },
    { icon: <IconShield size={20} />, title: "ضمانت اصالت", desc: "تضمین کیفیت و اصالت" },
    { icon: <IconSparkle size={20} />, title: "رضایت مشتریان", desc: "رضایت حداکثری خریداران" },
  ];

  return (
    <main className="relative z-10">
      {/* ============ اسلایدر ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-6">
        <Reveal>
          <HeroSlider />
        </Reveal>
      </section>

      {/* ============ معرفی + مزایا ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-16 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative">
            <h1 className="font-display text-4xl md:text-6xl leading-[1.1] text-cream">
              <span className="ns-gradienttitle">اسموک سیتی </span>
              برترین فروشگاه
              <br />
              دخانیات خاص و لوازم جانبی
            </h1>
            <ul className="mt-8 space-y-4">
              {[
                "امکان خرید حضوری و مشاورهٔ تخصصی",
                "ارسال سریع به تمام نقاط ایران",
                "با ضمانت اصالت و بهترین کیفیت",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3.5">
                  <Squiggle />
                  <span className="text-parch font-semibold text-[15px]">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Link to="/shop?sale=1" className="btn-ember">
                <IconSparkle size={16} /> تخفیفات ویژه
              </Link>
              <Link to="/shop" className="btn-ghost">
                جدیدترین محصولات
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            <span className="absolute -top-6 -start-4 text-ember animate-spin-slow z-10">
              <IconSparkle size={42} strokeWidth={1.4} />
            </span>
            <div className="rounded-3xl overflow-hidden border border-line shadow-[0_30px_70px_-30px_rgba(35,39,47,0.35)]">
              <img
                src={IMG.humidor}
                alt="هیومیدار سدر با سیگار برگ"
                className="w-full h-[380px] md:h-[460px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -end-3 md:-end-6 soft-card p-4 w-52 shadow-[0_20px_50px_-16px_rgba(35,39,47,0.3)]">
              <p className="font-display text-3xl text-ember leading-none">
                {faNum(26)}<span className="text-lg"> سال</span>
              </p>
              <p className="text-[11px] font-bold text-ash mt-1.5 leading-relaxed">
                کهنه‌ترین بریارِ کارگاه ما
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ چرا اسموک سیتی؟ ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-24">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl text-cream leading-[1.05]">
              چرا <span className="ns-gradienttitle">اسموک سیتی؟</span>
            </h2>
            <p className="text-fog mt-4 text-sm md:text-[15px] leading-relaxed font-semibold">
              ما در اسموک سیتی با ارائهٔ محصولات اصل و پشتیبانی مطمئن، تجربهٔ خریدی متفاوت و
              رضایت‌بخش را برای شما فراهم می‌کنیم.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <div className="soft-card p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-ember/50 hover:shadow-[0_20px_44px_-20px_rgba(245,149,32,0.35)] group">
                <span className="inline-grid place-items-center h-14 w-14 rounded-full bg-ember/10 text-ember border border-ember/25 group-hover:bg-ember group-hover:text-white transition-colors duration-300">
                  {f.icon}
                </span>
                <h3 className="font-bold text-cream mt-4 text-[15px]">{f.title}</h3>
                <p className="text-xs text-fog mt-1.5 font-semibold">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <MarqueeStrip />

      {/* ============ بنرهای دسته‌بندی ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-14">
        <Reveal>
          <SectionHeading kicker="دپارتمان‌ها" title="دسته‌بندی محصولات" />
        </Reveal>
        <div className="mt-9 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {catCounts.map(({ cat, count }, i) => {
            const img = products.find((p) => p.category === cat)?.image ?? IMG.hero;
            return (
              <Reveal key={cat} delay={i * 60}>
                <Link
                  to={`/shop?cat=${encodeURIComponent(cat)}`}
                  className="group relative block rounded-2xl overflow-hidden border border-line h-44 md:h-56"
                >
                  <img src={img} alt={cat} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cream/85 via-cream/25 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <p className="font-display text-xl md:text-2xl text-white leading-tight drop-shadow">{cat}</p>
                    <p className="text-white/85 text-[11px] font-bold mt-0.5">{faNum(count)} محصول</p>
                  </div>
                  <span className="absolute top-3 start-3 h-9 w-9 grid place-items-center rounded-full bg-white/90 text-ember opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <IconArrowLeft size={16} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ پیشنهادات شگفت‌انگیز + شمارش معکوس ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-20">
        <Reveal>
          <div className="soft-card overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-l from-ember/15 via-transparent to-transparent px-6 md:px-9 py-7 border-b border-line">
              <div className="flex items-center gap-4">
                <span className="h-12 w-12 grid place-items-center rounded-2xl bg-ember text-white shrink-0">
                  <IconSparkle size={24} />
                </span>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl text-cream leading-[1.05]">
                    <span className="ns-gradienttitle">پیشنهادات </span>شگفت‌انگیز
                  </h2>
                  <p className="text-fog text-xs font-bold mt-1">تخفیف‌های محدود — تا تمام شدن موجودی</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5" dir="ltr">
                {[
                  { v: countdown.days, l: "روز" },
                  { v: countdown.hours, l: "ساعت" },
                  { v: countdown.minutes, l: "دقیقه" },
                  { v: countdown.seconds, l: "ثانیه" },
                ].map((t) => (
                  <div key={t.l} className="text-center bg-cream text-white rounded-xl px-3.5 py-2 min-w-[64px]">
                    <p className="font-display text-2xl leading-none">{faD(String(t.v).padStart(2, "0"))}</p>
                    <p className="text-[10px] font-bold opacity-80 mt-1">{t.l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 md:p-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {offers.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <ProductCard product={p} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ جدیدترین محصولات ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-20">
        <Reveal>
          <SectionHeading
            kicker="تازه‌های سردابه"
            title="جدیدترین محصولات"
            right={
              <Link to="/shop" className="btn-ghost mb-1">
                دیدن همه <IconArrowLeft size={14} />
              </Link>
            }
          />
        </Reveal>
        <div className="mt-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {newest.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 70}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ علاقه‌مندی‌های خانه ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-20">
        <Reveal>
          <SectionHeading kicker="از سردابه" title="علاقه‌مندی‌های خانه" />
        </Reveal>
        <div className="mt-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ خبرنامه ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-cream text-white px-6 md:px-12 py-12 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{ background: "radial-gradient(60% 120% at 90% 0%, rgba(245,149,32,0.7), transparent 60%)" }}
            />
            <div className="relative">
              <p className="text-xs font-bold text-ember">نامهٔ اِمبِر</p>
              <h2 className="font-display text-3xl md:text-4xl text-white mt-3 leading-[1.1]">
                تازه‌ها اول به صندوق شما می‌رسند
              </h2>
              <p className="text-sm text-white/75 mt-3 max-w-md leading-relaxed font-semibold">
                ماهی یک نامه: آنچه سردابه تازه گرفته، آنچه رو به اتمام است و یک پیشنهاد ویژه. بدون اسپم.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function NewsletterForm() {
  const { toast } = useStore();
  const [email, setEmail] = useState("");
  return (
    <form
      className="relative flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          toast("این ایمیل درست به‌نظر نمی‌رسد", "warn");
          return;
        }
        setEmail("");
        toast("به نامهٔ اِمبِر خوش آمدید", "ok");
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@postbox.com"
        dir="ltr"
        className="field flex-1 !bg-white/10 !border-white/25 !text-white placeholder:!text-white/50 focus:!bg-white/15"
      />
      <button className="btn-ember shrink-0" type="submit">
        عضویت
      </button>
    </form>
  );
}
