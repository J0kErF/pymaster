// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { TranslationProvider } from "@/context/TranslationContext";
import LayoutWithDirection from "@/components/custom/LayoutWithDirection";

export const metadata: Metadata = {
  title: "PyMaster - יזמות וקוד",
  description: "הבית שלך ללימוד תכנות, פיתוח מיזמים וחדשנות טכנולוגית.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <TranslationProvider>
          <LayoutWithDirection>{children}</LayoutWithDirection>
        </TranslationProvider>
      </body>
    </html>
  );
}
