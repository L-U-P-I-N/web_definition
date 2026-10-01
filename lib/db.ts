import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, firebaseConfigured } from "./firebase";
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
import {
  defaultSlides,
  defaultServices,
  defaultTestimonials,
  defaultStats,
  defaultSettings,
  defaultRegions,
  defaultCredentials,
  defaultFaqs,
  defaultProjects,
  defaultPosts,
} from "./store";

// ── Slides ───────────────────────────────────────────────────────────────────

export async function getSlides(): Promise<HeroSlide[]> {
  const snap = await getDocs(collection(db, "slides"));
  if (snap.empty) {
    for (const slide of defaultSlides) {
      await setDoc(doc(db, "slides", slide.id), slide);
    }
    return defaultSlides;
  }
  return snap.docs.map((d) => d.data() as HeroSlide);
}

export async function setSlides(slides: HeroSlide[]): Promise<void> {
  const snap = await getDocs(collection(db, "slides"));
  for (const d of snap.docs) await deleteDoc(d.ref);
  for (const slide of slides) await setDoc(doc(db, "slides", slide.id), slide);
}

// ── Services ─────────────────────────────────────────────────────────────────

export async function getServices(): Promise<ServiceItem[]> {
  const snap = await getDocs(collection(db, "services"));
  if (snap.empty) {
    for (const service of defaultServices) {
      await setDoc(doc(db, "services", service.id), service);
    }
    return defaultServices;
  }
  return snap.docs.map((d) => d.data() as ServiceItem);
}

export async function setServices(services: ServiceItem[]): Promise<void> {
  const snap = await getDocs(collection(db, "services"));
  for (const d of snap.docs) await deleteDoc(d.ref);
  for (const service of services) await setDoc(doc(db, "services", service.id), service);
}

// ── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  const snap = await getDocs(collection(db, "testimonials"));
  if (snap.empty) {
    for (const t of defaultTestimonials) {
      await setDoc(doc(db, "testimonials", t.id), t);
    }
    return defaultTestimonials;
  }
  return snap.docs.map((d) => d.data() as Testimonial);
}

export async function setTestimonials(testimonials: Testimonial[]): Promise<void> {
  const snap = await getDocs(collection(db, "testimonials"));
  for (const d of snap.docs) await deleteDoc(d.ref);
  for (const t of testimonials) await setDoc(doc(db, "testimonials", t.id), t);
}

// ── Config documents (settings, stats, regions, credentials, FAQ) ────────────
// Without Firebase env vars these fall back to localStorage so the site still renders.

const LOCAL_PREFIX = "pn_config_";

async function readConfig<T>(name: string): Promise<T | undefined> {
  if (!firebaseConfigured) {
    if (typeof window === "undefined") return undefined;
    const raw = localStorage.getItem(LOCAL_PREFIX + name);
    return raw ? (JSON.parse(raw) as T) : undefined;
  }
  const snap = await getDoc(doc(db, "config", name));
  return snap.exists() ? (snap.data() as T) : undefined;
}

async function writeConfig<T extends object>(name: string, value: T): Promise<void> {
  if (!firebaseConfigured) {
    localStorage.setItem(LOCAL_PREFIX + name, JSON.stringify(value));
    return;
  }
  await setDoc(doc(db, "config", name), value);
}

async function getList<T>(name: string, defaults: T[]): Promise<T[]> {
  const data = await readConfig<{ items: T[] }>(name);
  return data?.items ?? defaults;
}

const setList = <T,>(name: string, items: T[]) => writeConfig(name, { items });

export const getStats = () => getList<StatItem>("stats", defaultStats);
export const setStats = (items: StatItem[]) => setList("stats", items);

export const getRegions = () => getList<Region>("regions", defaultRegions);
export const setRegions = (items: Region[]) => setList("regions", items);

export const getCredentials = () => getList<CredentialItem>("credentials", defaultCredentials);
export const setCredentials = (items: CredentialItem[]) => setList("credentials", items);

export const getFaqs = () => getList<FaqItem>("faqs", defaultFaqs);
export const setFaqs = (items: FaqItem[]) => setList("faqs", items);

