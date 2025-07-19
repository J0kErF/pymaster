"use client";

import { useTranslation } from "@/context/TranslationContext";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";

export default function LayoutWithDirection({ children }: { children: React.ReactNode }) {
  const { language } = useTranslation();

  const lang = language;
  const dir = lang === "en" ? "ltr" : "rtl";

  return (
    <div lang={lang} dir={dir} className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
