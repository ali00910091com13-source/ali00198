/* ------------------------------------------------------------------ */
/*  اسموک سیتی — مدل داده و محتوای اولیه                                 */
/* ------------------------------------------------------------------ */

export type Category =
  | "سیگار برگ"
  | "توتون پیپ"
  | "پیپ و ابزار"
  | "قلیان"
  | "پیچ و کاغذ"
  | "لوازم جانبی";

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
  "سیگار برگ",
  "توتون پیپ",
  "پیپ و ابزار",
  "قلیان",
  "پیچ و کاغذ",
  "لوازم جانبی",
];

export const ADMIN_CREDENTIALS = { username: "admin", password: "ember2024" };

/* ------------------------------------------------------------------ */
/*  ابزارهای فارسی‌سازی اعداد، تاریخ و مبلغ                              */
/* ------------------------------------------------------------------ */

const FA_DIGITS: Record<string, string> = {
  "0": "۰", "1": "۱", "2": "۲", "3": "۳", "4": "۴",
  "5": "۵", "6": "۶", "7": "۷", "8": "۸", "9": "۹",
};

export const faD = (v: string | number) =>
  String(v)
    .replace(/[0-9]/g, (d) => FA_DIGITS[d])
    .replace(/,/g, "٬")
    .replace(/\./g, "٫");

export const faNum = (n: number) => faD(n.toLocaleString("en-US"));

export const fmt = (n: number) =>
  faD(n.toLocaleString("en-US", { maximumFractionDigits: 2 })) + " دلار";

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fa-IR", { day: "numeric", month: "long", year: "numeric" });

