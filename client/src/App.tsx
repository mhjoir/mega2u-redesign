import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// استيراد الصفحات
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import CustomerPortal from "./pages/CustomerPortal"; // لوحة تحكم العميل
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Refund from "./pages/Refund";
import Terms from "./pages/Terms";

function Router() {
  return (
    <Switch>
      {/* 1. الصفحة الرئيسية */}
      <Route path="/" component={Home} />

      {/* 2. صفحة تفاصيل المنتج (نتفلكس، شاهد، إلخ) */}
      <Route path="/product/:id" component={ProductPage} />

      {/* 3. صفحة الدفع (Checkout) */}
      <Route path="/checkout/:id" component={Checkout} />

      {/* 4. لوحة تحكم العميل (Customer Portal) - لعرض الطلبات والبيانات */}
      <Route path="/customer-portal" component={CustomerPortal} />

      {/* 5. صفحات السياسات والشروط */}
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/refund" component={Refund} />

      {/* 6. صفحات الخطأ */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          {/* Sonner Toaster لعرض إشعارات النجاح والخطأ بشكل أنيق */}
          <Toaster position="top-center" richColors />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;