"use client";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ChevronLeft, Target, Eye, Heart, Leaf } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";

const stats = [
  { value: "2004", ar: "عام التأسيس", en: "Established" },
  { value: "500+", ar: "شريك استراتيجي", en: "Strategic Partners" },
  { value: "7", ar: "خدمات وحلول متكاملة", en: "Integrated Services" },
  { value: "5+", ar: "مناطق تغطية في المملكة", en: "Coverage Regions" },
];

const values = [
  {
    icon: Heart, color: "from-[#0067E3] to-[#004FB0]",
    ar: { title: "الموثوقية", description: "التزام كامل بالمواعيد والجودة في كل ما نقدّمه لعملائنا." },
    en: { title: "Reliability", description: "Full commitment to schedules and quality in everything we provide to our clients." },
  },
  {
    icon: Target, color: "from-[#0C2D6B] to-[#081B45]",
    ar: { title: "الابتكار", description: "حلول تقنية متقدمة وحديثة ترفع كفاءة التشغيل." },
    en: { title: "Innovation", description: "Advanced, modern technical solutions that boost operational efficiency." },
  },
  {
    icon: Eye, color: "from-[#24487B] to-[#0C2D6B]",
    ar: { title: "الشفافية", description: "تواصل واضح وصريح مع العملاء في كل مرحلة." },
    en: { title: "Transparency", description: "Clear and honest communication with clients at every stage." },
  },
  {
    icon: Leaf, color: "from-[#0C2D6B] to-[#0067E3]",
    ar: { title: "الاستدامة", description: "الحفاظ على البيئة والموارد ودعم مستقبل أكثر استدامة." },
    en: { title: "Sustainability", description: "Protecting the environment and resources and supporting a more sustainable future." },
  },
];

const t = {
  ar: {
    home: "الرئيسية", about: "من نحن", heroBadge: "نبذة عن Petrohub",
    heroTitle: "حلول الطاقة والخدمات اللوجستية المتكاملة",
    heroSub: "شركة رائدة متخصصة في توفير حلول الطاقة والخدمات اللوجستية المتكاملة محلياً ودولياً.",
    storyBadge: "من نحن",
    storyTitle: "نبذة عن Petrohub",
    storyP1: "Petrohub شركة رائدة متخصصة في توفير حلول الطاقة والخدمات اللوجستية المتكاملة. منذ تأسيسنا عام 2004، نقدم خدمات موثوقة وابتكارية في قطاع الطاقة محلياً ودولياً. وبفريق متخصص ومؤهل، وشراكات استراتيجية مع أكثر من 500 شركة، نحن ملتزمون بتقديم حلول تلبي احتياجات القطاعات السكنية والتجارية والصناعية.",
    storyP2: "مع حضورنا في جميع أنحاء المملكة العربية السعودية، والفرع الرئيسي في الرياض، نضمن توصيل خدماتنا بكفاءة وسرعة.",
    quote: "نمكّن عملاءنا بحلول طاقة مستدامة وآمنة وموثوقة تعزز كفاءة أعمالهم وتقلل التكاليف.",
    coverageBadge: "مناطق التغطية",
    coverageTitle: "حضورنا في جميع أنحاء المملكة",
    coverageSub: "الفرع الرئيسي في الرياض مع شبكة تشغيل تغطي المناطق الحيوية",
    visionTitle: "رؤيتنا",
    visionText: "أن نكون الشريك الأول والموثوق في حلول الطاقة والخدمات اللوجستية في المملكة العربية السعودية.",
    missionTitle: "رسالتنا",
    missionText: "تمكين العملاء بحلول طاقة مستدامة وآمنة وموثوقة تعزز كفاءة أعمالهم وتقلل التكاليف.",
    valuesBadge: "القيم الأساسية", valuesTitle: "قيمنا الأساسية",
    ctaTitle: "تواصل معنا اليوم",
    ctaSub: "سواء كنت تبحث عن حلول طاقة أو خدمات لوجستية متخصصة، فريق Petrohub جاهز لمساعدتك.",
    quoteBtn: "اطلب عرض سعر", contactBtn: "اتصل بنا",
  },
  en: {
    home: "Home", about: "About Us", heroBadge: "About Petrohub",
    heroTitle: "Integrated Energy & Logistics Solutions",
    heroSub: "A leading company specialized in providing integrated energy and logistics solutions locally and internationally.",
    storyBadge: "About Us",
    storyTitle: "About Petrohub",
    storyP1: "Petrohub is a leading company specialized in providing integrated energy and logistics solutions. Since our establishment in 2004, we have delivered reliable and innovative services in the energy sector locally and internationally. With a qualified specialized team and strategic partnerships with over 500 companies, we are committed to solutions that meet the needs of the residential, commercial and industrial sectors.",
    storyP2: "With our presence across the Kingdom of Saudi Arabia and our head office in Riyadh, we ensure our services are delivered efficiently and quickly.",
    quote: "We empower our clients with sustainable, safe and reliable energy solutions that boost their business efficiency and reduce costs.",
    coverageBadge: "Coverage Regions",
    coverageTitle: "Our Presence Across the Kingdom",
    coverageSub: "Head office in Riyadh with an operational network covering the vital regions",
    visionTitle: "Our Vision",
    visionText: "To be the first and most trusted partner in energy and logistics solutions in the Kingdom of Saudi Arabia.",
    missionTitle: "Our Mission",
    missionText: "Empowering clients with sustainable, safe and reliable energy solutions that boost their business efficiency and reduce costs.",
    valuesBadge: "Core Values", valuesTitle: "Our Core Values",
    ctaTitle: "Contact Us Today",
    ctaSub: "Whether you need energy solutions or specialized logistics services, the Petrohub team is ready to help.",
    quoteBtn: "Get a Quote", contactBtn: "Contact Us",
  },
};

