import type {
  HeroSlide,
  ServiceItem,
  Testimonial,
  StatItem,
  SiteSettings,
  Region,
  CredentialItem,
  FaqItem,
  QuoteRequest,
  ContactMessage,
  ProjectItem,
  BlogPost,
} from "./types";

const K = {
  slides: "pn_slides",
  services: "pn_services",
  testimonials: "pn_testimonials",
  stats: "pn_stats",
  settings: "pn_settings",
  quotes: "pn_quotes",
  messages: "pn_messages",
  projects: "pn_projects",
  posts: "pn_posts",
};

function get<T>(key: string, def: T): T {
  if (typeof window === "undefined") return def;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : def;
  } catch {
    return def;
  }
}

function set<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// ── Default data ─────────────────────────────────────────────────────────────

export const defaultSlides: HeroSlide[] = [
  {
    id: "1",
    badge: "حلول طاقة متكاملة",
    heading: "Petrohub — حلول متكاملة للطاقة والخدمات اللوجستية",
    description: "منظومة تشغيل متطورة تعتمد على الجودة والسلامة والابتكار لخدمة القطاعات السكنية والتجارية والصناعية.",
    cta1Label: "اطلب عرض سعر",
    cta1Href: "/quote",
    cta2Label: "خدماتنا",
    cta2Href: "/services",
  },
  {
    id: "2",
    badge: "غاز ومنتجات بترولية",
    heading: "توريد غاز البترول المسال والمنتجات البترولية",
    description: "إمدادات مستمرة على مدار الساعة بأعلى معايير السلامة المحلية والدولية وأسطول نقل حديث.",
    cta1Label: "اطلب الخدمة",
    cta1Href: "/quote",
    cta2Label: "اعرف المزيد",
    cta2Href: "/services#lpg",
  },
  {
    id: "3",
    badge: "طاقة وتقنية ذكية",
    heading: "حلول طاقة مستدامة ومنصة PetroHub IoT",
    description: "نرفع كفاءة استهلاك الطاقة ونخفض الانبعاثات الكربونية بما يتوافق مع رؤية المملكة 2030.",
    cta1Label: "اكتشف خدماتنا",
    cta1Href: "/services",
    cta2Label: "اتصل بنا",
    cta2Href: "/contact",
  },
];

export const defaultServices: ServiceItem[] = [
  {
    id: "1",
    iconName: "Flame",
    title: "توريد غاز البترول المسال (LPG)",
    description: "حلول متكاملة لتوريد وتوزيع غاز البترول المسال وفق أعلى معايير السلامة والجودة للقطاعات السكنية والتجارية والصناعية.",
    href: "/services#lpg",
  },
  {
    id: "2",
    iconName: "Fuel",
    title: "المنتجات البترولية (Oil Services)",
    description: "توريد المنتجات البترولية لمختلف القطاعات بسلسلة إمداد مرنة تضمن الكميات المطلوبة في الوقت المحدد.",
    href: "/services#oil",
  },
  {
    id: "3",
    iconName: "Droplets",
    title: "خدمات المياه والبيئة",
    description: "توريد المياه الصالحة للشرب والصناعية وخدمات الصرف الصحي والحلول البيئية مع الحفاظ على الصحة العامة.",
    href: "/services#water",
  },
  {
    id: "4",
    iconName: "Zap",
    title: "حلول الطاقة (Energy Solutions)",
    description: "حلول طاقة متقدمة ترفع كفاءة الاستهلاك وتخفض الانبعاثات بما يتوافق مع مستهدفات رؤية 2030.",
    href: "/services#energy",
  },
  {
    id: "5",
    iconName: "Cpu",
    title: "منصة PetroHub IoT",
    description: "منصة رقمية ذكية لإدارة ومراقبة استهلاك الطاقة والمعدات في الوقت الفعلي باستخدام إنترنت الأشياء.",
    href: "/services#iot",
  },
  {
    id: "6",
    iconName: "Truck",
    title: "الخدمات اللوجستية",
    description: "نقل وتوزيع البضائع والمواد بكفاءة عالية عبر شبكة تشغيل تغطي مختلف مناطق المملكة مع تتبع مباشر.",
    href: "/services#logistics",
  },
  {
    id: "7",
    iconName: "MonitorCheck",
    title: "أنظمة التتبع ومراقبة المركبات",
    description: "حلول ذكية لإدارة الأساطيل تعتمد على GPS وGSM وكاميرات Dash Cam لمراقبة المركبات وتحليل الأداء.",
    href: "/services#tracking",
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    text: "بتروهب وفّرت لنا الديزل لموقع المشروع في وقت قياسي، وبأسعار تنافسية جداً. تعاملهم احترافي وسرعة استجابتهم لا تُقارن.",
    name: "م. عبدالرحمن الغامدي",
    role: "مدير المشاريع",
    company: "شركة البنية التحتية للمقاولات",
  },
  {
    id: "2",
    text: "خدمة سحب البيارات كانت من أهم ما يشغل بالنا في الموقع. مع بتروهب أصبح الأمر مجرد اتصال واحد وتُحلّ المشكلة خلال ساعات.",
    name: "سعد المالكي",
    role: "مشرف الموقع",
    company: "مجموعة التطوير العمراني",
  },
  {
    id: "3",
    text: "نحتاج مياه التحلية بكميات كبيرة لمواقعنا في ينبع وتبوك، وبتروهب هي الشريك الموثوق الذي يلتزم بالمواعيد دون تأخير.",
    name: "فيصل الحربي",
    role: "مدير العمليات",
    company: "شركة المياه والخدمات المتكاملة",
  },
];

