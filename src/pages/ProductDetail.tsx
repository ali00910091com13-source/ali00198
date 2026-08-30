import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { faD, faNum, fmt } from "../data";
import { useStore } from "../store";
import { ProductCard } from "../chrome";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconCart,
  IconTruck,
  QtyStepper,
  Reveal,
  Stars,
} from "../ui";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart, setCartOpen } = useStore();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setAdded(false);
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!product) {
    return (
      <main className="relative z-10 max-w-3xl mx-auto px-5 py-28 text-center">
        <h1 className="font-display text-6xl text-fog leading-[1.05]">در دود گم شد</h1>
        <p className="text-fog mt-3 text-sm">این قلم دیگر روی قفسه نیست.</p>
        <Link to="/shop" className="btn-ember mt-8">
          بازگشت به فروشگاه <IconArrowLeft size={14} />
        </Link>
      </main>
    );
  }

  const soldOut = product.stock === 0;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const fallback = related.length < 4 ? products.filter((p) => p.id !== product.id && !related.includes(p)).slice(0, 4 - related.length) : [];

  const add = (open: boolean) => {
    addToCart(product.id, qty, open);
    if (!open) {
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1600);
    }
  };

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-10">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-xs font-semibold text-ash hover:text-ember transition-colors"
      >
        <IconArrowRight size={14} /> بازگشت به فروشگاه
      </Link>

      <div className="mt-8 grid lg:grid-cols-2 gap-12">
        {/* تصویر */}
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 border border-line2/40 rounded-sm pointer-events-none" />
            <div className="relative overflow-hidden rounded-sm border border-line bg-panel">
              <img
                src={product.image}
                alt={product.name}
                className={`w-full aspect-square object-cover ${soldOut ? "opacity-40 grayscale" : ""}`}
              />
              {product.badge && (
                <span className="absolute top-4 start-4 bg-ember text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>
          </div>
        </Reveal>

        {/* اطلاعات */}
        <div>
          <Reveal>
            <p className="text-xs font-bold text-copper">
              {product.category} · {product.origin}
            </p>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-cream mt-3">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <Stars rating={product.rating} size={14} />
              <span className="text-xs text-fog">
                {faD(product.rating.toFixed(1))} · {faNum(product.reviews)} نظر
              </span>
            </div>

            <div className="flex items-baseline gap-3 mt-6">
              <span className="font-display text-5xl text-ember leading-none">{fmt(product.price)}</span>
              {product.oldPrice && (
                <span className="text-base text-ash line-through">{fmt(product.oldPrice)}</span>
              )}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-6 text-fog leading-relaxed text-[15px] max-w-xl">{product.description}</p>

            <div className="flex flex-wrap gap-2 mt-6">
              {product.notes.map((n) => (
                <span
                  key={n}
                  className="border border-line2 rounded-sm px-3 py-1.5 text-[11px] font-semibold text-parch bg-panel/60"
                >
                  {n}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <QtyStepper qty={qty} setQty={setQty} max={Math.max(1, product.stock)} />
              <button
                className="btn-ember min-w-[190px]"
                disabled={soldOut}
                onClick={() => add(false)}
              >
                {added ? (
                  <>
                    <IconCheck size={15} /> به سبد رفت
                  </>
                ) : soldOut ? (
                  "ناموجود"
                ) : (
                  <>
                    <IconCart size={15} /> افزودن به سبد
                  </>
                )}
              </button>
              <button className="btn-ghost" disabled={soldOut} onClick={() => add(true)}>
                خرید فوری
              </button>
            </div>

            <p
              className={`mt-4 text-xs font-bold ${
                soldOut ? "text-[#d98a7a]" : product.stock <= 5 ? "text-ember" : "text-jade"
              }`}
            >
              {soldOut
                ? "ناموجود — به‌زودی شارژ می‌شود"
                : product.stock <= 5
                ? `فقط ${faNum(product.stock)} عدد در سردابه مانده`
                : `موجود · ${faNum(product.stock)} عدد`}
            </p>
          </Reveal>

          {/* مشخصات */}
          <Reveal delay={220}>
            <dl className="mt-8 border border-line rounded-sm divide-y divide-line text-xs max-w-xl">
              {[
                ["شناسه (SKU)", <span key="s" dir="ltr" className="font-mono">{product.sku}</span>],
                ["خاستگاه", product.origin],
                ["دسته‌بندی", product.category],
                ["موجودی", `${faNum(product.stock)} عدد`],
              ].map(([k, v], i) => (
                <div key={i} className="flex justify-between px-4 py-3">
                  <dt className="font-semibold text-ash">{k}</dt>
                  <dd className="text-parch">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex items-start gap-3 text-sm text-fog max-w-xl">
              <span className="text-ember shrink-0 mt-0.5">
                <IconTruck size={17} />
              </span>
              <p className="leading-relaxed">
                اگر قبل از ساعت ۱۶ سفارش بدهید، همان روز در جعبهٔ روکش‌سدر ارسال می‌شود. ارسال
                رایگان برای خرید بالای ۵ میلیون تومان. هنگام تحویل، مدرک شناسایی (۱۸+) لازم است.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* محصولات مرتبط */}
      {(related.length > 0 || fallback.length > 0) && (
        <section className="mt-24">
          <Reveal>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <p className="text-xs font-bold text-copper flex items-center gap-2">
                  <span className="inline-block h-px w-8 bg-copper" />
                  همراهش چه می‌چسبد
                </p>
                <h2 className="font-display text-4xl md:text-5xl mt-3 text-cream leading-[1.05]">
                  باز هم از سردابه
                </h2>
              </div>
            </div>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...related, ...fallback].map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
