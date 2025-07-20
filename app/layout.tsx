// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { TranslationProvider } from "@/context/TranslationContext";
import LayoutWithDirection from "@/components/custom/LayoutWithDirection";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: "PyMaster - יזמות וקוד",
    template: "%s | PyMaster",
  },
  description: "הבית שלך ללימוד תכנות, פיתוח מיזמים וחדשנות טכנולוגית.",
  metadataBase: new URL("https://pymaster.vercel.app/"),

  icons: {
    icon: "/pymaster.svg", // Favicon
    shortcut: "/pymaster.svg",
    apple: "/pymaster.svg",
  },

  alternates: {
    canonical: "https://pymaster.vercel.app/",
  },

  openGraph: {
    title: "PyMaster - יזמות וקוד",
    description: "ללמוד לתכנת, ליצור מיזמים, ולהשתלב בעולם ההייטק בצורה הכי מעשית ומעודדת.",
    url: "https://pymaster.vercel.app/",
    siteName: "PyMaster",
    locale: "he_IL",
    type: "website",
    images: [
      {
        url: "/pymaster.svg", // Add this to public/
        width: 1200,
        height: 630,
        alt: "PyMaster - קוד, יזמות והשראה טכנולוגית",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@py_master", // ← optional, your Twitter handle
    creator: "@py_master", // ← optional
    title: "PyMaster - יזמות וקוד",
    description: "פלטפורמה ללימוד תכנות, יזמות טכנולוגית והאקתונים מעשיים.",
    images: ["/pymaster.svg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1, // No limit on video preview length
      "max-image-preview": "large", // Allow large image previews
      "max-snippet": -1, // No limit on snippet length
    },
  },

  keywords: [
    "تعلم البرمجة",
    "ريادة الأعمال التكنولوجية",
    "هاكاثون عربي",
    "تطوير التطبيقات",
    "تعليم البرمجة للأطفال",
    "الذكاء الاصطناعي",
    "بايثون للمبتدئين",
    "كيف تبدأ مشروع تقني",
    "مشروع تخرج تقني",
    "مجتمعات المبرمجين",
    "كود مفتوح المصدر",
    "بناء مواقع",
    "مبرمج عربي",
    "تطبيقات الويب",
    "مشاريع تقنية",
    "تعلم JavaScript",
    "تطوير الذات بالتكنولوجيا",
    "مشاريع للطلاب",
    "تصميم مواقع احترافي",
    "تعلم التقنية بسهولة",
    "أساسيات البرمجة",
    "حلول ذكية للمجتمع",
    "تحديات برمجية",
    "تعلم من الصفر",
    "بايثون بالعربي",
    "مشاريع مدرسية تقنية",
    "بناء تطبيقات الجوال",
    "شغف التكنولوجيا",
    "تحويل الأفكار إلى مشاريع",
    "تعلم HTML و CSS",
    "إلهام الشباب العربي",
    "مستقبل المبرمجين",
    "مهارات القرن 21",
    "تطوير التعليم بالتقنية",
    "برامج إثرائية للناشئة",
    "تعلم التكنولوجيا باللغة العربية",
    "coding bootcamp",
    "Python projects",
    "tech entrepreneurship",
    "learn to code",
    "web development",
    "JavaScript for kids",
    "student hackathon",
    "innovation lab",
    "startup ideas",
    "programming course",
    "beginner-friendly coding",
    "digital skills for youth",
    "האקתון לנוער",
    "קורס פיתוח אתרים",
    "למידת תכנות מהבסיס",
    "יזמות צעירה",
    "חדשנות טכנולוגית",
    "מפתחים את הדור הבא",
    "חשיבה טכנולוגית",
    "פרויקטים לתלמידים",
    "מסלול יזמות דיגיטלית",
    "קוד עם משמעות",
    "שיעורי פייתון בעברית",
    "קוד שמשפיע על העולם"
  ],

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he">
      <meta name="google-site-verification" content="2xslSemPSe4-ldh5lC3639V3zs1t728MeQRZmMDqXfs" />
      <body>
        <SpeedInsights />
        <Analytics />
        <TranslationProvider>
          <LayoutWithDirection>{children}</LayoutWithDirection>
        </TranslationProvider>
      </body>
    </html>
  );
}
