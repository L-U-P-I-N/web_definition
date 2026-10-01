"use client";
import AdminShell from "@/components/admin/AdminShell";
import ListEditor from "@/components/admin/ListEditor";
import { getFaqs, setFaqs } from "@/lib/db";
import { defaultFaqs } from "@/lib/store";
import type { FaqItem } from "@/lib/types";

export default function FaqPage() {
  return (
    <AdminShell title="الأسئلة الشائعة">
      <ListEditor<FaqItem>
        description="الأسئلة والأجوبة في قسم «الأسئلة الشائعة» بالصفحة الرئيسية."
        hint="اكتب {regions} داخل أي إجابة ليتم استبدالها تلقائياً بقائمة مناطق التغطية الحالية."
        itemLabel="سؤال"
        fields={[
          { key: "qAr", label: "السؤال بالعربي", dir: "rtl", wide: true },
          { key: "aAr", label: "الإجابة بالعربي", type: "textarea", dir: "rtl" },
          { key: "qEn", label: "السؤال بالإنجليزي", dir: "ltr", wide: true },
          { key: "aEn", label: "الإجابة بالإنجليزي", type: "textarea", dir: "ltr" },
        ]}
        load={getFaqs}
        save={setFaqs}
        defaults={defaultFaqs}
        blank={() => ({ qAr: "", aAr: "", qEn: "", aEn: "" })}
      />
    </AdminShell>
  );
}
