import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store";
import {
  IconArrowLeft,
  IconFlame,
  IconLeaf,
  IconMail,
  IconMapPin,
  IconPhone,
  Reveal,
  SectionHeading,
} from "../ui";
import { IMG } from "../data";

/* ------------------------------------------------------------------ */
/*  دربارهٔ ما — هنرِ دود                                                  */
/* ------------------------------------------------------------------ */

export function About() {
  return (
    <main className="relative z-10">
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-16">
        <p className="text-xs font-bold text-copper flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-copper" />
          از ۲۰۱۱ تا امروز
        </p>
        <h1 className="font-display leading-[1.05] mt-5 max-w-4xl">
          <span className="block text-6xl md:text-8xl text-cream">فروشگاهی که</span>
          <span className="block text-6xl md:text-8xl text-outline">روی صبر ساخته شده</span>
        </h1>
        <p className="mt-7 max-w-xl text-fog leading-relaxed text-[15px]">
          اسموک سیتی از یک هیومیدارِ تنها در انتهای مغازهٔ یک کفاش در میدان حسن‌آباد شروع شد.
          کفاش سال‌هاست رفته، ولی آن هیومیدار — شمارهٔ سریال ۰۰۱، سدری، با درِ کمی کج — هنوز
          رطوبتِ همه‌چیزِ ما را تعیین می‌کند.
        </p>
      </section>

      {/* گاه‌شمار */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-20 grid lg:grid-cols-2 gap-14">
        <Reveal>
          <div className="relative">
            <div className="arch-frame overflow-hidden border border-line">
              <img
                src={IMG.hero}
                alt="سیگار برگ و دود در سردابه"
                className="w-full h-[420px] md:h-[540px] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 right-5 border border-line bg-coal/95 backdrop-blur-sm rounded-sm px-5 py-4 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.8)]">
              <p className="font-display text-3xl text-ember leading-none">هیومیدار شمارهٔ ۰۰۱</p>
              <p className="text-[10px] font-semibold text-ash mt-1">
                هنوز در خدمت — کفِ سردابه، تهران
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading kicker="دفتر حساب" title="چهارده سال، شش فصل" />
          </Reveal>
          <ol className="mt-9 relative border-s border-line2 ms-2 space-y-8">
            {[
              ["۱۳۹۰", "یک هیومیدار، یک قفسه", "ادوین مارش با ۴۰ سیگار برگ کوبایی و تابلویی که با دست نقاشی شده بود، در را باز کرد."],
              ["۱۳۹۳", "اتاق پیپ", "کارگاه بریار طبقهٔ بالا راه افتاد. اولین بلندِ خانگی، «ساعت طلایی»، تصادفی ساخته شد و عمداً ماند."],
              ["۱۳۹۶", "سردابه عمیق شد", "زیرزمین میدان را اجاره کردیم: ۱۸۰ متر اتاق کهنه‌سازی با روکش سدر."],
              ["۱۳۹۹", "نامهٔ اِمبِر", "مغازه درهایش را بست ولی سردابه هرگز. فروش پستی آن سال را نجات داد."],
              ["۱۴۰۲", "شیشهٔ استانبول", "همکاری با شیشه‌گرِ نسل‌سومِ قلیان، خط میدنایت را به خانه آورد."],
              ["امروز", "هنوز عمداً کوچک", "هشت نفر، دو اتاقِ پر از دود، و یک قانون: اگر خودمان نکشیم، نمی‌فروشیم."],
            ].map(([year, title, body], i) => (
              <Reveal as="li" key={year} delay={i * 70} className="ps-7 relative">
                <span className="absolute -start-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-ink border-2 border-ember" />
                <p className="text-xs font-bold text-copper">{year}</p>
                <h3 className="font-display text-2xl text-cream mt-1">{title}</h3>
                <p className="text-sm text-fog mt-1.5 leading-relaxed max-w-md">{body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* قوانین خانه */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-24">
        <Reveal>
          <SectionHeading kicker="قوانین خانه" title="کارهایی که هرگز نمی‌کنیم" />
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {[
            {
              icon: <IconLeaf size={20} />,
              title: "برگِ بی‌شناسنامه نمی‌فروشیم",
              body: "روی هر بسته و جعبه، نام مزرعه، سال برداشت و روش عمل‌آوری آمده. اگر تأمین‌کننده نتواند بگوید، ما نمی‌خریم.",
            },
            {
              icon: <IconFlame size={20} />,
              title: "فروش به زیر ۱۸ — هرگز",
              body: "مدرک هنگام پرداخت، مدرک دمِ در، مدرک هنگام مرجوعی. پیک‌های ما قرارداد دارند که بدون آن تحویل ندهند.",
            },
            {
              icon: <IconArrowLeft size={20} />,
              title: "ترفندِ تاریک نه",
              body: "قیمت‌ها شامل همه‌چیز است جز ارسال. نه تلهٔ اشتراک، نه شمارش معکوسِ دروغین. توتون آرام است؛ تسویه‌حساب نباید مکارانه باشد.",
            },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 90} className="border border-line bg-panel/60 rounded-sm p-7 hover:border-ember/50 hover:-translate-y-1 transition-all duration-300">
              <span className="inline-grid place-items-center h-12 w-12 rounded-sm bg-ember/10 border border-ember/30 text-ember">
                {v.icon}
              </span>
              <h3 className="font-display text-2xl text-cream mt-5">{v.title}</h3>
              <p className="text-sm text-fog mt-2 leading-relaxed">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  تماس                                                                */
/* ------------------------------------------------------------------ */

export function Contact() {
  const { toast } = useStore();
  const [form, setForm] = useState({ name: "", email: "", topic: "سؤال دربارهٔ سفارش", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 10) {
      toast("لطفاً نام، یک ایمیل معتبر و پیام بلندتری بنویسید", "warn");
      return;
    }
    setSent(true);
    toast("پیام ارسال شد — ظرف یک روز کاری پاسخ می‌دهیم", "ok");
  };

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-16">
      <p className="text-xs font-bold text-copper flex items-center gap-3">
        <span className="inline-block h-px w-8 bg-copper" />
        در ارتباط باشید
      </p>
      <h1 className="font-display text-6xl md:text-8xl leading-[1.05] mt-4 text-cream">
        با سردابه <span className="text-outline">حرف بزنید</span>
      </h1>

      <div className="mt-14 grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
        {/* اطلاعات */}
        <div>
          <Reveal>
            <p className="text-fog leading-relaxed max-w-md text-[15px]">
              سؤال دربارهٔ یک محموله، یک سفارش، یا اینکه کدام پیپ به دردِ تازه‌کار می‌خورد —
              بنویسید. یک انسانِ واقعی ظرف یک روز کاری جواب می‌دهد؛ معمولاً با نظری قوی‌تر از
              آنچه خواسته بودید.
            </p>
          </Reveal>
          <ul className="mt-9 space-y-5">
            {[
              { icon: <IconMapPin size={18} />, label: "فروشگاه", value: "تهران، خیابان ولیعصر، میدان حسن‌آباد، پلاک ۱۴" },
              { icon: <IconPhone size={18} />, label: "تلفن", value: "۰۲۱-۵۵۶۶۰۹۱۱ — سه‌شنبه تا شنبه، ۱۱ تا ۱۹" },
              { icon: <IconMail size={18} />, label: "ایمیل", value: "cellar@smokecity.co" },
              { icon: <IconFlame size={18} />, label: "سالن تست", value: "جمعهٔ اولِ هر ماه، ساعت ۱۹ — فقط اعضا، ۱۸+ با مدرک" },
            ].map((r, i) => (
              <Reveal as="li" key={r.label} delay={i * 70} className="flex items-start gap-4 border border-line bg-panel/60 rounded-sm p-5 hover:border-line2 transition-colors">
                <span className="h-11 w-11 shrink-0 grid place-items-center rounded-sm bg-ember/10 border border-ember/30 text-ember">
                  {r.icon}
                </span>
                <span>
                  <span className="block text-[10px] font-bold text-copper">{r.label}</span>
                  <span className="block text-sm text-parch mt-1">{r.value}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* فرم */}
        <Reveal delay={120}>
          <div className="border border-line bg-coal/80 backdrop-blur-sm rounded-sm p-7 md:p-9">
            {sent ? (
              <div className="text-center py-14">
                <span className="inline-grid place-items-center h-16 w-16 rounded-full border border-jade/40 bg-jade/10 text-jade">
                  <IconMail size={26} />
                </span>
                <h3 className="font-display text-4xl text-cream mt-6 leading-[1.05]">پیام شما رسید</h3>
                <p className="text-sm text-fog mt-3 max-w-sm mx-auto leading-relaxed">
                  توی صندوق است. انتظار داشته باشید ادوین یا مارتا ظرف یک روز کاری جواب بدهند.
                </p>
                <button className="btn-ghost mt-8" onClick={() => { setSent(false); setForm({ name: "", email: "", topic: "سؤال دربارهٔ سفارش", message: "" }); }}>
                  ارسال پیام دیگر
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <h3 className="font-display text-3xl text-cream">برایمان بنویسید</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] font-bold text-fog">نام</label>
                    <input className="field mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="مثلاً کاوه حیدری" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-fog">ایمیل</label>
                    <input className="field mt-1.5" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@postbox.com" dir="ltr" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-fog">موضوع</label>
                  <select className="field mt-1.5 cursor-pointer" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                    {["سؤال دربارهٔ سفارش", "مشاورهٔ محصول", "خرید عمده", "سالن تست", "موضوع دیگر"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-fog">پیام</label>
                  <textarea
                    className="field mt-1.5 min-h-[130px] resize-none"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="بگویید دنبال چه می‌گردید…"
                  />
                </div>
                <button type="submit" className="btn-ember w-full">
                  ارسال پیام <IconArrowLeft size={14} />
                </button>
                <p className="text-[11px] text-ash text-center font-semibold">
                  نشانی شما را هرگز به اشتراک نمی‌گذاریم. فقط پیام‌های ۱۸+.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  ۴۰۴                                                                 */
/* ------------------------------------------------------------------ */

export function NotFound() {
  return (
    <main className="relative z-10 max-w-3xl mx-auto px-5 py-28 text-center">
      <p className="font-latin text-[9rem] leading-none text-outline">404</p>
      <h1 className="font-display text-4xl text-cream mt-2 leading-[1.1]">این اتاق پر از دود است</h1>
      <p className="text-fog mt-3 text-sm max-w-sm mx-auto leading-relaxed">
        هرچه اینجا بود، با دود رفته. ولی فروشگاه، دقیقاً همان‌جاست که گذاشته‌اید.
      </p>
      <Link to="/" className="btn-ember mt-8">
        بازگشت به درِ ورودی <IconArrowLeft size={14} />
      </Link>
    </main>
  );
}
