"use client";

import { useTranslation } from "@/context/TranslationContext";

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="max-w-7xl mx-auto py-24 px-6">
      <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
        {t.services_title}
      </h2>
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {t.services_list.map((item: { title: string; desc: string }, idx: number) => (
          <div key={idx} className="border rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
