"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Faq() {
  const { lang } = useLang();
  const { faqs, regions } = useSiteContent();
  const [open, setOpen] = useState<number | null>(0);
  const regionList = regions.map((r) => (lang === "ar" ? r.ar : r.en)).join(lang === "ar" ? "، " : ", ");

  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-3">
          <span className="text-brand-green">{lang === "ar" ? "الأسئلة" : "Frequently Asked"}</span>{" "}
          <span className="text-[#0067E3]">{lang === "ar" ? "الشائعة" : "Questions"}</span>
        </h2>
        <p className="text-center text-[#54595F] mb-12">
          {lang === "ar"
            ? "إجابات على أكثر الأسئلة شيوعاً حول خدمات Petrohub."
            : "Answers to the most common questions about Petrohub's services."}
        </p>

        <div className="space-y-4">
          {faqs.map((item, i) => {
            const q = lang === "ar" ? item.qAr : item.qEn;
            const a = (lang === "ar" ? item.aAr : item.aEn).replaceAll("{regions}", regionList);
            const isOpen = open === i;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-colors duration-300 ${
                  isOpen ? "border-[#0C2D6B]/30 bg-[#F3F6FC]" : "border-gray-100 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-start"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-brand-green-dark">{q}</span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-[#0067E3] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[#54595F] leading-7">{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
