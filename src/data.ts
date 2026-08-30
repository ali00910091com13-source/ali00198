/* ------------------------------------------------------------------ */
/*  Smoke City — data model & seed content                             */
/* ------------------------------------------------------------------ */

export type Category =
  | "Cigars"
  | "Pipe Tobacco"
  | "Pipes"
  | "Hookah"
  | "Rolling"
  | "Accessories";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  stock: number;
  sku: string;
  origin: string;
  rating: number;
  reviews: number;
  description: string;
  notes: string[];
  image: string;
  featured?: boolean;
  badge?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  customer: string;
  email: string;
  address: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  date: string; // ISO
  status: OrderStatus;
}

export const CATEGORIES: Category[] = [
  "Cigars",
  "Pipe Tobacco",
  "Pipes",
  "Hookah",
  "Rolling",
  "Accessories",
];

export const ADMIN_CREDENTIALS = { username: "admin", password: "ember2024" };

export const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/b321c60a-b66e-4d70-a3a4-f89b51381920/_result.png",
  cigars: "https://image.qwenlm.ai/generated-images/468f6918-ae2e-428b-80bc-89a9740f9c3d/_result.png",
  tobacco: "https://image.qwenlm.ai/generated-images/54d01a1f-b55c-462e-9710-5310ddbb5f3d/_result.png",
  pipe: "https://image.qwenlm.ai/generated-images/f57a963e-b31c-4559-830a-10d10506c60b/_result.png",
  lighter: "https://image.qwenlm.ai/generated-images/f6cd63db-f46f-4884-94ac-f8f15a3ea44d/_result.png",
  hookah: "https://image.qwenlm.ai/generated-images/cce847e4-0e42-4647-8f48-57e245e5374e/_result.png",
  rolling: "https://image.qwenlm.ai/generated-images/d14e092a-4303-45b1-9195-8bdce8511ac4/_result.png",
  humidor: "https://image.qwenlm.ai/generated-images/21248cf0-4105-4654-88ad-50526d4089e7/_result.png",
  cutter: "https://image.qwenlm.ai/generated-images/d80e5ca2-4bb9-4406-a9a3-95e452088d6f/_result.png",
};