type LegacySettings = Partial<SiteSettings> & { address?: string; workingHours?: string };

export async function getSettings(): Promise<SiteSettings> {
  const data = (await readConfig<LegacySettings>("settings")) ?? {};
  const settings: SiteSettings = {
    ...defaultSettings,
    ...data,
    addressAr: data.addressAr ?? data.address ?? defaultSettings.addressAr,
    workingHoursAr: data.workingHoursAr ?? data.workingHours ?? defaultSettings.workingHoursAr,
  };
  return settings;
}

export async function setSettings(settings: SiteSettings): Promise<void> {
  await writeConfig("settings", settings);
}

// ── Projects ─────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<ProjectItem[]> {
  const snap = await getDocs(collection(db, "projects"));
  if (snap.empty) {
    for (const project of defaultProjects) {
      await setDoc(doc(db, "projects", project.id), project);
    }
    return defaultProjects;
  }
  return snap.docs.map((d) => d.data() as ProjectItem);
}

export async function setProjects(projects: ProjectItem[]): Promise<void> {
  const snap = await getDocs(collection(db, "projects"));
  for (const d of snap.docs) await deleteDoc(d.ref);
  for (const project of projects) await setDoc(doc(db, "projects", project.id), project);
}

export async function addProject(p: Omit<ProjectItem, "id">): Promise<void> {
  const id = Date.now().toString();
  await setDoc(doc(db, "projects", id), { ...p, id });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}

// ── Blog Posts ────────────────────────────────────────────────────────────────

export async function getPosts(): Promise<BlogPost[]> {
  const snap = await getDocs(collection(db, "posts"));
  if (snap.empty) {
    for (const post of defaultPosts) {
      await setDoc(doc(db, "posts", post.id), post);
    }
    return defaultPosts;
  }
  return snap.docs.map((d) => d.data() as BlogPost);
}

export async function setPosts(posts: BlogPost[]): Promise<void> {
  const snap = await getDocs(collection(db, "posts"));
  for (const d of snap.docs) await deleteDoc(d.ref);
  for (const post of posts) await setDoc(doc(db, "posts", post.id), post);
}

export async function addPost(p: Omit<BlogPost, "id">): Promise<void> {
  const id = Date.now().toString();
  await setDoc(doc(db, "posts", id), { ...p, id });
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, "posts", id));
}

// ── Quotes ────────────────────────────────────────────────────────────────────

export async function getQuotes(): Promise<QuoteRequest[]> {
  const snap = await getDocs(collection(db, "quotes"));
  return snap.docs.map((d) => d.data() as QuoteRequest);
}

export async function addQuote(q: Omit<QuoteRequest, "id" | "status" | "createdAt">): Promise<void> {
  const id = Date.now().toString();
  const item: QuoteRequest = { ...q, id, status: "new", createdAt: new Date().toISOString() };
  await setDoc(doc(db, "quotes", id), item);
}

export async function updateQuoteStatus(id: string, status: QuoteRequest["status"]): Promise<void> {
  await updateDoc(doc(db, "quotes", id), { status });
}

export async function deleteQuote(id: string): Promise<void> {
  await deleteDoc(doc(db, "quotes", id));
}

// ── Messages ──────────────────────────────────────────────────────────────────

export async function getMessages(): Promise<ContactMessage[]> {
  const snap = await getDocs(collection(db, "messages"));
  return snap.docs.map((d) => d.data() as ContactMessage);
}

export async function addMessage(m: Omit<ContactMessage, "id" | "status" | "createdAt">): Promise<void> {
  const id = Date.now().toString();
  const item: ContactMessage = { ...m, id, status: "new", createdAt: new Date().toISOString() };
  await setDoc(doc(db, "messages", id), item);
}

export async function updateMessageStatus(id: string, status: ContactMessage["status"]): Promise<void> {
  await updateDoc(doc(db, "messages", id), { status });
}

export async function deleteMessage(id: string): Promise<void> {
  await deleteDoc(doc(db, "messages", id));
}
