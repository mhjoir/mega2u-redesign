import { useAuth } from "@/hooks/useAuth";
import { useLocation, Link } from "wouter";
import { useEffect, useState } from "react";
import {
  Loader2,
  Edit2,
  LogOut,
  User,
  Package,
  Receipt,
  Heart,
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Award,
  ShoppingBag,
  Shield,
  Bell,
} from "lucide-react";
import { toast } from "sonner";

/**
 * Kinguin-style Customer Portal (RTL)
 * تخطيط:
 *   - شريط جانبي يميني (sidebar) للتنقل بين الأقسام
 *   - محتوى رئيسي يستجيب للتبويب المختار
 * تم الحفاظ على نفس بيانات `useAuth()` ومنطق إعادة التوجيه إذا لم يكن مسجل دخول.
 */
type TabId = "profile" | "orders" | "invoices" | "favorites" | "settings";

const TABS: Array<{
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: "profile", label: "الملف الشخصي", icon: User },
  { id: "orders", label: "طلباتي", icon: Package },
  { id: "invoices", label: "الفواتير", icon: Receipt },
  { id: "favorites", label: "المفضّلة", icon: Heart },
  { id: "settings", label: "الإعدادات", icon: Shield },
];

export default function CustomerPortal() {
  const { user, loading, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  useEffect(() => {
    if (!loading && !user) setLocation("/");
  }, [user, loading, setLocation]);

  useEffect(() => {
    if (user && activeTab === "orders") {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, activeTab]);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      // ربط API الفعلي هنا (مثال: GET /api/customer/orders)
      // const response = await fetch('/api/customer/orders');
      // setOrders(await response.json());
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa]">
        <Loader2 className="animate-spin w-8 h-8 text-[#ff6b35]" />
      </div>
    );
  }
  if (!user) return null;

  const initials = (user.name || user.email || "U").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f5f6fa] font-['Cairo']" dir="rtl">
      {/* شريط علوي مبسّط */}
      <header className="bg-white border-b border-[#e7eaf3] sticky top-0 z-40">
        <div className="kg-container flex items-center justify-between py-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-bold text-[#011627] hover:text-[#ff6b35] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            العودة للرئيسية
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="w-9 h-9 rounded-xl text-[#011627] hover:bg-[#f5f6fa] flex items-center justify-center transition-colors"
              aria-label="الإشعارات"
            >
              <Bell className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                logout();
                setLocation("/");
                toast.success("تم تسجيل الخروج");
              }}
              className="kg-btn kg-btn-outline !py-2 !px-3 text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      <div className="kg-container py-6 md:py-10">
        {/* ترحيب */}
        <div className="mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] flex items-center justify-center text-white font-black text-2xl shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-black text-[#011627]">
                أهلاً، {user.name || user.email}
              </h1>
              <p className="text-xs md:text-sm text-gray-500">
                مرحباً بك في منطقة العملاء الخاصة بك
              </p>
            </div>
          </div>
        </div>

        {/* محتوى رئيسي + شريط جانبي */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* الشريط الجانبي */}
          <aside className="lg:col-span-3">
            <div className="kg-card p-3 lg:sticky lg:top-20">
              <nav className="space-y-1">
                {TABS.map((t) => {
                  const Icon = t.icon;
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`w-full text-right px-3 py-2.5 rounded-xl flex items-center gap-3 text-sm font-bold transition-colors ${
                        isActive
                          ? "bg-[#ff6b35] text-white"
                          : "text-[#011627] hover:bg-[#f5f6fa]"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="flex-grow">{t.label}</span>
                      {!isActive && <ChevronLeft className="w-4 h-4 opacity-50" />}
                    </button>
                  );
                })}
              </nav>

              <div className="kg-divider my-3" />

              {/* بطاقة عضوية مصغّرة */}
              <div className="rounded-xl p-3 bg-gradient-to-br from-[#011627] to-[#0f3460] text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-[#ff6b35]" />
                  <span className="text-xs font-black">عضوية ذهبية</span>
                </div>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  استمتع بمزايا حصرية وخصومات على جميع الخدمات.
                </p>
              </div>
            </div>
          </aside>

          {/* المحتوى */}
          <main className="lg:col-span-9 space-y-5">
            {activeTab === "profile" && (
              <div className="space-y-5">
                {/* بطاقة بيانات الملف */}
                <section className="kg-card p-6">
                  <div className="flex justify-between items-start mb-5 flex-wrap gap-3">
                    <div>
                      <h2 className="text-lg font-black text-[#011627]">
                        بيانات الملف الشخصي
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        معلوماتك الأساسية المسجّلة في الحساب
                      </p>
                    </div>
                    <button className="kg-btn kg-btn-outline !py-2 !px-3 text-xs">
                      <Edit2 className="w-3.5 h-3.5" />
                      تعديل
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileField
                      icon={User}
                      label="الاسم الكامل"
                      value={user.name || "غير محدد"}
                    />
                    <ProfileField
                      icon={Mail}
                      label="البريد الإلكتروني"
                      value={user.email || "غير محدد"}
                    />
                    <ProfileField
                      icon={Phone}
                      label="رقم الهاتف"
                      value={(user as any).phone || "غير محدد"}
                    />
                    <ProfileField
                      icon={MapPin}
                      label="المدينة"
                      value={(user as any).city || "غير محددة"}
                    />
                    <ProfileField
                      icon={MapPin}
                      label="العنوان"
                      value={(user as any).address || "غير محدد"}
                      className="md:col-span-2"
                    />
                    <ProfileField
                      icon={Calendar}
                      label="تاريخ الانضمام"
                      value={
                        user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString("ar-SA")
                          : "غير محدد"
                      }
                    />
                    <ProfileField
                      icon={Clock}
                      label="آخر تسجيل دخول"
                      value={
                        user.lastSignedIn
                          ? new Date(user.lastSignedIn).toLocaleDateString("ar-SA")
                          : "غير محدد"
                      }
                    />
                  </div>
                </section>

                {/* إحصائيات سريعة */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <StatCard label="إجمالي الطلبات" value="0" icon={Package} accent="orange" />
                  <StatCard label="قيد المعالجة" value="0" icon={Loader2} accent="blue" />
                  <StatCard label="مكتملة" value="0" icon={Award} accent="green" />
                  <StatCard label="المفضّلة" value="0" icon={Heart} accent="rose" />
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <section className="kg-card p-6">
                <div className="flex justify-between items-start mb-5 flex-wrap gap-3">
                  <div>
                    <h2 className="text-lg font-black text-[#011627]">
                      طلباتي والاشتراكات
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      جميع طلباتك ومفاتيح التفعيل في مكان واحد
                    </p>
                  </div>
                </div>

                {ordersLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin w-7 h-7 text-[#ff6b35]" />
                  </div>
                ) : orders.length === 0 ? (
                  <EmptyState
                    icon={ShoppingBag}
                    title="لم تقم بأي اشتراكات أو شراءات حتى الآن"
                    cta="استكشف الخدمات"
                    onCtaClick={() => setLocation("/#products")}
                  />
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-[#e7eaf3] rounded-xl p-4 flex items-center justify-between flex-wrap gap-3 hover:border-[#ff6b35] transition-colors"
                      >
                        <div>
                          <h3 className="text-sm font-black text-[#011627]">
                            طلب #{order.orderNumber}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString(
                              "ar-SA"
                            )}
                          </p>
                        </div>
                        <div className="text-left">
                          <p className="text-lg font-black text-[#ff6b35]">
                            {order.totalAmount} {order.currency}
                          </p>
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold mt-1 ${
                              order.status === "completed"
                                ? "bg-emerald-100 text-emerald-700"
                                : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-rose-100 text-rose-700"
                            }`}
                          >
                            {order.status === "completed"
                              ? "مكتمل"
                              : order.status === "pending"
                              ? "قيد الانتظار"
                              : "ملغى"}
                          </span>
                        </div>
                        <button className="kg-btn kg-btn-outline !py-1.5 !px-3 text-xs">
                          عرض التفاصيل
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === "invoices" && (
              <section className="kg-card p-6">
                <h2 className="text-lg font-black text-[#011627] mb-1">
                  الفواتير
                </h2>
                <p className="text-xs text-gray-500 mb-5">
                  جميع فواتيرك وتعاملاتك السابقة
                </p>
                <EmptyState
                  icon={Receipt}
                  title="لا توجد فواتير حتى الآن"
                />
              </section>
            )}

            {activeTab === "favorites" && (
              <section className="kg-card p-6">
                <h2 className="text-lg font-black text-[#011627] mb-1">
                  المنتجات المفضّلة
                </h2>
                <p className="text-xs text-gray-500 mb-5">
                  المنتجات التي حفظتها لشرائها لاحقاً
                </p>
                <EmptyState
                  icon={Heart}
                  title="لا توجد منتجات في المفضّلة"
                  cta="تصفّح المنتجات"
                  onCtaClick={() => setLocation("/#products")}
                />
              </section>
            )}

            {activeTab === "settings" && (
              <section className="kg-card p-6 space-y-5">
                <div>
                  <h2 className="text-lg font-black text-[#011627] mb-1">
                    إعدادات الحساب
                  </h2>
                  <p className="text-xs text-gray-500">
                    تحكّم في الأمان وتفضيلات حسابك
                  </p>
                </div>

                <div className="border border-[#e7eaf3] rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-sm font-black text-[#011627]">
                      تغيير كلمة المرور
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      حدّث كلمة المرور كل فترة لحماية حسابك
                    </p>
                  </div>
                  <button className="kg-btn kg-btn-outline !py-2 !px-3 text-xs">
                    تغيير
                  </button>
                </div>

                <div className="border border-[#e7eaf3] rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-sm font-black text-[#011627]">
                      الإشعارات عبر البريد
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      تلقّي إشعارات بحالة الطلبات والعروض
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-checked:bg-[#ff6b35] rounded-full peer-focus:ring-2 peer-focus:ring-[#ff6b35]/30 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 peer-checked:after:left-5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                  </label>
                </div>

                <div className="border border-rose-200 bg-rose-50 rounded-xl p-4">
                  <h3 className="text-sm font-black text-rose-700">
                    حذف الحساب
                  </h3>
                  <p className="text-xs text-rose-600 mt-1 mb-3">
                    عند حذف الحساب سيتمّ فقد جميع البيانات والاشتراكات نهائياً.
                  </p>
                  <button className="kg-btn !bg-rose-600 !text-white hover:!bg-rose-700 !py-2 !px-3 text-xs">
                    طلب حذف الحساب
                  </button>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

/* ============== Helpers ============== */

function ProfileField({
  icon: Icon,
  label,
  value,
  className = "",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#f5f6fa] border border-[#e7eaf3] rounded-xl p-3.5 ${className}`}
    >
      <div className="flex items-center gap-1.5 text-[11px] font-black text-gray-500 uppercase tracking-wider mb-1">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </div>
      <p className="text-sm font-bold text-[#011627] truncate">{value}</p>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "orange" | "blue" | "green" | "rose";
}) {
  const map = {
    orange: { bg: "bg-[#ff6b35]/10", text: "text-[#ff6b35]" },
    blue: { bg: "bg-[#0088cc]/10", text: "text-[#0088cc]" },
    green: { bg: "bg-emerald-500/10", text: "text-emerald-600" },
    rose: { bg: "bg-rose-500/10", text: "text-rose-600" },
  }[accent];
  return (
    <div className="kg-card p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${map.bg}`}>
          <Icon className={`w-4 h-4 ${map.text}`} />
        </div>
      </div>
      <div className="text-2xl font-black text-[#011627]">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  cta,
  onCtaClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  cta?: string;
  onCtaClick?: () => void;
}) {
  return (
    <div className="text-center py-10">
      <div className="w-14 h-14 rounded-2xl bg-[#f5f6fa] flex items-center justify-center mx-auto mb-3">
        <Icon className="w-6 h-6 text-gray-400" />
      </div>
      <p className="text-sm text-gray-700 font-bold mb-3">{title}</p>
      {cta && (
        <button onClick={onCtaClick} className="kg-btn kg-btn-primary text-sm">
          {cta}
        </button>
      )}
    </div>
  );
}
