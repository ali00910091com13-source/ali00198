import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fmt } from "../data";
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
        <h1 className="font-display text-6xl tracking-wide text-fog">LOST IN THE SMOKE</h1>
        <p className="text-fog mt-3 text-sm">That lot isn't on the shelf anymore.</p>
        <Link to="/shop" className="btn-ember mt-8">
          Back to the shop <IconArrowRight size={14} />
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
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-ash hover:text-ember transition-colors"
      >
        <IconArrowLeft size={14} /> Back to shop
      </Link>

      <div className="mt-8 grid lg:grid-cols-2 gap-12">
        {/* image */}
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
                <span className="absolute top-4 left-4 bg-ember text-[#211507] font-mono text-[10px] font-bold tracking-[0.16em] uppercase px-2.5 py-1.5 rounded-sm">
                  {product.badge}
                </span>
              )}
            </div>
          </div>
        </Reveal>

        {/* info */}
        <div>
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-copper">
              {product.category} · {product.origin}
            </p>
            <h1 className="font-display text-5xl md:text-6xl leading-[0.9] tracking-wide text-cream mt-3">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <Stars rating={product.rating} size={14} />
              <span className="font-mono text-xs text-fog">
                {product.rating.toFixed(1)} · {product.reviews} reviews
              </span>
            </div>

            <div className="flex items-baseline gap-3 mt-6">
              <span className="font-display text-5xl text-ember">{fmt(product.price)}</span>
              {product.oldPrice && (
                <span className="font-mono text-base text-ash line-through">{fmt(product.oldPrice)}</span>
              )}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-6 text-fog leading-relaxed text-[15px] max-w-xl">{product.description}</p>

            <div className="flex flex-wrap gap-2 mt-6">
              {product.notes.map((n) => (
                <span
                  key={n}
                  className="border border-line2 rounded-sm px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-parch bg-panel/60"
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
                    <IconCheck size={15} /> In the cart
                  </>
                ) : soldOut ? (
                  "Sold out"
                ) : (
                  <>
                    <IconCart size={15} /> Add to cart
                  </>
                )}
              </button>
              <button className="btn-ghost" disabled={soldOut} onClick={() => add(true)}>
                Buy now
              </button>
            </div>

            <p
              className={`mt-4 font-mono text-[11px] tracking-[0.16em] uppercase ${
                soldOut ? "text-[#d98a7a]" : product.stock <= 5 ? "text-ember" : "text-jade"
              }`}
            >
              {soldOut
                ? "Sold out — restocking soon"
                : product.stock <= 5
                ? `Only ${product.stock} left in the cellar`
                : `In stock · ${product.stock} available`}
            </p>
          </Reveal>

          {/* meta */}
          <Reveal delay={220}>
            <dl className="mt-8 border border-line rounded-sm divide-y divide-line font-mono text-xs max-w-xl">
              {[
                ["SKU", product.sku],
                ["Origin", product.origin],
                ["Category", product.category],
                ["Stock", `${product.stock} units`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between px-4 py-3">
                  <dt className="tracking-[0.18em] uppercase text-ash">{k}</dt>
                  <dd className="text-parch">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex items-start gap-3 text-sm text-fog max-w-xl">
              <span className="text-ember shrink-0 mt-0.5">
                <IconTruck size={17} />
              </span>
              <p className="leading-relaxed">
                Ships in a cedar-lined box the same day if ordered before 16:00. Free shipping
                over $150. Photo ID (21+) required at the door.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* related */}
      {(related.length > 0 || fallback.length > 0) && (
        <section className="mt-24">
          <Reveal>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-copper flex items-center gap-2">
                  <span className="inline-block h-px w-8 bg-copper" />
                  Pairs well with
                </p>
                <h2 className="font-display text-4xl md:text-5xl tracking-wide mt-3 text-cream">
                  More From The Cellar
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
