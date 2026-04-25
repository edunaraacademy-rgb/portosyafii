"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useForm } from "react-hook-form";

const supabase = createClient();

type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
};

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data } = await supabase.from("skills").select("*").order("name");
    if (data) setSkills(data);
    setLoading(false);
  };

  const onSubmit = async (data: any) => {
    const { error } = await supabase.from("skills").insert([data]);
    if (error) alert(error.message);
    else {
      reset();
      fetchSkills();
    }
  };

  const deleteSkill = async (id: string) => {
    if (confirm("Hapus keahlian ini?")) {
      await supabase.from("skills").delete().eq("id", id);
      fetchSkills();
    }
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-space text-5xl text-white font-bold mb-4">Kelola Keahlian</h1>
        <p className="text-xl text-slate-400">Atur daftar keahlian strategis dan teknis Anda.</p>
      </header>

      <div className="bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Nama Keahlian</label>
            <input {...register("name")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white" placeholder="Contoh: Digital Strategy" required />
          </div>
          <div>
            <label className="block text-sm font-space font-bold text-slate-400 uppercase mb-2">Kategori</label>
            <select {...register("category")} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white">
              <option value="Strategic">Strategic Leadership</option>
              <option value="Human">Human-Centric Solution</option>
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-primary text-white font-space font-bold py-4 rounded-2xl hover:bg-secondary-container transition-all">Tambah</button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-secondary uppercase mb-1 block">{skill.category}</span>
              <h3 className="text-xl text-white font-bold">{skill.name}</h3>
            </div>
            <button onClick={() => deleteSkill(skill.id)} className="text-red-400 hover:text-red-300">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
