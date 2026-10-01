"use client";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ContactForm from "@/components/sections/ContactForm";
import { ChevronLeft, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useSiteContent, telHref, waHref } from "@/context/SiteContentContext";

const t = {
  ar: {
    home: "الرئيسية", contact: "اتصل بنا", badge: "تواصل معنا",
    heroDesc: "فريقنا جاهز للرد على استفساراتك خلال ساعات العمل.",
    info: "معلومات التواصل", citiesTitle: "المدن التي نخدمها",
    citiesNote: "هذه المناطق هي نطاق التغطية الحالي — تواصل معنا لأي استفسار عن مناطق أخرى.",
    send: "أرسل رسالة",
  },
  en: {
    home: "Home", contact: "Contact", badge: "Get in touch",
    heroDesc: "Our team is ready to answer your inquiries during working hours.",
    info: "Contact Information", citiesTitle: "Cities We Serve",
    citiesNote: "These regions are our current coverage area — contact us for any inquiry about other regions.",
    send: "Send a Message",
  },
};

export default function ContactContent() {
  const { lang } = useLang();
  const L = t[lang];
  const { settings, regions } = useSiteContent();
  const contactInfo = [
    { icon: Phone, ar: "الرقم الموحّد", en: "Unified Number", value: settings.phone, href: telHref(settings.phone), color: "bg-brand-green", ltr: true },
    { icon: MessageCircle, ar: "واتساب للأعمال", en: "Business WhatsApp", value: settings.whatsapp, href: waHref(settings.whatsapp), color: "bg-[#25D366]", ltr: true },
    { icon: Mail, ar: "البريد الإلكتروني", en: "Email", value: settings.email, href: `mailto:${settings.email}`, color: "bg-[#0C2D6B]", ltr: true },
    { icon: Clock, ar: "ساعات العمل", en: "Working Hours", value: lang === "ar" ? settings.workingHoursAr : settings.workingHoursEn, color: "bg-brand-gold" },
    { icon: MapPin, ar: "العنوان", en: "Address", value: lang === "ar" ? settings.addressAr : settings.addressEn, color: "bg-[#24487B]" },
  ];

  return (
    <>
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 inset-x-0 h-1 bg-[#0067E3]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-8 text-white/50 text-sm" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">{L.home}</Link>
            <ChevronLeft size={14} className="rtl:rotate-180" />
            <span className="text-white font-medium">{L.contact}</span>
          </nav>
          <div className="max-w-2xl">
            <Badge variant="gold" className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
              {L.badge}
            </Badge>
            <h1 className="text-5xl font-black text-white mb-4">{L.contact}</h1>
            <p className="text-white/70 text-lg leading-relaxed">{L.heroDesc}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-brand-charcoal mb-6">{L.info}</h2>
                <div className="space-y-4">
                  {contactInfo.map((info) => {
                    const label = lang === "ar" ? info.ar : info.en;
                    const value = info.value;
                    return (
                      <div key={info.en} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-brand-green/20 hover:shadow-md transition-all duration-200">
                        <div className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center flex-shrink-0`}>
                          <info.icon size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="text-brand-charcoal-light text-xs font-medium mb-0.5">{label}</p>
                          {info.href ? (
                            <a href={info.href} dir={info.ltr ? "ltr" : undefined} className="text-brand-charcoal font-bold hover:text-brand-green transition-colors"
                              target={info.href.startsWith("http") ? "_blank" : undefined}
                              rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                              {value}
                            </a>
                          ) : (
                            <p className="text-brand-charcoal font-bold">{value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-gray-100">
                <h3 className="font-black text-brand-charcoal mb-4">{L.citiesTitle}</h3>
                <div className="flex flex-wrap gap-3">
                  {regions.map((city) => (
                    <span key={city.id} className="px-5 py-2.5 bg-brand-green-light text-brand-green rounded-full font-bold text-sm border border-brand-green/20">
                      {lang === "ar" ? city.ar : city.en}
                    </span>
                  ))}
                </div>
                <p className="text-brand-charcoal-light text-sm mt-4">{L.citiesNote}</p>
              </div>
            </div>

            <div className="bg-white rounded-4xl p-8 shadow-xl shadow-brand-green/5 border border-gray-100">
              <h2 className="text-2xl font-black text-brand-charcoal mb-7">{L.send}</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
