"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useForm } from "react-hook-form";

const supabase = createClient();

type Experience = {
  id: string;
  year: string;
  role: string;
  organization: string;
  description: string;
  impact: string;
  icon: string;
};

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    const { data } = await supabase.from("experience").select("*").order("order_index");
    if (data) setExperiences(data);
  };

  const onSubmit = async (data: any) => {
    const { error } = await supabase.from("experience").insert([data]);
    if (error) alert(error.message);
    else {
      reset();
      fetchExperiences();
    }
  };

  const deleteExp = async (id: string) => {
    if (confirm("Hapus pengalaman ini?")) {
      await supabase.from("experience").delete().eq("id", id);
      fetchExperiences();
    }
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-space text-5xl text-white font-bold mb-4">Kelola Pengalaman</h1>
        <p className="text-xl text-slate-400">Atur rekam jejak organisasi dan profesional Anda.</p>
      </header>

      <div className="bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Tahun</label>
              <input {...register("year")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" placeholder="2023 — SEKARANG" required />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Peran</label>
              <input {...register("role")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" required />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Organisasi</label>
              <input {...register("organization")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" required />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Deskripsi</label>
              <textarea {...register("description")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white h-32" required />
            </div>
            <div>
              <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Dampak (Impact)</label>
              <input {...register("impact")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" placeholder="Peningkatan 40% partisipasi" required />
            </div>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="bg-primary text-white font-space font-bold px-12 py-5 rounded-full hover:bg-secondary-container transition-all">Simpan Pengalaman</button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 flex justify-between items-start">
            <div>
              <span className="text-secondary font-bold font-space text-sm mb-2 block">{exp.year}</span>
              <h3 className="text-2xl text-white font-bold mb-1">{exp.role}</h3>
              <p className="text-slate-400 font-bold uppercase text-sm mb-4">{exp.organization}</p>
              <p className="text-slate-500 max-w-2xl">{exp.description}</p>
            </div>
            <button onClick={() => deleteExp(exp.id)} className="text-red-400 hover:text-red-300">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
