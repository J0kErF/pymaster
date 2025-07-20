"use client";

import { useTranslation } from "@/context/TranslationContext";
import { useState } from "react";
import { Phone, Mail, Instagram } from "lucide-react";

export default function ContactSection() {
  const { t, language } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.name,
          phoneNumber: form.phone,
          emailAddress: form.email,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Unknown error");

      setSuccess(true);
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

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
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              placeholder={t.contact_form_name}
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="tel"
                id="phone"
                placeholder={t.contact_form_phone}
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                id="email"
                placeholder={t.contact_form_email}
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              id="message"
              placeholder={t.contact_form_message}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg h-36 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? t.sending_message : t.contact_form_submit}
            </button>

            {success && <p className="text-green-600 mt-2">{t.message_sent_success}</p>}
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </form>
        </div>

        <div className="mt-10 space-y-4 text-blue-900">
          <div className="flex items-center justify-center gap-3 text-base">
            <Phone className="w-5 h-5" />
            <a href="tel:+972523220394" className="hover:underline">052-322-0394</a>
          </div>
          <div className="flex items-center justify-center gap-3 text-base">
            <Mail className="w-5 h-5" />
            <a href="mailto:supmoffice@gmail.com" className="hover:underline">supmoffice@gmail.com</a>
          </div>
          <div className="flex items-center justify-center gap-3 text-base">
            <Instagram className="w-5 h-5" />
            <a href="https://instagram.com/py_master" target="_blank" rel="noopener noreferrer" className="hover:underline">
              @py_master
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
