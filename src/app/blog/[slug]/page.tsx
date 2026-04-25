"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";

const supabase = createClient();

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  published_at: string;
};

export default function BlogDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) fetchPost();
  }, [params.slug]);

  const fetchPost = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", params.slug)
      .single();
    if (data) setPost(data);
    setLoading(false);
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-space uppercase font-bold text-slate-300">Memuat Konten...</div>;
  if (!post) return <div className="min-h-screen bg-white flex items-center justify-center font-space uppercase font-bold text-red-400">Artikel Tidak Ditemukan</div>;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <article className="pt-48 pb-32">
        <header className="max-w-4xl mx-auto px-8 mb-16 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-secondary font-space font-bold uppercase tracking-widest text-sm mb-8 hover:opacity-70 transition-opacity">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Kembali ke Blog
          </Link>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="px-4 py-1 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest">{post.category}</span>
            <span className="text-slate-400 text-sm font-space">{new Date(post.published_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <h1 className="font-space text-6xl lg:text-7xl text-primary font-black tracking-tighter leading-none mb-12">
            {post.title}
          </h1>
          <p className="text-2xl text-slate-500 font-medium leading-relaxed italic">
            {post.excerpt}
          </p>
        </header>

        <div className="max-w-6xl mx-auto px-8 mb-20">
          <div className="relative aspect-[21/9] w-full rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-slate-50">
            {post.image_url ? (
              <Image src={post.image_url} alt={post.title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-slate-100" />
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-8">
          <div className="prose prose-xl prose-slate max-w-none font-medium leading-relaxed text-slate-700 whitespace-pre-wrap">
            {post.content}
          </div>
          
          <div className="mt-20 pt-20 border-t border-slate-100">
             <div className="bg-slate-50 p-12 rounded-[2.5rem] flex items-center gap-8">
                <div className="w-20 h-20 bg-primary rounded-full shrink-0 flex items-center justify-center text-white font-space font-black text-2xl">SY</div>
                <div>
                   <h4 className="font-space font-bold text-primary text-xl mb-1">Ditulis oleh Syafii Yuska Kudadiri</h4>
                   <p className="text-slate-500">Aktivis Kepemudaan & Inovator Sosial asal Dairi.</p>
                </div>
             </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
