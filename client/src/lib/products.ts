export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  duration?: string;
  description: string;
  image: string;
  color?: string;
  badge?: string;
}

export const products: Product[] = [
  // --- 1. فئة أنظمة التشغيل (OS) ---
  {
    id: 'win-11-pro',
    name: 'Windows 11 Pro',
    category: 'os',
    price: 30,
    currency: 'ريال',
    description: '• كود رقمي أصلي (Retail Key)\n• تفعيل لمرة واحدة ومدى الحياة\n• يدعم التحديثات الرسمية ويرتبط بالجهاز\n• تسليم فوري عبر الإيميل',
    image: '/images/win11pro.png',
    color: '#0078D4',
    badge: 'تفعيل أبدي'
  },
  {
    id: 'win-10-pro',
    name: 'Windows 10 Pro',
    category: 'os',
    price: 25,
    currency: 'ريال',
    description: '• كود تفعيل أصلي يدعم الترقية لـ Win 11\n• تفعيل مدى الحياة لمرة واحدة\n• تسليم آلي وسريع فور الدفع\n• يدعم جميع اللغات',
    image: '/images/win10pro.png',
    color: '#0078D4'
  },
  {
    id: 'win-11-home',
    name: 'Windows 11 Home',
    category: 'os',
    price: 28,
    currency: 'ريال',
    description: '• نسخة أصلية مخصصة للاستخدام المنزلي\n• استقرار تام وتحديثات مستمرة\n• تفعيل مدى الحياة\n• تسليم فوري',
    image: '/images/win11home.png',
    color: '#0078D4'
  },
  {
    id: 'win-server-2022',
    name: 'Windows Server 2022',
    category: 'os',
    price: 90,
    currency: 'ريال',
    description: '• كود تفعيل للنسخة القياسية (Standard)\n• مثالي للشركات وإدارة الشبكات\n• تفعيل أصلي مدى الحياة\n• تسليم سريع',
    image: '/images/winserver.png',
    color: '#0078D4'
  },
  // --- 2. فئة برامج الأوفيس (Office) ---
  {
    id: 'office-2021-pro',
    name: 'Office 2021 Pro Plus',
    category: 'software',
    price: 50,
    currency: 'ريال',
    description: '• كود أصلي يرتبط بإيميلك الشخصي\n• تفعيل مدى الحياة لمرة واحدة\n• يشمل (Word, Excel, PowerPoint)\n• يعمل على ويندوز 10 و 11',
    image: '/images/office2021pro.png',
    color: '#D83B01',
    badge: 'الأكثر طلباً'
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    category: 'software',
    price: 45,
    currency: 'ريال',
    duration: 'سنة',
    description: '• حساب خاص بضمان سنة كاملة\n• مساحة تخزين 1 تيرابايت OneDrive\n• تفعيل على 5 أجهزة (ويندوز، ماك، جوال)\n• يشمل جميع تطبيقات الأوفيس المحدثة',
    image: '/images/office.png',
    color: '#D83B01'
  },
  {
    id: 'project-pro',
    name: 'Project Pro',
    category: 'software',
    price: 55,
    currency: 'ريال',
    description: '• الأداة الأفضل لإدارة المشاريع\n• تفعيل أصلي لجهاز واحد\n• ترخيص مدى الحياة\n• تسليم فوري',
    image: '/images/project.png',
    color: '#0078D4'
  },
  {
    id: 'visio-pro',
    name: 'Visio Pro',
    category: 'software',
    price: 55,
    currency: 'ريال',
    description: '• إنشاء المخططات والرسومات الهندسية بسهولة\n• تفعيل أصلي لجهاز واحد\n• ترخيص مدى الحياة\n• تسليم فوري عبر الإيميل',
    image: '/images/visio.png',
    color: '#0078D4'
  },
  // --- 3. فئة التصميم والإبداع (Design & Creativity) ---
  {
    id: 'adobe-all',
    name: 'Adobe Creative Cloud',
    category: 'design',
    price: 350,
    currency: 'ريال',
    duration: 'سنة',
    description: '• تفعيل رسمي على إيميلك الشخصي\n• الوصول لجميع برامج أدوبي (20+ تطبيق)\n• يدعم التحديثات و Adobe Cloud\n• ضمان ذهبي كامل المدة',
    image: '/images/adobe.png',
    color: '#FF0000',
    badge: 'سعر منافس'
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    category: 'design',
    price: 25,
    currency: 'ريال',
    duration: 'سنة',
    description: '• رابط دعوة رسمي للانضمام لفريق (Team Link)\n• وصول كامل لجميع القوالب والخطوط البريميوم\n• تفعيل فوري على حسابك الخاص\n• ضمان سنة كاملة',
    image: '/images/canva.png',
    color: '#00C4CC'
  },
  {
    id: 'autocad-year',
    name: 'AutoCAD 2024',
    category: 'design',
    price: 150,
    currency: 'ريال',
    duration: 'سنة',
    description: '• تفعيل تعليمي رسمي على إيميلك\n• الوصول الكامل لأدوات الرسم الهندسي\n• يدعم ويندوز وماك\n• ضمان استمرار الخدمة',
    image: '/images/autocad.png',
    color: '#E01F3D'
  },
  // --- 4. فئة الذكاء الاصطناعي (AI) ---
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    category: 'ai',
    price: 45,
    currency: 'ريال',
    duration: '3 أشهر',
    description: '• تفعيل مباشر على حسابك الشخصي\n• الوصول لـ GPT-4 و DALL-E 3\n• أسرع استجابة وميزات حصرية\n• ضمان كامل المدة',
    image: '/images/chatgpt.png',
    color: '#10A37F'
  },
  // --- 5. فئة الترفيه والبث (Streaming) ---
  {
    id: 'youtube-premium-year',
    name: 'YouTube Premium',
    category: 'streaming',
    price: 70,
    currency: 'ريال',
    duration: 'سنة',
    description: '• تفعيل رسمي عبر دعوة عائلية على إيميلك\n• بدون إعلانات + تشغيل في الخلفية\n• تشمل YouTube Music\n• ضمان ذهبي ضد الانقطاع',
    image: '/images/YouTubePremium.png',
    color: '#FF0000',
    badge: 'توفير كبير'
  },
  {
    id: 'shahid-vip-month',
    name: 'شاهد VIP',
    category: 'streaming',
    price: 25,
    currency: 'ريال',
    duration: 'شهر',
    description: '• حساب بأعلى باقة شاملة الرياضة\n• ملف خاص للمشاهدة بخصوصية\n• متابعة دوري روشن والبطولات الآسيوية\n• ضمان طوال فترة الاشتراك',
    image: '/images/shahid.png',
    color: '#00A3E0'
  },
  {
    id: 'netflix-month',
    name: 'Netflix Premium',
    category: 'streaming',
    price: 35,
    currency: 'ريال',
    duration: 'شهر',
    description: '• حساب بريميوم 4K HDR (شاشة خاصة)\n• خصوصية تامة بكلمة سر للملف\n• تسليم آلي لبيانات الحساب\n• ضمان ذهبي كامل المدة',
    image: '/images/netflix.png',
    color: '#E50914'
  },
  {
    id: 'netflix-3months',
    name: 'Netflix Premium',
    category: 'streaming',
    price: 95,
    currency: 'ريال',
    duration: '3 أشهر',
    description: '• باقة توفير لمدة 90 يوم\n• أعلى جودة Ultra HD\n• ملف خاص يضمن لك عدم التداخل\n• تسليم فوري وضمان ضد الانقطاع',
    image: '/images/netflix.png',
    color: '#E50914',
    badge: 'الأكثر مبيعاً'
  },
  {
    id: 'netflix-12months',
    name: 'Netflix Premium',
    category: 'streaming',
    price: 350,
    currency: 'ريال',
    duration: 'سنة',
    description: '• اشتراك سنوي يريحك من التجديد الشهري\n• شاشة مخصصة مقفلة برقم سري\n• دقة 4K للمسلسلات والأفلام\n• ضمان MEGA2U الشامل',
    image: '/images/netflix.png',
    color: '#E50914'
  },
  {
    id: 'disney-plus-month',
    name: 'Disney Plus',
    category: 'streaming',
    price: 25,
    currency: 'ريال',
    duration: 'شهر',
    description: '• تفعيل فوري وآمن على إيميلك\n• جودة بث عالية 4K ومحتوى أصلي\n• يدعم جميع الأجهزة الذكية\n• ضمان ذهبي كامل المدة',
    image: '/images/Disney.png',
    color: '#113CCF'
  },
  {
    id: 'osn-plus-month',
    name: 'OSN+',
    category: 'streaming',
    price: 25,
    currency: 'ريال',
    duration: 'شهر',
    description: '• حصريات إنتاجات HBO ومسلسلات أمريكية\n• ترجمة احترافية وجودة صورة مذهلة\n• ملف خاص بك لضمان الخصوصية\n• تسليم سريع',
    image: '/images/osn.png',
    color: '#FF6B00'
  },
  {
    id: 'prime-video-month',
    name: 'Prime Video',
    category: 'streaming',
    price: 20,
    currency: 'ريال',
    duration: 'شهر',
    description: '• مكتبة أمازون برايم الحصرية للأفلام\n• جودة بث ممتازة مع دعم الترجمة\n• يمكن تحميل الحلقات والمشاهدة لاحقاً\n• تفعيل آمن وسريع',
    image: '/images/PrimeVideo.png',
    color: '#146EB4'
  },
  {
    id: 'appletv-month',
    name: 'Apple TV+',
    category: 'streaming',
    price: 25,
    currency: 'ريال',
    duration: 'شهر',
    description: '• محتوى آبل الأصلي بإنتاج سينمائي ضخم\n• دقة 4K HDR مع نظام صوت محيطي\n• تفعيل رسمي على حسابك الشخصي\n• بدون إعلانات نهائياً',
    image: '/images/appletv.png',
    color: '#000000'
  },
  // --- 7. فئة الحماية والخصوصية (Security & VPN) ---
  {
    id: 'mcafee-total',
    name: 'McAfee Total Protection',
    category: 'security',
    price: 55,
    currency: 'ريال',
    duration: 'سنة',
    description: '• مكافح فيروسات خفيف على موارد الجهاز\n• يوفر تصفح آمن وجدار حماية قوي\n• تفعيل لجهاز واحد\n• كود تفعيل فوري وضمان مستمر',
    image: '/images/mcafee.png',
    color: '#C01818'
  }
];

