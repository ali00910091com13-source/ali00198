/* ------------------------------------------------------------------ */
/*  اسموک سیتی — مدل داده و محتوای اولیه                                  */
/* ------------------------------------------------------------------ */

export type Category =
  | "سیگار برگ"
  | "تنباکوی پیپ"
  | "پیپ"
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
  "تنباکوی پیپ",
  "پیپ",
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
  faD(Math.round(n).toLocaleString("en-US")) + " تومان";

/* ارسال رایگان و هزینهٔ پست */
export const FREE_SHIPPING = 5_000_000;
export const SHIPPING_FEE = 150_000;

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
  { label: "جعبهٔ سیگار برگ", url: IMG.cigars },
  { label: "بستهٔ تنباکو", url: IMG.tobacco },
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
    price: 2_850_000,
    stock: 14,
    sku: "SC-CIG-005",
    origin: "هاوانا، کوبا",
    rating: 4.9,
    reviews: 212,
    description:
      "بیست‌وپنج ماه کهنه‌شده در سدر و پیچیده در برگ کوروجوی اکوادوری. جواهرِ تاجِ سردابهٔ ما — آرام‌سوز، خوش‌رایحه و با خاکستریِ سردِ یکدست.",
    notes: ["سدر", "کاکائوی تلخ", "اسپرسو", "فلفل سفید"],
    image: IMG.cigars,
    featured: true,
    badge: "پرفروش",
  },
  {
    id: "p-golden",
    name: "بلندِ ساعت طلایی — ۵۰ گرم",
    category: "تنباکوی پیپ",
    price: 480_000,
    oldPrice: 560_000,
    stock: 42,
    sku: "SC-TOB-012",
    origin: "کپنهاگ، دانمارک",
    rating: 4.7,
    reviews: 158,
    description:
      "پایهٔ ویرجینیای روشن با کمی پریک که همه‌چیز را جذاب می‌کند. فشرده، برش‌خورده و در همان هفتهٔ ورود قوطی‌شده. راحت جمع می‌شود و خشک می‌سوزد.",
    notes: ["عسل", "کاه", "میوهٔ هسته‌دار", "انجیر"],
    image: IMG.tobacco,
    badge: "دست‌ساز",
  },
  {
    id: "p-briar",
    name: "پیپ بریروود میراثی",
    category: "پیپ",
    price: 3_600_000,
    stock: 7,
    sku: "SC-PIP-031",
    origin: "پزارو، ایتالیا",
    rating: 4.8,
    reviews: 96,
    description:
      "تراشِ دست از بریارِ ۲۸سالهٔ کالابریا با رگه‌های شعله‌ای که عکسش از خودش هم خوش‌دست‌تر است. مجهز به ساقِ آکریلیک کهربایی و مجرای هوای باریک.",
    notes: ["رگهٔ شعله‌ای", "ساق کهربایی", "فیلتر ۹ میلی‌متر", "دست‌ساز"],
    image: IMG.pipe,
    badge: "تراش دست",
  },
  {
    id: "p-ember",
    name: "فندک برنجی اِمبِر",
    category: "لوازم جانبی",
    price: 1_150_000,
    stock: 23,
    sku: "SC-ACC-077",
    origin: "بیرمنگام، انگلستان",
    rating: 4.6,
    reviews: 301,
    description:
      "برنجِ یکپارچهٔ ماشین‌کاری‌شده با شعلهٔ ملایمِ تنظیم‌شده برای سیگار برگ. ظرف یک ماه پاتینهٔ اصیل می‌گیرد. ضمانت مادام‌العمر — اگر خراب شد، رایگان تعمیر یا تعویض می‌کنیم.",
    notes: ["برنج یکپارچه", "شعلهٔ ملایم", "ضمانت مادام‌العمر", "درپوش ضدباد"],
    image: IMG.lighter,
    featured: true,
  },
  {
    id: "p-midnight",
    name: "قلیان میدنایت",
    category: "قلیان",
    price: 4_400_000,
    stock: 5,
    sku: "SC-HKA-009",
    origin: "استانبول، ترکیه",
    rating: 4.9,
    reviews: 74,
    description:
      "شیشهٔ بوروسیلیکات مشکی، بدنهٔ برنجی و کامی آن‌قدر نرم که انگار از دستگاهی گران‌تر امانت گرفته‌اید. با دو شیلنگ، کاسهٔ سفالی و زغال نارگیل ارسال می‌شود.",
    notes: ["شیشهٔ بوروسیلیکات", "بدنهٔ برنجی", "دو شیلنگ", "کاسهٔ سفالی"],
    image: IMG.hookah,
    featured: true,
    badge: "محدود",
  },
  {
    id: "p-rolling",
    name: "ست پیچ کلاسیک",
    category: "پیچ و کاغذ",
    price: 380_000,
    stock: 60,
    sku: "SC-ROL-044",
    origin: "پریگو، فرانسه",
    rating: 4.5,
    reviews: 428,
    description:
      "هرآنچه یک آیین نیاز دارد: دو دفتر کاغذ کتانفی سفیدنشده، فیلتر، رولر برنجی که هرگز گیر نمی‌کند و قوطی مگنتی. بدون رنگ، بدون طعم، بدون زوائد.",
    notes: ["کتانف سفیدنشده", "رولر برنجی", "قوطی مگنتی", "فیلتر"],
    image: IMG.rolling,
  },
  {
    id: "p-vault",
    name: "هیومیدار صندوقچهٔ سدر",
    category: "لوازم جانبی",
    price: 2_500_000,
    stock: 9,
    sku: "SC-ACC-019",
    origin: "والنسیا، اسپانیا",
    rating: 4.8,
    reviews: 133,
    description:
      "چهل سیگار برگ را در رطوبتِ ۶۹٪ نگه می‌دارد؛ با روکش سدر اسپانیایی و هیدرومتر شیشه‌ای مگنتی که واقعاً قابل‌اعتماد است. لولای آن مثل گاوصندوق بسته می‌شود.",
    notes: ["سدر اسپانیایی", "ظرفیت ۴۰ سیگار", "هیدرومتر مگنتی", "لولای محکم"],
    image: IMG.humidor,
    featured: true,
  },
  {
    id: "p-sterling",
    name: "ست کاتر استرلینگ",
    category: "لوازم جانبی",
    price: 950_000,
    oldPrice: 1_250_000,
    stock: 3,
    sku: "SC-ACC-092",
    origin: "زولینگن، آلمان",
    rating: 4.7,
    reviews: 88,
    description:
      "کاتر دوگیوتین و پانچ از استیل ضدزنگ، تیزشده در زولینگن تا رینگِ ۵۴ را چنان تمیز ببرد که صدایش را بشنوید. در جعبهٔ گردویی. فقط ۳ ست مانده.",
    notes: ["دوگیوتین", "پانچ", "جعبهٔ گردویی", "رینگ ۵۴"],
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
    customer: "مارکوس هیل",
    email: "m.hale@postbox.com",
    address: "تهران، جردن، خیابان سایه، پلاک ۸۸",
    items: [
      { id: "p-habana", name: "هوانا رزروا شمارهٔ ۵", price: 2_850_000, qty: 1, image: IMG.cigars },
      { id: "p-sterling", name: "ست کاتر استرلینگ", price: 950_000, qty: 1, image: IMG.cutter },
    ],
    subtotal: 3_800_000,
    shipping: 150_000,
    total: 3_950_000,
    date: daysAgo(1),
    status: "pending",
  },
  {
    id: "SC-90388",
    customer: "اینس کواچ",
    email: "ines.k@nightowl.hr",
    address: "اصفهان، چهارباغ بالا، کوچهٔ گل، پلاک ۱۲",
    items: [
      { id: "p-midnight", name: "قلیان میدنایت", price: 4_400_000, qty: 1, image: IMG.hookah },
      { id: "p-habana", name: "هوانا رزروا شمارهٔ ۵", price: 2_850_000, qty: 1, image: IMG.cigars },
    ],
    subtotal: 7_250_000,
    shipping: 0,
    total: 7_250_000,
    date: daysAgo(2),
    status: "pending",
  },
  {
    id: "SC-90341",
    customer: "دمیتری ولکوف",
    email: "d.volkov@mailbox.org",
    address: "شیراز، معالی‌آباد، بلوار پزشکان، پلاک ۱۴",
    items: [
      { id: "p-golden", name: "بلندِ ساعت طلایی — ۵۰ گرم", price: 480_000, qty: 3, image: IMG.tobacco },
      { id: "p-ember", name: "فندک برنجی اِمبِر", price: 1_150_000, qty: 1, image: IMG.lighter },
    ],
    subtotal: 2_590_000,
    shipping: 150_000,
    total: 2_740_000,
    date: daysAgo(4),
    status: "shipped",
  },
  {
    id: "SC-90297",
    customer: "سوفیا مارکتی",
    email: "sofia.m@atelier.it",
    address: "مشهد، احمدآباد، خیابان راهنمایی، پلاک ۳",
    items: [
      { id: "p-briar", name: "پیپ بریروود میراثی", price: 3_600_000, qty: 1, image: IMG.pipe },
      { id: "p-golden", name: "بلندِ ساعت طلایی — ۵۰ گرم", price: 480_000, qty: 2, image: IMG.tobacco },
    ],
    subtotal: 4_560_000,
    shipping: 150_000,
    total: 4_710_000,
    date: daysAgo(6),
    status: "delivered",
  },
  {
    id: "SC-90254",
    customer: "آرتور بلین",
    email: "a.blaine@ledger.co",
    address: "تبریز، ولیعصر، خیابان ابرسان، پلاک ۳۰۱",
    items: [
      { id: "p-vault", name: "هیومیدار صندوقچهٔ سدر", price: 2_500_000, qty: 1, image: IMG.humidor },
      { id: "p-rolling", name: "ست پیچ کلاسیک", price: 380_000, qty: 2, image: IMG.rolling },
    ],
    subtotal: 3_260_000,
    shipping: 150_000,
    total: 3_410_000,
    date: daysAgo(9),
    status: "delivered",
  },
  {
    id: "SC-90210",
    customer: "یوکی تاناکا",
    email: "yuki.t@kumo.jp",
    address: "کرج، گوهردشت، خیابان انقلاب، پلاک ۲",
    items: [
      { id: "p-ember", name: "فندک برنجی اِمبِر", price: 1_150_000, qty: 2, image: IMG.lighter },
    ],
    subtotal: 2_300_000,
    shipping: 150_000,
    total: 2_450_000,
    date: daysAgo(12),
    status: "cancelled",
  },
];

export const WARNINGS = [
  "هشدار: این محصول حاوی نیکوتین است. نیکوتین ماده‌ای اعتیادآور است.",
  "فقط ۱۸+ — هنگام تحویل، مدرک شناسایی الزامی است.",
  "مصرف دخانیات عامل سرطان ریه، بیماری قلبی و آمفیزم است.",
  "فروش به افراد زیر سن قانونی جرم است. همهٔ سفارش‌ها راستی‌آزمایی می‌شوند.",
  "ترک دخانیات، خطر بیماری‌های جدی را به‌شدت کاهش می‌دهد.",
];
