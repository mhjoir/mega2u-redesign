import { useState } from 'react';
import { products, categories } from "@/lib/products";
import ProductCard from './ProductCard';

/**
 * قسم عرض المنتجات بأسلوب Kinguin:
 * - فلاتر التصنيفات في شريط أفقي
 * - شبكة كثيفة (5-6 بطاقات في الديسكتوب) لتعظيم العرض
 * - بطاقات بأسلوب Kinguin (انظر ProductCard.tsx)
 *
 * ملاحظة: لم يتم تعديل أي نص أو بيانات منتج، فقط طريقة العرض.
 */
export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // تصفية المنتجات بناءً على التصنيف المختار
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section
      id="products"
      className="py-12 sm:py-20 bg-gradient-to-b from-[#f7f8fb] to-white font-['Cairo']"
      dir="rtl"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

        {/* رأس القسم */}
        <div className="text-center mb-8 sm:mb-12 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-[0.04] hidden md:block pointer-events-none select-none">
            <h2 className="text-9xl font-black">MEGA2U</h2>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#011627] mb-4 sm:mb-6 tracking-tight">
            عروضنا <span className="text-[#ff6b35]">الحصرية</span>
          </h2>
          <div className="w-16 sm:w-24 h-1.5 bg-[#ff6b35] mx-auto rounded-full mb-4 sm:mb-6"></div>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-lg leading-relaxed">
            اشترك الآن في أقوى الخدمات الرقمية بضمان ذهبي وتسليم فوري عبر الإيميل
          </p>
        </div>

        {/* أزرار الفلترة (التصنيفات) — شريط أفقي قابل للتمرير على الموبايل */}
        <div className="mb-8 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible no-scrollbar pb-2 sm:pb-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 border ${
                  selectedCategory === category.id
                    ? 'bg-[#011627] border-[#011627] text-white shadow-md'
                    : 'bg-white border-gray-200 text-[#011627] hover:border-[#ff6b35] hover:text-[#ff6b35]'
                }`}
              >
                <span className="text-sm sm:text-base">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* شبكة المنتجات بأسلوب Kinguin (كثيفة) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* حالة عدم وجود منتجات */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-10 sm:py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 mt-8">
            <p className="text-sm sm:text-xl text-gray-400 font-bold">
              لا توجد خدمات متوفرة حالياً في هذا القسم
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
