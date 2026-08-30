import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../data";
import { useStore } from "../store";
import { ProductCard } from "../chrome";
import { IconFlame, IconSearch, IconX, Reveal } from "../ui";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "name";

export default function Shop() {
  const { products } = useStore();
  const [params, setParams] = useSearchParams();

  const catParam = params.get("cat") ?? "All";
  const [cat, setCat] = useState<string>(
    CATEGORIES.includes(catParam as never) ? catParam : "All"
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    const c = params.get("cat");
    if (c && (CATEGORIES.includes(c as never) || c === "All")) setCat(c);
  }, [params]);

  const changeCat = (c: string) => {
    setCat(c);
    if (c === "All") setParams({}, { replace: true });
    else setParams({ cat: c }, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat !== "All") list = list.filter((p) => p.category === cat);
    if (inStockOnly) list = list.filter((p) => p.stock > 0);
    const q = query.trim().toLowerCase();
    if (q)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
    }
    return list;
  }, [products, cat, query, sort, inStockOnly]);

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-14">
      {/* header */}
      <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end">
        <div>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-copper flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-copper" />
            The full cellar
          </p>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.85] tracking-wide mt-4 text-cream">
            THE <span className="text-outline">SHOP</span>
          </h1>
          <p className="text-fog mt-4 max-w-lg text-[15px] leading-relaxed">
            {products.length} lots on the shelf today — each one test-lit, humidity-kept and
            ready to ship. Filter by department or hunt by name, origin or SKU.
          </p>
        </div>
        <div className="font-mono text-right text-[11px] tracking-[0.18em] uppercase text-ash leading-relaxed">
          Showing <span className="text-ember2">{filtered.length}</span> of{" "}
          <span className="text-parch">{products.length}</span>
        </div>
      </div>

      {/* controls */}
      <div className="mt-10 border-y border-line py-4 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2 flex-1">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => changeCat(c)}
              className={`px-3.5 py-2 rounded-sm font-mono text-[11px] tracking-[0.12em] uppercase border transition-all duration-200 cursor-pointer ${
                cat === c
                  ? "bg-ember text-[#211507] border-ember font-semibold"
                  : "border-line2 text-fog hover:border-ember hover:text-ember"
              }`}
            >
              {c}
              {c !== "All" && (
                <span className={`ml-1.5 ${cat === c ? "opacity-70" : "text-ash"}`}>
                  {products.filter((p) => p.category === c).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ash" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leaf, pipe, SKU…"
            className="field !pl-9 !py-2 w-56"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ash hover:text-ember cursor-pointer"
              aria-label="Clear search"
            >
              <IconX size={14} />
            </button>
          )}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="field !py-2 w-44 cursor-pointer"
          aria-label="Sort products"
        >
          <option value="featured">Sort — Featured</option>
          <option value="price-asc">Price · low → high</option>
          <option value="price-desc">Price · high → low</option>
          <option value="rating">Top rated</option>
          <option value="name">Name A–Z</option>
        </select>

        <button
          onClick={() => setInStockOnly((v) => !v)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-sm border font-mono text-[11px] tracking-[0.12em] uppercase transition-all cursor-pointer ${
            inStockOnly
              ? "border-jade/60 text-jade bg-jade/10"
              : "border-line2 text-fog hover:border-jade hover:text-jade"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full transition-colors ${inStockOnly ? "bg-jade" : "bg-ash"}`}
          />
          In stock
        </button>
      </div>

      {/* grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <span className="inline-block text-line2">
            <IconFlame size={54} strokeWidth={1.1} />
          </span>
          <h2 className="font-display text-4xl tracking-wide text-fog mt-5">NOTHING IN THE ASHTRAY</h2>
          <p className="text-sm text-ash mt-2 max-w-sm mx-auto">
            No lots match that combination. Loosen a filter or clear the search and try again.
          </p>
          <button
            className="btn-ghost mt-6"
            onClick={() => {
              setQuery("");
              setInStockOnly(false);
              changeCat("All");
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 70}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      )}

      <p className="mt-12 text-center font-mono text-[10px] tracking-[0.2em] uppercase text-ash">
        Free shipping on orders over $150 · ID verified on delivery · 21+ only
      </p>
    </main>
  );
}
