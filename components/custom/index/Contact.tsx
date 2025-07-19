"use client";

import { useTranslation } from "@/context/TranslationContext";
import { Phone, Mail, Instagram } from "lucide-react";

export default function ContactSection() {
  const { t, language } = useTranslation();

  return (
    <section
      id="contact"
      className="bg-blue-50 py-24 px-4 sm:px-6 text-center"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div className="max-w-2xl mx-auto space-y-10">
        <h2 className="text-4xl font-bold text-blue-900">{t.contact_title}</h2>
        <p className="text-lg text-gray-700">{t.contact_description}</p>

        <div className="bg-white shadow-lg rounded-xl p-6 sm:p-10 text-left">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="sr-only">
                {t.contact_form_name}
              </label>
              <input
                type="text"
                id="name"
                placeholder={t.contact_form_name}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="sr-only">
                  {t.contact_form_phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder={t.contact_form_phone}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  {t.contact_form_email}
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder={t.contact_form_email}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                {t.contact_form_message}
              </label>
              <textarea
                id="message"
                placeholder={t.contact_form_message}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg h-36 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200"
            >
              {t.contact_form_submit}
            </button>
          </form>
        </div>

        <div className="mt-10 space-y-4 text-blue-900">
          <div className="flex items-center justify-center gap-3 text-base">
            <Phone className="w-5 h-5" />
            <a href="tel:+972523220394" className="hover:underline">
              052-322-0394
            </a>
          </div>
          <div className="flex items-center justify-center gap-3 text-base">
            <Mail className="w-5 h-5" />
            <a href="mailto:supmoffice@gmail.com" className="hover:underline">
              supmoffice@gmail.com
            </a>
          </div>
          <div className="flex items-center justify-center gap-3 text-base">
            <Instagram className="w-5 h-5" />
            <a
              href="https://instagram.com/py_master"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @py_master
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
