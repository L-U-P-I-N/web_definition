"use client";
import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import { addQuote } from "@/lib/db";
import { useLang } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";

const activityTypes = [
  { ar: "المقاولات والإنشاءات", en: "Contracting & Construction" },
  { ar: "الصناعة والمصانع", en: "Industry & Factories" },
  { ar: "اللوجستيات والنقل", en: "Logistics & Transport" },
  { ar: "الزراعة", en: "Agriculture" },
  { ar: "العقارات والمجمّعات", en: "Real Estate & Complexes" },
  { ar: "محطات توليد الطاقة", en: "Power Generation" },
  { ar: "أخرى", en: "Other" },
];

const serviceOptions = [
  { val: "petroleum", ar: "منتجات بترولية (بنزين / ديزل / غاز)", en: "Petroleum products (petrol / diesel / gas)" },
  { val: "sewage", ar: "سحب بيارات وصرف صحي", en: "Septic & sewage pumping" },
  { val: "water", ar: "إمداد مائي (مياه تحلية / شرب)", en: "Water supply (desalinated / drinking)" },
  { val: "generators", ar: "تأجير مولدات كهربائية", en: "Generator rental" },
];

const tq = {
  ar: {
    successTitle: "تم إرسال طلبك!",
    successBody: "شكراً لك. سيتواصل معك فريق بتروهب خلال 24 ساعة بعرض سعر مخصّص لاحتياجاتك.",
    name: "الاسم", namePh: "اسم الشخص أو المنشأة",
    phone: "رقم الجوال", email: "البريد الإلكتروني", emailPh: "example@company.sa",
    activity: "نوع النشاط", chooseActivity: "اختر نوع النشاط",
    city: "الموقع / المدينة", chooseCity: "اختر المدينة",
    service: "الخدمة المطلوبة",
    quantity: "الكمية أو الحجم التقديري", quantityPh: "مثال: 5000 لتر / 3 صهاريج / 500 KVA",
    extra: "تفاصيل إضافية", extraPh: "أي تفاصيل أخرى تودّ إضافتها عن طلبك...",
    sending: "جارٍ الإرسال...", submit: "إرسال الطلب",
    consent: "بإرسالك هذا النموذج فإنك توافق على سياسة الخصوصية لدينا. لن نشارك بياناتك مع أي طرف ثالث.",
  },
  en: {
    successTitle: "Your request has been sent!",
    successBody: "Thank you. The Petrohub team will contact you within 24 hours with a custom quote for your needs.",
    name: "Name", namePh: "Person or company name",
    phone: "Mobile Number", email: "Email", emailPh: "example@company.sa",
    activity: "Activity Type", chooseActivity: "Select activity type",
    city: "Location / City", chooseCity: "Select city",
    service: "Required Service",
    quantity: "Estimated Quantity or Size", quantityPh: "e.g. 5000 L / 3 tankers / 500 KVA",
    extra: "Additional Details", extraPh: "Any other details you'd like to add about your request...",
    sending: "Sending...", submit: "Send Request",
    consent: "By submitting this form you agree to our privacy policy. We will not share your data with any third party.",
  },
};

export default function QuoteForm() {
  const { lang } = useLang();
  const L = tq[lang];
  const { regions } = useSiteContent();
  const cityOptions = [...regions, { id: "other", ar: "أخرى", en: "Other" }];
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    activity: "",
    fuelType: "",
    quantity: "",
    city: "",
    sensors: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addQuote({
        name: form.name,
        phone: form.phone,
        email: form.email,
        activity: form.activity,
        fuelType: form.fuelType,
        quantity: form.quantity,
        city: form.city,
        sensors: form.sensors,
        message: form.message,
      });
      await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  const inputClass =
    "w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all duration-200 bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50";

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-brand-green-light flex items-center justify-center mb-6">
          <CheckCircle2 size={48} className="text-brand-green" />
        </div>
        <h3 className="text-2xl font-black text-brand-charcoal mb-3">{L.successTitle}</h3>
        <p className="text-brand-charcoal-light max-w-md">{L.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="q-name" className="block text-sm font-bold text-brand-charcoal mb-2">
            {L.name} <span className="text-red-500">*</span>
          </label>
          <input
            id="q-name"
            type="text"
            required
            placeholder={L.namePh}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="q-phone" className="block text-sm font-bold text-brand-charcoal mb-2">
            {L.phone} <span className="text-red-500">*</span>
          </label>
          <input
            id="q-phone"
            type="tel"
            required
            placeholder="+966 5XX XXX XXX"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="q-email" className="block text-sm font-bold text-brand-charcoal mb-2">
          {L.email}
        </label>
        <input
          id="q-email"
          type="email"
          placeholder={L.emailPh}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Activity type */}
        <div>
          <label htmlFor="q-activity" className="block text-sm font-bold text-brand-charcoal mb-2">
            {L.activity}
          </label>
          <select
            id="q-activity"
            value={form.activity}
            onChange={(e) => setForm({ ...form, activity: e.target.value })}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">{L.chooseActivity}</option>
            {activityTypes.map((a) => (
              <option key={a.en} value={lang === "ar" ? a.ar : a.en}>{lang === "ar" ? a.ar : a.en}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label htmlFor="q-city" className="block text-sm font-bold text-brand-charcoal mb-2">
            {L.city}
          </label>
          <select
            id="q-city"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">{L.chooseCity}</option>
            {cityOptions.map((c) => (
              <option key={c.id} value={lang === "ar" ? c.ar : c.en}>{lang === "ar" ? c.ar : c.en}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Service type */}
      <div>
        <p className="text-sm font-bold text-brand-charcoal mb-3">{L.service}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {serviceOptions.map((opt) => (
            <label
              key={opt.val}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 font-medium text-sm ${
                form.fuelType === opt.val
                  ? "border-brand-green bg-brand-green-light text-brand-green"
                  : "border-gray-200 text-brand-charcoal-mid hover:border-brand-green/30"
              }`}
            >
              <input
                type="radio"
                name="fuelType"
                value={opt.val}
                checked={form.fuelType === opt.val}
                onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
                className="sr-only"
              />
              {lang === "ar" ? opt.ar : opt.en}
            </label>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor="q-quantity" className="block text-sm font-bold text-brand-charcoal mb-2">
          {L.quantity}
        </label>
        <input
          id="q-quantity"
          type="text"
          placeholder={L.quantityPh}
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="q-message" className="block text-sm font-bold text-brand-charcoal mb-2">
          {L.extra}
        </label>
        <textarea
          id="q-message"
          rows={4}
          placeholder={L.extraPh}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      <Button
        type="submit"
        disabled={loading || !form.name || !form.phone}
        size="lg"
        className="w-full justify-center"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {L.sending}
          </span>
        ) : (
          L.submit
        )}
      </Button>

      <p className="text-xs text-brand-charcoal-light text-center leading-relaxed">
        {L.consent}
      </p>
    </form>
  );
}
