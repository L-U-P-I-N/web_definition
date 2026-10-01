"use client";
import AdminShell from "@/components/admin/AdminShell";
import ListEditor from "@/components/admin/ListEditor";
import { getCredentials, setCredentials } from "@/lib/db";
import { defaultCredentials } from "@/lib/store";
import type { CredentialItem } from "@/lib/types";

export default function CredentialsPage() {
  return (
    <AdminShell title="اعتماداتنا">
      <ListEditor<CredentialItem>
        description="بطاقات قسم «اعتماداتنا وثقتنا» في الصفحة الرئيسية."
        itemLabel="اعتماد"
        fields={[
          { key: "icon", label: "الأيقونة", type: "icon", wide: true },
          { key: "titleAr", label: "العنوان بالعربي", dir: "rtl" },
          { key: "titleEn", label: "العنوان بالإنجليزي", dir: "ltr" },
          { key: "textAr", label: "الوصف بالعربي", type: "textarea", dir: "rtl" },
          { key: "textEn", label: "الوصف بالإنجليزي", type: "textarea", dir: "ltr" },
        ]}
        load={getCredentials}
        save={setCredentials}
        defaults={defaultCredentials}
        blank={() => ({ icon: "ShieldCheck", titleAr: "", titleEn: "", textAr: "", textEn: "" })}
      />
    </AdminShell>
  );
}
