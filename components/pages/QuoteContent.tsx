"use client";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import QuoteForm from "@/components/sections/QuoteForm";
import { ChevronLeft, Clock, CheckCircle2, Headphones } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";

const promises = [
  {
    icon: Clock,
    ar: { title: "خلال 24 ساعة", description: "نردّ عليك بعرض مخصّص خلال يوم عمل واحد" },
    en: { title: "Within 24 Hours", description: "We respond with a custom quote within one business day" },
  },
  {
    icon: CheckCircle2,
    ar: { title: "مخصّص لك", description: "كل عرض مُصمَّم حسب احتياجات منشأتك تحديداً" },
    en: { title: "Tailored to You", description: "Every quote is designed for your facility's specific needs" },
  },
  {
    icon: Headphones,
    ar: { title: "دعم مستمر", description: "فريق متخصص جاهز للإجابة على أسئلتك" },
    en: { title: "Ongoing Support", description: "A specialized team ready to answer your questions" },
  },
];

const t = {
  ar: {
    home: "الرئيسية", quote: "اطلب عرض سعر", badge: "عرض سعر مجاني",
    sub: "أخبرنا باحتياجك وسنعدّ لك عرضاً مخصّصاً خلال 24 ساعة.",
    promise: "وعدنا لك", coverage: "مناطق التغطية", details: "تفاصيل طلبك",
  },
  en: {
    home: "Home", quote: "Get a Quote", badge: "Free Quote",
    sub: "Tell us your needs and we'll prepare a custom quote within 24 hours.",
    promise: "Our Promise", coverage: "Coverage Regions", details: "Your Request Details",
  },
};

export default function QuoteContent() {
  const { lang } = useLang();
  const L = t[lang];
  const { regions } = useSiteContent();

  return (
    <>
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 inset-x-0 h-1 bg-[#0067E3]" />
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-8 text-white/50 text-sm" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">{L.home}</Link>
            <ChevronLeft size={14} className="rtl:rotate-180" />
            <span className="text-white font-medium">{L.quote}</span>
          </nav>
          <div className="max-w-2xl">
            <Badge variant="gold" className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
              {L.badge}
            </Badge>
            <h1 className="text-5xl font-black text-white mb-4">{L.quote}</h1>
            <p className="text-white/70 text-lg leading-relaxed">{L.sub}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="space-y-5">
              <h2 className="text-xl font-black text-brand-charcoal mb-6">{L.promise}</h2>
              {promises.map((p) => {
                const c = lang === "ar" ? p.ar : p.en;
                return (
                  <div key={c.title} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100">
                    <div className="w-11 h-11 rounded-xl bg-brand-green-light flex items-center justify-center flex-shrink-0">
                      <p.icon size={20} className="text-brand-green" />
                    </div>
                    <div>
                      <p className="font-black text-brand-charcoal mb-1">{c.title}</p>
                      <p className="text-brand-charcoal-light text-sm leading-relaxed">{c.description}</p>
                    </div>
                  </div>
                );
              })}

              <div className="bg-gradient-to-br from-brand-green-dark to-brand-green-mid rounded-3xl p-7 text-white">
                <p className="font-black text-brand-gold text-lg mb-4">{L.coverage}</p>
                <div className="flex flex-wrap gap-2">
                  {regions.map((city) => (
                    <span key={city.id} className="bg-white/15 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                      {lang === "ar" ? city.ar : city.en}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-4xl p-8 md:p-10 shadow-xl shadow-brand-green/5 border border-gray-100">
              <h2 className="text-2xl font-black text-brand-charcoal mb-8">{L.details}</h2>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
