"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { doLogin, checkAuth } from "@/lib/store";
import { getSettings } from "@/lib/db";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (checkAuth()) router.push("/admin/dashboard");
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { adminPassword } = await getSettings();
      if (doLogin(password, adminPassword)) {
        router.push("/admin/dashboard");
        return;
      }
      setError("كلمة المرور غير صحيحة. يرجى المحاولة مجدداً.");
    } catch {
      setError("تعذّر الاتصال بقاعدة البيانات. حاول مرة أخرى.");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-brand-green-dark via-brand-green-mid to-brand-green flex items-center justify-center p-4 font-arabic"
      dir="rtl"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 dot-bg opacity-15 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-4xl shadow-2xl shadow-brand-green-dark/30 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-brand-green-dark to-brand-green-mid p-8 text-center relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#0067E3]" />
            <h1 className="text-3xl font-extrabold tracking-tight mb-1">
              <span className="text-white">Petro</span>
              <span className="text-white/70">hub</span>
            </h1>
            <p className="text-white/60 text-sm">لوحة التحكم الإدارية</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-green-light flex items-center justify-center">
                <ShieldCheck size={20} className="text-brand-green" />
              </div>
              <div>
                <p className="font-black text-brand-charcoal">تسجيل الدخول</p>
                <p className="text-brand-charcoal-light text-xs">
                  أدخل كلمة المرور للمتابعة
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="admin-pw"
                  className="block text-sm font-bold text-brand-charcoal mb-2"
                >
                  كلمة المرور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <Lock size={16} className="text-brand-charcoal-light" />
                  </div>
                  <input
                    id="admin-pw"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pr-11 pl-12 py-3.5 rounded-2xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute inset-y-0 left-0 flex items-center pl-4 text-brand-charcoal-light hover:text-brand-charcoal transition-colors"
                    aria-label={showPw ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-brand-green text-white font-black py-4 rounded-2xl hover:bg-brand-green-mid transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-brand-green/30"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    جارٍ التحقق...
                  </>
                ) : (
                  "دخول"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-brand-charcoal-light">
              منطقة محمية — مخصّصة لموظفي Petrohub المصرّح لهم فقط.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
