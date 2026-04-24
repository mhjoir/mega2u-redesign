import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Loader2, Download, Edit2, LogOut } from "lucide-react";

export default function CustomerPortal() {
  const { user, loading, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // إعادة التوجيه إذا لم يكن العميل مسجل دخول
  useEffect(() => {
    if (!loading && !user) {
      setLocation("/");
    }
  }, [user, loading, setLocation]);

  // جلب الطلبات
  useEffect(() => {
    if (user && activeTab === "orders") {
      fetchOrders();
    }
  }, [user, activeTab]);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      // هنا ستقوم باستدعاء API لجلب الطلبات
      // const response = await trpc.customer.getOrders.useQuery();
      // setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin w-8 h-8 text-[#ff6b35]" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#1a1a1a] text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">منطقة العملاء</h1>
            <p className="text-gray-400 text-sm">أهلاً {user.name || user.email}</p>
          </div>
          <Button
            onClick={() => {
              logout();
              setLocation("/");
            }}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
            <TabsTrigger value="orders">الطلبات والاشتراكات</TabsTrigger>
            <TabsTrigger value="invoices">الفواتير</TabsTrigger>
          </TabsList>

          {/* Tab: Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-[#1a1a1a]">بيانات الملف الشخصي</h2>
                <Button size="sm" className="flex items-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  تعديل
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* الاسم */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    الاسم الكامل
                  </label>
                  <p className="text-lg text-[#1a1a1a]">{user.name || "غير محدد"}</p>
                </div>

                {/* البريد الإلكتروني */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    البريد الإلكتروني
                  </label>
                  <p className="text-lg text-[#1a1a1a]">{user.email || "غير محدد"}</p>
                </div>

                {/* رقم الهاتف */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    رقم الهاتف
                  </label>
                  <p className="text-lg text-[#1a1a1a]">غير محدد</p>
                </div>

                {/* المدينة */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    المدينة
                  </label>
                  <p className="text-lg text-[#1a1a1a]">غير محددة</p>
                </div>

                {/* العنوان */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    العنوان
                  </label>
                  <p className="text-lg text-[#1a1a1a]">غير محدد</p>
                </div>

                {/* تاريخ الانضمام */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    تاريخ الانضمام
                  </label>
                  <p className="text-lg text-[#1a1a1a]">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString("ar-SA") : "غير محدد"}
                  </p>
                </div>

                {/* آخر تسجيل دخول */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    آخر تسجيل دخول
                  </label>
                  <p className="text-lg text-[#1a1a1a]">
                    {user.lastSignedIn ? new Date(user.lastSignedIn).toLocaleDateString("ar-SA") : "غير محدد"}
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab: Orders */}
          <TabsContent value="orders" className="space-y-6">
            {ordersLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin w-8 h-8 text-[#ff6b35]" />
              </div>
            ) : orders.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-600 text-lg mb-4">لم تقم بأي اشتراكات أو شراءات حتى الآن</p>
                <Button className="bg-[#ff6b35] hover:bg-[#e55a24] text-white">
                  استكشف الخدمات
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#1a1a1a]">
                          طلب #{order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString("ar-SA")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#ff6b35]">
                          {order.totalAmount} {order.currency}
                        </p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                          order.status === "completed" ? "bg-green-100 text-green-800" :
                          order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {order.status === "completed" ? "مكتمل" :
                           order.status === "pending" ? "قيد الانتظار" : "ملغى"}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      عرض التفاصيل
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tab: Invoices */}
          <TabsContent value="invoices" className="space-y-6">
            <Card className="p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">لا توجد فواتير حتى الآن</p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}