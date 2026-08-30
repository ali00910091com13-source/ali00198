import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { fmt, Order, Product, WARNINGS } from "./data";
import { useStore } from "./store";
import {
  IconArrowRight,
  IconCart,
  IconCheck,
  IconFlame,
  IconLock,
  IconMail,
  IconMapPin,
  IconMenu,
  IconMinus,
  IconPhone,
  IconPlus,
  IconTrash,
  IconX,
  QtyStepper,
  Stars,
} from "./ui";

/* ------------------------------------------------------------------ */
/*  Ambient background                                                 */
/* ------------------------------------------------------------------ */

export function SmokeBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute -top-[20%] -left-[15%] h-[70vh] w-[70vh] rounded-full opacity-60 animate-drift"
        style={{
          background:
            "radial-gradient(circle, rgba(232,163,74,0.13) 0%, rgba(192,98,47,0.06) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-[30%] -right-[20%] h-[80vh] w-[80vh] rounded-full opacity-50 animate-drift2"
        style={{
          background:
            "radial-gradient(circle, rgba(143,63,29,0.16) 0%, rgba(84,44,22,0.07) 50%, transparent 72%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute -bottom-[25%] left-[20%] h-[60vh] w-[60vh] rounded-full opacity-40 animate-drift"
        style={{
          background:
            "radial-gradient(circle, rgba(163,146,124,0.1) 0%, transparent 65%)",
          filter: "blur(50px)",
          animationDelay: "-9s",
        }}
      />
      {/* fine grain */}
      <div className="absolute inset-0 noise-layer opacity-[0.05]" />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 0%, transparent 55%, rgba(10,7,4,0.55) 100%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Surgeon-general style warning ticker                               */
/* ------------------------------------------------------------------ */

export function WarningTicker() {
  const loop = [...WARNINGS, ...WARNINGS];
  return (
    <div className="relative z-30 bg-ember text-[#211507] overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {loop.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 py-1.5 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase"
          >
            <IconFlame size={11} strokeWidth={2.2} />
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const { cartCount, setCartOpen, orderBump } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "The Craft" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          scrolled
            ? "bg-ink/85 backdrop-blur-md border-line shadow-[0_12px_40px_-18px_rgba(0,0,0,0.9)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-[68px]">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="text-ember group-hover:animate-flicker">
              <IconFlame size={26} strokeWidth={1.5} />
            </span>
            <span className="font-display text-[26px] tracking-[0.06em] leading-none text-cream">
              SMOKE<span className="text-ember">&nbsp;CITY</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className="nav-link">
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 border border-line2 rounded-sm px-3.5 py-2 text-parch hover:border-ember hover:text-ember transition-colors cursor-pointer group"
              aria-label="Open cart"
            >
              <IconCart size={17} />
              <span className="hidden sm:inline font-mono text-[11px] tracking-[0.14em] uppercase">
                Cart
              </span>
              {cartCount > 0 && (
                <span
                  key={orderBump}
                  className="absolute -top-2 -right-2 min-w-[19px] h-[19px] px-1 grid place-items-center rounded-full bg-ember text-[#211507] font-mono text-[10px] font-bold animate-rise"
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-parch hover:text-ember transition-colors cursor-pointer p-1"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <IconX size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-coal border-l border-line flex flex-col transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-line">
            <span className="font-display text-xl text-cream">
              SMOKE<span className="text-ember"> CITY</span>
            </span>
            <button onClick={() => setMenuOpen(false)} className="text-fog hover:text-ember cursor-pointer" aria-label="Close menu">
              <IconX size={20} />
            </button>
          </div>
          <nav className="flex flex-col p-5 gap-1">
            {links.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `font-display text-3xl tracking-wide py-2.5 border-b border-line/60 transition-colors ${
                    isActive ? "text-ember" : "text-parch hover:text-cream"
                  }`
                }
              >
                <span className="font-mono text-[10px] text-copper mr-3 align-middle">0{i + 1}</span>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto p-5 border-t border-line">
            <p className="font-mono text-[10px] text-ash tracking-[0.18em] uppercase leading-relaxed">
              21+ only · ID on delivery
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-line bg-coal/70 mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-ember">
                <IconFlame size={24} />
              </span>
              <span className="font-display text-2xl tracking-[0.06em] text-cream">
                SMOKE<span className="text-ember">&nbsp;CITY</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-fog leading-relaxed max-w-xs">
              Purveyors of fine tobacco since 2011. Every leaf aged in our own cellar,
              every order packed by hand the day it leaves.
            </p>
            <p className="mt-5 font-mono text-[10px] tracking-[0.16em] uppercase text-ash leading-relaxed">
              Warning: smoking causes lung cancer, heart disease &amp; emphysema. 21+ only.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.24em] uppercase text-copper">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["The Shop", "/shop"],
                ["Our Craft", "/about"],
                ["Contact", "/contact"],
                ["All Cigars", "/shop?cat=Cigars"],
                ["All Hookah", "/shop?cat=Hookah"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-fog hover:text-ember transition-colors inline-flex items-center gap-1.5 group">
                    <span className="h-px w-3 bg-line2 group-hover:bg-ember group-hover:w-5 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.24em] uppercase text-copper">Visit</h4>
            <ul className="mt-4 space-y-3 text-sm text-fog">
              <li className="flex gap-2.5">
                <IconMapPin size={15} className="text-ember shrink-0 mt-0.5" />
                14 Coal Exchange Sq,
                <br />
                London E1 6AN
              </li>
              <li className="flex gap-2.5">
                <IconPhone size={15} className="text-ember shrink-0 mt-0.5" />
                +44 20 7946 0911
              </li>
              <li className="flex gap-2.5">
                <IconMail size={15} className="text-ember shrink-0 mt-0.5" />
                cellar@smokecity.co
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.24em] uppercase text-copper">Hours</h4>
            <ul className="mt-4 space-y-2 font-mono text-xs text-fog">
              <li className="flex justify-between gap-4"><span>Mon — Fri</span><span className="text-parch">10:00 — 20:00</span></li>
              <li className="flex justify-between gap-4"><span>Saturday</span><span className="text-parch">11:00 — 22:00</span></li>
              <li className="flex justify-between gap-4"><span>Sunday</span><span className="text-parch">12:00 — 18:00</span></li>
            </ul>
            <div className="mt-5 flex items-center gap-2 border border-line rounded-sm px-3 py-2.5 w-fit">
              <IconLock size={13} className="text-ash" />
              <Link to="/admin" className="font-mono text-[10px] tracking-[0.18em] uppercase text-ash hover:text-ember transition-colors">
                Staff back office
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ash">
            © {year} Smoke City Ltd. — Not intended for minors.
          </p>
          <p className="font-display text-5xl md:text-6xl leading-none text-outline-faint select-none tracking-wider">
            SMOKE CITY
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Cart drawer + checkout                                             */
/* ------------------------------------------------------------------ */

export function CartDrawer() {
  const { cartOpen, setCartOpen, cartLines, cartSubtotal, setCartQty, removeFromCart, checkout, toast } =
    useStore();
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const [placed, setPlaced] = useState<Order | null>(null);
  const [form, setForm] = useState({ customer: "", email: "", address: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cartOpen) {
      setStep((s) => (s === "done" ? "done" : "cart"));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const shipping = cartSubtotal >= 150 || cartSubtotal === 0 ? 0 : 12;

  const submitOrder = () => {
    const errs = {
      customer: form.customer.trim().length < 2,
      email: !/^\S+@\S+\.\S+$/.test(form.email),
      address: form.address.trim().length < 8,
    };
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) {
      toast("Please complete the delivery details", "warn");
      return;
    }
    const order = checkout({
      customer: form.customer.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
    });
    setPlaced(order);
    setStep("done");
    setForm({ customer: "", email: "", address: "" });
  };

  const close = () => setCartOpen(false);

  return (
    <div className={`fixed inset-0 z-[80] ${cartOpen ? "" : "pointer-events-none"}`} aria-hidden={!cartOpen}>
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-[3px] transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={close}
      />
      <div
        ref={panelRef}
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-coal border-l border-line flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h3 className="font-display text-2xl tracking-wide text-cream">
            {step === "done" ? "ORDER CONFIRMED" : step === "checkout" ? "DELIVERY" : "YOUR CART"}
          </h3>
          <button onClick={close} className="text-fog hover:text-ember transition-colors cursor-pointer" aria-label="Close cart">
            <IconX size={20} />
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto">
          {step === "cart" &&
            (cartLines.length === 0 ? (
              <div className="h-full grid place-items-center px-8 text-center">
                <div>
                  <span className="inline-block text-line2">
                    <IconCart size={52} strokeWidth={1.2} />
                  </span>
                  <p className="font-display text-2xl text-fog mt-4 tracking-wide">Nothing burning yet</p>
                  <p className="text-sm text-ash mt-2">Your cart is empty. The cellar is full.</p>
                  <Link to="/shop" onClick={close} className="btn-ember mt-6">
                    Browse the shop <IconArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-line">
                {cartLines.map(({ product, qty }) => (
                  <li key={product.id} className="flex gap-4 p-5">
                    <Link to={`/product/${product.id}`} onClick={close} className="shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-sm border border-line bg-panel"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-3">
                        <p className="font-display text-lg leading-tight text-cream tracking-wide">{product.name}</p>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-ash hover:text-[#d98a7a] transition-colors cursor-pointer self-start"
                          aria-label={`Remove ${product.name}`}
                        >
                          <IconTrash size={15} />
                        </button>
                      </div>
                      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-copper mt-0.5">{product.category}</p>
                      <div className="flex items-center justify-between mt-3">
                        <QtyStepper compact qty={qty} setQty={(q) => setCartQty(product.id, q)} max={product.stock} />
                        <span className="font-mono text-sm text-ember2">{fmt(product.price * qty)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ))}

          {step === "checkout" && (
            <div className="p-6 space-y-4">
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog">Full name</label>
                <input
                  className={`field mt-1.5 ${errors.customer ? "field-error" : ""}`}
                  value={form.customer}
                  onChange={(e) => setForm({ ...form, customer: e.target.value })}
                  placeholder="Arthur Blaine"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog">Email</label>
                <input
                  className={`field mt-1.5 ${errors.email ? "field-error" : ""}`}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@postbox.com"
                  type="email"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog">Delivery address</label>
                <textarea
                  className={`field mt-1.5 min-h-[84px] resize-none ${errors.address ? "field-error" : ""}`}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Street, city, postcode"
                />
              </div>
              <div className="border border-line rounded-sm p-4 space-y-2 font-mono text-xs text-fog">
                <div className="flex justify-between"><span>Subtotal</span><span className="text-parch">{fmt(cartSubtotal)}</span></div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-jade" : "text-parch"}>{shipping === 0 ? "FREE" : fmt(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-line pt-2 text-sm text-cream">
                  <span>Total</span><span className="text-ember2">{fmt(cartSubtotal + shipping)}</span>
                </div>
              </div>
              <p className="font-mono text-[10px] text-ash leading-relaxed">
                A photo ID proving you are 21+ will be requested at the door. No ID, no parcel.
              </p>
            </div>
          )}

          {step === "done" && placed && (
            <div className="p-8 text-center">
              <span className="inline-grid place-items-center h-16 w-16 rounded-full border border-jade/40 bg-jade/10 text-jade">
                <IconCheck size={30} />
              </span>
              <h4 className="font-display text-3xl tracking-wide text-cream mt-5">IT'S IN THE PIPELINE</h4>
              <p className="text-sm text-fog mt-2">
                Order <span className="font-mono text-ember2">{placed.id}</span> confirmed. A receipt is on
                its way to <span className="text-parch">{placed.email}</span>.
              </p>
              <div className="mt-6 border border-line rounded-sm divide-y divide-line text-left">
                {placed.items.map((it) => (
                  <div key={it.id} className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-parch">{it.name} <span className="text-ash font-mono text-xs">×{it.qty}</span></span>
                    <span className="font-mono text-xs text-ember2">{fmt(it.price * it.qty)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-3 bg-panel">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog">Total paid</span>
                  <span className="font-mono text-sm text-cream">{fmt(placed.total)}</span>
                </div>
              </div>
              <button className="btn-ghost mt-6 w-full" onClick={close}>
                Keep browsing
              </button>
            </div>
          )}
        </div>

        {/* footer */}
        {step === "cart" && cartLines.length > 0 && (
          <div className="border-t border-line p-5 space-y-3 bg-panel/60">
            <div className="flex justify-between font-mono text-xs text-fog">
              <span>Subtotal</span>
              <span className="text-cream text-sm">{fmt(cartSubtotal)}</span>
            </div>
            {cartSubtotal < 150 && (
              <div className="h-1.5 rounded-full bg-line overflow-hidden">
                <div
                  className="h-full bg-ember transition-all duration-500"
                  style={{ width: `${Math.min(100, (cartSubtotal / 150) * 100)}%` }}
                />
              </div>
            )}
            <p className="font-mono text-[10px] text-ash tracking-wide">
              {cartSubtotal >= 150 ? "FREE SHIPPING UNLOCKED" : `${fmt(150 - cartSubtotal)} away from free shipping`}
            </p>
            <button className="btn-ember w-full" onClick={() => setStep("checkout")}>
              Checkout <IconArrowRight size={14} />
            </button>
          </div>
        )}
        {step === "checkout" && (
          <div className="border-t border-line p-5 flex gap-3 bg-panel/60">
            <button className="btn-ghost flex-1" onClick={() => setStep("cart")}>
              Back
            </button>
            <button className="btn-ember flex-[2]" onClick={submitOrder}>
              Place order · {fmt(cartSubtotal + shipping)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Age gate                                                           */
/* ------------------------------------------------------------------ */

export function AgeGate() {
  const { ageStatus, verifyAge, denyAge, resetAge } = useStore();

  const [entering, setEntering] = useState(false);
  const enter = () => {
    setEntering(true);
    window.setTimeout(verifyAge, 450);
  };

  if (ageStatus === "ok") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-ink transition-opacity duration-500 ${
        entering ? "opacity-0" : "opacity-100"
      }`}
    >
      <SmokeBackground />
      <div className="relative z-10 h-full overflow-y-auto grid place-items-center px-5">
        {ageStatus === "denied" ? (
          <div className="max-w-md w-full text-center animate-rise">
            <span className="inline-block text-rust">
              <IconLock size={44} strokeWidth={1.3} />
            </span>
            <h1 className="font-display text-6xl tracking-wide text-cream mt-5">
              COME BACK<span className="text-ember"> LATER</span>
            </h1>
            <p className="text-fog text-sm mt-4 leading-relaxed">
              The lounge is strictly 21 and over. We'll keep the humidor at 69% humidity
              until you're of age — it isn't going anywhere.
            </p>
            <button
              onClick={resetAge}
              className="mt-8 font-mono text-[11px] tracking-[0.2em] uppercase text-ash underline decoration-line2 underline-offset-4 hover:text-ember transition-colors cursor-pointer"
            >
              I made a mistake — let me re-enter
            </button>
          </div>
        ) : (
          <div className="max-w-md w-full text-center animate-rise">
            <span className="inline-block text-ember animate-flicker">
              <IconFlame size={52} strokeWidth={1.2} />
            </span>
            <h1 className="font-display text-7xl tracking-wide text-cream mt-5 leading-[0.9]">
              SMOKE<span className="text-ember"> CITY</span>
            </h1>
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-copper mt-3">
              Premium tobacco emporium — est. 2011
            </p>
            <div className="mt-8 border border-line bg-coal/80 backdrop-blur-sm rounded-sm p-7">
              <p className="font-display text-3xl tracking-wide text-cream">
                ARE YOU OF LEGAL AGE?
              </p>
              <p className="text-sm text-fog mt-2">
                You must be <span className="text-ember font-semibold">21 or older</span> to
                enter this shop. We verify ID at delivery.
              </p>
              <div className="mt-6 grid gap-3">
                <button className="btn-ember w-full" onClick={enter}>
                  Yes — I'm 21 or older
                </button>
                <button className="btn-ghost w-full" onClick={denyAge}>
                  No, take me elsewhere
                </button>
              </div>
            </div>
            <p className="font-mono text-[10px] text-ash mt-5 tracking-[0.16em] uppercase">
              By entering you agree to our terms. Products contain nicotine — addictive.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Product card                                                       */
/* ------------------------------------------------------------------ */

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useStore();
  const soldOut = product.stock === 0;
  const low = !soldOut && product.stock <= 5;

  return (
    <div className="group relative">
      <Link
        to={`/product/${product.id}`}
        className="block border border-line bg-panel rounded-sm overflow-hidden transition-all duration-300 group-hover:border-line2 group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.85)]"
      >
        <div className="relative aspect-square overflow-hidden bg-ink">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07] ${
              soldOut ? "opacity-40 grayscale" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          {product.badge && !soldOut && (
            <span className="absolute top-3 left-3 bg-ember text-[#211507] font-mono text-[9px] font-bold tracking-[0.16em] uppercase px-2 py-1 rounded-sm">
              {product.badge}
            </span>
          )}
          {low && (
            <span className="absolute top-3 right-3 border border-rust bg-[#2a140c]/90 text-[#f0b49a] font-mono text-[9px] tracking-[0.16em] uppercase px-2 py-1 rounded-sm">
              Only {product.stock} left
            </span>
          )}
          {soldOut && (
            <span className="absolute inset-0 grid place-items-center">
              <span className="font-display text-3xl tracking-[0.2em] text-fog border border-line bg-ink/80 px-4 py-1.5">
                SOLD OUT
              </span>
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-copper">{product.category}</p>
            <Stars rating={product.rating} size={10} />
          </div>
          <h3 className="font-display text-[22px] leading-tight tracking-wide text-cream mt-1.5 group-hover:text-ember2 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-sm text-ember2">{fmt(product.price)}</span>
              {product.oldPrice && (
                <span className="font-mono text-[11px] text-ash line-through">{fmt(product.oldPrice)}</span>
              )}
            </div>
            <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-ash">
              {product.reviews} reviews
            </span>
          </div>
        </div>
      </Link>
      <button
        disabled={soldOut}
        onClick={() => addToCart(product.id, 1)}
        aria-label={`Add ${product.name} to cart`}
        className="absolute bottom-4 right-4 h-10 w-10 grid place-items-center rounded-sm bg-ember text-[#211507] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-ember2 active:scale-90 cursor-pointer disabled:opacity-0 disabled:cursor-not-allowed max-md:opacity-100 max-md:translate-y-0"
      >
        <IconPlus size={17} strokeWidth={2.2} />
      </button>
      <span className="sr-only">{index}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee strip                                                      */
/* ------------------------------------------------------------------ */

export function MarqueeStrip() {
  const items = [
    "Cigars",
    "Pipe Tobacco",
    "Briar Pipes",
    "Hookah",
    "Rolling Kits",
    "Humidors",
    "Aged In-House",
    "Free Shipping $150+",
  ];
  const loop = [...items, ...items];
  return (
    <div className="relative z-10 border-y border-line bg-coal/80 overflow-hidden py-3.5">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {loop.map((it, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            <span className="font-display text-2xl tracking-[0.12em] text-fog">{it}</span>
            <span className="text-copper"><IconFlame size={14} /></span>
          </span>
        ))}
      </div>
    </div>
  );
}
