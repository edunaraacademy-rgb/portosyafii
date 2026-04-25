"use client";
import React from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const About = () => {
  const [profile, setProfile] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from("profile").select("*").single();
      if (data) setProfile(data);
    };
    fetchProfile();
  }, []);

  const vision = profile?.about_vision || "Mengubah Semangat Menjadi Perubahan Sistemik untuk Era Modern.";
  const visionDesc = profile?.about_vision_desc || "\"Saya membayangkan dunia di mana keberanian pemuda bertemu dengan kebijakan infrastruktur, menciptakan platform kesetaraan digital yang melampaui batas.\"";
  const aboutDescription = profile?.about_description || "Lahir di Sitinjo, Syafii Yuska Kudadiri selalu didorong oleh keinginan untuk melayani masyarakat di Dairi. Sebagai lulusan Fakultas Teknik UMSU, ia menggabungkan logika teknis dengan pengabdian sosial.";
  const location = profile?.location || "Kutabaru Sitinjo Dairi";
  const birthDate = profile?.birth_date ? new Date(profile.birth_date).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "9 September 1996";
  const education = profile?.education || "Fakultas Teknik UMSU (Alumni 2020)";

  return (
    <section id="tentang" className="py-20 max-w-7xl mx-auto px-8">
      {/* Vision Statement Section */}
      <div className="py-32 bg-primary text-white rounded-[3rem] overflow-hidden relative mb-20 px-12 text-center shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none">
          <div className="w-full h-full bg-secondary-fixed blur-[120px] rounded-full"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="font-space text-lg text-secondary-fixed mb-6 block uppercase tracking-widest font-medium">Bintang Penuntun Saya</span>
          <h2 className="font-space text-5xl mb-12 font-bold leading-tight">
            {vision}
          </h2>
          <div className="border-l-4 border-secondary-fixed pl-12 py-4 text-left mb-16">
            <p className="font-space text-3xl leading-tight text-slate-300 italic">
              {visionDesc}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-space text-xl text-secondary-fixed-dim mb-2 font-bold uppercase tracking-tight">Pemberdayaan</h4>
              <p className="text-slate-400">Memberikan alat bagi mereka yang tak terdengar.</p>
            </div>
            <div>
              <h4 className="font-space text-xl text-secondary-fixed-dim mb-2 font-bold uppercase tracking-tight">Inovasi</h4>
              <p className="text-slate-400">Solusi sosial berbasis teknologi.</p>
            </div>
            <div>
              <h4 className="font-space text-xl text-secondary-fixed-dim mb-2 font-bold uppercase tracking-tight">Integritas</h4>
              <p className="text-slate-400">Kepemimpinan komunitas yang berprinsip.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="font-space text-5xl text-primary font-bold mb-8">Latar Belakang Pribadi</h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              {aboutDescription}
            </p>
            <div className="bg-surface-container p-8 rounded-2xl border border-slate-200">
              <ul className="space-y-4">
                <li className="flex gap-4">
                   <span className="font-space font-bold text-primary w-24">TTL</span>
                   <span>Sitinjo, {birthDate}</span>
                </li>
                <li className="flex gap-4">
                   <span className="font-space font-bold text-primary w-24">Alamat</span>
                   <span>{location}</span>
                </li>
                <li className="flex gap-4">
                   <span className="font-space font-bold text-primary w-24">Pendidikan</span>
                   <span>{education}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="relative">
           <div className="bg-slate-100 aspect-video rounded-[2rem] overflow-hidden shadow-inner flex items-center justify-center p-12">
              <p className="font-space text-center text-slate-400 italic">"Pendidikan adalah senjata paling mematikan di dunia, karena dengan itu Anda dapat mengubah dunia."</p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default About;
