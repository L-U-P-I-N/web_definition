"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getProjects, setProjects, addProject, deleteProject, getRegions } from "@/lib/db";
import type { ProjectItem } from "@/lib/types";
import { Plus, Pencil, Trash2, X, Save, MapPin, Tag } from "lucide-react";

const categories = ["خدمات بترولية", "حلول بيئية", "إمداد مائي", "طاقة بديلة", "حلول متكاملة"];

const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

const empty: Omit<ProjectItem, "id"> = { title: "", description: "", category: "", city: "", slug: "" };

function slugify(text: string) {
  return text.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "").slice(0, 60) || Date.now().toString();
}

export default function AdminProjectsPage() {
  const [projects, setLocal] = useState<ProjectItem[]>([]);
  const [editing, setEditing] = useState<ProjectItem | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<ProjectItem, "id">>(empty);
  const [saved, setSaved] = useState(false);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    getProjects().then(setLocal);
    getRegions().then((r) => setCities(r.map((c) => c.ar)));
  }, []);

  const save = async () => {
    if (!form.title.trim()) return;
    const slug = form.slug || slugify(form.title);
    if (editing) {
      const updated = projects.map((p) => p.id === editing.id ? { ...form, slug, id: editing.id } : p);
      await setProjects(updated);
      setLocal(updated);
      setEditing(null);
    } else {
      await addProject({ ...form, slug });
      getProjects().then(setLocal);
      setAdding(false);
    }
    setForm(empty);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const remove = async (id: string) => {
    if (!confirm("حذف هذا المشروع؟")) return;
    await deleteProject(id);
    getProjects().then(setLocal);
  };

  const startEdit = (p: ProjectItem) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description, category: p.category, city: p.city, slug: p.slug });
    setAdding(false);
  };

  const cancel = () => { setEditing(null); setAdding(false); setForm(empty); };

  const showForm = adding || editing !== null;

  return (
    <AdminShell title="إدارة المشاريع والأعمال">
      {saved && (
        <div className="mb-4 bg-brand-green-light border border-brand-green/20 text-brand-green px-4 py-3 rounded-xl text-sm font-bold">
          ✓ تم الحفظ بنجاح
        </div>
      )}

      {/* Add button */}
      {!showForm && (
        <button
          onClick={() => { setAdding(true); setEditing(null); setForm(empty); }}
          className="mb-6 flex items-center gap-2 bg-brand-green text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-brand-green-mid transition-colors shadow-lg shadow-brand-green/20"
        >
          <Plus size={16} />
          إضافة مشروع جديد
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
          <h3 className="font-black text-brand-charcoal mb-5 text-lg">
            {editing ? "تعديل المشروع" : "مشروع جديد"}
          </h3>
          <div className="space-y-4">
            <input className={inputCls} placeholder="عنوان المشروع *" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })} />
            <textarea className={`${inputCls} resize-none`} rows={3} placeholder="وصف المشروع"
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <select className={`${inputCls} cursor-pointer`} value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="">اختر التصنيف</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select className={`${inputCls} cursor-pointer`} value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}>
                <option value="">اختر المدينة</option>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={save} disabled={!form.title.trim()}
              className="flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-green-mid transition-colors disabled:opacity-50">
              <Save size={15} /> حفظ
            </button>
            <button onClick={cancel}
              className="flex items-center gap-2 bg-gray-100 text-brand-charcoal px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
              <X size={15} /> إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Projects list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-green/20 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-brand-charcoal mb-2 leading-snug">{p.title}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {p.category && (
                    <span className="text-xs bg-brand-green-light text-brand-green px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                      <Tag size={10} /> {p.category}
                    </span>
                  )}
                  {p.city && (
                    <span className="text-xs bg-gray-100 text-brand-charcoal-mid px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                      <MapPin size={10} /> {p.city}
                    </span>
                  )}
                </div>
                <p className="text-brand-charcoal-light text-xs leading-relaxed line-clamp-2">{p.description}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(p)}
                  className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-brand-green-light text-brand-charcoal-light hover:text-brand-green flex items-center justify-center transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => remove(p.id)}
                  className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-red-50 text-brand-charcoal-light hover:text-red-500 flex items-center justify-center transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
