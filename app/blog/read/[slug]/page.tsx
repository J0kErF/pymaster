// app/blog/read/[id]/page.tsx
import { notFound } from "next/navigation";
import BlogClient from "./BlogClient";

interface Props {
  params: { slug: string };
}

export default async function BlogReadPage({ params }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const post = await res.json();

  return <BlogClient post={post} />;
}
