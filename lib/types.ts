export interface HeroSlide {
  id: string;
  badge: string;
  heading: string;
  description: string;
  cta1Label: string;
  cta1Href: string;
  cta2Label: string;
  cta2Href: string;
}

export interface ServiceItem {
  id: string;
  iconName: "Fuel" | "Cpu" | "Flame" | "MonitorCheck" | "Droplets" | "Zap" | "Truck";
  title: string;
  description: string;
  href: string;
}

export interface Testimonial {
  id: string;
  text: string;
  name: string;
  role: string;
  company: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  labelEn?: string;
  icon?: string;
}

export interface Region {
  id: string;
  ar: string;
  en: string;
}

export interface CredentialItem {
  id: string;
  icon: string;
  titleAr: string;
  titleEn: string;
  textAr: string;
  textEn: string;
}

export interface FaqItem {
  id: string;
  qAr: string;
  aAr: string;
  qEn: string;
  aEn: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  slug: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  activity: string;
  fuelType: string;
  quantity: string;
  city: string;
  sensors: string;
  message: string;
  status: "new" | "processed";
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: "new" | "read";
  createdAt: string;
}

export interface SiteSettings {
  phone: string;
  whatsapp: string;
  email: string;
  addressAr: string;
  addressEn: string;
  mapQuery: string;
  workingHoursAr: string;
  workingHoursEn: string;
  adminPassword: string;
}
