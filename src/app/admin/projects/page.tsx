"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useForm } from "react-hook-form";

const supabase = createClient();

type Project = {
  id: string;
  title: string;
  description: string;
  role: string;
  category: string;
  image_url: string;
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage.from("portfolio").upload(filePath, file);

    if (uploadError) {
      alert("Gagal mengunggah gambar");
    } else {
      const { data } = supabase.storage.from("portfolio").getPublicUrl(filePath);
      setValue("image_url", data.publicUrl);
      alert("Gambar berhasil diunggah!");
    }
    setUploading(false);
  };

  const onSubmit = async (data: any) => {
    const { error } = await supabase.from("projects").insert([data]);
    if (error) {
      alert(error.message);
    } else {
      alert("Proyek berhasil ditambahkan!");
      reset();
      fetchProjects();
    }
  };

  const deleteProject = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (!error) fetchProjects();
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="font-space text-5xl text-white font-bold mb-4">Kelola Proyek</h1>
          <p className="text-xl text-slate-400">Tambah, edit, atau hapus proyek portofolio Anda.</p>
        </div>
      </header>

      {/* Form Tambah Proyek */}
      <div className="bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 shadow-xl">
        <h2 className="text-2xl text-white font-bold mb-8 font-space">Tambah Proyek Baru</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Judul Proyek</label>
              <input {...register("title")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none" placeholder="Contoh: Eco-Link Initiative" required />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Kategori</label>
              <input {...register("category")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none" placeholder="Contoh: Pariwisata" />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Peran</label>
              <input {...register("role")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none" placeholder="Contoh: Project Manager" />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Deskripsi</label>
              <textarea {...register("description")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none h-32" placeholder="Jelaskan proyek ini..." />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Foto Proyek</label>
              <input type="file" onChange={handleFileUpload} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none" accept="image/*" />
              {uploading && <p className="text-sm text-secondary mt-2 animate-pulse">Mengunggah...</p>}
            </div>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="bg-primary text-white font-space font-bold px-12 py-5 rounded-full hover:bg-secondary-container transition-all">Simpan Proyek</button>
          </div>
        </form>
      </div>

      {/* Daftar Proyek */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 flex flex-col">
            <div className="h-48 bg-slate-800 relative">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600">No Image</div>
              )}
            </div>
            <div className="p-8 flex-1">
              <h3 className="text-xl text-white font-bold mb-2">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-6 line-clamp-2">{project.description}</p>
              <button onClick={() => deleteProject(project.id)} className="text-red-400 text-sm font-bold flex items-center gap-2 hover:text-red-300">
                <span className="material-symbols-outlined text-lg">delete</span> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
