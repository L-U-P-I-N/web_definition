"use client";
import AdminShell from "@/components/admin/AdminShell";
import ListEditor from "@/components/admin/ListEditor";
import { getRegions, setRegions } from "@/lib/db";
import { defaultRegions } from "@/lib/store";
import type { Region } from "@/lib/types";

export default function RegionsPage() {
  return (
    <AdminShell title="مناطق التغطية">
      <ListEditor<Region>
        description="المدن والمناطق التي تخدمها الشركة. أي تعديل هنا يظهر تلقائياً في: الصفحة الرئيسية، من نحن، اتصل بنا، اطلب عرض سعر (قائمة المدن)، والأسئلة الشائعة."
        itemLabel="منطقة"
        fields={[
          { key: "ar", label: "الاسم بالعربي", dir: "rtl", placeholder: "الرياض" },
          { key: "en", label: "الاسم بالإنجليزي", dir: "ltr", placeholder: "Riyadh" },
        ]}
        load={getRegions}
        save={setRegions}
        defaults={defaultRegions}
        blank={() => ({ ar: "", en: "" })}
      />
    </AdminShell>
  );
}
