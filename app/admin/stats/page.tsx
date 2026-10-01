"use client";
import AdminShell from "@/components/admin/AdminShell";
import ListEditor from "@/components/admin/ListEditor";
import { getStats, setStats } from "@/lib/db";
import { defaultStats } from "@/lib/store";
import type { StatItem } from "@/lib/types";

export default function StatsPage() {
  return (
    <AdminShell title="Petrohub في أرقام">
      <ListEditor<StatItem>
        description="الأرقام التي تظهر في قسم «Petrohub في أرقام» بالصفحة الرئيسية."
        itemLabel="رقم"
        fields={[
          { key: "icon", label: "الأيقونة", type: "icon", wide: true },
          { key: "value", label: "القيمة (تظهر كبيرة)", dir: "ltr", placeholder: "5+", wide: true },
          { key: "label", label: "التسمية بالعربي", dir: "rtl", placeholder: "مناطق تغطية في المملكة" },
          { key: "labelEn", label: "التسمية بالإنجليزي", dir: "ltr", placeholder: "Coverage Regions" },
        ]}
        load={getStats}
        save={setStats}
        defaults={defaultStats}
        blank={() => ({ value: "", label: "", labelEn: "", icon: "BadgeCheck" })}
      />
    </AdminShell>
  );
}
