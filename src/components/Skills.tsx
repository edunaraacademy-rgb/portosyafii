"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type Skill = {
  id: string;
  name: string;
  category: string;
  level?: number;
};

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data } = await supabase.from("skills").select("*");
      if (data && data.length > 0) setSkills(data);
    };
    fetchSkills();
  }, []);

  const strategicSkills = skills.filter(s => s.category === "Strategic");
  const humanSkills = skills.filter(s => s.category === "Human");

  return (
    <section id="keterampilan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <header className="text-center mb-20">
          <span className="font-space text-lg text-secondary mb-4 block uppercase tracking-widest font-bold">Kapabilitas</span>
          <h2 className="font-space text-5xl text-primary font-bold mb-8 italic">Keahlian Inti & Keterampilan.</h2>
          <div className="w-24 h-2 bg-secondary mx-auto rounded-full" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Strategic Pillar */}
          <div className="p-12 bg-slate-950 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-9xl">analytics</span>
             </div>
             <h3 className="font-space text-3xl font-bold mb-12 border-b border-white/10 pb-6 flex justify-between items-center">
                Implementasi Strategis
                <span className="text-secondary-fixed text-sm font-normal tracking-widest uppercase">Pillar I</span>
             </h3>
             <div className="flex flex-wrap gap-4">
                {(strategicSkills.length > 0 ? strategicSkills : [
                  { name: "Manajemen Proyek" },
                  { name: "Advokasi Kebijakan" },
                  { name: "Analisis Data" },
                  { name: "Strategi UI/UX" },
                  { name: "Tanggap Krisis" }
                ]).map((skill, idx) => (
                  <span key={idx} className="px-6 py-3 rounded-full bg-primary text-white font-space font-bold text-sm tracking-wide shadow-lg">
                    {skill.name}
                  </span>
                ))}
             </div>
          </div>

          {/* Human Centric Pillar */}
          <div className="p-12 bg-secondary-fixed text-on-secondary-fixed rounded-[3rem] shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-9xl text-on-secondary-fixed">diversity_3</span>
             </div>
             <h3 className="font-space text-3xl font-bold mb-12 border-b border-on-secondary-fixed/10 pb-6 flex justify-between items-center">
                Berpusat pada Manusia
                <span className="text-secondary text-sm font-normal tracking-widest uppercase">Pillar II</span>
             </h3>
             <div className="space-y-8">
                {(humanSkills.length > 0 ? humanSkills : [
                  { name: "Mendengar Aktif" },
                  { name: "Public Speaking" },
                  { name: "Resolusi Konflik" }
                ]).map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-6">
                    <span className="material-symbols-outlined text-on-secondary-fixed">check_circle</span>
                    <span className="font-space font-bold text-xl">{skill.name}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
