"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useForm } from "react-hook-form";

const supabase = createClient();

export default function AdminProfile() {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data } = await supabase.from("profile").select("*").single();
    if (data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    }
    setLoading(false);
  };

  const onSubmit = async (data: any) => {
    // If no ID, it means we might need to insert or we just update the first one
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
    else alert("Profil berhasil diperbarui!");
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-space text-5xl text-white font-bold mb-4">Pengaturan Profil & Beranda</h1>
        <p className="text-xl text-slate-400">Atur teks utama, visi, dan informasi kontak Anda.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {/* Section: Beranda (Hero) */}
        <div className="bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 shadow-xl">
          <h2 className="text-2xl text-white font-bold mb-8 font-space">Bagian Beranda (Hero)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Nama Lengkap</label>
              <input {...register("name")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" required />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Tagline Singkat (Prefix)</label>
              <input {...register("tagline")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" placeholder="Contoh: Duta Pemuda Global" />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Lokasi</label>
              <input {...register("location")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Deskripsi Hero</label>
              <textarea {...register("description")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white h-32" />
            </div>
          </div>
        </div>

        {/* Section: Tentang (About) */}
        <div className="bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 shadow-xl">
          <h2 className="text-2xl text-white font-bold mb-8 font-space">Bagian Tentang (About)</h2>
          <div className="grid grid-cols-1 gap-8">
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
                  <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Pendidikan</label>
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
          <h2 className="text-2xl text-white font-bold mb-8 font-space">Informasi Kontak</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Email</label>
              <input {...register("contact_email")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Instagram URL</label>
              <input {...register("contact_instagram")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">LinkedIn URL</label>
              <input {...register("contact_linkedin")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-primary text-white font-space font-bold px-12 py-5 rounded-full hover:bg-secondary-container transition-all shadow-2xl">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
