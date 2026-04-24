import { Product } from '@/lib/products';
import { Link } from "wouter";
import { Gamepad2, Globe, Heart, Monitor, Tv, Sparkles, Shield, Palette, Package } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onBuy?: (product: Product) => void;
}

/**
 * بطاقة منتج بأسلوب Kinguin:
 * - شارة خصم برتقالية في أعلى اليسار
 * - صورة كبيرة مع خلفية فاتحة
 * - عنوان تحت الصورة
 * - أيقونات المنصة في المنتصف
 * - شريط سعر برتقالي بارز في الأسفل (السعر الأصلي مشطوب + السعر الحالي)
 *
 * ملاحظة: لا يتم تعديل أي بيانات للمنتج، فقط طريقة العرض.
 */
export default function ProductCard({ product }: ProductCardProps) {
  const [isFav, setIsFav] = useState(false);

  // اختيار أيقونة المنصة بناء على الفئة (لإضافة طبقة معلومات بصرية فقط)
  const PlatformIcon = (() => {
    switch (product.category) {
      case 'os':
      case 'software':
        return Monitor;
      case 'streaming':
      case 'iptv':
        return Tv;
      case 'design':
        return Palette;
      case 'security':
        return Shield;
      case 'ai':
        return Sparkles;
      default:
        return Gamepad2;
    }
  })();

  // محاكاة سعر "أصلي" أعلى لإظهار شطب الخصم بأسلوب كينغوين فقط
  // عند وجود badge أو بدونه. هذه قيمة عرض بصري لا تُعدّل بيانات المنتج.
  const hasDiscount = !!product.badge;
  const originalPrice = hasDiscount
    ? Math.round(product.price * (product.price >= 100 ? 1.45 : 1.65))
    : null;
  const discountPct = originalPrice
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : null;

  // عملة العرض المختصرة
  const currencyLabel = product.currency === 'ريال' ? 'ر.س' : product.currency;

  return (
    <Link href={`/product/${product.id}`}>
      <div
        className="group relative h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:border-[#ff6b35]/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
        dir="rtl"
      >
        {/* شارة الخصم — تظهر فقط عند وجود badge، بأسلوب Kinguin (مستطيل برتقالي) */}
        {hasDiscount && discountPct && (
          <div className="absolute top-0 left-0 z-20">
            <div className="bg-[#ff6b35] text-white text-[13px] font-extrabold px-3 py-1.5 rounded-br-xl rounded-tl-2xl shadow-md tracking-tight" dir="ltr">
              -{discountPct}%
            </div>
          </div>
        )}

        {/* زر المفضلة في الأعلى يميناً */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFav((v) => !v);
          }}
          aria-label="إضافة إلى المفضلة"
          className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur hover:bg-white border border-gray-200 transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isFav ? 'fill-[#ff6b35] text-[#ff6b35]' : 'text-gray-400 group-hover:text-[#ff6b35]'
            }`}
          />
        </button>

        {/* قسم الصورة — كبير ومربع تقريباً مثل Kinguin */}
        <div
          className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center"
          style={
            product.color
              ? {
                  background: `linear-gradient(135deg, ${product.color}10 0%, ${product.color}05 100%)`,
                }
              : undefined
          }
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-6 transform group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://placehold.co/300x300?text=MEGA2U';
            }}
            loading="lazy"
          />
        </div>

        {/* قسم المحتوى */}
        <div className="flex flex-col flex-grow px-3 pt-3 pb-0 text-center">
          {/* عنوان المنتج (سطرين كحد أقصى) */}
          <h3 className="text-[13px] sm:text-sm font-semibold text-gray-800 leading-snug min-h-[2.6em] line-clamp-2 group-hover:text-[#ff6b35] transition-colors">
            {product.name}
          </h3>

          {/* أيقونات المنصة (محاكاة لأيقونات Steam / Globe في Kinguin) */}
          <div className="flex items-center justify-center gap-2 mt-3 mb-3 text-gray-500">
            <PlatformIcon className="w-5 h-5" strokeWidth={1.7} />
            <Globe className="w-5 h-5" strokeWidth={1.7} />
          </div>
        </div>

        {/* شريط السعر السفلي — بأسلوب Kinguin (خلفية برتقالية + السعر مشطوب + السعر الحالي) */}
        <div className="bg-[#ff6b35] px-3 py-2.5 flex items-center justify-center gap-2 mt-auto">
          {originalPrice && (
            <span className="text-white/80 text-[12px] font-medium line-through decoration-1" dir="ltr">
              {originalPrice}
            </span>
          )}
          <span className="text-white text-[15px] sm:text-[17px] font-extrabold tracking-tight" dir="ltr">
            {product.price.toFixed(2)}
            <span className="text-[12px] font-bold mr-1">{currencyLabel}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
