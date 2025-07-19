"use client";

import { useContext, useState } from 'react';
import { TranslationContext } from '@/context/TranslationContext';
import { useTranslation } from "@/context/TranslationContext";



export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { t, language, setLanguage } = useTranslation();

    const links = [
        { label: t.about, href: '/about' },
        { label: t.services, href: '#services' },
        { label: t.contact, href: '#contact' },
        { label: t.blog, href: '/blog' },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
            }
        }
    };
    type Lang = "he" | "en" | "ar";

    return (
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <a href="/" className="flex items-center gap-2">
                        <img src="/pymaster.svg" alt="PyMaster Logo" width={40} height={40} />
                        <span className="text-xl font-bold text-blue-900 hidden sm:inline">PyMaster</span>
                    </a>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex rtl:space-x-reverse text-base font-medium text-blue-800">
                    <ul className="flex gap-8">
                        {links.map((link, index) => (
                            <li key={index} className="first:ms-0">
                                <a
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className="hover:text-blue-600 transition"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Language Switcher */}
                <select
                    id="languageSwitcher"
                    className="hidden sm:block bg-blue-100 text-blue-900 px-3 py-2 rounded border border-blue-300 ml-4"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Lang)}
                >
                    <option value="he">עברית</option>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                </select>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-blue-800 p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-6 pb-4">
                    <nav className="flex flex-col space-y-3 text-base font-medium text-blue-800">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="hover:text-blue-600 transition"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                    <select
                        id="languageSwitcherMobile"
                        className="mt-4 w-full bg-blue-100 text-blue-900 px-3 py-2 rounded border border-blue-300"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Lang)}
                    >
                        <option value="he">עברית</option>
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                    </select>
                </div>
            )}
        </header>
    );
}