export const IMAGE_LIBRARY: { label: string; url: string }[] = [
  { label: "Cigar box", url: IMG.cigars },
  { label: "Tobacco pouch", url: IMG.tobacco },
  { label: "Briar pipe", url: IMG.pipe },
  { label: "Brass lighter", url: IMG.lighter },
  { label: "Hookah", url: IMG.hookah },
  { label: "Rolling kit", url: IMG.rolling },
  { label: "Humidor", url: IMG.humidor },
  { label: "Cigar cutter", url: IMG.cutter },
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: "p-habana",
    name: "Habana Reserva No. 5",
    category: "Cigars",
    price: 148,
    stock: 14,
    sku: "SC-CIG-005",
    origin: "Havana, Cuba",
    rating: 4.9,
    reviews: 212,
    description:
      "Twenty-five months of cedar-aged filler wrapped in a silky Ecuadorian Corojo leaf. Our cellar's crown jewel — slow-burning, imbalanced in all the right ways, and finished with a cool grey ash that refuses to drop.",
    notes: ["Cedar", "Dark cocoa", "Espresso", "White pepper"],
    image: IMG.cigars,
    featured: true,
    badge: "Best Seller",
  },
  {
    id: "p-golden",
    name: "Golden Hour Blend — 50g",
    category: "Pipe Tobacco",
    price: 24.5,
    oldPrice: 29,
    stock: 42,
    sku: "SC-TOB-012",
    origin: "Copenhagen, Denmark",
    rating: 4.7,
    reviews: 158,
    description:
      "A bright Virginia base cavendished with just enough Perique to keep things interesting. Pressed, sliced and tinned the week it arrives. Packs easy, burns dry, leaves the room smelling like an autumn porch.",
    notes: ["Honey", "Hay", "Stone fruit", "Fig"],
    image: IMG.tobacco,
    badge: "Small Batch",
  },
  {
    id: "p-briar",
    name: "Briarwood Heritage Pipe",
    category: "Pipes",
    price: 189,
    stock: 7,
    sku: "SC-PIP-031",
    origin: "Pesaro, Italy",
    rating: 4.8,
    reviews: 96,
    description:
      "Hand-carved from 28-year-old Calabrian briar with a flame grain that photographs better than it smokes — and it smokes beautifully. Fitted with a hand-cut amber acrylic stem and a whisper-thin airway.",
    notes: ["Flame grain", "Amber stem", "9mm filter", "Hand-cut"],
    image: IMG.pipe,
    badge: "Hand-Carved",
  },
  {
    id: "p-ember",
    name: "Ember Brass Lighter",
    category: "Accessories",
    price: 59,
    stock: 23,
    sku: "SC-ACC-077",
    origin: "Birmingham, England",
    rating: 4.6,
    reviews: 301,
    description:
      "Solid machined brass with a soft-flame wheel tuned for cedar spills, not butane torches. Develops a honest patina within a month. Guaranteed for life — if it fails, we fix it or replace it. No receipts needed.",
    notes: ["Solid brass", "Soft flame", "Lifetime guarantee", "Windproof cap"],
    image: IMG.lighter,
    featured: true,
  },
  {
    id: "p-midnight",
    name: "Midnight Hookah",
    category: "Hookah",
    price: 229,
    stock: 5,
    sku: "SC-HKA-009",
    origin: "Istanbul, Türkiye",
    rating: 4.9,
    reviews: 74,
    description:
      "Black borosilicate base, brass stem, and a draw so smooth it feels borrowed from something twice the price. Ships with dual hoses, a ceramic bowl and enough coconut coal to get you through the week.",
    notes: ["Borosilicate glass", "Brass stem", "Dual hose", "Ceramic bowl"],
    image: IMG.hookah,
    featured: true,
    badge: "Limited",
  },
  {
    id: "p-rolling",
    name: "The Rolling Kit",
    category: "Rolling",
    price: 19,
    stock: 60,
    sku: "SC-ROL-044",
    origin: "Périgueux, France",
    rating: 4.5,
    reviews: 428,
    description:
      "Everything the ritual asks for: two booklets of unbleached hemp papers, crutch tips, a brass roller that never jams, and a magnetic tin quiet enough for a library. No dyes, no gum flavour, no nonsense.",
    notes: ["Unbleached hemp", "Brass roller", "Magnetic tin", "Crutch tips"],
    image: IMG.rolling,
  },
  {
    id: "p-vault",
    name: "Cedar Vault Humidor",
    category: "Accessories",
    price: 129,
    stock: 9,
    sku: "SC-ACC-019",
    origin: "Valencia, Spain",
    rating: 4.8,
    reviews: 133,
    description:
      "Holds forty cigars at a lazy 69% humidity, thanks to Spanish cedar lining and a magnetic-glass hygrometer you can actually trust. The piano hinge closes like a bank vault — because that's the point.",
    notes: ["Spanish cedar", "40-cigar capacity", "Magnetic hygrometer", "Piano hinge"],
    image: IMG.humidor,
    featured: true,
  },
  {
    id: "p-sterling",
    name: "Sterling Cutter Set",
    category: "Accessories",
    price: 49,
    oldPrice: 64,
    stock: 3,
    sku: "SC-ACC-092",
    origin: "Solingen, Germany",
    rating: 4.7,
    reviews: 88,
    description:
      "A double-guillotine cutter and punch in brushed stainless, honed in Solingen to cut a 54 ring gauge clean enough to hear. Presented in a walnut slide-box. Three sets left — when they're gone, they're gone.",
    notes: ["Double guillotine", "Punch cap", "Walnut box", "54-ring gauge"],
    image: IMG.cutter,
    badge: "Last Call",
  },
];

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(10 + (n % 8), 12 + ((n * 7) % 45), 0, 0);
  return d.toISOString();
};

