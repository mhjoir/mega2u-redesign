import { useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { products } from "@/lib/products";
import {
  ChevronLeft,
  ShieldCheck,
  Lock,
  Zap,
  CreditCard,
  Wallet,
  Mail,
  User,
  Phone,
  MapPin,
  Check,
  Info,
} from "lucide-react";
import { toast } from "sonner";

/**
 * Kinguin-style Checkout (RTL)
 *   - يمين (col-span-8): Stepper + بيانات الفوترة + طريقة الدفع + المراجعة
 *   - يسار (col-span-4): ملخّص الطلب الثابت + شارات الثقة
 *
 * متوافق مع المسار الحالي /checkout/:id ولا يقوم بأي تعديل في API.
 */
export default function Checkout() {
  const [, navigate] = useLocation();
  const [, params] = useRoute<{ id: string }>("/checkout/:id");

  const product =
    products.find((p) => String(p.id) === String(params?.id)) || products[0];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [method, setMethod] = useState<"card" | "wallet" | "stcpay" | "tabby">(
    "card"
  );
  const [agree, setAgree] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = Number(product.price) || 0;
  const tax = 0;
  const total = subtotal + tax;
  const currency = product.currency || "ر.س";

  const goNext = () => {
    if (step === 1) {
      if (!name || !email || !phone) {
        toast.error("الرجاء تعبئة جميع الحقول الإلزامية");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const placeOrder = async () => {
    if (!agree) {
      toast.error("يجب الموافقة على الشروط لإكمال الطلب");
      return;
    }
    setSubmitting(true);
    try {
      // ربط API الفعلي هنا (مثال: POST /api/orders)
      await new Promise((r) => setTimeout(r, 900));
      toast.success("تم إنشاء طلبك بنجاح، سيتم التواصل معك قريباً");
      navigate("/customer-portal");
    } catch {
      toast.error("فشل إنشاء الطلب، حاول مرة أخرى");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] font-['Cairo']" dir="rtl">
      <nav className="bg-white border-b border-[#e7eaf3] sticky top-0 z-40">
        <div className="kg-container flex items-center justify-between py-3">
          <Link
            href="/cart"
            className="flex items-center gap-1.5 text-sm font-bold text-[#011627] hover:text-[#ff6b35] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            العودة للسلة
          </Link>
          <h1 className="text-base font-black text-[#011627] flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            الدفع الآمن
          </h1>
        </div>
      </nav>

      <div className="kg-container py-6 md:py-10">
        <Stepper current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 space-y-5">
            {/* الخطوة 1 — بيانات الفوترة */}
            <section className={`kg-card p-5 md:p-6 ${step !== 1 && "opacity-95"}`}>
              <SectionTitle
                index={1}
                done={step > 1}
                title="بيانات الفوترة"
                subtitle="سيتمّ إرسال تفاصيل الطلب على هذه البيانات"
                onEdit={step !== 1 ? () => setStep(1) : undefined}
              />
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  <Field label="الاسم الكامل" required>
                    <div className="relative">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="kg-input !pr-11"
                        placeholder="مثال: محمد البسّام"
                      />
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </Field>
                  <Field label="البريد الإلكتروني" required>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="kg-input !pr-11"
                        placeholder="name@example.com"
                        dir="ltr"
                      />
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </Field>
                  <Field label="رقم الجوال" required>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="kg-input !pr-11"
                        placeholder="9665XXXXXXXX"
                        dir="ltr"
                      />
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </Field>
                  <Field label="المدينة">
                    <div className="relative">
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="kg-input !pr-11"
                        placeholder="الرياض"
                      />
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </Field>
                  <div className="md:col-span-2 flex justify-end">
                    <button onClick={goNext} className="kg-btn kg-btn-primary text-sm">
                      المتابعة إلى الدفع
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              {step > 1 && (
                <p className="text-xs text-gray-600 mt-2">
                  {name} • {email} • {phone}
                </p>
              )}
            </section>

            {/* الخطوة 2 — طريقة الدفع */}
            <section
              className={`kg-card p-5 md:p-6 ${step < 2 && "opacity-50 pointer-events-none"}`}
            >
              <SectionTitle
                index={2}
                done={step > 2}
                title="طريقة الدفع"
                subtitle="اختر وسيلة الدفع المناسبة لك"
                onEdit={step > 2 ? () => setStep(2) : undefined}
              />
              {step === 2 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                    <PaymentOption
                      active={method === "card"}
                      onClick={() => setMethod("card")}
                      icon={CreditCard}
                      title="بطاقة ائتمان / مدى"
                      desc="Visa • Mastercard • mada"
                    />
                    <PaymentOption
                      active={method === "stcpay"}
                      onClick={() => setMethod("stcpay")}
                      icon={Wallet}
                      title="STC Pay"
                      desc="ادفع بسهولة من جوّالك"
                    />
                    <PaymentOption
                      active={method === "tabby"}
                      onClick={() => setMethod("tabby")}
                      icon={Zap}
                      title="تابي / تمارا"
                      desc="قسّم على 4 دفعات بدون فوائد"
                    />
                    <PaymentOption
                      active={method === "wallet"}
                      onClick={() => setMethod("wallet")}
                      icon={Wallet}
                      title="محفظة MEGA2U"
                      desc="ادفع من رصيدك بدون رسوم"
                    />
                  </div>
                  <div className="mt-5 flex justify-end">
                    <button onClick={goNext} className="kg-btn kg-btn-primary text-sm">
                      المتابعة للمراجعة
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
              {step > 2 && (
                <p className="text-xs text-gray-600 mt-2">
                  الطريقة المختارة:{" "}
                  <span className="font-black">
                    {method === "card"
                      ? "بطاقة ائتمان / مدى"
                      : method === "stcpay"
                      ? "STC Pay"
                      : method === "tabby"
                      ? "تابي / تمارا"
                      : "محفظة MEGA2U"}
                  </span>
                </p>
              )}
            </section>

            {/* الخطوة 3 — المراجعة */}
            <section
              className={`kg-card p-5 md:p-6 ${step < 3 && "opacity-50 pointer-events-none"}`}
            >
              <SectionTitle
                index={3}
                title="مراجعة الطلب"
                subtitle="تأكّد من البيانات قبل التأكيد"
              />
              {step === 3 && (
                <div className="mt-5 space-y-4">
                  <div className="bg-[#f5f6fa] border border-[#e7eaf3] rounded-xl p-4 text-sm space-y-1">
                    <p>
                      <span className="text-gray-500">الاسم: </span>
                      <span className="font-black text-[#011627]">{name}</span>
                    </p>
                    <p>
                      <span className="text-gray-500">البريد: </span>
                      <span className="font-black text-[#011627]" dir="ltr">
                        {email}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-500">الجوال: </span>
                      <span className="font-black text-[#011627]" dir="ltr">
                        {phone}
                      </span>
                    </p>
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#ff6b35] focus:ring-[#ff6b35]"
                    />
                    <span className="leading-relaxed">
                      أوافق على{" "}
                      <Link href="/terms" className="kg-link">
                        شروط الاستخدام
                      </Link>{" "}
                      و{" "}
                      <Link href="/refund" className="kg-link">
                        سياسة الاسترجاع
                      </Link>
                    </span>
                  </label>

                  <button
                    onClick={placeOrder}
                    disabled={submitting}
                    className="kg-btn kg-btn-primary w-full !py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed kg-glow"
                  >
                    {submitting
                      ? "جاري معالجة الطلب..."
                      : `تأكيد ودفع ${total.toFixed(2)} ${currency}`}
                  </button>

                  <p className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    معاملاتك مشفّرة وآمنة 100%
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* الملخّص الجانبي */}
          <aside className="lg:col-span-4">
            <div className="kg-card p-5 lg:sticky lg:top-20">
              <h3 className="text-sm font-black text-[#011627] mb-4">
                ملخّص الطلب
              </h3>

              <div className="flex gap-3 pb-4 border-b border-[#e7eaf3]">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                  style={{ background: product.color || "#f5f6fa" }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[70%] max-h-[70%] object-contain"
                    />
                  ) : (
                    <span className="text-white font-black">
                      {product.name?.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-[#011627] line-clamp-2">
                    {product.name}
                  </h4>
                  {product.duration && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      المدة: {product.duration}
                    </p>
                  )}
                  <div className="text-sm font-black text-[#ff6b35] mt-1">
                    {product.price} {currency}
                  </div>
                </div>
              </div>

              <div className="py-4 space-y-2 text-sm border-b border-[#e7eaf3]">
                <div className="flex justify-between text-gray-700">
                  <span>المجموع الفرعي</span>
                  <span className="font-bold text-[#011627]">
                    {subtotal.toFixed(2)} {currency}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>الضريبة</span>
                  <span className="font-bold text-[#011627]">شاملة</span>
                </div>
              </div>

              <div className="flex items-end justify-between pt-4">
                <span className="text-sm font-bold text-gray-600">الإجمالي</span>
                <span className="text-2xl font-black text-[#ff6b35]">
                  {total.toFixed(2)} {currency}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <TrustItem icon={ShieldCheck} label="ضمان ذهبي" tone="green" />
                <TrustItem icon={Lock} label="دفع آمن" tone="orange" />
                <TrustItem icon={Zap} label="تسليم فوري" tone="blue" />
              </div>

              <div className="mt-4 bg-[#0088cc]/10 border border-[#0088cc]/20 rounded-xl p-3 text-[11px] text-[#0088cc] flex items-start gap-1.5 leading-relaxed">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                سيتمّ إرسال تفاصيل التفعيل على بريدك خلال دقائق من تأكيد الدفع.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ================ Helpers ================ */

function Stepper({ current }: { current: 1 | 2 | 3 }) {
  const steps = [
    { id: 1, label: "بيانات الفوترة" },
    { id: 2, label: "طريقة الدفع" },
    { id: 3, label: "المراجعة" },
  ];
  return (
    <div className="kg-card p-3 mb-5">
      <ol className="flex items-center gap-2">
        {steps.map((s, idx) => {
          const active = current === s.id;
          const done = current > s.id;
          return (
            <li key={s.id} className="flex items-center gap-2 flex-grow">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                  active
                    ? "bg-[#ff6b35] text-white"
                    : done
                    ? "bg-emerald-500 text-white"
                    : "bg-[#f5f6fa] text-gray-500"
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : s.id}
              </div>
              <span
                className={`text-xs font-bold whitespace-nowrap ${
                  active
                    ? "text-[#011627]"
                    : done
                    ? "text-emerald-700"
                    : "text-gray-500"
                }`}
              >
                {s.label}
              </span>
              {idx < steps.length - 1 && (
                <div className="flex-grow h-px bg-[#e7eaf3] mx-1" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function SectionTitle({
  index,
  title,
  subtitle,
  done,
  onEdit,
}: {
  index: number;
  title: string;
  subtitle?: string;
  done?: boolean;
  onEdit?: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${
            done ? "bg-emerald-500 text-white" : "bg-[#ff6b35]/10 text-[#ff6b35]"
          }`}
        >
          {done ? <Check className="w-4 h-4" /> : index}
        </div>
        <div>
          <h2 className="text-sm md:text-base font-black text-[#011627]">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-xs font-bold text-[#ff6b35] hover:underline"
        >
          تعديل
        </button>
      )}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-black text-gray-700 mb-1.5">
        {label} {required && <span className="text-[#ff6b35]">*</span>}
      </label>
      {children}
    </div>
  );
}

function PaymentOption({
  active,
  onClick,
  icon: Icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-right border-2 rounded-xl p-4 flex items-center gap-3 transition-colors ${
        active
          ? "border-[#ff6b35] bg-[#ff6b35]/5"
          : "border-[#e7eaf3] hover:border-[#ff6b35]/40"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          active ? "bg-[#ff6b35] text-white" : "bg-[#f5f6fa] text-[#011627]"
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="text-sm font-black text-[#011627]">{title}</div>
        <div className="text-[11px] text-gray-500 mt-0.5">{desc}</div>
      </div>
      <div
        className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
          active ? "border-[#ff6b35] bg-[#ff6b35]" : "border-gray-300"
        }`}
      >
        {active && <Check className="w-3 h-3 text-white" />}
      </div>
    </button>
  );
}

function TrustItem({
  icon: Icon,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone: "green" | "orange" | "blue";
}) {
  const map = {
    green: "bg-emerald-500/10 text-emerald-600",
    orange: "bg-[#ff6b35]/10 text-[#ff6b35]",
    blue: "bg-[#0088cc]/10 text-[#0088cc]",
  }[tone];
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${map}`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-[10px] font-bold text-gray-600">{label}</span>
    </div>
  );
}
