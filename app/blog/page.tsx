"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/context/TranslationContext";
import Link from "next/link";

type BlogPost = {
  _id: string;
  title: { he: string; ar: string; en: string };
  content: { he: string; ar: string; en: string };
  tags: { he: string[]; ar: string[]; en: string[] };
  slug: string;
  author: string;
  coverImage?: string;
  published: boolean;
  createdAt: string;
};

export default function BlogPage() {
  const { t, language } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setPosts(data || []);
      } catch (err) {
        console.error("❌ Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const dir = language === "en" ? "ltr" : "rtl";

  const filteredPosts = posts.filter(
    (post) => post.published && post.title?.[language]
  );
  function stripHtml(html: string): string {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "").trim();
  }


  return (
    <section className="max-w-6xl mx-auto px-6 py-24" dir={dir}>
      <h1 className="text-5xl font-bold text-blue-900 text-center mb-12">
        {t.blog_title}
      </h1>
      <p className="text-center text-lg text-gray-600 mb-12">{t.blog_intro}</p>

      {loading ? (
        <p className="text-center text-gray-500">
          {t.loading || "Loading..."}
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              {t.no_blog_posts || "No blog posts found."}
            </p>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-blue-800 mb-2">
                  {post.title[language]}
                </h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                  {stripHtml(post.content[language])?.slice(0, 250)}...
                </p>

                <Link
                  href={`/blog/read/${post.slug}?lang=${language}`}
                  className="text-blue-700 hover:underline font-medium"
                >
                  {t.blog_read_more}
                </Link>

              </article>
            ))
          )}
        </div>
      )}

      <div className="text-center mt-16">
        <Link
          href="/"
          className="text-blue-800 text-lg font-semibold hover:underline"
        >
          {t.back_to_home}
        </Link>
      </div>
    </section>
  );
}