export const defaultStats: StatItem[] = [
  { id: "1", value: "7", label: "خدمات وحلول متكاملة", labelEn: "Integrated Services", icon: "Boxes" },
  { id: "2", value: "5+", label: "مناطق تغطية في المملكة", labelEn: "Coverage Regions", icon: "MapPin" },
  { id: "3", value: "24/7", label: "تشغيل ومراقبة متواصلة", labelEn: "Operation & Monitoring", icon: "Clock" },
  { id: "4", value: "30%", label: "خفض في استهلاك الطاقة", labelEn: "Energy Savings", icon: "Leaf" },
  { id: "5", value: "100%", label: "التزام بالجودة والسلامة", labelEn: "Quality & Safety", icon: "BadgeCheck" },
];

export const defaultRegions: Region[] = [
  { id: "1", ar: "الرياض", en: "Riyadh" },
  { id: "2", ar: "مكة المكرمة", en: "Makkah" },
  { id: "3", ar: "المدينة المنورة", en: "Madinah" },
  { id: "4", ar: "ينبع", en: "Yanbu" },
  { id: "5", ar: "تبوك", en: "Tabuk" },
];

export const defaultCredentials: CredentialItem[] = [
  {
    id: "1", icon: "ShieldCheck",
    titleAr: "الجودة والسلامة", textAr: "التزام كامل بأعلى معايير الجودة والسلامة المحلية والدولية في كل خدماتنا.",
    titleEn: "Quality & Safety", textEn: "Full commitment to the highest local and international quality and safety standards.",
  },
  {
    id: "2", icon: "FileCheck2",
    titleAr: "تقنيات حديثة", textAr: "حلول رقمية ومنصة PetroHub IoT لمراقبة الاستهلاك واتخاذ قرارات دقيقة.",
    titleEn: "Modern Technology", textEn: "Digital solutions and the PetroHub IoT platform for consumption monitoring and accurate decisions.",
  },
  {
    id: "3", icon: "Award",
    titleAr: "حلول مستدامة", textAr: "حلول طاقة تخفض الانبعاثات وتدعم مستهدفات رؤية المملكة 2030.",
    titleEn: "Sustainable Solutions", textEn: "Energy solutions that cut emissions and support Saudi Vision 2030 goals.",
  },
  {
    id: "4", icon: "Headset",
    titleAr: "دعم على مدار الساعة", textAr: "فريق متاح 24/7 للطلبات الطارئة والاستفسارات في أي وقت.",
    titleEn: "24/7 Support", textEn: "A team available 24/7 for urgent orders and inquiries any time.",
  },
];

