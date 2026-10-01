"use client";
import { useLang } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { getIcon } from "@/lib/icons";
import { StaggerGroup, StaggerItem } from "./Stagger";

export default function Credentials() {
  const { lang } = useLang();
  const { credentials } = useSiteContent();
  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-4">
          <span className="text-brand-green">{lang === "ar" ? "اعتماداتنا" : "Our"}</span>{" "}
          <span className="text-[#0067E3]">{lang === "ar" ? "وثقتنا" : "Credentials"}</span>
        </h2>
        <p className="text-center text-[#54595F] max-w-xl mx-auto mb-12">
          {lang === "ar"
            ? "نبني الثقة من خلال الالتزام والاعتماد والشفافية في كل خدمة نقدّمها."
            : "We build trust through commitment, accreditation and transparency in every service we provide."}
        </p>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((c) => {
            const Icon = getIcon(c.icon);
            const title = lang === "ar" ? c.titleAr : c.titleEn;
            const text = lang === "ar" ? c.textAr : c.textEn;
            return (
              <StaggerItem
                key={c.id}
                className="rounded-2xl border border-gray-100 p-7 text-center hover:shadow-lg hover:border-[#0C2D6B]/20 transition-all duration-300"
              >
                <div className="hover-grow mb-5 flex justify-center">
                  <Icon size={48} stroke="url(#fl-grad)" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-brand-green-dark mb-2">{title}</h3>
                <p className="text-[#54595F] text-sm leading-6">{text}</p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
