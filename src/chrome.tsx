import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { faNum, fmt, FREE_SHIPPING, SHIPPING_FEE, Order, Product, WARNINGS } from "./data";
import { useStore } from "./store";
import {
  IconArrowLeft,
  IconCart,
  IconCheck,
  IconFlame,
  IconLock,
  IconMail,
  IconMapPin,
  IconMenu,
  IconPhone,
  IconPlus,
  IconSearch,
  IconTrash,
  IconTruck,
  IconX,
  QtyStepper,
  Stars,
} from "./ui";

/* ------------------------------------------------------------------ */
/*  پس‌زمینهٔ محیطی — روشن و نارنجی                                       */
/* ------------------------------------------------------------------ */

export function SmokeBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute -top-[15%] -left-[10%] h-[60vh] w-[60vh] rounded-full animate-drift"
        style={{
          background: "radial-gradient(circle, rgba(245,149,32,0.10) 0%, rgba(255,181,77,0.05) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute top-[35%] -right-[15%] h-[70vh] w-[70vh] rounded-full animate-drift2"
        style={{
          background: "radial-gradient(circle, rgba(245,149,32,0.08) 0%, rgba(255,214,153,0.04) 50%, transparent 72%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute -bottom-[20%] left-[15%] h-[50vh] w-[50vh] rounded-full animate-drift"
        style={{
          background: "radial-gradient(circle, rgba(150,150,170,0.08) 0%, transparent 65%)",
          filter: "blur(60px)",
          animationDelay: "-9s",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  نوار هشدار بهداشتی                                                  */
/* ------------------------------------------------------------------ */

export function WarningTicker() {
  const loop = [...WARNINGS, ...WARNINGS];
  return (
    <div className="relative z-30 bg-ember text-white overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {loop.map((w, i) => (
          <span key={i} className="flex items-center gap-3 px-6 py-1.5 text-[11px] font-semibold">
            <IconFlame size={12} strokeWidth={2.2} />
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  نوبار                                                              */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const { cartCount, setCartOpen, orderBump, products } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
  }, [location.pathname, location.search]);

  const links = [
    { to: "/", label: "خانه" },
    { to: "/shop", label: "فروشگاه" },
    { to: "/about", label: "هنرِ دود" },
    { to: "/contact", label: "تماس با ما" },
  ];

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.trim().toLowerCase()) ||
          p.category.includes(query.trim()) ||
          p.sku.toLowerCase().includes(query.trim().toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          scrolled
            ? "bg-ink/95 backdrop-blur-md border-line shadow-[0_10px_30px_-18px_rgba(35,39,47,0.25)]"
            : "bg-ink border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-[72px] gap-4">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="h-11 w-11 grid place-items-center rounded-2xl bg-ember text-white group-hover:animate-flicker shadow-[0_6px_18px_-6px_rgba(245,149,32,0.7)]">
              <IconFlame size={24} strokeWidth={1.6} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[24px] text-cream">
                اسموک <span className="text-ember">سیتی</span>
              </span>
              <span className="block font-latin text-[11px] tracking-[0.3em] text-ash mt-0.5">SMOKE CITY</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className="nav-link">
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {/* جست‌وجو */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="h-11 w-11 grid place-items-center rounded-2xl border border-line bg-panel text-fog hover:border-ember hover:text-ember transition-colors cursor-pointer"
                aria-label="جست‌وجو"
              >
                <IconSearch size={18} />
              </button>
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 h-11 rounded-2xl border border-line bg-panel px-4 text-parch hover:border-ember hover:text-ember transition-colors cursor-pointer"
              aria-label="بازکردن سبد خرید"
            >
              <IconCart size={18} />
              <span className="hidden sm:inline text-sm font-bold">سبد خرید</span>
              {cartCount > 0 && (
                <span
                  key={orderBump}
                  className="absolute -top-2 -right-2 min-w-[20px] h-[20px] px-1 grid place-items-center rounded-full bg-ember text-white text-[11px] font-bold animate-rise"
                >
                  {faNum(cartCount)}
                </span>
              )}
            </button>

            <button
              className="md:hidden h-11 w-11 grid place-items-center rounded-2xl border border-line text-parch hover:text-ember transition-colors cursor-pointer"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="منو"
            >
              {menuOpen ? <IconX size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>

        {/* باکس جست‌وجوی بازشو */}
        {searchOpen && (
          <div className="border-t border-line bg-panel">
            <div className="max-w-7xl mx-auto px-5 md:px-8 py-4">
              <div className="relative">
                <IconSearch size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-ash" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="برای شروع جستجو تایپ کنید…"
                  className="field !ps-11 !py-3"
                />
              </div>
              {results.length > 0 && (
                <ul className="mt-3 soft-card divide-y divide-line overflow-hidden">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/product/${p.id}`}
                        onClick={() => { setSearchOpen(false); setQuery(""); }}
                        className="flex items-center gap-3 p-3 hover:bg-coal transition-colors"
                      >
                        <img src={p.image} alt="" className="h-11 w-11 object-cover rounded-xl border border-line" />
                        <span className="flex-1">
                          <span className="block text-sm font-bold text-cream">{p.name}</span>
                          <span className="block text-[11px] text-ash">{p.category}</span>
                        </span>
                        <span className="text-sm font-bold text-ember2">{fmt(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </header>

      {/* منوی موبایل */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-cream/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-ink border-s border-line flex flex-col transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-line">
            <span className="font-display text-xl text-cream">
              اسموک <span className="text-ember">سیتی</span>
            </span>
            <button onClick={() => setMenuOpen(false)} className="text-fog hover:text-ember cursor-pointer" aria-label="بستن منو">
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
                  `font-display text-2xl py-3 border-b border-line/70 transition-colors ${
                    isActive ? "text-ember" : "text-cream hover:text-ember"
                  }`
                }
              >
                <span className="text-xs text-ash ms-2 align-middle">{faNum(i + 1)}</span>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto p-5 border-t border-line">
            <p className="text-[11px] text-ash font-semibold leading-relaxed">
              فقط ۱۸+ · کنترل مدرک هنگام تحویل
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  فوتر                                                               */
/* ------------------------------------------------------------------ */

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-line bg-coal mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-10 w-10 grid place-items-center rounded-2xl bg-ember text-white">
                <IconFlame size={22} />
              </span>
              <span className="font-display text-2xl text-cream">
                اسموک <span className="text-ember">سیتی</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-fog leading-relaxed max-w-xs">
              عرضه‌کنندهٔ دخانیات خاص از ۲۰۱۱. هر برگ در سردابهٔ خودمان کهنه می‌شود و هر سفارش،
              همان روز با دست بسته‌بندی و ارسال می‌شود.
            </p>
            <p className="mt-5 text-[11px] font-semibold text-ash leading-relaxed">
              هشدار: مصرف دخانیات عامل سرطان ریه، بیماری قلبی و آمفیزم است. فقط ۱۸+.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-ember">دسترسی سریع</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["فروشگاه", "/shop"],
                ["هنرِ دود", "/about"],
                ["تماس با ما", "/contact"],
                ["سیگار برگ‌ها", "/shop?cat=سیگار برگ"],
                ["قلیان‌ها", "/shop?cat=قلیان"],
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
            <h4 className="text-xs font-bold text-ember">آدرس و تماس</h4>
            <ul className="mt-4 space-y-3 text-sm text-fog">
              <li className="flex gap-2.5">
                <IconMapPin size={16} className="text-ember shrink-0 mt-0.5" />
                <span>تهران، خیابان ولیعصر،<br />میدان حسن‌آباد، پلاک ۱۴</span>
              </li>
              <li className="flex gap-2.5">
                <IconPhone size={16} className="text-ember shrink-0 mt-0.5" />
                <span dir="ltr">۰۲۱-۵۵۶۶۰۹۱۱</span>
              </li>
              <li className="flex gap-2.5">
                <IconMail size={16} className="text-ember shrink-0 mt-0.5" />
                <span dir="ltr">cellar@smokecity.co</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-ember">ساعت کاری</h4>
            <ul className="mt-4 space-y-2 text-xs text-fog font-semibold">
              <li className="flex justify-between gap-4"><span>شنبه — چهارشنبه</span><span className="text-parch">۱۰ تا ۲۰</span></li>
              <li className="flex justify-between gap-4"><span>پنجشنبه</span><span className="text-parch">۱۱ تا ۲۲</span></li>
              <li className="flex justify-between gap-4"><span>جمعه</span><span className="text-parch">۱۲ تا ۱۸</span></li>
            </ul>
            <div className="mt-5 flex items-center gap-2 border border-line bg-panel rounded-xl px-3 py-2.5 w-fit">
              <IconLock size={14} className="text-ash" />
              <Link to="/admin" className="text-[11px] font-bold text-ash hover:text-ember transition-colors">
                پنل مدیریت
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-semibold text-ash">
            © {faNum(year)} اسموک سیتی — برای افراد زیر سن قانونی نیست.
          </p>
          <p className="font-latin text-4xl md:text-5xl leading-none text-outline-faint select-none tracking-wider">
            SMOKE CITY
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  سبد خرید + تسویه‌حساب                                               */
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

  const shipping = cartSubtotal >= FREE_SHIPPING || cartSubtotal === 0 ? 0 : SHIPPING_FEE;

  const submitOrder = () => {
    const errs = {
      customer: form.customer.trim().length < 2,
      email: !/^\S+@\S+\.\S+$/.test(form.email),
      address: form.address.trim().length < 8,
    };
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) {
      toast("لطفاً اطلاعات ارسال را کامل کنید", "warn");
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
        className={`absolute inset-0 bg-cream/50 backdrop-blur-[3px] transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={close}
      />
      <div
        ref={panelRef}
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-ink border-s border-line flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* سربرگ */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h3 className="font-display text-2xl text-cream">
            {step === "done" ? "سفارش ثبت شد" : step === "checkout" ? "اطلاعات ارسال" : "سبد خرید شما"}
          </h3>
          <button onClick={close} className="text-fog hover:text-ember transition-colors cursor-pointer" aria-label="بستن سبد">
            <IconX size={20} />
          </button>
        </div>

        {/* بدنه */}
        <div className="flex-1 overflow-y-auto">
          {step === "cart" &&
            (cartLines.length === 0 ? (
              <div className="h-full grid place-items-center px-8 text-center">
                <div>
                  <span className="inline-block text-line2">
                    <IconCart size={52} strokeWidth={1.2} />
                  </span>
                  <p className="font-display text-2xl text-fog mt-4">هنوز چیزی نسوخته</p>
                  <p className="text-sm text-ash mt-2">سبد شما خالی است. سردابه اما پُر است.</p>
                  <Link to="/shop" onClick={close} className="btn-ember mt-6">
                    دیدن فروشگاه <IconArrowLeft size={14} />
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
                        className="w-20 h-20 object-cover rounded-2xl border border-line bg-panel"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-3">
                        <p className="font-bold text-cream leading-tight">{product.name}</p>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-ash hover:text-[#dc2626] transition-colors cursor-pointer self-start"
                          aria-label={`حذف ${product.name}`}
                        >
                          <IconTrash size={15} />
                        </button>
                      </div>
                      <p className="text-[10px] font-bold text-ember mt-0.5">{product.category}</p>
                      <div className="flex items-center justify-between mt-3">
                        <QtyStepper compact qty={qty} setQty={(q) => setCartQty(product.id, q)} max={product.stock} />
                        <span className="text-sm font-bold text-ember2">{fmt(product.price * qty)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ))}

          {step === "checkout" && (
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[11px] font-bold text-fog">نام و نام خانوادگی</label>
                <input
                  className={`field mt-1.5 ${errors.customer ? "field-error" : ""}`}
                  value={form.customer}
                  onChange={(e) => setForm({ ...form, customer: e.target.value })}
                  placeholder="مثلاً کاوه حیدری"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-fog">ایمیل</label>
                <input
                  className={`field mt-1.5 ${errors.email ? "field-error" : ""}`}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@postbox.com"
                  type="email"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-fog">نشانی ارسال</label>
                <textarea
                  className={`field mt-1.5 min-h-[84px] resize-none ${errors.address ? "field-error" : ""}`}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="خیابان، شهر، کد پستی"
                />
              </div>
              <div className="soft-card p-4 space-y-2 text-xs text-fog">
                <div className="flex justify-between"><span>جمع سبد</span><span className="text-parch font-bold">{fmt(cartSubtotal)}</span></div>
                <div className="flex justify-between">
                  <span>هزینهٔ ارسال</span>
                  <span className={shipping === 0 ? "text-jade font-bold" : "text-parch font-bold"}>{shipping === 0 ? "رایگان" : fmt(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-line pt-2 text-sm text-cream font-bold">
                  <span>مبلغ کل</span><span className="text-ember2">{fmt(cartSubtotal + shipping)}</span>
                </div>
              </div>
              <p className="text-[11px] text-ash leading-relaxed font-semibold">
                هنگام تحویل، مدرک شناسایی ۱۸+ از شما خواسته می‌شود. بدون مدرک، بسته تحویل داده نمی‌شود.
              </p>
            </div>
          )}

          {step === "done" && placed && (
            <div className="p-8 text-center">
              <span className="inline-grid place-items-center h-16 w-16 rounded-full border border-jade/40 bg-jade/10 text-jade">
                <IconCheck size={30} />
              </span>
              <h4 className="font-display text-3xl text-cream mt-5">سفارش شما در راه است</h4>
              <p className="text-sm text-fog mt-2 leading-relaxed">
                سفارش <span className="font-bold text-ember2">{placed.id}</span> ثبت شد. رسید آن به{" "}
                <span className="text-parch">{placed.email}</span> ارسال می‌شود.
              </p>
              <div className="mt-6 soft-card divide-y divide-line text-start overflow-hidden">
                {placed.items.map((it) => (
                  <div key={it.id} className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-parch">{it.name} <span className="text-ash text-xs">×{faNum(it.qty)}</span></span>
                    <span className="text-xs font-bold text-ember2">{fmt(it.price * it.qty)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-3 bg-coal">
                  <span className="text-[11px] font-bold text-fog">مبلغ پرداختی</span>
                  <span className="text-sm font-bold text-cream">{fmt(placed.total)}</span>
                </div>
              </div>
              <button className="btn-ghost mt-6 w-full" onClick={close}>
                ادامهٔ خرید
              </button>
            </div>
          )}
        </div>

        {/* پانوشت */}
        {step === "cart" && cartLines.length > 0 && (
          <div className="border-t border-line p-5 space-y-3 bg-panel">
            <div className="flex justify-between text-xs text-fog">
              <span>جمع سبد</span>
              <span className="text-cream text-sm font-bold">{fmt(cartSubtotal)}</span>
            </div>
            {cartSubtotal < FREE_SHIPPING && (
              <div className="h-2 rounded-full bg-line overflow-hidden">
                <div
                  className="h-full bg-ember transition-all duration-500"
                  style={{ width: `${Math.min(100, (cartSubtotal / FREE_SHIPPING) * 100)}%` }}
                />
              </div>
            )}
            <p className="text-[11px] font-bold text-ash flex items-center gap-1.5">
              <IconTruck size={14} className="text-ember" />
              {cartSubtotal >= FREE_SHIPPING
                ? "ارسال رایگان فعال شد"
                : `${fmt(FREE_SHIPPING - cartSubtotal)} تا ارسال رایگان`}
            </p>
            <button className="btn-ember w-full" onClick={() => setStep("checkout")}>
              ادامه و تسویه‌حساب <IconArrowLeft size={14} />
            </button>
          </div>
        )}
        {step === "checkout" && (
          <div className="border-t border-line p-5 flex gap-3 bg-panel">
            <button className="btn-ghost flex-1" onClick={() => setStep("cart")}>
              بازگشت
            </button>
            <button className="btn-ember flex-[2]" onClick={submitOrder}>
              ثبت سفارش · {fmt(cartSubtotal + shipping)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  دروازهٔ سنی                                                        */
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
            <span className="inline-block text-ember">
              <IconLock size={44} strokeWidth={1.3} />
            </span>
            <h1 className="font-display text-5xl text-cream mt-5 leading-[1.1]">
              بعداً برگردید
            </h1>
            <p className="text-fog text-sm mt-4 leading-relaxed">
              این فروشگاه فقط برای افراد ۱۸ سال به بالاست. هیومیدار را روی رطوبت ۶۹٪ نگه می‌داریم
              تا به سن قانونی برسید — جایی نمی‌رود.
            </p>
            <button
              onClick={resetAge}
              className="mt-8 text-[12px] font-bold text-ash underline decoration-line2 underline-offset-4 hover:text-ember transition-colors cursor-pointer"
            >
              اشتباه کردم — بگذار دوباره وارد شوم
            </button>
          </div>
        ) : (
          <div className="max-w-md w-full text-center animate-rise">
            <span className="inline-grid place-items-center h-20 w-20 rounded-3xl bg-ember text-white animate-flicker shadow-[0_16px_40px_-10px_rgba(245,149,32,0.6)]">
              <IconFlame size={44} strokeWidth={1.3} />
            </span>
            <h1 className="font-display text-6xl text-cream mt-5 leading-[1]">
              اسموک <span className="text-ember">سیتی</span>
            </h1>
            <p className="text-xs font-bold text-copper mt-3 tracking-wide">
              فروشگاه تخصصی دخانیات — از ۲۰۱۱
            </p>
            <div className="mt-8 soft-card p-7 text-start">
              <p className="font-display text-2xl text-cream text-center">
                آیا به سن قانونی رسیده‌اید؟
              </p>
              <p className="text-sm text-fog mt-2 text-center leading-relaxed">
                برای ورود به این فروشگاه باید <span className="text-ember font-bold">۱۸ سال یا بیشتر</span>{" "}
                داشته باشید. هنگام تحویل، مدرک شما کنترل می‌شود.
              </p>
              <div className="mt-6 grid gap-3">
                <button className="btn-ember w-full" onClick={enter}>
                  بله — ۱۸ سال یا بیشتر دارم
                </button>
                <button className="btn-ghost w-full" onClick={denyAge}>
                  نه، مرا به جای دیگری ببر
                </button>
              </div>
            </div>
            <p className="text-[11px] text-ash mt-5 font-semibold leading-relaxed">
              با ورود، شرایط استفاده را می‌پذیرید. محصولات حاوی نیکوتین و اعتیادآور هستند.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  کارت محصول                                                         */
/* ------------------------------------------------------------------ */

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useStore();
  const soldOut = product.stock === 0;
  const low = !soldOut && product.stock <= 5;
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group relative h-full">
      <Link
        to={`/product/${product.id}`}
        className="block soft-card overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_50px_-20px_rgba(35,39,47,0.25)] group-hover:border-line2 h-full"
      >
        <div className="relative aspect-square overflow-hidden bg-coal">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07] ${
              soldOut ? "opacity-40 grayscale" : ""
            }`}
          />
          {product.badge && !soldOut && (
            <span className="absolute top-3 start-3 bg-ember text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
              {product.badge}
            </span>
          )}
          {discount > 0 && !soldOut && (
            <span className="absolute top-3 end-3 bg-[#dc2626] text-white text-[10px] font-bold px-2 py-1 rounded-lg">
              {faNum(discount)}٪ تخفیف
            </span>
          )}
          {low && (
            <span className="absolute bottom-3 start-3 border border-rust bg-white/95 text-rust text-[10px] font-bold px-2 py-1 rounded-lg">
              فقط {faNum(product.stock)} عدد
            </span>
          )}
          {soldOut && (
            <span className="absolute inset-0 grid place-items-center">
              <span className="font-display text-2xl text-fog border border-line bg-white/90 px-4 py-1.5 rounded-xl">
                ناموجود
              </span>
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold text-ember">{product.category}</p>
            <Stars rating={product.rating} size={10} />
          </div>
          <h3 className="font-bold text-[15px] leading-snug text-cream mt-1.5 group-hover:text-ember2 transition-colors line-clamp-2 min-h-[42px]">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-sm font-bold text-ember2">{fmt(product.price)}</span>
            {product.oldPrice && (
              <span className="text-[11px] text-ash line-through">{fmt(product.oldPrice)}</span>
            )}
          </div>
          <div className="mt-3">
            <span
              onClick={(e) => {
                e.preventDefault();
                if (!soldOut) addToCart(product.id, 1);
              }}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
                soldOut
                  ? "bg-line text-ash cursor-not-allowed"
                  : "bg-coal text-cream hover:bg-ember hover:text-white active:scale-[0.97] cursor-pointer"
              }`}
            >
              <IconPlus size={15} strokeWidth={2.4} />
              {soldOut ? "ناموجود" : "افزودن به سبد"}
            </span>
          </div>
        </div>
      </Link>
      <span className="sr-only">{index}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  نوار متحرک دسته‌بندی‌ها                                              */
/* ------------------------------------------------------------------ */

export function MarqueeStrip() {
  const items = [
    "سیگار برگ",
    "تنباکوی پیپ",
    "پیپ بریار",
    "قلیان",
    "ست پیچ",
    "هیومیدار",
    "کهنه‌شده در محل",
    "ارسال رایگان بالای ۵ میلیون",
  ];
  const loop = [...items, ...items];
  return (
    <div className="relative z-10 border-y border-line bg-coal overflow-hidden py-3.5">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {loop.map((it, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            <span className="font-display text-xl text-fog">{it}</span>
            <span className="text-ember"><IconFlame size={14} /></span>
          </span>
        ))}
      </div>
    </div>
  );
}
