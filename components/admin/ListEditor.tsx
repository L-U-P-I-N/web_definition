"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, Save, RotateCcw, ChevronUp, ChevronDown } from "lucide-react";
import { getIcon, iconNames } from "@/lib/icons";

export const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

export interface FieldDef<T> {
  key: keyof T & string;
  label: string;
  type?: "text" | "textarea" | "icon";
  dir?: "rtl" | "ltr";
  placeholder?: string;
  wide?: boolean;
}

interface Props<T extends { id: string }> {
  description: string;
  itemLabel: string;
  fields: FieldDef<T>[];
  load: () => Promise<T[]>;
  save: (items: T[]) => Promise<void>;
  defaults: T[];
  blank: () => Omit<T, "id">;
  hint?: string;
}

export default function ListEditor<T extends { id: string }>({
  description,
  itemLabel,
  fields,
  load,
  save,
  defaults,
  blank,
  hint,
}: Props<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load()
      .then(setItems)
      .catch(() => setStatus({ ok: false, msg: "تعذّر تحميل البيانات من قاعدة البيانات." }))
      .finally(() => setLoading(false));
  }, [load]);

  const update = (id: string, key: keyof T, value: string) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [key]: value } : it)));

  const move = (idx: number, dir: -1 | 1) =>
    setItems((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });

  const add = () => setItems((prev) => [...prev, { ...blank(), id: Date.now().toString() } as T]);

  const remove = (id: string) => {
    if (!confirm(`حذف هذا ${itemLabel}؟`)) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const persist = async (next: T[]) => {
    setSaving(true);
    setStatus(null);
    try {
      await save(next);
      setStatus({ ok: true, msg: "✓ تم الحفظ — التغييرات ظاهرة الآن في جميع صفحات الموقع" });
    } catch {
      setStatus({ ok: false, msg: "فشل الحفظ. تحقق من اتصال قاعدة البيانات وحاول مجدداً." });
    }
    setSaving(false);
  };

  const reset = async () => {
    if (!confirm("إعادة القيم الافتراضية؟ ستُحذف تعديلاتك الحالية.")) return;
    setItems(defaults);
    await persist(defaults);
  };

  if (loading) return <p className="text-brand-charcoal-light text-sm">جارٍ التحميل…</p>;

  return (
    <div className="max-w-3xl">
      <p className="text-brand-charcoal-light text-sm mb-2">{description}</p>
      {hint && <p className="text-xs text-[#0067E3] bg-[#0067E3]/5 rounded-lg px-3 py-2 mb-4">{hint}</p>}

      {status && (
        <div
          className={`mb-4 px-4 py-3 rounded-xl text-sm font-bold border ${
            status.ok
              ? "bg-brand-green-light border-brand-green/20 text-brand-green"
              : "bg-red-50 border-red-200 text-red-600"
          }`}
        >
          {status.msg}
        </div>
      )}

      <div className="space-y-4 mb-6">
        {items.map((item, idx) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-green/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-green flex items-center justify-center text-white font-black text-xs">
                  {idx + 1}
                </div>
                <p className="font-bold text-brand-charcoal text-sm">
                  {itemLabel} {idx + 1}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => move(idx, -1)} disabled={idx === 0} aria-label="تحريك للأعلى"
                  className="p-2 rounded-lg text-brand-charcoal-light hover:bg-gray-100 disabled:opacity-30">
                  <ChevronUp size={16} />
                </button>
                <button onClick={() => move(idx, 1)} disabled={idx === items.length - 1} aria-label="تحريك للأسفل"
                  className="p-2 rounded-lg text-brand-charcoal-light hover:bg-gray-100 disabled:opacity-30">
                  <ChevronDown size={16} />
                </button>
                <button onClick={() => remove(item.id)} aria-label="حذف"
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((f) => {
                const value = String(item[f.key] ?? "");
                return (
                  <div key={f.key} className={f.wide || f.type === "textarea" ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-bold text-brand-charcoal mb-1.5">{f.label}</label>
                    {f.type === "textarea" ? (
                      <textarea rows={3} className={inputCls} dir={f.dir} value={value}
                        placeholder={f.placeholder} onChange={(e) => update(item.id, f.key, e.target.value)} />
                    ) : f.type === "icon" ? (
                      <IconPicker value={value} onChange={(v) => update(item.id, f.key, v)} />
                    ) : (
                      <input className={inputCls} dir={f.dir} value={value}
                        placeholder={f.placeholder} onChange={(e) => update(item.id, f.key, e.target.value)} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={add}
          className="flex items-center gap-2 border-2 border-dashed border-brand-green/40 text-brand-green px-5 py-3 rounded-xl font-bold hover:bg-brand-green-light transition-colors">
          <Plus size={16} />
          إضافة {itemLabel}
        </button>
        <button onClick={() => persist(items)} disabled={saving}
          className="flex items-center gap-2 bg-brand-green text-white px-7 py-3 rounded-xl font-bold hover:bg-brand-green-mid transition-colors shadow-lg shadow-brand-green/20 disabled:opacity-60">
          <Save size={16} />
          {saving ? "جارٍ الحفظ…" : "حفظ التغييرات"}
        </button>
        <button onClick={reset}
          className="flex items-center gap-2 border border-gray-200 text-brand-charcoal-light px-5 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
          <RotateCcw size={16} />
          القيم الافتراضية
        </button>
      </div>
    </div>
  );
}

function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {iconNames.map((name) => {
        const Icon = getIcon(name);
        const active = name === value;
        return (
          <button key={name} type="button" onClick={() => onChange(name)} title={name}
            className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
              active ? "border-brand-green bg-brand-green text-white" : "border-gray-200 text-brand-charcoal-light hover:border-brand-green/40"
            }`}>
            <Icon size={18} />
          </button>
        );
      })}
    </div>
  );
}