export default function AboutContent() {
  const { lang } = useLang();
  const L = t[lang];
  const { regions } = useSiteContent();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 inset-x-0 h-1 bg-[#0067E3]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-8 text-white/50 text-sm" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">{L.home}</Link>
            <ChevronLeft size={14} className="rtl:rotate-180" />
            <span className="text-white font-medium">{L.about}</span>
          </nav>
          <div className="max-w-3xl">
            <Badge variant="gold" className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
              {L.heroBadge}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">{L.heroTitle}</h1>
            <p className="text-white/70 text-xl leading-relaxed">{L.heroSub}</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-5">{L.storyBadge}</Badge>
              <h2 className="text-4xl font-black text-brand-charcoal mb-6">{L.storyTitle}</h2>
              <p className="text-brand-charcoal-light leading-loose text-lg mb-6">{L.storyP1}</p>
              <p className="text-brand-charcoal-light leading-loose text-lg mb-8">{L.storyP2}</p>
              <blockquote className="border-s-4 border-brand-gold ps-6 py-2 italic text-brand-charcoal text-xl font-bold leading-loose">
                &ldquo;{L.quote}&rdquo;
              </blockquote>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {stats.map((s) => (
                <div key={s.en} className="bg-gradient-to-br from-brand-green-dark to-brand-green-mid rounded-3xl p-8 text-white text-center">
                  <p className="text-4xl md:text-5xl font-black text-brand-gold mb-2">{s.value}</p>
                  <p className="text-white/70 font-medium text-sm">{lang === "ar" ? s.ar : s.en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-24 bg-brand-green-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-5">{L.coverageBadge}</Badge>
            <h2 className="text-4xl font-black text-brand-charcoal mb-4">{L.coverageTitle}</h2>
            <p className="text-brand-charcoal-light max-w-xl mx-auto">{L.coverageSub}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {regions.map((city) => (
              <div key={city.id} className="bg-white rounded-2xl px-8 py-4 border border-brand-green/20 shadow-sm text-center">
                <p className="text-brand-green-dark font-black text-lg">{lang === "ar" ? city.ar : city.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-4xl p-10 border border-brand-green/10 hover:shadow-xl hover:shadow-brand-green/10 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center mb-6">
                <Eye size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-brand-charcoal mb-4">{L.visionTitle}</h3>
              <p className="text-brand-charcoal-light leading-loose">{L.visionText}</p>
            </div>
            <div className="bg-white rounded-4xl p-10 border border-brand-gold/20 hover:shadow-xl hover:shadow-brand-gold/10 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold flex items-center justify-center mb-6">
                <Target size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-brand-charcoal mb-4">{L.missionTitle}</h3>
              <p className="text-brand-charcoal-light leading-loose">{L.missionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-5">{L.valuesBadge}</Badge>
            <h2 className="text-4xl font-black text-brand-charcoal">{L.valuesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const c = lang === "ar" ? v.ar : v.en;
              return (
                <div key={c.title} className="relative bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-2xl hover:border-brand-green/20 transition-all duration-400 overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-green-light/50 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-6`}>
                    <v.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black text-brand-charcoal mb-3">{c.title}</h3>
                  <p className="text-brand-charcoal-light leading-relaxed">{c.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-green-dark relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-10" />
        <div className="absolute top-0 inset-x-0 h-1 bg-[#0067E3]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-4xl font-black text-white">{L.ctaTitle}</h2>
          <p className="text-white/70 leading-relaxed text-lg">{L.ctaSub}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button href="/quote" variant="gold" size="lg">{L.quoteBtn}</Button>
            <Button href="/contact" variant="outline" size="lg">{L.contactBtn}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
