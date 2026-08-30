import React, { useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { faNum, fmt, timeAgo } from "../data";
import { useStore } from "../store";
import {
  IconBox,
  IconChart,
  IconEye,
  IconFlame,
  IconLock,
  IconLogout,
  IconReceipt,
  StatusPill,
} from "../ui";

/* ------------------------------------------------------------------ */
/*  محافظ ورود                                                            */
/* ------------------------------------------------------------------ */

export function AdminRoot() {
  const { authed } = useStore();
  return authed ? <AdminShell /> : <AdminLogin />;
}

/* ------------------------------------------------------------------ */
/*  صفحهٔ ورود                                                            */
/* ------------------------------------------------------------------ */

function AdminLogin() {
  const { login, toast } = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [checking, setChecking] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    window.setTimeout(() => {
      const ok = login(username, password);
      setChecking(false);
      if (!ok) {
        setError(true);
        setShaking(true);
        window.setTimeout(() => setShaking(false), 450);
      } else {
        toast("پنل مدیریت باز شد — خوش برگشتید", "ok");
      }
    }, 550);
  };

  return (
    <div className="min-h-screen bg-steel grid place-items-center px-5 py-12 relative overflow-hidden">
      <div className="absolute inset-0 grid-blueprint" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(50% 60% at 50% 30%, rgba(156,196,173,0.08), transparent 70%)",
        }}
      />
      <div className={`relative w-full max-w-sm ${shaking ? "animate-shake" : "animate-rise"}`}>
        <div className="flex items-center justify-center">
          <span className="text-jade"><IconLock size={30} strokeWidth={1.4} /></span>
        </div>
        <p className="text-center font-latin text-[10px] tracking-[0.34em] text-jade mt-3">
          SMOKE CITY · BACK OFFICE
        </p>
        <h1 className="text-center font-display text-5xl text-cream mt-2 leading-[1.05]">
          ورود کارکنان
        </h1>

        <form onSubmit={submit} className="mt-8 border border-steelline bg-steel2/90 backdrop-blur-sm rounded-sm p-7 space-y-4">
          <div>
            <label className="text-[11px] font-bold text-[#7f93a6]">نام کاربری</label>
            <input
              className={`field mt-1.5 !bg-steel ${error ? "field-error" : ""}`}
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(false); }}
              placeholder="admin"
              autoComplete="username"
              dir="ltr"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#7f93a6]">رمز عبور</label>
            <div className="relative">
              <input
                className={`field mt-1.5 !bg-steel !pe-10 ${error ? "field-error" : ""}`}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className={`absolute end-3 top-[calc(50%+3px)] -translate-y-1/2 cursor-pointer transition-colors ${
                  showPw ? "text-jade" : "text-[#5c7183] hover:text-jade"
                }`}
                aria-label="نمایش یا پنهان‌کردن رمز"
              >
                <IconEye size={16} off={!showPw} />
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-[#e8927c] border border-[#e8927c]/30 bg-[#e8927c]/10 rounded-sm px-3 py-2 font-semibold">
              نام کاربری یا رمز عبور اشتباه است. در بسته می‌ماند.
            </p>
          )}

          <button className="btn-ember w-full !bg-jade hover:!bg-[#b8d6c5] !text-[#0d1a13]" disabled={checking}>
            {checking ? "در حال بررسی…" : "ورود به پنل"}
          </button>

          <div className="border border-dashed border-steelline rounded-sm px-4 py-3">
            <p className="text-[11px] text-[#7f93a6] leading-relaxed">
              <span className="text-jade font-bold">دسترسی آزمایشی</span> — کاربر:{" "}
              <code className="text-cream font-mono" dir="ltr">admin</code> · رمز:{" "}
              <code className="text-cream font-mono" dir="ltr">ember2024</code>
            </p>
          </div>
        </form>

        <Link
          to="/"
          className="block text-center mt-6 text-[11px] font-semibold text-[#5c7183] hover:text-jade transition-colors"
        >
          بازگشت به فروشگاه →
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  پوستهٔ پنل                                                            */
/* ------------------------------------------------------------------ */

