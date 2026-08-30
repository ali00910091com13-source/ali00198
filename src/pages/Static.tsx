import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store";
import {
  IconArrowRight,
  IconFlame,
  IconLeaf,
  IconMail,
  IconMapPin,
  IconPhone,
  Reveal,
  SectionHeading,
} from "../ui";
import { IMG } from "../data";

/* ------------------------------------------------------------------ */
/*  About — The Craft                                                  */
/* ------------------------------------------------------------------ */

export function About() {
  return (
    <main className="relative z-10">
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-16">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-copper flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-copper" />
          Since 2011
        </p>
        <h1 className="font-display leading-[0.85] tracking-wide mt-5 max-w-4xl">
          <span className="block text-7xl md:text-8xl text-cream">A SHOP BUILT</span>
          <span className="block text-7xl md:text-8xl text-outline">AROUND PATIENCE</span>
        </h1>
        <p className="mt-7 max-w-xl text-fog leading-relaxed text-[15px]">
          Smoke City started as a single humidor in the back of a Coal Exchange Square
          cobbler's shop. The cobbler is long gone. The humidor — serial 001, cedar,
          slightly crooked lid — still sets the humidity for everything we sell.
        </p>
      </section>

      {/* timeline */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-20 grid lg:grid-cols-2 gap-14">
        <Reveal>
          <div className="relative">
            <div className="arch-frame overflow-hidden border border-line">
              <img
                src={IMG.hero}
                alt="Cigars and smoke in the cellar"
                className="w-full h-[420px] md:h-[540px] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 border border-line bg-coal/95 backdrop-blur-sm rounded-sm px-5 py-4 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.8)]">
              <p className="font-display text-3xl text-ember leading-none">Humidor №001</p>
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-ash mt-1">
                Still in service — cellar floor, London
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading kicker="The ledger" title="Fourteen Years, Six Chapters" />
          </Reveal>
          <ol className="mt-9 relative border-l border-line2 ml-2 space-y-8">
            {[
              ["2011", "One humidor, one shelf", "Edwin Marsh opens with 40 Cuban cigars and a hand-painted sign."],
              ["2014", "The pipe room", "A briar workshop opens upstairs. First house-blend tobacco, Golden Hour, is mixed by accident and kept on purpose."],
              ["2017", "The cellar goes deep", "We lease the vaults under the square: 1,900 sq ft of cedar-lined aging rooms."],
              ["2020", "The Ember Letter", "The shop closes its doors but the cellar never does. Mail order saves the year."],
              ["2023", "Istanbul glass", "A partnership with a third-generation hookah glassblower brings the Midnight line in-house."],
              ["Today", "Still small on purpose", "Eight people, two rooms of smoke, and a rule: if we wouldn't smoke it, we don't sell it."],
            ].map(([year, title, body], i) => (
              <Reveal as="li" key={year} delay={i * 70} className="pl-7 relative">
                <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-ink border-2 border-ember" />
                <p className="font-mono text-xs tracking-[0.22em] text-copper uppercase">{year}</p>
                <h3 className="font-display text-2xl tracking-wide text-cream mt-1">{title}</h3>
                <p className="text-sm text-fog mt-1.5 leading-relaxed max-w-md">{body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* values */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-24">
        <Reveal>
          <SectionHeading kicker="House rules" title="What We Refuse To Do" />
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {[
            {
              icon: <IconLeaf size={20} />,
              title: "No mystery leaf",
              body: "Every pouch and box lists its farm, harvest year and curing method. If a supplier can't tell us, we don't buy.",
            },
            {
              icon: <IconFlame size={20} />,
              title: "No sale to minors — ever",
              body: "ID at checkout, ID at the door, ID on returns. Our couriers are contracted to refuse handover without it.",
            },
            {
              icon: <IconArrowRight size={20} />,
              title: "No dark patterns",
              body: "Prices include everything except shipping. No subscription traps, no fake countdowns. The tobacco is slow; the checkout shouldn't be sneaky.",
            },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 90} className="border border-line bg-panel/60 rounded-sm p-7 hover:border-ember/50 hover:-translate-y-1 transition-all duration-300">
              <span className="inline-grid place-items-center h-12 w-12 rounded-sm bg-ember/10 border border-ember/30 text-ember">
                {v.icon}
              </span>
              <h3 className="font-display text-2xl tracking-wide text-cream mt-5">{v.title}</h3>
              <p className="text-sm text-fog mt-2 leading-relaxed">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

export function Contact() {
  const { toast } = useStore();
  const [form, setForm] = useState({ name: "", email: "", topic: "Order question", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 10) {
      toast("Please fill in name, a valid email and a longer message", "warn");
      return;
    }
    setSent(true);
    toast("Message sent — we reply within one business day", "ok");
  };

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-16">
      <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-copper flex items-center gap-3">
        <span className="inline-block h-px w-8 bg-copper" />
        Get in touch
      </p>
      <h1 className="font-display text-7xl md:text-8xl leading-[0.85] tracking-wide mt-5 text-cream">
        TALK TO THE <span className="text-outline">CELLAR</span>
      </h1>

      <div className="mt-14 grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
        {/* info */}
        <div>
          <Reveal>
            <p className="text-fog leading-relaxed max-w-md text-[15px]">
              Questions about a lot, an order, or which pipe suits a first-timer — write to
              us. A human answers within one business day, usually with stronger opinions
              than you asked for.
            </p>
          </Reveal>
          <ul className="mt-9 space-y-5">
            {[
              { icon: <IconMapPin size={18} />, label: "The shop", value: "14 Coal Exchange Sq, London E1 6AN" },
              { icon: <IconPhone size={18} />, label: "Phone", value: "+44 20 7946 0911 — Tue to Sat, 11:00–19:00" },
              { icon: <IconMail size={18} />, label: "Email", value: "cellar@smokecity.co" },
              { icon: <IconFlame size={18} />, label: "Tasting room", value: "First Fridays, 19:00 — members only, 21+ with ID" },
            ].map((r, i) => (
              <Reveal as="li" key={r.label} delay={i * 70} className="flex items-start gap-4 border border-line bg-panel/60 rounded-sm p-5 hover:border-line2 transition-colors">
                <span className="h-11 w-11 shrink-0 grid place-items-center rounded-sm bg-ember/10 border border-ember/30 text-ember">
                  {r.icon}
                </span>
                <span>
                  <span className="block font-mono text-[10px] tracking-[0.22em] uppercase text-copper">{r.label}</span>
                  <span className="block text-sm text-parch mt-1">{r.value}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* form */}
        <Reveal delay={120}>
          <div className="border border-line bg-coal/80 backdrop-blur-sm rounded-sm p-7 md:p-9">
            {sent ? (
              <div className="text-center py-14">
                <span className="inline-grid place-items-center h-16 w-16 rounded-full border border-jade/40 bg-jade/10 text-jade">
                  <IconMail size={26} />
                </span>
                <h3 className="font-display text-4xl tracking-wide text-cream mt-6">MESSAGE RECEIVED</h3>
                <p className="text-sm text-fog mt-3 max-w-sm mx-auto">
                  It's in the inbox. Expect a reply from Edwin or Marta within one business day.
                </p>
                <button className="btn-ghost mt-8" onClick={() => { setSent(false); setForm({ name: "", email: "", topic: "Order question", message: "" }); }}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <h3 className="font-display text-3xl tracking-wide text-cream">Drop us a line</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog">Name</label>
                    <input className="field mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Arthur Blaine" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog">Email</label>
                    <input className="field mt-1.5" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@postbox.com" />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog">Topic</label>
                  <select className="field mt-1.5 cursor-pointer" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                    {["Order question", "Product advice", "Wholesale", "Tasting room", "Something else"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog">Message</label>
                  <textarea
                    className="field mt-1.5 min-h-[130px] resize-none"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what you're looking for…"
                  />
                </div>
                <button type="submit" className="btn-ember w-full">
                  Send message <IconArrowRight size={14} />
                </button>
                <p className="font-mono text-[10px] text-ash text-center">
                  We never share your address. 21+ enquiries only.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  404                                                                */
/* ------------------------------------------------------------------ */

export function NotFound() {
  return (
    <main className="relative z-10 max-w-3xl mx-auto px-5 py-28 text-center">
      <p className="font-display text-[9rem] leading-none text-outline">404</p>
      <h1 className="font-display text-4xl tracking-wide text-cream mt-2">THIS ROOM IS FULL OF SMOKE</h1>
      <p className="text-fog mt-3 text-sm max-w-sm mx-auto">
        Whatever was here has drifted away. The shop, however, is exactly where you left it.
      </p>
      <Link to="/" className="btn-ember mt-8">
        Back to the door <IconArrowRight size={14} />
      </Link>
    </main>
  );
}