export const defaultFaqs: FaqItem[] = [
  {
    id: "1",
    qAr: "ما الخدمات التي تقدّمها Petrohub؟",
    aAr: "نقدّم سبع خدمات متكاملة: توريد غاز البترول المسال (LPG)، المنتجات البترولية، خدمات المياه والبيئة، حلول الطاقة، منصة PetroHub IoT، الخدمات اللوجستية، وأنظمة تتبع ومراقبة المركبات.",
    qEn: "What services does Petrohub offer?",
    aEn: "We provide seven integrated services: LPG supply, petroleum products, water & environmental services, energy solutions, the PetroHub IoT platform, logistics services, and vehicle tracking & monitoring systems.",
  },
  {
    id: "2",
    qAr: "ما المناطق التي تغطّيها خدماتكم؟",
    aAr: "نغطّي شبكة تشغيل واسعة تشمل {regions}، مع إمكانية التنسيق لمناطق أخرى حسب الطلب.",
    qEn: "Which regions do your services cover?",
    aEn: "We cover a wide operational network including {regions}, with the ability to coordinate for other regions on request.",
  },
  {
    id: "3",
    qAr: "كيف تضمنون معايير السلامة والجودة؟",
    aAr: "نلتزم بأعلى معايير السلامة المحلية والدولية في جميع مراحل النقل والتسليم، باستخدام أسطول حديث مجهّز بأحدث أنظمة الأمان وفرق متخصصة مدرّبة.",
    qEn: "How do you ensure safety and quality standards?",
    aEn: "We comply with the highest local and international safety standards across every transport and delivery stage, using a modern fleet equipped with the latest safety systems and trained specialized teams.",
  },
  {
    id: "4",
    qAr: "ما هي منصة PetroHub IoT؟",
    aAr: "منصة رقمية ذكية لمراقبة استهلاك الطاقة والمعدات في الوقت الفعلي، تساعد على خفض الاستهلاك حتى 30% وتقليل الأعطال عبر الصيانة الوقائية والتنبيهات الذكية.",
    qEn: "What is the PetroHub IoT platform?",
    aEn: "A smart digital platform for real-time monitoring of energy and equipment consumption, helping cut consumption by up to 30% and reduce breakdowns through preventive maintenance and smart alerts.",
  },
  {
    id: "5",
    qAr: "كيف أحصل على عرض سعر؟",
    aAr: "يمكنك طلب عرض سعر مخصّص عبر صفحة \"اطلب عرض سعر\"، وسيتواصل معك فريقنا خلال 24 ساعة بعرض مصمّم وفق احتياجاتك.",
    qEn: "How do I get a quote?",
    aEn: "You can request a custom quote via the \"Get a Quote\" page, and our team will contact you within 24 hours with an offer tailored to your needs.",
  },
];

export const defaultProjects: ProjectItem[] = [
  {
    id: "1",
    title: "توريد غاز LPG لمجمع صناعي بالرياض",
    description: "تأمين إمدادات غاز البترول المسال على مدار الساعة لمجمع صناعي وفق أعلى معايير السلامة، مع أسطول نقل مجهّز.",
    category: "غاز LPG",
    city: "الرياض",
    slug: "lpg-riyadh-industrial",
  },
  {
    id: "2",
    title: "حلول طاقة مستدامة لمنشأة تجارية بمكة المكرمة",
    description: "تنفيذ حلول طاقة رفعت كفاءة الاستهلاك وخفضت الانبعاثات بما يتوافق مع مستهدفات رؤية 2030.",
    category: "حلول طاقة",
    city: "مكة المكرمة",
    slug: "energy-makkah-commercial",
  },
  {
    id: "3",
    title: "تركيب منصة PetroHub IoT لمراقبة الاستهلاك",
    description: "ربط معدات منشأة صناعية بمنصة PetroHub IoT لمراقبة الطاقة لحظياً وخفض الاستهلاك حتى 30%.",
    category: "PetroHub IoT",
    city: "ينبع",
    slug: "iot-yanbu-monitoring",
  },
  {
    id: "4",
    title: "خدمات مياه وبيئة لموقع إنشائي بالمدينة المنورة",
    description: "توريد مياه صناعية وخدمات بيئية متخصصة مع استجابة سريعة والتزام بالمعايير الصحية والبيئية.",
    category: "مياه وبيئة",
    city: "المدينة المنورة",
    slug: "water-madinah-site",
  },
  {
    id: "5",
    title: "إدارة أسطول وتتبع مركبات لشركة نقل بتبوك",
    description: "تركيب أنظمة GPS وكاميرات Dash Cam لأسطول يتجاوز 80 مركبة لمراقبة الأداء وخفض استهلاك الوقود.",
    category: "تتبع المركبات",
    city: "تبوك",
    slug: "tracking-tabuk-fleet",
  },
  {
    id: "6",
    title: "حلول لوجستية متكاملة لمجمع تجاري بالرياض",
    description: "إدارة احترافية لسلسلة الإمداد مع تتبع مباشر للشحنات وسرعة في التنفيذ والتسليم.",
    category: "لوجستيات",
    city: "الرياض",
    slug: "logistics-riyadh-commercial",
  },
];

