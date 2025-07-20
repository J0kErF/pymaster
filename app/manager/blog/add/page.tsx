"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddBlogPage() {
    const router = useRouter();

    const [accessGranted, setAccessGranted] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/check-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            setAccessGranted(true);
        } else {
            setError("❌ Incorrect password");
        }
    };

    // 🛠 Blog form state here...
    const [form, setForm] = useState({
        he: { title: "", content: "", tags: "" },
        ar: { title: "", content: "", tags: "" },
        en: { title: "", content: "", tags: "" },
        slug: "",
        author: "",
        coverImage: "",
        published: false,
    });

    const handleChange = (lang: "he" | "ar" | "en", field: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [lang]: { ...prev[lang], [field]: value },
        }));
    };

    const handleMetaChange = (field: string, value: string | boolean) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                slug: form.slug,
                author: form.author,
                coverImage: form.coverImage,
                published: form.published,
                title: {
                    he: form.he.title,
                    ar: form.ar.title,
                    en: form.en.title,
                },
                content: {
                    he: form.he.content,
                    ar: form.ar.content,
                    en: form.en.content,
                },
                tags: {
                    he: form.he.tags.split(",").map((t) => t.trim()),
                    ar: form.ar.tags.split(",").map((t) => t.trim()),
                    en: form.en.tags.split(",").map((t) => t.trim()),
                },
            };

            await axios.post("/api/blog", payload, {
                headers: {
                    "x-blog-password": password, // 👈 Inject password from earlier
                },
            });

            router.push("/blog");
        } catch (err) {
            console.error("❌ Failed to add blog:", err);
            alert("Error saving blog. Check console.");
        }
    };


    if (!accessGranted) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <form
                    onSubmit={handlePasswordSubmit}
                    className="bg-white shadow-lg p-6 rounded-lg max-w-md w-full space-y-4"
                >
                    <h1 className="text-2xl font-bold text-center text-blue-900">🔐 Enter Blog Editor Password</h1>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Access Blog Form
                    </button>
                    {error && <p className="text-red-600 text-center text-sm">{error}</p>}
                </form>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6 text-blue-900">Add Blog Post</h1>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Meta Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        className="p-3 border rounded"
                        placeholder="Slug (URL-friendly name)"
                        value={form.slug}
                        onChange={(e) => handleMetaChange("slug", e.target.value)}
                        required
                    />
                    <input
                        className="p-3 border rounded"
                        placeholder="Author"
                        value={form.author}
                        onChange={(e) => handleMetaChange("author", e.target.value)}
                        required
                    />
                </div>
                <input
                    className="p-3 border rounded w-full"
                    placeholder="Cover Image URL"
                    value={form.coverImage}
                    onChange={(e) => handleMetaChange("coverImage", e.target.value)}
                />

                {/* Language Specific Fields */}
                {["he", "ar", "en"].map((lang) => (
                    <div key={lang} className="border p-4 rounded bg-gray-50">
                        <h2 className="text-xl font-semibold mb-4 uppercase">{lang}</h2>
                        <input
                            className="p-3 border rounded w-full mb-3"
                            placeholder={`Title (${lang})`}
                            value={form[lang as "he" | "ar" | "en"].title}
                            onChange={(e) => handleChange(lang as any, "title", e.target.value)}
                            required
                        />
                        <textarea
                            className="p-3 border rounded w-full mb-3 h-32"
                            placeholder={`Content (${lang})`}
                            value={form[lang as "he" | "ar" | "en"].content}
                            onChange={(e) => handleChange(lang as any, "content", e.target.value)}
                            required
                        />
                        <input
                            className="p-3 border rounded w-full"
                            placeholder={`Tags (${lang}) comma separated`}
                            value={form[lang as "he" | "ar" | "en"].tags}
                            onChange={(e) => handleChange(lang as any, "tags", e.target.value)}
                        />
                    </div>
                ))}

                {/* Published Toggle */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={form.published}
                        onChange={(e) => handleMetaChange("published", e.target.checked)}
                    />
                    <label className="text-blue-800 font-medium">Published</label>
                </div>

                <button
                    type="submit"
                    className="bg-blue-800 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                    Save Blog Post
                </button>
            </form>
        </div>
    );
}