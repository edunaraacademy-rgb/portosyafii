"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";

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

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section for Blog */}
      <section className="pt-40 pb-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <span className="font-space text-lg text-secondary mb-4 block uppercase tracking-widest font-bold">Jurnal & Kegiatan</span>
          <h1 className="font-space text-7xl text-primary font-black tracking-tighter mb-8 leading-none">
            Wawasan & <span className="text-secondary-fixed-dim">Perjalanan</span>
          </h1>
          <p className="text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
            Kumpulan artikel, catatan kegiatan, dan opini tentang kepemudaan, teknologi, dan pembangunan di Dairi.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-32 max-w-7xl mx-auto px-8">
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-space uppercase font-bold tracking-widest animate-pulse">
            Memuat Artikel...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <article className="flex flex-col h-full">
                  <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-lg">
                    {post.image_url ? (
                      <Image 
                        src={post.image_url} 
                        alt={post.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 italic">No Image</div>
                    )}
                    <div className="absolute top-6 left-6 px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-primary uppercase tracking-widest shadow-sm">
                      {post.category}
                    </div>
                  </div>
                  <h2 className="font-space text-3xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 line-clamp-3 mb-8 flex-1 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                    <span className="text-xs text-slate-400 font-space font-bold uppercase tracking-wider">
                      {new Date(post.published_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="text-secondary group-hover:translate-x-2 transition-transform material-symbols-outlined">
                      arrow_forward
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
             <span className="material-symbols-outlined text-6xl text-slate-300 mb-6 block">article</span>
             <p className="text-slate-400 font-space font-bold uppercase tracking-widest">Belum ada artikel yang diterbitkan.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
