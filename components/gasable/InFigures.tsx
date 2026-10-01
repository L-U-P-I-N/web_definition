"use client";
import { useLang } from "@/context/LanguageContext";
import CountUp from "@/components/ui/CountUp";
import { StaggerGroup, StaggerItem } from "./Stagger";
import { useSiteContent } from "@/context/SiteContentContext";
import { getIcon } from "@/lib/icons";

export default function InFigures() {
  const { lang } = useLang();
  const { stats } = useSiteContent();
  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-12">
          <span className="text-brand-green">Petrohub</span>{" "}
          <span className="text-brand-charcoal-mid">{lang === "ar" ? "في" : "in"}</span>{" "}
          <span className="text-[#0067E3]">{lang === "ar" ? "أرقام" : "Figures"}</span>
        </h2>

        <StaggerGroup className="flex flex-wrap justify-center gap-y-8">
          {stats.map((s) => {
            const Icon = getIcon(s.icon);
            return (
            <StaggerItem
              key={s.id}
              lift={false}
              className="w-1/2 lg:w-1/3 flex flex-col items-center text-center p-6"
            >
              <div className="hover-grow mb-5">
                <Icon size={72} stroke="url(#fl-grad)" strokeWidth={1.5} />
              </div>
              <CountUp
                value={s.value}
                className="text-6xl md:text-7xl font-black text-gasable-gradient leading-none"
              />
              <p className="text-[#54595F] font-semibold mt-3 text-lg">{lang === "ar" ? s.label : s.labelEn || s.label}</p>
            </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
