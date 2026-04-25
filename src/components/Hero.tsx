"use client";
import React from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const Hero = () => {
  const [profile, setProfile] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from("profile").select("*").single();
      if (data) setProfile(data);
    };
    fetchProfile();
  }, []);

  const name = profile?.name || "Syafii Yuska Kudadiri";
  const tagline = profile?.tagline || "Duta Pemuda Global";
  const description = profile?.description || "Memberdayakan masyarakat Dairi melalui teknologi, olahraga, dan ekonomi kreatif untuk menciptakan dampak sosial yang berkelanjutan.";

  return (
    <section id="beranda" className="mt-24 py-20 grid grid-cols-12 gap-8 items-center max-w-7xl mx-auto px-8">
      <div className="col-span-12 lg:col-span-7">
        <span className="font-space text-2xl text-secondary mb-6 block uppercase tracking-widest font-bold">
          {tagline}
        </span>
        <h1 className="font-space text-6xl lg:text-8xl text-primary font-black mb-4 tracking-tighter leading-none">
          {name}
        </h1>
        <h2 className="font-space text-3xl lg:text-4xl mb-8 text-secondary font-bold uppercase tracking-widest">
          Pemuda <span className="text-secondary-fixed-dim">Pemimpin</span> Masa Depan.
        </h2>
        <p className="text-2xl text-slate-600 max-w-2xl mb-12 leading-relaxed font-medium">
          {description}
        </p>
        <div className="flex items-center gap-6">
          <button className="bg-primary text-white px-10 py-5 font-space font-bold rounded-full transition-all hover:bg-secondary-container hover:text-on-secondary-container flex items-center gap-3 shadow-xl">
            Baca Visi Saya <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <div className="flex -space-x-4">
            <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
               <Image 
                 src="/images/portrait.png" 
                 alt="Portrait" 
                 width={48} 
                 height={48} 
                 className="object-cover"
               />
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-white bg-secondary-fixed flex items-center justify-center font-space font-bold text-on-secondary-fixed">
              +12k
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-5 relative">
        <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-200 relative">
           <Image 
             src="/images/portrait.png" 
             alt="Syafii Yuska Kudadiri" 
             fill 
             className="object-cover"
             priority
           />
        </div>
        {/* Glass Card Overlay */}
        <div className="absolute -bottom-10 -left-10 bg-white/80 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-2xl hidden xl:block max-w-xs">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
            </div>
            <div>
              <p className="font-space font-bold text-primary">Mentor Bersertifikat</p>
              <p className="text-sm text-slate-500">Aktivis Kepemudaan Dairi</p>
            </div>
          </div>
          <p className="text-slate-600 italic leading-relaxed">
            "Kepemimpinan sejati bukan tentang memegang jabatan, tapi tentang menjaga mereka yang ada dalam tanggung jawab kita."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
