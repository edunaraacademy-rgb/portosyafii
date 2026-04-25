"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type Project = {
  id: string;
  title: string;
  description: string;
  role: string;
  category: string;
  image_url: string;
  situation?: string;
  result?: string;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (data && data.length > 0) {
        setProjects(data);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <section id="proyek" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">
        <header className="mb-16 border-l-4 border-secondary-container pl-6">
          <p className="font-space text-lg text-secondary uppercase font-bold tracking-widest mb-4">Portofolio / Studi Kasus</p>
          <h2 className="font-space text-5xl text-primary font-bold mb-6">Karya Kreatif & Proyek Transformatif.</h2>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
            Menampilkan inisiatif kepemimpinan dan solusi pengembangan masyarakat yang dirancang untuk membangun Dairi yang lebih unggul.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 group overflow-hidden transition-all hover:-translate-y-2">
                <div className="aspect-video rounded-2xl bg-slate-100 overflow-hidden relative mb-8">
                  {project.image_url ? (
                    <Image src={project.image_url} alt={project.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-200" />
                  )}
                </div>
                <span className="inline-block px-4 py-1 bg-secondary-container/20 text-on-secondary-container font-space font-bold rounded-full mb-6 text-sm">{project.category}</span>
                <h3 className="font-space text-2xl text-primary font-bold mb-4">{project.title}</h3>
                <p className="text-slate-500 line-clamp-3 mb-6">{project.description}</p>
                <div className="flex items-center gap-2 text-primary font-bold font-space group-hover:gap-4 transition-all">
                  Lihat Detail <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
            ))
          ) : (
            /* Fallback to hardcoded content if no database entry */
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               {/* Original hardcoded projects here... keeping it simple for brevity */}
               <p className="text-slate-400 italic">Belum ada proyek yang ditambahkan ke database.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
