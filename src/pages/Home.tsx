import { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, faNum, fmt, IMG } from "../data";
import { useStore } from "../store";
import { MarqueeStrip, ProductCard } from "../chrome";
import { IconArrowLeft, IconFlame, IconLeaf, Reveal, SectionHeading } from "../ui";

export default function Home() {
  const { products } = useStore();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const heroPick = featured[0] ?? products[0];

  const catCounts = CATEGORIES.map((c) => ({
    cat: c,
    count: products.filter((p) => p.category === c).length,
  }));

  return (
    <main className="relative z-10">
      {/* ============ افتتاحیه — درِ سالن ============ */}
      <section className="relative overflow-hidden">
        {/* کلمهٔ شبح پس‌زمینه */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-full max-w-7xl px-8 pointer-events-none select-none">
          <span className="font-latin text-[17vw] leading-none text-outline-faint whitespace-nowrap opacity-50 tracking-wide">
            EST. 2011
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-20 pb-16 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
          {/* ستون تایپوگرافی */}
          <div className="relative">
            <p className="text-xs font-bold text-copper flex items-center gap-3">
              <IconFlame size={14} className="text-ember animate-flicker" />
              عرضه‌کنندهٔ دخانیات خاص
            </p>
            <h1 className="mt-4 font-display leading-[1.02]">
              <span className="block text-[19vw] sm:text-8xl lg:text-[7rem] text-outline animate-rise">
                اسموک
              </span>
              <span className="block text-[19vw] sm:text-8xl lg:text-[7rem] text-cream animate-rise" style={{ animationDelay: "120ms" }}>
                سیتی<span className="text-ember">.</span>
              </span>
            </h1>
            <p className="mt-6 max-w-md text-fog leading-relaxed text-[15px] animate-rise" style={{ animationDelay: "220ms" }}>
              سردابه‌ای از چیزهای آرام‌سوز: برگ کوبایی، بریار کالابریا، شیشهٔ استانبول. همه‌چیز زیر
              سقف خودمان کهنه می‌شود، با دست بسته‌بندی می‌شود و با همان کنترلِ سن و سالی که
              حقش است، به درِ خانه‌تان می‌رسد.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 animate-rise" style={{ animationDelay: "300ms" }}>
              <Link to="/shop" className="btn-ember">
                ورود به فروشگاه <IconArrowLeft size={14} />
              </Link>
              <Link to="/about" className="btn-ghost">
                هنرِ دود
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 max-w-md border-t border-line pt-6 gap-4 animate-rise" style={{ animationDelay: "380ms" }}>
              {[
                [faNum(14), "سال کهنه‌سازی"],
                [faNum(31), "کشور مبدأ"],
                ["۶۹٪", "رطوبت هیومیدار"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-4xl text-ember leading-none">{n}</dt>
                  <dd className="text-[11px] font-semibold text-ash mt-1.5">{l}</dd>
                </div>
              ))}
            </dl>

            {/* برچسب عمودی کناری */}
            <span className="hidden lg:block absolute -right-24 top-10 font-latin text-[10px] tracking-[0.4em] text-ash rotate-180 [writing-mode:vertical-rl]">
              TEHRAN · VALIASR ST — NO. 14
            </span>
          </div>

          {/* قاب قوسی تصویر */}
          <div className="relative animate-rise" style={{ animationDelay: "200ms" }}>
            <div className="absolute -inset-6 arch-frame border border-line2/50 pointer-events-none" />
            <div className="relative arch-frame overflow-hidden border border-line2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
              <img
                src={IMG.hero}
                alt="سیگار برگ‌های ممتاز در جعبهٔ سدر با دودی که بلند می‌شود"
                className="w-full h-[420px] sm:h-[520px] lg:h-[560px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              {heroPick && (
                <Link
                  to={`/product/${heroPick.id}`}
                  className="absolute bottom-5 left-5 right-5 flex items-center gap-4 border border-line2 bg-ink/80 backdrop-blur-md rounded-sm p-3.5 group hover:border-ember transition-colors"
                >
                  <img src={heroPick.image} alt="" className="h-14 w-14 object-cover rounded-sm border border-line" />
                  <span className="flex-1">
                    <span className="block text-[9px] font-bold text-copper">پیشنهاد این ماه</span>
                    <span className="block font-display text-xl text-cream group-hover:text-ember2 transition-colors leading-tight">
                      {heroPick.name}
                    </span>
                  </span>
                  <span className="text-sm font-bold text-ember2">{fmt(heroPick.price)}</span>
                  <span className="text-fog group-hover:text-ember group-hover:-translate-x-1 transition-all">
                    <IconArrowLeft size={18} />
                  </span>
                </Link>
              )}
            </div>
            {/* برچسب شناور */}
            <div className="absolute -top-4 -left-3 bg-ember text-[#211507] text-[10px] font-bold px-3 py-2 rounded-sm -rotate-3 shadow-[0_14px_34px_-10px_rgba(232,163,74,0.6)]">
              کهنه‌سازی در محل
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ============ علاقه‌مندی‌های خانه ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-20">
        <Reveal>
          <SectionHeading
            kicker="از سردابه"
            title="علاقه‌مندی‌های خانه"
            right={
              <Link to="/shop" className="btn-ghost mb-1">
                دیدن همهٔ {faNum(products.length)} قلم <IconArrowLeft size={14} />
              </Link>
            }
          />
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ ایندکس دسته‌ها ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-24">
        <Reveal>
          <SectionHeading kicker="دودِ خودت را پیدا کن" title="دپارتمان‌ها" />
        </Reveal>
        <ul className="mt-10 border-t border-line">
          {catCounts.map(({ cat, count }, i) => (
            <Reveal as="li" key={cat} delay={i * 60}>
              <Link
                to={`/shop?cat=${encodeURIComponent(cat)}`}
                className="group flex items-center justify-between gap-6 py-6 border-b border-line transition-all duration-300 hover:bg-panel/70 hover:px-5"
              >
                <div className="flex items-center gap-6 min-w-0">
                  <span className="font-latin text-xs text-copper w-8 shrink-0">0{i + 1}</span>
                  <span className="font-display text-4xl md:text-6xl text-fog group-hover:text-ember transition-colors truncate leading-[1.1]">
                    {cat}
                  </span>
                </div>
                <div className="flex items-center gap-5 shrink-0">
                  <span className="text-[11px] font-semibold text-ash">
                    {faNum(count)} قلم
                  </span>
                  <span className="h-11 w-11 grid place-items-center rounded-full border border-line2 text-fog group-hover:border-ember group-hover:text-ember group-hover:rotate-[45deg] transition-all duration-300">
                    <IconArrowLeft size={17} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ============ هنرِ ما ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-24 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="arch-frame overflow-hidden border border-line">
              <img
                src={IMG.humidor}
                alt="هیومیدار صندوقچهٔ سدر پر از سیگار برگ"
                className="w-full h-[420px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-5 -left-3 md:-left-6 border border-line bg-coal/95 backdrop-blur-sm rounded-sm p-4 w-52 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.8)]">
              <p className="font-display text-3xl text-ember leading-none">{faNum(26)}<span className="text-xl"> سال</span></p>
              <p className="text-[10px] font-semibold text-ash mt-1.5 leading-relaxed">
                سنِ قدیمی‌ترین بلانکِ بریار کارگاه
              </p>
            </div>
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionHeading kicker="چرا اسموک سیتی" title="همه‌چیز زیر سقف خودمان کهنه می‌شود" />
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-fog leading-relaxed max-w-lg text-[15px]">
              بیشتر فروشگاه‌ها همان را می‌فروشند که پخش‌کننده می‌فرستد. ما برگِ سبز و بریارِ خام
              می‌خریم، بعد ماه‌ها — گاهی سال‌ها — وقت می‌گذاریم تا ارزش فندکِ شما را داشته باشد.
              دما، رطوبت و صبر کارشان را می‌کنند؛ ما فقط دفترش را نگه می‌داریم.
            </p>
          </Reveal>
          <ul className="mt-8 space-y-5 max-w-lg">
            {[
              {
                icon: <IconLeaf size={18} />,
                title: "تک‌خاستگاه، تک‌مزرعه",
                body: "هر محمولهٔ توتون تا مزرعه‌ای که دریده شده قابل ردیابی است. بپرسید تا بارنامه‌اش را نشانتان بدهیم.",
              },
              {
                icon: <IconFlame size={18} />,
                title: "هر سری، با دست روشن می‌شود",
                body: "سرپرست سردابهٔ ما هر محمولهٔ تازه را قبل از راه‌یافتن به قفسه تست می‌کند. از هر ۶ محموله تقریباً یکی رد می‌شود.",
              },
              {
                icon: <IconArrowLeft size={18} />,
                title: "همان روزِ سفارش، ارسال",
                body: "سفارش‌ها قبل از ساعت ۱۶ همان روز راه می‌افتند؛ در جعبه‌های روکش‌سدر با بستهٔ رطوبت دوطرفه.",
              },
            ].map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 90} className="flex gap-4 border border-line bg-panel/60 rounded-sm p-5 hover:border-line2 transition-colors">
                <span className="h-11 w-11 shrink-0 grid place-items-center rounded-sm bg-ember/10 border border-ember/30 text-ember">
                  {f.icon}
                </span>
                <span>
                  <span className="block font-display text-xl text-cream">{f.title}</span>
                  <span className="block text-sm text-fog mt-1 leading-relaxed">{f.body}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ خبرنامه ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-24">
        <Reveal>
          <div className="relative overflow-hidden border border-line bg-panel/70 rounded-sm px-6 md:px-12 py-12 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background: "radial-gradient(60% 120% at 10% 0%, rgba(232,163,74,0.16), transparent 60%)",
              }}
            />
            <div className="relative">
              <p className="text-xs font-bold text-copper">نامهٔ اِمبِر</p>
              <h2 className="font-display text-4xl md:text-5xl text-cream mt-3 leading-[1.1]">
                تازه‌ها اول سر از صندوق شما درمی‌آورند
              </h2>
              <p className="text-sm text-fog mt-3 max-w-md leading-relaxed">
                ماهی یک نامه: سردابه چه چیزهایی تازه گرفته، چه چیزهایی رو به اتمام است، و یک
                جفت‌و‌جور که ارزش یک عصر را دارد. بدون سروصدا.
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
          toast("این ایمیل درست به نظر نمی‌رسد", "warn");
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
        className="field flex-1"
        dir="ltr"
      />
      <button className="btn-ember shrink-0" type="submit">
        عضویت
      </button>
    </form>
  );
}