function AdminShell() {
  const { logout, toast } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const title = location.pathname.startsWith("/admin/products")
    ? "محصولات"
    : location.pathname.startsWith("/admin/orders")
    ? "سفارش‌ها"
    : "پیشخوان";

  const items = [
    { to: "/admin", end: true, label: "پیشخوان", icon: <IconChart size={17} /> },
    { to: "/admin/products", end: false, label: "محصولات", icon: <IconBox size={17} /> },
    { to: "/admin/orders", end: false, label: "سفارش‌ها", icon: <IconReceipt size={17} /> },
  ];

  return (
    <div className="min-h-screen bg-steel text-cream flex relative">
      {/* سایدبار */}
      <aside className="w-16 md:w-60 shrink-0 border-e border-steelline bg-[#0b1014] flex flex-col sticky top-0 h-screen z-30">
        <div className="flex items-center gap-2.5 px-4 md:px-6 h-[68px] border-b border-steelline">
          <span className="text-jade"><IconFlame size={22} /></span>
          <span className="hidden md:block leading-none">
            <span className="block font-display text-xl leading-none">
              اسموک<span className="text-jade"> سیتی</span>
            </span>
            <span className="block font-latin text-[8px] tracking-[0.3em] text-[#5c7183] mt-1.5">
              BACK OFFICE
            </span>
          </span>
        </div>
        <nav className="flex-1 py-5 px-2 md:px-3 space-y-1">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              className={({ isActive }) =>
                `flex items-center justify-center md:justify-start gap-3 px-3 py-3 rounded-sm text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-jade/10 text-jade border border-jade/30"
                    : "text-[#7f93a6] hover:text-cream hover:bg-white/5 border border-transparent"
                }`
              }
            >
              {it.icon}
              <span className="hidden md:inline">{it.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-2 md:p-3 border-t border-steelline space-y-1">
          <Link
            to="/"
            className="flex items-center justify-center md:justify-start gap-3 px-3 py-3 rounded-sm text-sm font-semibold text-[#7f93a6] hover:text-cream hover:bg-white/5 transition-colors"
          >
            <IconEye size={17} />
            <span className="hidden md:inline">مشاهدهٔ فروشگاه</span>
          </Link>
          <button
            onClick={() => {
              logout();
              toast("پنل مدیریت قفل شد", "info");
              navigate("/");
            }}
            className="w-full flex items-center justify-center md:justify-start gap-3 px-3 py-3 rounded-sm text-sm font-semibold text-[#e8927c]/80 hover:text-[#e8927c] hover:bg-[#e8927c]/10 transition-colors cursor-pointer"
          >
            <IconLogout size={17} />
            <span className="hidden md:inline">خروج</span>
          </button>
        </div>
      </aside>

      {/* بخش اصلی */}
      <div className="flex-1 min-w-0 relative">
        <div className="absolute inset-0 grid-blueprint pointer-events-none" />
        <header className="sticky top-0 z-20 h-[68px] border-b border-steelline bg-steel/85 backdrop-blur-md flex items-center justify-between px-5 md:px-8">
          <div>
            <p className="text-[10px] font-semibold text-[#5c7183]">
              {new Date().toLocaleDateString("fa-IR", { weekday: "long", month: "long", day: "numeric" })}
            </p>
            <h1 className="font-display text-2xl leading-none mt-0.5">{title}</h1>
          </div>
          <span className="hidden sm:flex items-center gap-2 border border-steelline rounded-sm px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-jade animate-pulse" />
            <span className="font-mono text-[10px] text-[#7f93a6]" dir="ltr">
              admin@smokecity
            </span>
          </span>
        </header>
        <div className="relative px-5 md:px-8 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  پیشخوان                                                               */
/* ------------------------------------------------------------------ */

export function Overview() {
  const { orders, products } = useStore();

  const stats = useMemo(() => {
    const live = orders.filter((o) => o.status !== "cancelled");
    const revenue = live.reduce((s, o) => s + o.total, 0);
    const pending = orders.filter((o) => o.status === "pending").length;
    const low = products.filter((p) => p.stock <= 5);
    return { revenue, count: orders.length, pending, low };
  }, [orders, products]);

  const chartData = useMemo(() => {
    const days: { label: string; total: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toDateString();
      const total = orders
        .filter((o) => o.status !== "cancelled" && new Date(o.date).toDateString() === key)
        .reduce((s, o) => s + o.total, 0);
      days.push({
        label: d.toLocaleDateString("fa-IR", { weekday: "short" }),
        total: Math.round(total),
      });
    }
    return days;
  }, [orders]);

  const recent = orders.slice(0, 5);

  const cards = [
    { label: "درآمد کل", value: fmt(stats.revenue), hint: "به‌جز سفارش‌های لغوشده", warn: false },
    { label: "سفارش‌ها", value: faNum(stats.count), hint: "از ابتدای کار", warn: false },
    { label: "در انتظار", value: faNum(stats.pending), hint: "در صف ارسال", warn: false },
    { label: "کم‌موجود", value: faNum(stats.low.length), hint: "۵ عدد یا کمتر", warn: stats.low.length > 0 },
  ];

  return (
    <div className="space-y-6">
      {/* کارت‌های آمار */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div
            key={c.label}
            className="border border-steelline bg-steel2/80 rounded-sm p-5 hover:border-jade/40 transition-colors animate-rise"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <p className="text-[11px] font-bold text-[#5c7183]">{c.label}</p>
            <p className={`font-display text-4xl mt-2 leading-none ${c.warn ? "text-[#e8927c]" : "text-cream"}`}>
              {c.value}
            </p>
            <p className="text-[10px] text-[#7f93a6] mt-2 font-semibold">{c.hint}</p>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-[1.5fr_1fr] gap-6">
        {/* نمودار فروش */}
        <div className="border border-steelline bg-steel2/80 rounded-sm p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl">فروش — ۷ روز اخیر</h3>
            <span className="text-[10px] font-bold text-[#5c7183]">
              به‌جز لغوشده‌ها
            </span>
          </div>
          <div className="h-56 mt-4" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 4, right: 4, left: -14, bottom: 0 }}>
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={{ stroke: "#26303a" }}
                  tick={{ fill: "#7f93a6", fontSize: 11, fontFamily: "Vazirmatn" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(156,196,173,0.06)" }}
                  contentStyle={{
                    background: "#161d24",
                    border: "1px solid #26303a",
                    borderRadius: "4px",
                    fontFamily: "Vazirmatn",
                    fontSize: "11px",
                    color: "#9cc4ad",
                    direction: "rtl",
                  }}
                  formatter={(v) => [fmt(Number(v)), "فروش"]}
                />
                <Bar dataKey="total" fill="#9cc4ad" radius={[3, 3, 0, 0]} maxBarSize={38} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* هشدار موجودی */}
        <div className="border border-steelline bg-steel2/80 rounded-sm p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl">هشدار موجودی</h3>
            <Link to="/admin/products" className="text-[11px] font-bold text-jade hover:underline">
              مدیریت ←
            </Link>
          </div>
          {stats.low.length === 0 ? (
            <p className="text-sm text-[#7f93a6] mt-4 leading-relaxed">همهٔ قفسه‌ها سالم‌اند. هیچ قلمی زیر ۵ عدد نیست.</p>
          ) : (
            <ul className="mt-3 divide-y divide-steelline">
              {stats.low.map((p) => (
                <li key={p.id} className="flex items-center gap-3 py-3">
                  <img src={p.image} alt="" className="h-10 w-10 object-cover rounded-sm border border-steelline" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-cream truncate">{p.name}</p>
                    <p className="font-mono text-[10px] text-[#5c7183]" dir="ltr">{p.sku}</p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-sm border ${
                      p.stock === 0
                        ? "text-[#e8927c] border-[#e8927c]/40 bg-[#e8927c]/10"
                        : "text-ember border-ember/40 bg-ember/10"
                    }`}
                  >
                    {p.stock === 0 ? "تمام" : `${faNum(p.stock)} عدد`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* سفارش‌های اخیر */}
      <div className="border border-steelline bg-steel2/80 rounded-sm p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl">سفارش‌های اخیر</h3>
          <Link to="/admin/orders" className="text-[11px] font-bold text-jade hover:underline">
            همهٔ سفارش‌ها ←
          </Link>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-start min-w-[640px]">
            <thead>
              <tr className="text-[11px] font-bold text-[#5c7183] border-b border-steelline">
                <th className="py-2.5 pe-4 font-bold">سفارش</th>
                <th className="py-2.5 pe-4 font-bold">مشتری</th>
                <th className="py-2.5 pe-4 font-bold">اقلام</th>
                <th className="py-2.5 pe-4 font-bold">مبلغ</th>
                <th className="py-2.5 pe-4 font-bold">زمان</th>
                <th className="py-2.5 font-bold">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steelline">
              {recent.map((o) => (
                <tr key={o.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3 pe-4 font-mono text-xs text-jade" dir="ltr">{o.id}</td>
                  <td className="py-3 pe-4 text-sm text-cream">{o.customer}</td>
                  <td className="py-3 pe-4 text-xs text-[#7f93a6]">
                    {faNum(o.items.reduce((s, i) => s + i.qty, 0))} عدد
                  </td>
                  <td className="py-3 pe-4 text-xs font-bold text-cream">{fmt(o.total)}</td>
                  <td className="py-3 pe-4 text-xs text-[#7f93a6]">{timeAgo(o.date)}</td>
                  <td className="py-3"><StatusPill status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