export const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "كيف يساهم إنترنت الأشياء في خفض استهلاك الطاقة",
    excerpt: "تعرّف على كيف تساعد منصة PetroHub IoT المنشآت على مراقبة الطاقة لحظياً وخفض الاستهلاك حتى 30%.",
    content: `أصبحت تقنيات إنترنت الأشياء (IoT) ركيزة أساسية في إدارة الطاقة الحديثة. ومن خلال منصة PetroHub IoT، تستطيع المنشآت مراقبة استهلاك الطاقة والمعدات في الوقت الفعلي واتخاذ قرارات مبنية على بيانات دقيقة.

## ما الذي تقدمه منصة PetroHub IoT؟

- **مراقبة مباشرة:** متابعة الأصول والمعدات لحظياً
- **تنبيهات ذكية:** إشعارات فورية عند حدوث أي خلل
- **صيانة وقائية:** قرارات صيانة مبنية على البيانات
- **تقارير تحليلية:** رؤى دقيقة لتحسين الأداء

## القيمة المضافة

يساعد ذلك على خفض استهلاك الطاقة بنسبة تصل إلى 30%، وتقليل الأعطال غير المخطط لها، ورفع الإنتاجية.`,
    category: "طاقة وتقنية",
    date: "2025-06-01",
    slug: "iot-energy-efficiency",
  },
  {
    id: "2",
    title: "معايير السلامة في توريد غاز البترول المسال (LPG)",
    excerpt: "دليل حول أهمية الالتزام بمعايير السلامة المحلية والدولية في نقل وتوزيع غاز البترول المسال.",
    content: `يُعدّ غاز البترول المسال (LPG) مصدر طاقة أساسياً للقطاعات السكنية والتجارية والصناعية، ويتطلب التزاماً صارماً بمعايير السلامة في جميع مراحل النقل والتسليم.

## ركائز السلامة في توريد LPG

- التزام كامل بمعايير السلامة المحلية والدولية
- أسطول نقل حديث مجهّز بأحدث أنظمة الأمان
- فرق متخصصة ومدرّبة على التعامل مع الحالات الطارئة
- جودة مضمونة في جميع مراحل النقل

## لماذا Petrohub؟

توفر Petrohub إمدادات مستمرة على مدار الساعة مع سرعة في الاستجابة وجودة مضمونة في كل مرحلة.`,
    category: "غاز وسلامة",
    date: "2025-05-20",
    slug: "lpg-safety-standards",
  },
  {
    id: "3",
    title: "حلول الطاقة المستدامة ودورها في رؤية 2030",
    excerpt: "كيف تسهم حلول الطاقة الحديثة في خفض الانبعاثات الكربونية ودعم مستهدفات رؤية المملكة 2030؟",
    content: `تُعدّ الاستدامة محوراً رئيسياً في رؤية المملكة 2030، وتلعب حلول الطاقة الحديثة دوراً جوهرياً في تحقيق هذا الهدف من خلال رفع الكفاءة وخفض الانبعاثات.

## مزايا حلول الطاقة المستدامة

- **تحسين كفاءة الاستهلاك:** خفض الفاقد ورفع الأداء
- **تقليل الانبعاثات:** حلول صديقة للبيئة
- **خفض التكاليف:** تقليل التكاليف التشغيلية على المدى الطويل
- **عائد استثماري أعلى:** تحقيق أقصى قيمة من الأصول

## التزام Petrohub

تصمّم Petrohub حلولها وفق احتياجات كل مشروع، مع الالتزام بأعلى معايير الجودة والاستدامة.`,
    category: "استدامة",
    date: "2025-05-10",
    slug: "sustainable-energy-vision-2030",
  },
];