export const timeAgo = (iso: string) => {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "همین حالا";
  const m = Math.floor(s / 60);
  if (m < 60) return `${faNum(m)} دقیقه پیش`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${faNum(h)} ساعت پیش`;
  const d = Math.floor(h / 24);
  return `${faNum(d)} روز پیش`;
};

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
  { label: "جعبه سیگار برگ", url: IMG.cigars },
  { label: "بسته توتون", url: IMG.tobacco },
  { label: "پیپ بریار", url: IMG.pipe },
  { label: "فندک برنجی", url: IMG.lighter },
  { label: "قلیان", url: IMG.hookah },
  { label: "ست پیچ", url: IMG.rolling },
  { label: "هیومیدار", url: IMG.humidor },
  { label: "کاتر سیگار", url: IMG.cutter },
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: "p-habana",
    name: "هوانا رزروا شمارهٔ ۵",
    category: "سیگار برگ",
    price: 148,
    stock: 14,
    sku: "SC-CIG-005",
    origin: "هاوانا، کوبا",
    rating: 4.9,
    reviews: 212,
    description:
      "بیست‌وپنج ماه در چوب سدر کهنه شده؛ پیچی با روکش برگ کوروبوی اکوادور که نرم مثل ابریشم است. افتخار سردابهٔ ما — آرام‌سوز، بی‌نقص و با خاکستری سرد و یکدستی که حاضر نیست بریزد.",
    notes: ["سدر", "کاکائوی تلخ", "اسپرسو", "فلفل سفید"],
    image: IMG.cigars,
    featured: true,
    badge: "پرفروش",
  },
  {
    id: "p-golden",
    name: "بلندِ ساعت طلایی — ۵۰ گرم",
    category: "توتون پیپ",
    price: 24.5,
    oldPrice: 29,
    stock: 42,
    sku: "SC-TOB-012",
    origin: "کپنهاگ، دانمارک",
    rating: 4.7,
    reviews: 158,
    description:
      "پایهٔ ویرجینیای روشن با کمی پریک که مزه را از یکنواختی درمی‌آورد. همان هفتهٔ رسیدن، فشرده، ورق و قوطی می‌شود. راحت فشرده می‌شود، خشک می‌سوزد و بوی پاییز را به خانه می‌آورد.",
    notes: ["عسل", "کاه", "میوه‌های هسته‌دار", "انجیر"],
    image: IMG.tobacco,
    badge: "تولید محدود",
  },
  {
    id: "p-briar",
    name: "پیپ بریروود میراثی",
    category: "پیپ و ابزار",
    price: 189,
    stock: 7,
    sku: "SC-PIP-031",
    origin: "پزارو، ایتالیا",
    rating: 4.8,
    reviews: 96,
    description:
      "از بریار ۲۸ سالهٔ کالابریا، تراشِ دست با رگه‌های شعله‌ای که از عکس‌هایش هم زیباتر می‌سوزد. دهانهٔ اکریلیک کهرباییِ دست‌ساز و مجرای هوای باریک و نرم دارد.",
    notes: ["رگهٔ شعله‌ای", "دهانهٔ کهربایی", "فیلتر ۹ میلی‌متری", "تراش دستی"],
    image: IMG.pipe,
    badge: "ساخت دست",
  },
  {
    id: "p-ember",
    name: "فندک برنجی اِمبِر",
    category: "لوازم جانبی",
    price: 59,
    stock: 23,
    sku: "SC-ACC-077",
    origin: "بیرمنگام، انگلستان",
    rating: 4.6,
    reviews: 301,
    description:
      "برنج یکپارچهٔ ماشین‌کاری‌شده با شعلهٔ ملایمی که برای روشن‌کردن با تراشهٔ سدر تنظیم شده، نه مشعل بوتان. ظرف یک ماه پتینهٔ اصیل خودش را پیدا می‌کند. گارانتی مادام‌العمر — خراب شد، تعمیر یا تعویض؛ بدون فاکتور.",
    notes: ["برنج یکپارچه", "شعلهٔ ملایم", "گارانتی مادام‌العمر", "درپوش ضدباد"],
    image: IMG.lighter,
    featured: true,
  },
  {
    id: "p-midnight",
    name: "قلیان میدنایت",
    category: "قلیان",
    price: 229,
    stock: 5,
    sku: "SC-HKA-009",
    origin: "استانبول، ترکیه",
    rating: 4.9,
    reviews: 74,
    description:
      "مخزن شیشهٔ بوروسیلیکات مشکی، ساقهٔ برنجی و کامی آن‌قدر نرم که انگار از قلیانی دو برابر این قیمت قرض گرفته‌اید. با دو شلنگ، سری سرامیکی و زغال نارگیل کافی برای یک هفته ارسال می‌شود.",
    notes: ["شیشهٔ بوروسیلیکات", "ساقهٔ برنجی", "دو شلنگ", "سری سرامیکی"],
    image: IMG.hookah,
    featured: true,
    badge: "تعداد محدود",
  },
  {
    id: "p-rolling",
    name: "ست پیچ کلاسیک",
    category: "پیچ و کاغذ",
    price: 19,
    stock: 60,
    sku: "SC-ROL-044",
    origin: "پریگو، فرانسه",
    rating: 4.5,
    reviews: 428,
    description:
      "هرچه آیین پیچیدن لازم دارد: دو دفترچه کاغذ کنفی بدون سفیدکننده، فیلتر دهانه، غلتک برنجی‌ای که هرگز گیر نمی‌کند و قوطی مگنتی‌ای که حتی در کتابخانه هم سر و صدا نمی‌کند. بدون رنگ، بدون طعم، بدون حاشیه.",
    notes: ["کنف بدون سفیدکننده", "غلتک برنجی", "قوطی مگنتی", "فیلتر دهانه"],
    image: IMG.rolling,
  },
  {
    id: "p-vault",
    name: "هیومیدار صندوقچهٔ سدر",
    category: "لوازم جانبی",
    price: 129,
    stock: 9,
    sku: "SC-ACC-019",
    origin: "والنسیا، اسپانیا",
    rating: 4.8,
    reviews: 133,
    description:
      "به‌لطف روکش سدر اسپانیایی و رطوبت‌سنج مغناطیسیِ قابل‌اعتماد، چهل برگ را در رطوبت تنبلِ ۶۹٪ نگه می‌دارد. لولای پیانویی‌اش مثل گاوصندوق بسته می‌شود — چون دقیقاً برای همین ساخته شده.",
    notes: ["سدر اسپانیایی", "ظرفیت ۴۰ برگ", "رطوبت‌سنج مغناطیسی", "لولای پیانویی"],
    image: IMG.humidor,
    featured: true,
  },
  {
    id: "p-sterling",
    name: "ست کاتر استرلینگ",
    category: "لوازم جانبی",
    price: 49,
    oldPrice: 64,
    stock: 3,
    sku: "SC-ACC-092",
    origin: "زولینگن، آلمان",
    rating: 4.7,
    reviews: 88,
    description:
      "کاتر گیوتین دوبل و پانچ از استیل ضدزنگ که در زولینگن چنان تیز شده رینگ ۵۴ را تمیز می‌بُرد و صدایش شنیده می‌شود. در جعبهٔ کشویی گردویی عرضه می‌شود. فقط سه ست مانده — تمام شود، تمام است.",
    notes: ["گیوتین دوبل", "پانچ کلاهکی", "جعبهٔ گردویی", "رینگ ۵۴"],
    image: IMG.cutter,
    badge: "آخرین فرصت",
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
    customer: "کاوه حیدری",
    email: "k.heydari@postbox.ir",
    address: "تهران، خیابان ولیعصر، کوچهٔ سایه، پلاک ۸۸، واحد ۳",
    items: [
      { id: "p-habana", name: "هوانا رزروا شمارهٔ ۵", price: 148, qty: 1, image: IMG.cigars },
      { id: "p-sterling", name: "ست کاتر استرلینگ", price: 49, qty: 1, image: IMG.cutter },
    ],
    subtotal: 197,
    shipping: 0,
    total: 197,
    date: daysAgo(1),
    status: "pending",
  },
  {
    id: "SC-90388",
    customer: "اینا کواچ",
    email: "ines.k@nightowl.hr",
    address: "زاگرب، خیابان ووکوار ۱۲",
    items: [
      { id: "p-midnight", name: "قلیان میدنایت", price: 229, qty: 1, image: IMG.hookah },
    ],
    subtotal: 229,
    shipping: 0,
    total: 229,
    date: daysAgo(2),
    status: "pending",
  },
  {
    id: "SC-90341",
    customer: "دیمیتری ولکوف",
    email: "d.volkov@mailbox.org",
    address: "لندن، میدان اکسچنج ۱۴، E1 6AN",
    items: [
      { id: "p-golden", name: "بلندِ ساعت طلایی — ۵۰ گرم", price: 24.5, qty: 3, image: IMG.tobacco },
      { id: "p-ember", name: "فندک برنجی اِمبِر", price: 59, qty: 1, image: IMG.lighter },
    ],
    subtotal: 132.5,
    shipping: 12,
    total: 144.5,
    date: daysAgo(4),
    status: "shipped",
  },
  {
    id: "SC-90297",
    customer: "سوفیا مارکتی",
    email: "sofia.m@atelier.it",
    address: "تورین، خیابان دل فومو ۳",
    items: [
      { id: "p-briar", name: "پیپ بریروود میراثی", price: 189, qty: 1, image: IMG.pipe },
      { id: "p-golden", name: "بلندِ ساعت طلایی — ۵۰ گرم", price: 24.5, qty: 2, image: IMG.tobacco },
    ],
    subtotal: 238,
    shipping: 0,
    total: 238,
    date: daysAgo(6),
    status: "delivered",
  },
  {
    id: "SC-90254",
    customer: "آرتور بلین",
    email: "a.blaine@ledger.co",
    address: "بوستون، خیابان روپ‌واک ۳۰۱",
    items: [
      { id: "p-vault", name: "هیومیدار صندوقچهٔ سدر", price: 129, qty: 1, image: IMG.humidor },
      { id: "p-rolling", name: "ست پیچ کلاسیک", price: 19, qty: 2, image: IMG.rolling },
    ],
    subtotal: 167,
    shipping: 0,
    total: 167,
    date: daysAgo(9),
    status: "delivered",
  },
  {
    id: "SC-90210",
    customer: "یوکی تاناکا",
    email: "yuki.t@kumo.jp",
    address: "توکیو، گینزا ۲-۷-۴",
    items: [
      { id: "p-ember", name: "فندک برنجی اِمبِر", price: 59, qty: 2, image: IMG.lighter },
    ],
    subtotal: 118,
    shipping: 12,
    total: 130,
    date: daysAgo(12),
    status: "cancelled",
  },
];

export const WARNINGS = [
  "هشدار: مصرف دخانیات عامل اصلی سرطان ریه، سکتهٔ قلبی و مغزی است.",
  "فروش به افراد زیر ۱۸ سال ممنوع است و پیگرد قانونی دارد.",
  "هشدار: مصرف دخانیات باعث نارسایی جنین و مرگ زودرس می‌شود.",
  "ترک سیگار خطر بیماری‌های قلبی و ریوی را به‌شدت کاهش می‌دهد.",
  "هشدار: دود قلیان حاوی مواد سمی و سرطان‌زا است.",
];
