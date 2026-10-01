"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import IconGradientDefs from "@/components/gasable/IconGradientDefs";
import { SiteContentProvider } from "@/context/SiteContentContext";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SiteContentProvider>
      <IconGradientDefs />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </SiteContentProvider>
  );
}