export const defaultSettings: SiteSettings = {
  phone: "+966500000000",
  whatsapp: "+966500000000",
  email: "info@petrohub.sa",
  addressAr: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
  addressEn: "King Fahd Road, Riyadh, Saudi Arabia",
  mapQuery: "King Fahd Road, Riyadh, Saudi Arabia",
  workingHoursAr: "الأحد – الخميس، 8 صباحاً – 6 مساءً",
  workingHoursEn: "Sun – Thu, 8 AM – 6 PM",
  adminPassword: "petrohub2024",
};

// ── CRUD helpers ─────────────────────────────────────────────────────────────

export const getSlides = (): HeroSlide[] => get(K.slides, defaultSlides);
export const setSlides = (v: HeroSlide[]): void => set(K.slides, v);

export const getServices = (): ServiceItem[] => get(K.services, defaultServices);
export const setServices = (v: ServiceItem[]): void => set(K.services, v);

export const getTestimonials = (): Testimonial[] => get(K.testimonials, defaultTestimonials);
export const setTestimonials = (v: Testimonial[]): void => set(K.testimonials, v);

export const getStats = (): StatItem[] => get(K.stats, defaultStats);
export const setStats = (v: StatItem[]): void => set(K.stats, v);

export const getSettings = (): SiteSettings => get(K.settings, defaultSettings);
export const setSettings = (v: SiteSettings): void => set(K.settings, v);

// Projects
export const getProjects = (): ProjectItem[] => get(K.projects, defaultProjects);
export const setProjects = (v: ProjectItem[]): void => set(K.projects, v);
export const addProject = (p: Omit<ProjectItem, "id">): void => {
  const all = getProjects();
  set(K.projects, [{ ...p, id: Date.now().toString() }, ...all]);
};
export const deleteProject = (id: string): void =>
  set(K.projects, getProjects().filter((p) => p.id !== id));

// Blog posts
export const getPosts = (): BlogPost[] => get(K.posts, defaultPosts);
export const setPosts = (v: BlogPost[]): void => set(K.posts, v);
export const addPost = (p: Omit<BlogPost, "id">): void => {
  const all = getPosts();
  set(K.posts, [{ ...p, id: Date.now().toString() }, ...all]);
};
export const deletePost = (id: string): void =>
  set(K.posts, getPosts().filter((p) => p.id !== id));

// Quotes
export const getQuotes = (): QuoteRequest[] => get(K.quotes, []);
export const addQuote = (q: Omit<QuoteRequest, "id" | "status" | "createdAt">): void => {
  const all = getQuotes();
  const item: QuoteRequest = { ...q, id: Date.now().toString(), status: "new", createdAt: new Date().toISOString() };
  set(K.quotes, [item, ...all]);
};
export const updateQuoteStatus = (id: string, status: QuoteRequest["status"]): void =>
  set(K.quotes, getQuotes().map((q) => (q.id === id ? { ...q, status } : q)));
export const deleteQuote = (id: string): void =>
  set(K.quotes, getQuotes().filter((q) => q.id !== id));

// Messages
export const getMessages = (): ContactMessage[] => get(K.messages, []);
export const addMessage = (m: Omit<ContactMessage, "id" | "status" | "createdAt">): void => {
  const all = getMessages();
  const item: ContactMessage = { ...m, id: Date.now().toString(), status: "new", createdAt: new Date().toISOString() };
  set(K.messages, [item, ...all]);
};
export const updateMessageStatus = (id: string, status: ContactMessage["status"]): void =>
  set(K.messages, getMessages().map((m) => (m.id === id ? { ...m, status } : m)));
export const deleteMessage = (id: string): void =>
  set(K.messages, getMessages().filter((m) => m.id !== id));

// ── Auth ─────────────────────────────────────────────────────────────────────
const AUTH_KEY = "pn_admin_auth";

export const checkAuth = (): boolean => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "true";
};

export const doLogin = (password: string, expectedPassword: string): boolean => {
  if (password === expectedPassword) {
    sessionStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
};

export const doLogout = (): void => {
  if (typeof window !== "undefined") sessionStorage.removeItem(AUTH_KEY);
};
