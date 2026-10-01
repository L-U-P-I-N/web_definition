"use client";
import { useLang } from "@/context/LanguageContext";
import { useSiteContent, telHref, waHref } from "@/context/SiteContentContext";
import { MessageCircle, Phone, Mail } from "lucide-react";

export default function WhereToFindUs() {
  const { lang } = useLang();
  const { settings } = useSiteContent();
  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-sm min-h-[360px]">
            <iframe
              title="Riyadh location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(settings.mapQuery)}&output=embed`}
              className="w-full h-full min-h-[360px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact */}
          <div className="flex flex-col justify-center">
            <h2 className="text-[28px] font-bold text-brand-green mb-6">
              {lang === "ar" ? "أين تجدنا؟" : "Where to find us?"}
            </h2>
            <p className="text-brand-charcoal-mid font-bold text-lg mb-1">
              {lang === "ar" ? settings.addressAr : settings.addressEn}
            </p>
            <p className="text-[#54595F] mb-6">
              {lang === "ar" ? settings.workingHoursAr : settings.workingHoursEn}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F3F6FC] flex items-center justify-center">
                  <MessageCircle size={18} className="text-brand-green" />
                </div>
                <div>
                  <p className="text-[#54595F] text-sm">{lang === "ar" ? "واتساب" : "WhatsApp"}</p>
                  <a href={waHref(settings.whatsapp)} target="_blank" rel="noopener noreferrer" className="text-brand-charcoal-mid font-bold" dir="ltr">
                    {settings.whatsapp}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F3F6FC] flex items-center justify-center">
                  <Phone size={18} className="text-brand-green-dark" />
                </div>
                <div>
                  <p className="text-[#54595F] text-sm">
                    {lang === "ar" ? "الرقم الموحّد" : "Unified number"}
                  </p>
                  <a href={telHref(settings.phone)} className="text-brand-charcoal-mid font-bold" dir="ltr">
                    {settings.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F3F6FC] flex items-center justify-center">
                  <Mail size={18} className="text-brand-green-dark" />
                </div>
                <div>
                  <p className="text-[#54595F] text-sm">{lang === "ar" ? "البريد الإلكتروني" : "Email"}</p>
                  <a href={`mailto:${settings.email}`} className="text-brand-charcoal-mid font-bold" dir="ltr">
                    {settings.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
