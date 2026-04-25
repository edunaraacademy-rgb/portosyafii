"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type Experience = {
  id: string;
  year: string;
  role: string;
  organization: string;
  description: string;
  impact: string;
  icon: string;
  is_dark?: boolean;
};

const Experience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data } = await supabase.from("experience").select("*").order("order_index");
      if (data && data.length > 0) setExperiences(data);
    };
    fetchExperiences();
  }, []);

  return (
    <section id="pengalaman" className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <header className="mb-20">
          <span className="font-space text-lg text-secondary mb-4 block uppercase tracking-widest font-bold">Jejak Langkah & Pertumbuhan</span>
          <h2 className="font-space text-5xl text-primary font-bold mb-8">Pengembangan Pribadi & Pencapaian</h2>
          <div className="w-24 h-2 bg-secondary rounded-full" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Experience Timeline */}
          <div className="lg:col-span-8 space-y-12">
            {(experiences.length > 0 ? experiences : [
              {
                year: "2023 — SEKARANG",
                role: "Direktur Eksekutif",
                organization: "Aliansi Pemuda Dairi",
                description: "Menggerakkan jaringan pemuda di tingkat lokal untuk berpartisipasi aktif dalam pembangunan daerah.",
                impact: "Peningkatan 40% partisipasi aktif pemuda.",
                icon: "groups"
              },
              {
                year: "2021 — 2023",
                role: "Kepala Strategi",
                organization: "Kolektif Inovasi Tao Silalahi",
                description: "Memimpin inisiatif promosi pariwisata Tao Silalahi dan pembinaan UMKM kreatif lokal.",
                impact: "Digitalisasi 50+ produk UMKM lokal.",
                icon: "explore",
                is_dark: true
              }
            ]).map((exp, idx) => (
              <div 
                key={idx} 
                className={`p-12 rounded-[2.5rem] shadow-xl transition-all hover:-translate-y-2 ${
                  exp.is_dark ? "bg-primary text-white" : "bg-white border border-slate-100"
                }`}
              >
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className={`inline-block px-4 py-1 font-space font-bold text-xs rounded mb-4 ${
                      exp.is_dark ? "bg-secondary-fixed text-on-secondary-fixed" : "bg-primary text-white"
                    }`}>
                      {exp.year}
                    </span>
                    <h3 className="font-space text-3xl font-bold mb-2">{exp.role}</h3>
                    <p className={`font-space font-bold uppercase tracking-tighter opacity-70`}>{exp.organization}</p>
                  </div>
                  <span className="material-symbols-outlined text-5xl opacity-20">{exp.icon || "work"}</span>
                </div>
                <p className="text-lg opacity-80 leading-relaxed mb-8">{exp.description}</p>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary-fixed">check_circle</span>
                  <span className="font-space font-bold tracking-tight">{exp.impact}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar: Awards & Honnors */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-10 bg-secondary-container rounded-[2.5rem] shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-secondary text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
                <h3 className="font-space text-3xl font-bold text-on-secondary-container">24+ Penghargaan</h3>
              </div>
              <p className="text-on-secondary-container opacity-80 font-medium leading-relaxed">
                Diakui atas dedikasi dan dampak sosial dalam berbagai disiplin kepemimpinan pemuda.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: "Medali Emas Kepemimpinan Pemuda", year: "2024" },
                { title: "Pionir Dampak Komunitas", year: "2023" },
                { title: "Penghargaan Visioner Masa Depan", year: "2023" }
              ].map((award, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 flex justify-between items-center group cursor-pointer hover:border-secondary transition-colors shadow-sm">
                   <div>
                      <h4 className="font-space font-bold text-primary">{award.title}</h4>
                      <p className="text-sm text-slate-400">{award.year}</p>
                   </div>
                   <span className="material-symbols-outlined text-slate-300 group-hover:text-secondary transition-colors">arrow_outward</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
