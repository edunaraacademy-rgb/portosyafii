"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useForm } from "react-hook-form";
import Image from "next/image";

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

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `blog-${Math.random()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("portfolio").upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from("portfolio").getPublicUrl(filePath);
      setCurrentImage(publicUrl);
      setValue("image_url", publicUrl);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: any) => {
    // Basic slug generation
    data.slug = data.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    
    const { error } = await supabase.from("blog_posts").insert([data]);
    if (error) alert(error.message);
    else {
      reset();
      setCurrentImage(null);
      fetchPosts();
      alert("Artikel berhasil diterbitkan!");
    }
  };

  const deletePost = async (id: string) => {
    if (confirm("Hapus artikel ini?")) {
      await supabase.from("blog_posts").delete().eq("id", id);
      fetchPosts();
    }
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-space text-5xl text-white font-bold mb-4">Kelola Blog & Berita</h1>
        <p className="text-xl text-slate-400">Bagikan pemikiran, aktivitas, dan galeri foto kegiatan Anda.</p>
      </header>

      {/* Form Tambah Post */}
      <div className="bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 shadow-xl">
        <h2 className="text-2xl text-white font-bold mb-8 font-space">Tulis Artikel Baru</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Judul Artikel</label>
                <input {...register("title")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" required />
              </div>
              <div>
                <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Kategori</label>
                <select {...register("category")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white">
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Opini">Opini</option>
                  <option value="Berita">Berita</option>
                  <option value="Galeri">Galeri Foto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Ringkasan (Excerpt)</label>
                <textarea {...register("excerpt")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white h-24" />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Foto Utama / Galeri</label>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 bg-slate-800 rounded-2xl overflow-hidden border-2 border-dashed border-slate-700 relative">
                    {currentImage && <Image src={currentImage} alt="Preview" fill className="object-cover" />}
                  </div>
                  <input type="file" onChange={handleImageUpload} disabled={uploading} className="text-xs text-slate-400" />
                  <input type="hidden" {...register("image_url")} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Isi Konten</label>
                <textarea {...register("content")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white h-44" required />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-primary text-white font-space font-bold px-12 py-5 rounded-full hover:bg-secondary-container transition-all shadow-2xl">
              Terbitkan Artikel
            </button>
          </div>
        </form>
      </div>

      {/* List Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden flex flex-col">
            <div className="relative h-48 w-full bg-slate-800">
              {post.image_url && <Image src={post.image_url} alt={post.title} fill className="object-cover" />}
              <div className="absolute top-4 left-4 px-4 py-1 bg-secondary rounded-full text-xs font-bold text-white uppercase">
                {post.category}
              </div>
            </div>
            <div className="p-8 flex-1">
              <h3 className="text-2xl text-white font-bold mb-4 line-clamp-1">{post.title}</h3>
              <p className="text-slate-500 text-sm line-clamp-2 mb-6">{post.excerpt}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xs text-slate-600 font-space uppercase font-bold">
                  {new Date(post.published_at).toLocaleDateString("id-ID")}
                </span>
                <button onClick={() => deletePost(post.id)} className="text-red-400 hover:text-red-300 transition-colors">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
