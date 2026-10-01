"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getSettings, getStats, getRegions, getCredentials, getFaqs } from "@/lib/db";
import {
  defaultSettings,
  defaultStats,
  defaultRegions,
  defaultCredentials,
  defaultFaqs,
} from "@/lib/store";
import type { SiteSettings, StatItem, Region, CredentialItem, FaqItem } from "@/lib/types";

type PublicSettings = Omit<SiteSettings, "adminPassword">;

interface SiteContent {
  settings: PublicSettings;
  stats: StatItem[];
  regions: Region[];
  credentials: CredentialItem[];
  faqs: FaqItem[];
}

const stripPassword = ({ adminPassword: _omit, ...rest }: SiteSettings): PublicSettings => rest;

const initial: SiteContent = {
  settings: stripPassword(defaultSettings),
  stats: defaultStats,
  regions: defaultRegions,
  credentials: defaultCredentials,
  faqs: defaultFaqs,
};

const SiteContentContext = createContext<SiteContent>(initial);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(initial);

  useEffect(() => {
    Promise.all([getSettings(), getStats(), getRegions(), getCredentials(), getFaqs()])
      .then(([settings, stats, regions, credentials, faqs]) =>
        setContent({ settings: stripPassword(settings), stats, regions, credentials, faqs })
      )
      .catch((err) => console.error("Failed to load site content", err));
  }, []);

  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

export const useSiteContent = () => useContext(SiteContentContext);

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
export const waHref = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;
