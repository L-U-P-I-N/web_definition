"use client";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, MessageCircle, ExternalLink } from "lucide-react";
import { siteImages } from "@/lib/images";
import { useLang } from "@/context/LanguageContext";
import { useSiteContent, telHref, waHref } from "@/context/SiteContentContext";
import Logo from "@/components/ui/Logo";

const services = [
  { ar: "توريد غاز البترول المسال (LPG)", en: "LPG Supply", href: "/services#lpg" },
  { ar: "المنتجات البترولية", en: "Oil Services", href: "/services#oil" },
  { ar: "خدمات المياه والبيئة", en: "Water & Environment", href: "/services#water" },
  { ar: "حلول الطاقة", en: "Energy Solutions", href: "/services#energy" },
  { ar: "منصة PetroHub IoT", en: "PetroHub IoT", href: "/services#iot" },
  { ar: "الخدمات اللوجستية", en: "Logistics Services", href: "/services#logistics" },
  { ar: "أنظمة التتبع ومراقبة المركبات", en: "Vehicle Tracking", href: "/services#tracking" },
];

const joinUs = [
  { ar: "الموردون", en: "Suppliers", href: "/contact" },
  { ar: "الشركات والمؤسسات", en: "Corporates", href: "/contact" },
  { ar: "شركاء اللوجستيات", en: "Logistics Partners", href: "/contact" },
];

const quickLinks = [
  { ar: "من نحن", en: "About Us", href: "/about" },
  { ar: "المشاريع", en: "Projects", href: "/projects" },
  { ar: "الأخبار", en: "News", href: "/news" },
  { ar: "اتصل بنا", en: "Contact", href: "/contact" },
  { ar: "اطلب عرض سعر", en: "Get a Quote", href: "/quote" },
];

const products = [
  { ar: "تطبيق العملاء", en: "Customers App", href: "#" },
  { ar: "تطبيق السائقين", en: "Drivers App", href: "#" },
  { ar: "منصة الأعمال", en: "Business Platform", href: "#" },
  { ar: "منصة الموردين", en: "Suppliers Platform", href: "#" },
  { ar: "منصة اللوجستيات", en: "Logistics Platform", href: "#" },
];

const labels = {
  ar: {
    services: "الخدمات",
    joinUs: "انضم إلينا",
    products: "المنتجات",
    quickLinks: "روابط سريعة",
    contact: "تواصل معنا",
    tagline: "للخدمات اللوجستية والبترولية",
    whatsapp: "واتساب",
    social: "تابعنا على وسائل التواصل الاجتماعي",
    rights: "جميع الحقوق محفوظة.",
    privacy: "سياسة الخصوصية",
    terms: "شروط الاستخدام",
    admin: "لوحة التحكم",
  },
  en: {
    services: "Services",
    joinUs: "Join Us",
    products: "Products",
    quickLinks: "Quick Links",
    contact: "Contact Us",
    tagline: "Logistics & Petroleum Services",
    whatsapp: "WhatsApp",
    social: "Follow us on social media",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    admin: "Admin Panel",
  },
};

const socials = [
  {
    label: "لينكدإن",
    href: "https://www.linkedin.com/company/petrohub",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "إنستغرام",
    href: "https://www.instagram.com/petrohub",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/petrohub",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.262 5.634zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { lang } = useLang();
  const L = labels[lang];
  const { settings } = useSiteContent();
  return (
    <footer
      className="text-white relative overflow-hidden"
      style={{ background: "linear-gradient(151deg, #2A4D85 0%, #0C2D6B 45%, #081B45 100%)" }}
      role="contentinfo"
    >
      {/* Red accent bar (the 10%) */}
      <div className="absolute top-0 inset-x-0 h-1 bg-[#0067E3]" />
      {/* ── Main columns ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 – Logo + Services + Join Us */}
          <div>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="Petrohub">
              {siteImages.logo ? (
                <Image
                  src={siteImages.logo}
                  alt="Petrohub"
                  width={120}
                  height={38}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <Logo variant="light" lang={lang} />
              )}
            </Link>

            {/* Services heading */}
            <h3 className="text-sm font-bold text-white mb-3 inline-block border-b-2 border-[#0067E3] pb-1">{L.services}</h3>
            <ul className="space-y-2 mb-6">
              {services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-white text-sm transition-colors duration-200">
                    {lang === "ar" ? l.ar : l.en}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Join Us sub-heading */}
            <h3 className="text-sm font-bold text-white mb-3 inline-block border-b-2 border-[#0067E3] pb-1">{L.joinUs}</h3>
            <ul className="space-y-2">
              {joinUs.map((l) => (
                <li key={l.en}>
                  <Link href={l.href} className="text-white/70 hover:text-white text-sm transition-colors duration-200">
                    {lang === "ar" ? l.ar : l.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 – Products */}
          <div className="sm:text-center">
            <h3 className="text-sm font-bold text-white mb-3 sm:text-center inline-block border-b-2 border-[#0067E3] pb-1">{L.products}</h3>
            <ul className="space-y-2">
              {products.map((l) => (
                <li key={l.en}>
                  <Link href={l.href} className="text-white/70 hover:text-white text-sm transition-colors duration-200">
                    {lang === "ar" ? l.ar : l.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Quick links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 inline-block border-b-2 border-[#0067E3] pb-1">{L.quickLinks}</h3>
            <ul className="space-y-2 mb-6">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-white text-sm transition-colors duration-200">
                    {lang === "ar" ? l.ar : l.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 – Contact */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 inline-block border-b-2 border-[#0067E3] pb-1">{L.contact}</h3>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${settings.email}`} className="flex items-center gap-2.5 text-white/70 hover:text-white text-sm transition-colors duration-200">
                  <Mail size={15} className="flex-shrink-0" />
                  {settings.email}
                </a>
              </li>
              <li>
                <a href={telHref(settings.phone)} className="flex items-center gap-2.5 text-white/70 hover:text-white text-sm transition-colors duration-200">
                  <Phone size={15} className="flex-shrink-0" />
                  <span dir="ltr">{settings.phone}</span>
                </a>
              </li>
              <li>
                <a href={waHref(settings.whatsapp)} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/70 hover:text-white text-sm transition-colors duration-200">
                  <MessageCircle size={15} className="flex-shrink-0" />
                  {L.whatsapp}: <span dir="ltr">{settings.whatsapp}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-white/70 text-sm">
                  <MapPin size={15} className="flex-shrink-0 mt-0.5" />
                  <span>{lang === "ar" ? settings.addressAr : settings.addressEn}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Social media strip (centered, Gasable-style) ── */}
        <div className="mt-12 pt-8 border-t border-white/15 text-center">
          <p className="text-white text-sm font-bold mb-4">{L.social}</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-[#0067E3] hover:text-white transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-8 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-white/60">
            © {new Date().getFullYear()} Petrohub — {L.rights}
          </p>
          <div className="flex items-center gap-5 text-white/60">
            <Link href="/contact" className="hover:text-white transition-colors">{L.privacy}</Link>
            <Link href="/contact" className="hover:text-white transition-colors">{L.terms}</Link>
            <Link href="/admin" className="hover:text-white/40 transition-colors flex items-center gap-1 text-white/20">
              <ExternalLink size={11} />
              {L.admin}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
