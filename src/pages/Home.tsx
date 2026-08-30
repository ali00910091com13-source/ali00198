import { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, IMG, fmt } from "../data";
import { useStore } from "../store";
import { MarqueeStrip, ProductCard } from "../chrome";
import { IconArrowRight, IconFlame, IconLeaf, Reveal, SectionHeading } from "../ui";

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
      {/* ============ OPENING — the lounge door ============ */}
      <section className="relative overflow-hidden">
        {/* giant ghost word */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-full max-w-7xl px-8 pointer-events-none select-none">
          <span className="font-display text-[21vw] leading-none text-outline-faint whitespace-nowrap opacity-50">
            EST. 2011
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-20 pb-16 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
          {/* left — type stack */}
          <div className="relative">
            <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-copper flex items-center gap-3">
              <IconFlame size={14} className="text-ember animate-flicker" />
              Purveyors of fine tobacco
            </p>
            <h1 className="mt-5 font-display leading-[0.82] tracking-wide">
              <span className="block text-[17vw] sm:text-8xl lg:text-[7.5rem] text-outline animate-rise">
                SMOKE
              </span>
              <span className="block text-[17vw] sm:text-8xl lg:text-[7.5rem] text-cream animate-rise" style={{ animationDelay: "120ms" }}>
                CITY<span className="text-ember">.</span>
              </span>
            </h1>
            <p className="mt-6 max-w-md text-fog leading-relaxed text-[15px] animate-rise" style={{ animationDelay: "220ms" }}>
              A cellar of slow-burning things: Cuban leaf, Calabrian briar, Istanbul glass.
              Everything aged under our own roof, packed by hand, and shipped to your door
              with the ID check it deserves.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 animate-rise" style={{ animationDelay: "300ms" }}>
              <Link to="/shop" className="btn-ember">
                Enter the shop <IconArrowRight size={14} />
              </Link>
              <Link to="/about" className="btn-ghost">
                Our craft
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 max-w-md border-t border-line pt-6 gap-4 animate-rise" style={{ animationDelay: "380ms" }}>
              {[
                ["14", "Years cellaring"],
                ["31", "Countries sourced"],
                ["69%", "Humidor humidity"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-4xl text-ember leading-none">{n}</dt>
                  <dd className="font-mono text-[10px] tracking-[0.18em] uppercase text-ash mt-1.5">{l}</dd>
                </div>
              ))}
            </dl>

            {/* vertical side label */}
            <span className="hidden lg:block absolute -left-24 top-10 font-mono text-[10px] tracking-[0.4em] uppercase text-ash rotate-180 [writing-mode:vertical-rl]">
              London · E1 — Coal Exchange Square
            </span>
          </div>

          {/* right — arched hero */}
          <div className="relative animate-rise" style={{ animationDelay: "200ms" }}>
            <div className="absolute -inset-6 arch-frame border border-line2/50 pointer-events-none" />
            <div className="relative arch-frame overflow-hidden border border-line2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
              <img
                src={IMG.hero}
                alt="Premium cigars resting in a cedar box with rising smoke"
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
                    <span className="block font-mono text-[9px] tracking-[0.22em] uppercase text-copper">This month's pour</span>
                    <span className="block font-display text-xl tracking-wide text-cream group-hover:text-ember2 transition-colors leading-tight">
                      {heroPick.name}
                    </span>
                  </span>
                  <span className="font-mono text-sm text-ember2">{fmt(heroPick.price)}</span>
                  <span className="text-fog group-hover:text-ember group-hover:translate-x-1 transition-all">
                    <IconArrowRight size={18} />
                  </span>
                </Link>
              )}
            </div>
            {/* floating flame chip */}
            <div className="absolute -top-4 -right-3 bg-ember text-[#211507] font-mono text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-2 rounded-sm rotate-3 shadow-[0_14px_34px_-10px_rgba(232,163,74,0.6)]">
              Aged on site
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ============ HOUSE FAVOURITES ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-20">
        <Reveal>
          <SectionHeading
            kicker="From the cellar"
            title="House Favourites"
            right={
              <Link to="/shop" className="btn-ghost mb-1">
                View all {products.length} items <IconArrowRight size={14} />
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

      {/* ============ CATEGORY INDEX ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-24">
        <Reveal>
          <SectionHeading kicker="Find your smoke" title="The Departments" />
        </Reveal>
        <ul className="mt-10 border-t border-line">
          {catCounts.map(({ cat, count }, i) => (
            <Reveal as="li" key={cat} delay={i * 60}>
              <Link
                to={`/shop?cat=${encodeURIComponent(cat)}`}
                className="group flex items-center justify-between gap-6 py-6 border-b border-line transition-all duration-300 hover:bg-panel/70 hover:px-5"
              >
                <div className="flex items-center gap-6 min-w-0">
                  <span className="font-mono text-xs text-copper w-8 shrink-0">0{i + 1}</span>
                  <span className="font-display text-4xl md:text-6xl tracking-wide text-fog group-hover:text-ember transition-colors truncate">
                    {cat}
                  </span>
                </div>
                <div className="flex items-center gap-5 shrink-0">
                  <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-ash">
                    {count} item{count === 1 ? "" : "s"}
                  </span>
                  <span className="h-11 w-11 grid place-items-center rounded-full border border-line2 text-fog group-hover:border-ember group-hover:text-ember group-hover:rotate-[-45deg] transition-all duration-300">
                    <IconArrowRight size={17} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ============ THE CRAFT ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-24 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="arch-frame overflow-hidden border border-line">
              <img
                src={IMG.humidor}
                alt="Cedar vault humidor with cigars inside"
                className="w-full h-[420px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 md:-right-6 border border-line bg-coal/95 backdrop-blur-sm rounded-sm p-4 w-52 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.8)]">
              <p className="font-display text-3xl text-ember leading-none">26<span className="text-xl">yrs</span></p>
              <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-ash mt-1.5 leading-relaxed">
                Oldest briar blank in the workshop
              </p>
            </div>
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionHeading kicker="Why smoke city" title="Everything Aged Under Our Roof" />
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-fog leading-relaxed max-w-lg text-[15px]">
              Most shops sell what the distributor sends. We buy green leaf and raw briar,
              then spend months — sometimes years — making it worth your lighter. Temperature,
              humidity and patience do the work; we just keep the ledger.
            </p>
          </Reveal>
          <ul className="mt-8 space-y-5 max-w-lg">
            {[
              {
                icon: <IconLeaf size={18} />,
                title: "Single-origin, single-farm",
                body: "Every tobacco lot is traceable to the farm it was cut on. Ask us, we'll show you the manifest.",
              },
              {
                icon: <IconFlame size={18} />,
                title: "Lit by hand, every batch",
                body: "Our cellar master test-smokes each arrival before it earns shelf space. Roughly 1 in 6 lots get rejected.",
              },
              {
                icon: <IconArrowRight size={18} />,
                title: "Shipped the day it's ordered",
                body: "Orders leave before 16:00 the same day, in cedar-lined boxes with a two-way humidity pack.",
              },
            ].map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 90} className="flex gap-4 border border-line bg-panel/60 rounded-sm p-5 hover:border-line2 transition-colors">
                <span className="h-11 w-11 shrink-0 grid place-items-center rounded-sm bg-ember/10 border border-ember/30 text-ember">
                  {f.icon}
                </span>
                <span>
                  <span className="block font-display text-xl tracking-wide text-cream">{f.title}</span>
                  <span className="block text-sm text-fog mt-1 leading-relaxed">{f.body}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-24">
        <Reveal>
          <div className="relative overflow-hidden border border-line bg-panel/70 rounded-sm px-6 md:px-12 py-12 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background: "radial-gradient(60% 120% at 90% 0%, rgba(232,163,74,0.16), transparent 60%)",
              }}
            />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-copper">The Ember Letter</p>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide text-cream mt-3 leading-[0.95]">
                New arrivals land first in your inbox
              </h2>
              <p className="text-sm text-fog mt-3 max-w-md">
                One letter a month: what the cellar just took in, what's nearly gone, and one
                pairing worth your evening. No noise.
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
          toast("That email doesn't look right", "warn");
          return;
        }
        setEmail("");
        toast("Welcome to the Ember Letter", "ok");
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@postbox.com"
        className="field flex-1"
      />
      <button className="btn-ember shrink-0" type="submit">
        Join
      </button>
    </form>
  );
}
