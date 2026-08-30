import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { faNum, fmt, Order, Product, WARNINGS } from "./data";
import { useStore } from "./store";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCart,
  IconCheck,
  IconFlame,
  IconLock,
  IconMail,
  IconMapPin,
  IconMenu,
  IconPhone,
  IconPlus,
  IconTrash,
  IconX,
  QtyStepper,
  Stars,
} from "./ui";

/* ------------------------------------------------------------------ */
/*  پس‌زمینهٔ محیطی — دود و نور                                           */
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
      {/* بافت نویز */}
      <div className="absolute inset-0 noise-layer opacity-[0.05]" />
      {/* وینیت */}
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
/*  نوار هشدار بهداشتی متحرک                                              */
/* ------------------------------------------------------------------ */

export function WarningTicker() {
  const loop = [...WARNINGS, ...WARNINGS];
  return (
    <div className="relative z-30 bg-ember text-[#211507] overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {loop.map((w, i) => (
          <span key={i} className="flex items-center gap-3 px-6 py-1.5 text-[11px] font-bold">
            <IconFlame size={11} strokeWidth={2.2} />
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  نوبار                                                               */
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
    { to: "/", label: "خانه" },
    { to: "/shop", label: "فروشگاه" },
    { to: "/about", label: "هنرِ دود" },
    { to: "/contact", label: "تماس با ما" },
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
            <span className="leading-none">
              <span className="block font-display text-[23px] leading-none text-cream">
                اسموک<span className="text-ember">&nbsp;سیتی</span>
              </span>
              <span className="block font-latin text-[9px] tracking-[0.42em] text-ash mt-1">
                SMOKE CITY
              </span>
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
              aria-label="بازکردن سبد خرید"
            >
              <IconCart size={17} />
              <span className="hidden sm:inline text-sm font-semibold">سبد</span>
              {cartCount > 0 && (
                <span
                  key={orderBump}
                  className="absolute -top-2 -left-2 min-w-[19px] h-[19px] px-1 grid place-items-center rounded-full bg-ember text-[#211507] text-[10px] font-bold animate-rise"
                >
                  {faNum(cartCount)}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-parch hover:text-ember transition-colors cursor-pointer p-1"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="باز و بسته کردن منو"
            >
              {menuOpen ? <IconX size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* منوی موبایل */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-coal border-s border-line flex flex-col transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-line">
            <span className="font-display text-xl text-cream">
              اسموک<span className="text-ember"> سیتی</span>
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
                  `font-display text-3xl py-2.5 border-b border-line/60 transition-colors ${
                    isActive ? "text-ember" : "text-parch hover:text-cream"
                  }`
                }
              >
                <span className="font-latin text-[10px] text-copper ms-3 align-middle">0{i + 1}</span>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto p-5 border-t border-line">
            <p className="text-[11px] text-ash font-semibold leading-relaxed">
              فقط ۱۸+ · کنترل مدرک شناسایی هنگام تحویل
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  فوتر                                                                */
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
              <span className="font-display text-2xl text-cream">
                اسموک<span className="text-ember">&nbsp;سیتی</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-fog leading-relaxed max-w-xs">
              عرضه‌کنندهٔ دخانیات خاص از ۲۰۱۱. هر برگ در سردابهٔ خودمان کهنه می‌شود و هر
              سفارش، همان روزی که راه می‌افتد، با دست بسته‌بندی می‌شود.
            </p>
            <p className="mt-5 text-[11px] font-semibold text-ash leading-relaxed">
              هشدار: مصرف دخانیات باعث سرطان ریه، بیماری قلبی و آمفیزم می‌شود. فروش فقط به ۱۸+.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-copper">بخش‌ها</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["فروشگاه", "/shop"],
                ["هنرِ دود", "/about"],
                ["تماس با ما", "/contact"],
                ["همهٔ سیگار برگ‌ها", "/shop?cat=" + encodeURIComponent("سیگار برگ")],
                ["همهٔ قلیان‌ها", "/shop?cat=" + encodeURIComponent("قلیان")],
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
            <h4 className="text-xs font-bold text-copper">نشانی</h4>
            <ul className="mt-4 space-y-3 text-sm text-fog">
              <li className="flex gap-2.5">
                <IconMapPin size={15} className="text-ember shrink-0 mt-0.5" />
                تهران، خیابان ولیعصر، میدان حسن‌آباد، پلاک ۱۴
              </li>
              <li className="flex gap-2.5" dir="ltr">
                <IconPhone size={15} className="text-ember shrink-0 mt-0.5" />
                ۰۲۱-۵۵۶۶۰۹۱۱
              </li>
              <li className="flex gap-2.5" dir="ltr">
                <IconMail size={15} className="text-ember shrink-0 mt-0.5" />
                cellar@smokecity.co
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-copper">ساعت کاری</h4>
            <ul className="mt-4 space-y-2 text-xs text-fog">
              <li className="flex justify-between gap-4"><span>شنبه تا چهارشنبه</span><span className="text-parch">۱۰:۰۰ تا ۲۰:۰۰</span></li>
              <li className="flex justify-between gap-4"><span>پنجشنبه</span><span className="text-parch">۱۱:۰۰ تا ۲۲:۰۰</span></li>
              <li className="flex justify-between gap-4"><span>جمعه</span><span className="text-parch">۱۲:۰۰ تا ۱۸:۰۰</span></li>
            </ul>
            <div className="mt-5 flex items-center gap-2 border border-line rounded-sm px-3 py-2.5 w-fit">
              <IconLock size={13} className="text-ash" />
              <Link to="/admin" className="text-[11px] font-semibold text-ash hover:text-ember transition-colors">
                پنل مدیریت
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-semibold text-ash">
            © {faNum(year)} اسموک سیتی — فروش به افراد زیر ۱۸ سال ممنوع است.
          </p>
          <p className="font-latin text-5xl md:text-6xl leading-none text-outline-faint select-none tracking-wider">
            SMOKE CITY
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  سبد خرید + تسویه‌حساب                                                 */
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
        className={`absolute inset-0 bg-black/70 backdrop-blur-[3px] transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={close}
      />
      <div
        ref={panelRef}
        className={`absolute top-0 left-0 h-full w-full max-w-md bg-coal border-s border-line flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          cartOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* سربرگ */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h3 className="font-display text-2xl text-cream">
            {step === "done" ? "سفارش ثبت شد" : step === "checkout" ? "اطلاعات ارسال" : "سبد خرید"}
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
                  <p className="font-display text-2xl text-fog mt-4">هنوز چیزی روشن نشده</p>
                  <p className="text-sm text-ash mt-2">سبدتان خالی است، ولی سردابه پر است.</p>
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
                        className="w-20 h-20 object-cover rounded-sm border border-line bg-panel"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-3">
                        <p className="font-display text-lg leading-tight text-cream">{product.name}</p>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-ash hover:text-[#d98a7a] transition-colors cursor-pointer self-start"
                          aria-label={`حذف ${product.name}`}
                        >
                          <IconTrash size={15} />
                        </button>
                      </div>
                      <p className="text-[10px] font-bold text-copper mt-0.5">{product.category}</p>
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
                <label className="text-[11px] font-bold text-fog">آدرس تحویل</label>
                <textarea
                  className={`field mt-1.5 min-h-[84px] resize-none ${errors.address ? "field-error" : ""}`}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="خیابان، شهر، کد پستی"
                />
              </div>
              <div className="border border-line rounded-sm p-4 space-y-2 text-xs text-fog">
                <div className="flex justify-between"><span>جمع سبد</span><span className="text-parch">{fmt(cartSubtotal)}</span></div>
                <div className="flex justify-between">
                  <span>هزینهٔ ارسال</span>
                  <span className={shipping === 0 ? "text-jade" : "text-parch"}>{shipping === 0 ? "رایگان" : fmt(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-line pt-2 text-sm text-cream font-bold">
                  <span>مبلغ کل</span><span className="text-ember2">{fmt(cartSubtotal + shipping)}</span>
                </div>
              </div>
              <p className="text-[11px] text-ash leading-relaxed">
                هنگام تحویل، مدرک شناسایی معتبر (۱۸+) درخواست می‌شود. بدون مدرک، مرسوله تحویل داده نخواهد شد.
              </p>
            </div>
          )}

          {step === "done" && placed && (
            <div className="p-8 text-center">
              <span className="inline-grid place-items-center h-16 w-16 rounded-full border border-jade/40 bg-jade/10 text-jade">
                <IconCheck size={30} />
              </span>
              <h4 className="font-display text-3xl text-cream mt-5">سفارش در راه سردابه است</h4>
              <p className="text-sm text-fog mt-2">
                سفارش <span className="font-mono text-ember2" dir="ltr">{placed.id}</span> ثبت شد؛ رسید آن به{" "}
                <span className="text-parch" dir="ltr">{placed.email}</span> ارسال می‌شود.
              </p>
              <div className="mt-6 border border-line rounded-sm divide-y divide-line text-start">
                {placed.items.map((it) => (
                  <div key={it.id} className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-parch">{it.name} <span className="text-ash text-xs">×{faNum(it.qty)}</span></span>
                    <span className="text-xs font-bold text-ember2">{fmt(it.price * it.qty)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-3 bg-panel">
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

        {/* پاصفحه */}
        {step === "cart" && cartLines.length > 0 && (
          <div className="border-t border-line p-5 space-y-3 bg-panel/60">
            <div className="flex justify-between text-xs text-fog">
              <span>جمع سبد</span>
              <span className="text-cream text-sm font-bold">{fmt(cartSubtotal)}</span>
            </div>
            {cartSubtotal < 150 && (
              <div className="h-1.5 rounded-full bg-line overflow-hidden">
                <div
                  className="h-full bg-ember transition-all duration-500"
                  style={{ width: `${Math.min(100, (cartSubtotal / 150) * 100)}%` }}
                />
              </div>
            )}
            <p className="text-[11px] text-ash font-semibold">
              {cartSubtotal >= 150 ? "ارسال رایگان فعال شد" : `${fmt(150 - cartSubtotal)} تا ارسال رایگان`}
            </p>
            <button className="btn-ember w-full" onClick={() => setStep("checkout")}>
              تسویه‌حساب <IconArrowLeft size={14} />
            </button>
          </div>
        )}
        {step === "checkout" && (
          <div className="border-t border-line p-5 flex gap-3 bg-panel/60">
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
/*  دروازهٔ سنی                                                           */
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
            <h1 className="font-display text-6xl text-cream mt-5 leading-[1.05]">
              بعداً برگرد<span className="text-ember">ید</span>
            </h1>
            <p className="text-fog text-sm mt-4 leading-relaxed">
              سالن ما فقط برای افراد ۱۸ سال به بالاست. هیومیدار را روی رطوبت ۶۹٪ نگه
              می‌داریم تا وقتی به سن قانونی برسید — جایی نمی‌رود.
            </p>
            <button
              onClick={resetAge}
              className="mt-8 text-xs font-semibold text-ash underline decoration-line2 underline-offset-4 hover:text-ember transition-colors cursor-pointer"
            >
              اشتباه کردم — دوباره وارد شوم
            </button>
          </div>
        ) : (
          <div className="max-w-md w-full text-center animate-rise">
            <span className="inline-block text-ember animate-flicker">
              <IconFlame size={52} strokeWidth={1.2} />
            </span>
            <h1 className="font-display text-7xl text-cream mt-5 leading-[0.95]">
              اسموک<span className="text-ember"> سیتی</span>
            </h1>
            <p className="font-latin text-[10px] tracking-[0.4em] text-copper mt-3">
              SMOKE CITY — EST. 2011
            </p>
            <div className="mt-8 border border-line bg-coal/80 backdrop-blur-sm rounded-sm p-7">
              <p className="font-display text-3xl text-cream leading-[1.1]">
                سن قانونی دارید؟
              </p>
              <p className="text-sm text-fog mt-2 leading-relaxed">
                برای ورود به این فروشگاه باید <span className="text-ember font-bold">۱۸ سال یا بیشتر</span> داشته
                باشید. هنگام تحویل هم مدرک شناسایی کنترل می‌شود.
              </p>
              <div className="mt-6 grid gap-3">
                <button className="btn-ember w-full" onClick={enter}>
                  بله — ۱۸ سال یا بیشتر دارم
                </button>
                <button className="btn-ghost w-full" onClick={denyAge}>
                  نه، مرا جای دیگری ببرید
                </button>
              </div>
            </div>
            <p className="text-[11px] text-ash mt-5 font-semibold">
              با ورود، شرایط ما را می‌پذیرید. محصولات حاوی نیکوتین هستند — ماده‌ای اعتیادآور.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  کارت محصول                                                           */
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
            <span className="absolute top-3 start-3 bg-ember text-[#211507] text-[10px] font-bold px-2 py-1 rounded-sm">
              {product.badge}
            </span>
          )}
          {low && (
            <span className="absolute top-3 end-3 border border-rust bg-[#2a140c]/90 text-[#f0b49a] text-[10px] font-semibold px-2 py-1 rounded-sm">
              فقط {faNum(product.stock)} عدد
            </span>
          )}
          {soldOut && (
            <span className="absolute inset-0 grid place-items-center">
              <span className="font-display text-3xl text-fog border border-line bg-ink/80 px-4 py-1.5">
                ناموجود
              </span>
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold text-copper">{product.category}</p>
            <Stars rating={product.rating} size={10} />
          </div>
          <h3 className="font-display text-[21px] leading-tight text-cream mt-1.5 group-hover:text-ember2 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-ember2">{fmt(product.price)}</span>
              {product.oldPrice && (
                <span className="text-[11px] text-ash line-through">{fmt(product.oldPrice)}</span>
              )}
            </div>
            <span className="text-[10px] font-semibold text-ash">
              {faNum(product.reviews)} نظر
            </span>
          </div>
        </div>
      </Link>
      <button
        disabled={soldOut}
        onClick={() => addToCart(product.id, 1)}
        aria-label={`افزودن ${product.name} به سبد`}
        className="absolute bottom-4 end-4 h-10 w-10 grid place-items-center rounded-sm bg-ember text-[#211507] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-ember2 active:scale-90 cursor-pointer disabled:opacity-0 disabled:cursor-not-allowed max-md:opacity-100 max-md:translate-y-0"
      >
        <IconPlus size={17} strokeWidth={2.2} />
      </button>
      <span className="sr-only">{index}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  نوار متحرک دسته‌بندی‌ها                                                 */
/* ------------------------------------------------------------------ */

export function MarqueeStrip() {
  const items = [
    "سیگار برگ",
    "توتون پیپ",
    "پیپ بریار",
    "قلیان",
    "ست پیچ",
    "هیومیدار",
    "کهنه‌سازی در محل",
    "ارسال رایگان بالای ۱۵۰ دلار",
  ];
  const loop = [...items, ...items];
  return (
    <div className="relative z-10 border-y border-line bg-coal/80 overflow-hidden py-3.5">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {loop.map((it, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            <span className="font-display text-2xl text-fog">{it}</span>
            <span className="text-copper"><IconFlame size={14} /></span>
          </span>
        ))}
      </div>
    </div>
  );
}