export const categories = [
  { id: 'all', name: 'الكل', icon: '🌟' },
  { id: 'os', name: 'أنظمة التشغيل', icon: '💽' },
  { id: 'software', name: 'برامج الأوفيس', icon: '📊' },
  { id: 'design', name: 'التصميم والإبداع', icon: '🎨' },
  { id: 'streaming', name: 'الترفيه والبث', icon: '📺' },
  { id: 'iptv', name: 'اشتراكات IPTV', icon: '📡' },
  { id: 'security', name: 'الخصوصية و VPN', icon: '🛡️' },
  { id: 'ai', name: 'الذكاء الاصطناعي', icon: '🤖' }
];

export const features = [
  { title: 'أسعار منافسة', description: 'أفضل الأسعار في السوق مع عروض حصرية لـ Mega2u' },
  { title: 'تفعيل فوري', description: 'يصلك الكود أو بيانات الحساب آلياً فور إتمام الدفع' },
  { title: 'ضمان ذهبي', description: 'نضمن لك استمرارية الخدمة طوال فترة الاشتراك أو استرداد نقدي' }
];

export const testimonials = [
  { 
    name: 'أحمد محمد', 
    role: 'عميل مميز', 
    text: 'خدمة ممتازة وأسعار رائعة، أنصح بها بشدة!', 
    rating: 5 
  },
  { 
    name: 'سعد العتيبي', 
    role: 'مشتري موثق', 
    text: 'تسليم فوري للمنتج والمصداقية عالية جداً، شكراً MEGA2U.', 
    rating: 5 
  },
  { 
    name: 'خالد الدوسري', 
    role: 'عميل دائم', 
    text: 'اشتريت ويندوز وأوفيس، وتفعلت معي بثواني. الدعم الفني متجاوب ومحترم.', 
    rating: 5 
  }
];