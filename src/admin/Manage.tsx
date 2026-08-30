import React, { useMemo, useState } from "react";
import {
  CATEGORIES,
  Category,
  IMAGE_LIBRARY,
  OrderStatus,
  Product,
  fmt,
  fmtDate,
  timeAgo,
} from "../data";
import { useStore } from "../store";
import {
  IconBox,
  IconPencil,
  IconPlus,
  IconSearch,
  IconTrash,
  IconX,
} from "../ui";

/* ------------------------------------------------------------------ */
/*  Products                                                           */
/* ------------------------------------------------------------------ */

const emptyForm = {
  name: "",
  category: "Cigars" as Category,
  price: "",
  oldPrice: "",
  stock: "",
  sku: "",
  origin: "",
  badge: "",
  description: "",
  notes: "",
  image: IMAGE_LIBRARY[0].url,
  featured: false,
};

export function ProductsAdmin() {
  const { products, saveProduct, deleteProduct, toast } = useStore();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, query]);

  const remove = (p: Product) => {
    if (confirmId !== p.id) {
      setConfirmId(p.id);
      window.setTimeout(() => setConfirmId((c) => (c === p.id ? null : c)), 2600);
      return;
    }
    deleteProduct(p.id);
    setConfirmId(null);
    toast(`"${p.name}" removed from the shelf`, "warn");
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c7183]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, SKU, category…"
            className="field !bg-steel !pl-9"
          />
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5c7183]">
          {filtered.length} of {products.length} lots
        </span>
        <button
          className="btn-ember !bg-jade hover:!bg-[#b8d6c5] !text-[#0d1a13] ml-auto"
          onClick={() => setCreating(true)}
        >
          <IconPlus size={14} strokeWidth={2.4} /> New product
        </button>
      </div>

      <div className="border border-steelline bg-steel2/80 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[760px]">
            <thead>
              <tr className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5c7183] border-b border-steelline bg-[#0d1319]">
                <th className="py-3 px-4 font-medium">Product</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Price</th>
                <th className="py-3 px-4 font-medium">Stock</th>
                <th className="py-3 px-4 font-medium">Featured</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steelline">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-11 w-11 object-cover rounded-sm border border-steelline shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-cream truncate max-w-[220px]">{p.name}</p>
                        <p className="font-mono text-[10px] text-[#5c7183]">{p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-[#7f93a6]">{p.category}</td>
                  <td className="py-3 px-4 font-mono text-xs text-cream">
                    {fmt(p.price)}
                    {p.oldPrice && <span className="text-[#5c7183] line-through ml-1.5">{fmt(p.oldPrice)}</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-mono text-xs px-2 py-1 rounded-sm border ${
                        p.stock === 0
                          ? "text-[#e8927c] border-[#e8927c]/40 bg-[#e8927c]/10"
                          : p.stock <= 5
                          ? "text-ember border-ember/40 bg-ember/10"
                          : "text-jade border-jade/40 bg-jade/10"
                      }`}
                    >
                      {p.stock === 0 ? "OUT" : p.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        saveProduct({ ...p, featured: !p.featured });
                        toast(p.featured ? "Removed from house favourites" : "Added to house favourites", "info");
                      }}
                      className={`font-mono text-[10px] tracking-[0.14em] uppercase px-2.5 py-1.5 rounded-sm border transition-colors cursor-pointer ${
                        p.featured
                          ? "text-jade border-jade/40 bg-jade/10 hover:bg-jade/20"
                          : "text-[#7f93a6] border-steelline hover:border-jade/40 hover:text-jade"
                      }`}
                    >
                      {p.featured ? "ON" : "OFF"}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditing(p)}
                        className="h-8 w-8 grid place-items-center rounded-sm border border-steelline text-[#7f93a6] hover:text-jade hover:border-jade/50 transition-colors cursor-pointer"
                        aria-label={`Edit ${p.name}`}
                      >
                        <IconPencil size={14} />
                      </button>
                      <button
                        onClick={() => remove(p)}
                        className={`h-8 grid place-items-center rounded-sm border transition-all cursor-pointer ${
                          confirmId === p.id
                            ? "w-auto px-3 border-[#e8927c] bg-[#e8927c]/15 text-[#e8927c] font-mono text-[10px] tracking-wide"
                            : "w-8 border-steelline text-[#7f93a6] hover:text-[#e8927c] hover:border-[#e8927c]/50"
                        }`}
                        aria-label={`Delete ${p.name}`}
                      >
                        {confirmId === p.id ? "Sure?" : <IconTrash size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-14 text-center">
                    <span className="inline-block text-[#26303a]"><IconBox size={40} strokeWidth={1.2} /></span>
                    <p className="font-mono text-xs text-[#5c7183] mt-3">No lots match that search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(creating || editing) && (
        <ProductModal
          product={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

/* ---------------- modal editor ---------------- */

function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { saveProduct, toast } = useStore();
  const [form, setForm] = useState(() =>
    product
      ? {
          name: product.name,
          category: product.category,
          price: String(product.price),
          oldPrice: product.oldPrice ? String(product.oldPrice) : "",
          stock: String(product.stock),
          sku: product.sku,
          origin: product.origin,
          badge: product.badge ?? "",
          description: product.description,
          notes: product.notes.join(", "),
          image: product.image,
          featured: Boolean(product.featured),
        }
      : emptyForm
  );
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const set = <K extends keyof typeof emptyForm>(k: K, v: (typeof emptyForm)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = {
      name: form.name.trim().length < 2,
      price: !(Number(form.price) > 0),
      stock: form.stock === "" || Number(form.stock) < 0 || Number.isNaN(Number(form.stock)),
      image: form.image.trim().length === 0,
    };
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) {
      toast("Fix the highlighted fields before saving", "warn");
      return;
    }
    const id = product?.id ?? "p-" + Math.random().toString(36).slice(2, 8);
    saveProduct({
      id,
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      stock: Math.floor(Number(form.stock)),
      sku: form.sku.trim() || "SC-NEW-" + id.slice(2, 5).toUpperCase(),
      origin: form.origin.trim() || "Unknown",
      rating: product?.rating ?? 4.5,
      reviews: product?.reviews ?? 0,
      description: form.description.trim() || "A fresh arrival in the cellar — full tasting notes coming soon.",
      notes: form.notes.split(",").map((n) => n.trim()).filter(Boolean),
      image: form.image.trim(),
      featured: form.featured,
      badge: form.badge.trim() || undefined,
    });
    toast(product ? "Product updated" : "Product added to the shelf", "ok");
    onClose();
  };

  const label = "font-mono text-[10px] tracking-[0.2em] uppercase text-[#7f93a6]";

  return (
    <div className="fixed inset-0 z-[85] grid place-items-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[3px]" onClick={onClose} />
      <form
        onSubmit={submit}
        className="relative w-full max-w-2xl border border-steelline bg-steel2 rounded-sm my-8 animate-rise max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-steelline bg-steel2 z-10">
          <h3 className="font-display text-2xl tracking-wide text-cream">
            {product ? "EDIT LOT" : "NEW LOT"}
          </h3>
          <button type="button" onClick={onClose} className="text-[#7f93a6] hover:text-cream transition-colors cursor-pointer" aria-label="Close editor">
            <IconX size={20} />
          </button>
        </div>

        <div className="p-6 grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={label}>Name</label>
            <input className={`field mt-1.5 !bg-steel ${errors.name ? "field-error" : ""}`} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Habana Reserva No. 5" />
          </div>

          <div>
            <label className={label}>Category</label>
            <select className="field mt-1.5 !bg-steel cursor-pointer" value={form.category} onChange={(e) => set("category", e.target.value as Category)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Origin</label>
            <input className="field mt-1.5 !bg-steel" value={form.origin} onChange={(e) => set("origin", e.target.value)} placeholder="Havana, Cuba" />
          </div>

          <div>
            <label className={label}>Price ($)</label>
            <input className={`field mt-1.5 !bg-steel ${errors.price ? "field-error" : ""}`} type="number" min="0" step="0.01" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="148" />
          </div>
          <div>
            <label className={label}>Old price — optional</label>
            <input className="field mt-1.5 !bg-steel" type="number" min="0" step="0.01" value={form.oldPrice} onChange={(e) => set("oldPrice", e.target.value)} placeholder="164" />
          </div>

          <div>
            <label className={label}>Stock</label>
            <input className={`field mt-1.5 !bg-steel ${errors.stock ? "field-error" : ""}`} type="number" min="0" value={form.stock} onChange={(e) => set("stock", e.target.value)} placeholder="14" />
          </div>
          <div>
            <label className={label}>SKU</label>
            <input className="field mt-1.5 !bg-steel" value={form.sku} onChange={(e) => set("sku", e.target.value)} placeholder="SC-CIG-005" />
          </div>

          <div>
            <label className={label}>Badge — optional</label>
            <input className="field mt-1.5 !bg-steel" value={form.badge} onChange={(e) => set("badge", e.target.value)} placeholder="Best Seller" />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="accent-[#9cc4ad] h-4 w-4" />
              <span className={label}>Featured on home page</span>
            </label>
          </div>

          <div className="sm:col-span-2">
            <label className={label}>Image</label>
            <input className={`field mt-1.5 !bg-steel ${errors.image ? "field-error" : ""}`} value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://…" />
            <div className="flex flex-wrap gap-2 mt-2.5">
              {IMAGE_LIBRARY.map((img) => (
                <button
                  type="button"
                  key={img.url}
                  onClick={() => set("image", img.url)}
                  className={`h-12 w-12 rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${
                    form.image === img.url ? "border-jade scale-105" : "border-steelline opacity-60 hover:opacity-100"
                  }`}
                  title={img.label}
                >
                  <img src={img.url} alt={img.label} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className={label}>Description</label>
            <textarea className="field mt-1.5 !bg-steel min-h-[90px] resize-none" value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Tasting notes, provenance, why it earned shelf space…" />
          </div>

          <div className="sm:col-span-2">
            <label className={label}>Notes — comma separated</label>
            <input className="field mt-1.5 !bg-steel" value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Cedar, Dark cocoa, Espresso" />
          </div>
        </div>

        <div className="sticky bottom-0 flex gap-3 px-6 py-4 border-t border-steelline bg-steel2">
          <button type="button" className="btn-ghost flex-1" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-ember flex-[2] !bg-jade hover:!bg-[#b8d6c5] !text-[#0d1a13]">
            {product ? "Save changes" : "Add to shelf"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Orders                                                             */
/* ------------------------------------------------------------------ */

export function OrdersAdmin() {
  const { orders, updateOrderStatus, toast } = useStore();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  const filtered = useMemo(
    () => (filter === "all" ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    (["pending", "shipped", "delivered", "cancelled"] as OrderStatus[]).forEach((s) => {
      c[s] = orders.filter((o) => o.status === s).length;
    });
    return c;
  }, [orders]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["all", "pending", "shipped", "delivered", "cancelled"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3.5 py-2 rounded-sm font-mono text-[11px] tracking-[0.12em] uppercase border transition-all cursor-pointer ${
              filter === s
                ? "bg-jade text-[#0d1a13] border-jade font-semibold"
                : "border-steelline text-[#7f93a6] hover:border-jade/50 hover:text-jade"
            }`}
          >
            {s} <span className="opacity-70">{counts[s]}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-steelline bg-steel2/80 rounded-sm py-20 text-center">
          <p className="font-mono text-xs text-[#5c7183]">No orders in this state. The ledger is quiet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((o) => (
            <div key={o.id} className="border border-steelline bg-steel2/80 rounded-sm overflow-hidden">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4">
                <button
                  onClick={() => setExpanded((e) => (e === o.id ? null : o.id))}
                  className="font-mono text-xs text-jade hover:underline cursor-pointer"
                >
                  {o.id}
                </button>
                <div className="min-w-0">
                  <p className="text-sm text-cream">{o.customer}</p>
                  <p className="font-mono text-[10px] text-[#5c7183]">{o.email}</p>
                </div>
                <span className="font-mono text-[10px] text-[#7f93a6] ml-auto">{fmtDate(o.date)} · {timeAgo(o.date)}</span>
                <span className="font-mono text-sm text-cream">{fmt(o.total)}</span>
                <select
                  value={o.status}
                  onChange={(e) => {
                    updateOrderStatus(o.id, e.target.value as OrderStatus);
                    toast(`${o.id} marked ${e.target.value}`, "info");
                  }}
                  className={`field !w-auto !py-1.5 !px-3 font-mono text-[11px] uppercase tracking-wider cursor-pointer !bg-steel ${
                    o.status === "pending"
                      ? "!border-ember/50 text-ember"
                      : o.status === "shipped"
                      ? "!border-[#8fb8d8]/50 text-[#8fb8d8]"
                      : o.status === "delivered"
                      ? "!border-jade/50 text-jade"
                      : "!border-[#d98a7a]/50 text-[#d98a7a]"
                  }`}
                  aria-label={`Status of order ${o.id}`}
                >
                  {(["pending", "shipped", "delivered", "cancelled"] as OrderStatus[]).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div
                className={`grid transition-all duration-300 ${expanded === o.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-steelline px-5 py-4 grid md:grid-cols-[1fr_auto] gap-4">
                    <ul className="space-y-2.5">
                      {o.items.map((it) => (
                        <li key={it.id} className="flex items-center gap-3">
                          <img src={it.image} alt="" className="h-10 w-10 object-cover rounded-sm border border-steelline" />
                          <span className="text-sm text-cream flex-1">
                            {it.name} <span className="font-mono text-[10px] text-[#5c7183]">×{it.qty}</span>
                          </span>
                          <span className="font-mono text-xs text-[#7f93a6]">{fmt(it.price * it.qty)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="font-mono text-xs text-[#7f93a6] space-y-1.5 md:text-right self-start border border-steelline rounded-sm p-4 min-w-[220px]">
                      <p className="text-[#7f93a6]">Ship to:</p>
                      <p className="text-cream normal-case">{o.address}</p>
                      <p className="pt-2 border-t border-steelline">
                        Subtotal {fmt(o.subtotal)} · Shipping {o.shipping === 0 ? "free" : fmt(o.shipping)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
