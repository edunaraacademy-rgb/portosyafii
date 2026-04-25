"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useForm } from "react-hook-form";
import Image from "next/image";

const supabase = createClient();

export default function AdminProfile() {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data } = await supabase.from("profile").select("*").single();
    if (data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
      if (data.portrait_url) setPortraitUrl(data.portrait_url);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `portrait-${Math.random()}.${fileExt}`;
      const filePath = `profile/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("portfolio")
        .getPublicUrl(filePath);

      setPortraitUrl(publicUrl);
      setValue("portrait_url", publicUrl);
      alert("Foto berhasil diunggah!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: any) => {
    const { data: existing } = await supabase.from("profile").select("id").single();
    
    let error;
    if (existing) {
      const { error: updateError } = await supabase.from("profile").update(data).eq("id", existing.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from("profile").insert([data]);
      error = insertError;
    }

    if (error) alert(error.message);
    else alert("Profil berhasil diperbarui secara real-time!");
  };

  if (loading) return <div className="text-white">Memuat profil...</div>;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-space text-5xl text-white font-bold mb-4">Master CMS: Profil & Hero</h1>
        <p className="text-xl text-slate-400">Kontrol penuh atas identitas digital Anda di Beranda dan Tentang.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {/* Section: Foto Profil */}
        <div className="bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 shadow-xl">
          <h2 className="text-2xl text-white font-bold mb-8 font-space">Foto Profil (Portrait)</h2>
          <div className="flex items-center gap-12">
            <div className="relative w-48 h-64 bg-slate-800 rounded-3xl overflow-hidden border-2 border-dashed border-slate-700">
              {portraitUrl ? (
                <Image src={portraitUrl} alt="Portrait" fill className="object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500 text-sm text-center px-4">Belum ada foto</div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-4 tracking-widest">Ganti Foto Portrait</label>
              <input type="file" onChange={handleImageUpload} disabled={uploading} className="block w-full text-sm text-slate-400 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-space file:font-bold file:bg-primary file:text-white hover:file:bg-secondary-container transition-all" />
              <p className="mt-4 text-sm text-slate-500">Format: JPG, PNG, atau WebP. Rekomendasi aspek rasio 3:4.</p>
              <input type="hidden" {...register("portrait_url")} />
            </div>
          </div>
        </div>

        {/* Section: Beranda (Hero) */}
        <div className="bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 shadow-xl">
          <h2 className="text-2xl text-white font-bold mb-8 font-space">Bagian Beranda (Hero)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Nama Lengkap</label>
              <input {...register("name")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" required />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Tagline 1 (Atas Nama)</label>
              <input {...register("tagline")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Tagline 2 (Bawah Nama)</label>
              <input {...register("tagline2")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" placeholder="Contoh: Pemuda Pemimpin Masa Depan." />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Lokasi Utama</label>
              <input {...register("location")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Tujuan / Deskripsi Hero</label>
              <textarea {...register("description")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white h-32" />
            </div>
          </div>
        </div>

        {/* Section: Tentang (About) */}
        <div className="bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 shadow-xl">
          <h2 className="text-2xl text-white font-bold mb-8 font-space">Bagian Tentang (About)</h2>
          <div className="grid grid-cols-1 gap-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Latar Belakang Pribadi (Deskripsi Lengkap)</label>
              <textarea {...register("about_description")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white h-40" />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Visi Utama (Heading Besar)</label>
              <input {...register("about_vision")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Kutipan Visi (Italic)</label>
              <textarea {...register("about_vision_desc")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white h-32" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                  <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Pendidikan (Terakhir/Saat Ini)</label>
                  <input {...register("education")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" />
               </div>
               <div>
                  <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Tanggal Lahir</label>
                  <input type="date" {...register("birth_date")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" />
               </div>
            </div>
          </div>
        </div>

        {/* Section: Kontak (Social) */}
        <div className="bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 shadow-xl">
          <h2 className="text-2xl text-white font-bold mb-8 font-space">Informasi Kontak & Sosial Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Email Publik</label>
              <input {...register("contact_email")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Instagram (Link Penuh)</label>
              <input {...register("contact_instagram")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">LinkedIn (Link Penuh)</label>
              <input {...register("contact_linkedin")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" placeholder="https://linkedin.com/in/..." />
            </div>
          </div>
        </div>

        <div className="flex justify-end pb-20">
          <button type="submit" className="bg-primary text-white font-space font-bold px-16 py-6 rounded-full hover:bg-secondary-container transition-all shadow-2xl active:scale-95">
            Simpan Semua Perubahan Real-time
          </button>
        </div>
      </form>
    </div>
  );
}