export const SEED_ORDERS: Order[] = [
  {
    id: "SC-90412",
    customer: "Marcus Hale",
    email: "m.hale@postbox.com",
    address: "88 Foundry Lane, Chicago, IL 60642",
    items: [
      { id: "p-habana", name: "Habana Reserva No. 5", price: 148, qty: 1, image: IMG.cigars },
      { id: "p-sterling", name: "Sterling Cutter Set", price: 49, qty: 1, image: IMG.cutter },
    ],
    subtotal: 197,
    shipping: 0,
    total: 197,
    date: daysAgo(1),
    status: "pending",
  },
  {
    id: "SC-90388",
    customer: "Ines Kovač",
    email: "ines.k@nightowl.hr",
    address: "Ulica Grada Vukovara 12, Zagreb",
    items: [
      { id: "p-midnight", name: "Midnight Hookah", price: 229, qty: 1, image: IMG.hookah },
    ],
    subtotal: 229,
    shipping: 0,
    total: 229,
    date: daysAgo(2),
    status: "pending",
  },
  {
    id: "SC-90341",
    customer: "Dmitri Volkov",
    email: "d.volkov@mailbox.org",
    address: "14 Coal Exchange Sq, London E1 6AN",
    items: [
      { id: "p-golden", name: "Golden Hour Blend — 50g", price: 24.5, qty: 3, image: IMG.tobacco },
      { id: "p-ember", name: "Ember Brass Lighter", price: 59, qty: 1, image: IMG.lighter },
    ],
    subtotal: 132.5,
    shipping: 12,
    total: 144.5,
    date: daysAgo(4),
    status: "shipped",
  },
  {
    id: "SC-90297",
    customer: "Sofia Marchetti",
    email: "sofia.m@atelier.it",
    address: "Via del Fumo 3, Torino 10122",
    items: [
      { id: "p-briar", name: "Briarwood Heritage Pipe", price: 189, qty: 1, image: IMG.pipe },
      { id: "p-golden", name: "Golden Hour Blend — 50g", price: 24.5, qty: 2, image: IMG.tobacco },
    ],
    subtotal: 238,
    shipping: 0,
    total: 238,
    date: daysAgo(6),
    status: "delivered",
  },
  {
    id: "SC-90254",
    customer: "Arthur Blaine",
    email: "a.blaine@ledger.co",
    address: "301 Ropewalk, Boston, MA 02110",
    items: [
      { id: "p-vault", name: "Cedar Vault Humidor", price: 129, qty: 1, image: IMG.humidor },
      { id: "p-rolling", name: "The Rolling Kit", price: 19, qty: 2, image: IMG.rolling },
    ],
    subtotal: 167,
    shipping: 0,
    total: 167,
    date: daysAgo(9),
    status: "delivered",
  },
  {
    id: "SC-90210",
    customer: "Yuki Tanaka",
    email: "yuki.t@kumo.jp",
    address: "2-7-4 Ginza, Chuo City, Tokyo",
    items: [
      { id: "p-ember", name: "Ember Brass Lighter", price: 59, qty: 2, image: IMG.lighter },
    ],
    subtotal: 118,
    shipping: 12,
    total: 130,
    date: daysAgo(12),
    status: "cancelled",
  },
];

export const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const timeAgo = (iso: string) => {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
};

export const WARNINGS = [
  "WARNING: This product contains nicotine. Nicotine is an addictive chemical.",
  "21+ ONLY — PHOTO ID REQUIRED ON DELIVERY. NO EXCEPTIONS.",
  "SMOKING CAUSES LUNG CANCER, HEART DISEASE AND EMPHYSEMA.",
  "SALE TO MINORS IS A CRIME. WE VERIFY EVERY ORDER.",
  "QUITTING SMOKING NOW GREATLY REDUCES SERIOUS HEALTH RISKS.",
];
