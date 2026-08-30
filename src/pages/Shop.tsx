import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES, faNum } from "../data";
import { useStore } from "../store";
import { ProductCard } from "../chrome";
import { IconFlame, IconSearch, IconX, Reveal } from "../ui";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "name";

export default function Shop() {
  const { products } = useStore();
  const [params, setParams] = useSearchParams();

  const catParam = params.get("cat") ?? "همه";
  const [cat, setCat] = useState<string>(
    CATEGORIES.includes(catParam as never) ? catParam : "همه"
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    const c = params.get("cat");
    if (c && (CATEGORIES.includes(c as never) || c === "همه")) setCat(c);
  }, [params]);

  const changeCat = (c: string) => {
    setCat(c);
    if (c === "همه") setParams({}, { replace: true });
    else setParams({ cat: c }, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat !== "همه") list = list.filter((p) => p.category === cat);
    if (inStockOnly) list = list.filter((p) => p.stock > 0);
    const q = query.trim().toLowerCase();
    if (q)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.includes(q) ||
          p.origin.includes(q) ||
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
        list.sort((a, b) => a.name.localeCompare(b.name, "fa"));
        break;
      default:
        list.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
    }
    return list;
  }, [products, cat, query, sort, inStockOnly]);

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-14">
      {/* سربرگ */}
      <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end">
        <div>
          <p className="font-latin text-2xl md:text-3xl text-outline leading-none tracking-wide">
            THE SHOP
          </p>
          <p className="text-xs font-bold text-copper flex items-center gap-3 mt-3">
            <span className="inline-block h-px w-8 bg-copper" />
            کلِّ سردابه
          </p>
          <h1 className="font-display text-6xl md:text-8xl leading-[1.02] mt-2 text-cream">
            فروشگاه
          </h1>
          <p className="text-fog mt-4 max-w-lg text-[15px] leading-relaxed">
            امروز {faNum(products.length)} قلم روی قفسه است — هرکدام تست‌شده، در رطوبت نگه‌داری‌شده
            و آمادهٔ ارسال. بر اساس دپارتمان فیلتر کنید یا با نام، خاستگاه و شناسه بگردید.
          </p>
        </div>
        <div className="text-start text-[11px] font-semibold text-ash leading-relaxed">
          نمایش <span className="text-ember2">{faNum(filtered.length)}</span> از{" "}
          <span className="text-parch">{faNum(products.length)}</span>
        </div>
      </div>

      {/* کنترل‌ها */}
      <div className="mt-10 border-y border-line py-4 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2 flex-1">
          {["همه", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => changeCat(c)}
              className={`px-3.5 py-2 rounded-sm text-xs font-bold border transition-all duration-200 cursor-pointer ${
                cat === c
                  ? "bg-ember text-[#211507] border-ember"
                  : "border-line2 text-fog hover:border-ember hover:text-ember"
              }`}
            >
              {c}
              {c !== "همه" && (
                <span className={`ms-1.5 ${cat === c ? "opacity-70" : "text-ash"}`}>
                  {faNum(products.filter((p) => p.category === c).length)}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative">
          <IconSearch size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-ash" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جست‌وجوی برگ، پیپ، شناسه…"
            className="field !ps-9 !py-2 w-56"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-ash hover:text-ember cursor-pointer"
              aria-label="پاک‌کردن جست‌وجو"
            >
              <IconX size={14} />
            </button>
          )}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="field !py-2 w-44 cursor-pointer"
          aria-label="مرتب‌سازی محصولات"
        >
          <option value="featured">مرتب‌سازی — پیشنهادی</option>
          <option value="price-asc">قیمت · کم به زیاد</option>
          <option value="price-desc">قیمت · زیاد به کم</option>
          <option value="rating">بیشترین امتیاز</option>
          <option value="name">نام (الفبا)</option>
        </select>

        <button
          onClick={() => setInStockOnly((v) => !v)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-sm border text-xs font-bold transition-all cursor-pointer ${
            inStockOnly
              ? "border-jade/60 text-jade bg-jade/10"
              : "border-line2 text-fog hover:border-jade hover:text-jade"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full transition-colors ${inStockOnly ? "bg-jade" : "bg-ash"}`}
          />
          فقط موجود
        </button>
      </div>

      {/* شبکهٔ محصولات */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <span className="inline-block text-line2">
            <IconFlame size={54} strokeWidth={1.1} />
          </span>
          <h2 className="font-display text-4xl text-fog mt-5">چیزی در زیرسیگاری نیست</h2>
          <p className="text-sm text-ash mt-2 max-w-sm mx-auto leading-relaxed">
            هیچ قلمی با این ترکیب جور درنمی‌آید. فیلترها را شل کنید یا جست‌وجو را پاک کنید و دوباره امتحان کنید.
          </p>
          <button
            className="btn-ghost mt-6"
            onClick={() => {
              setQuery("");
              setInStockOnly(false);
              changeCat("همه");
            }}
          >
            حذف فیلترها
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

      <p className="mt-12 text-center text-[11px] font-semibold text-ash">
        ارسال رایگان برای سفارش‌های بالای ۱۵۰ دلار · کنترل مدرک هنگام تحویل · فقط ۱۸+
      </p>
    </main>
  );
}
