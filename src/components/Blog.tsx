"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  published_at: string;
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      if (data) setPosts(data);
    };
    fetchPosts();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <header className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="font-space text-lg text-secondary mb-4 block uppercase tracking-widest font-bold">Jurnal & Kegiatan</span>
            <h2 className="font-space text-6xl text-primary font-bold tracking-tighter">Cerita Perjalanan & Galeri Kegiatan.</h2>
          </div>
          <button className="bg-slate-900 text-white px-10 py-5 rounded-full font-space font-bold hover:bg-primary transition-all shadow-xl">
            Lihat Semua Artikel
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-lg">
                {post.image_url ? (
                  <Image 
                    src={post.image_url} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">No Image</div>
                )}
                <div className="absolute top-6 left-6 px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-primary uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              <h3 className="font-space text-3xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-slate-500 line-clamp-2 mb-6 font-medium leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-slate-400 font-space font-bold text-sm uppercase">
                <span>{new Date(post.published_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="text-secondary font-black">Baca Selengkapnya</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
