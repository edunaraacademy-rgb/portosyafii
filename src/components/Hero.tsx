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
  const tagline2 = profile?.tagline2 || "Pemuda Pemimpin Masa Depan.";
  const description = profile?.description || "Memberdayakan masyarakat Dairi melalui teknologi, olahraga, dan ekonomi kreatif untuk menciptakan dampak sosial yang berkelanjutan.";
  const portraitUrl = profile?.portrait_url || "/images/portrait.png";

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
          {tagline2}
        </h2>
        <p className="text-2xl text-slate-600 max-w-2xl mb-12 leading-relaxed font-medium">
          {description}
        </p>
        <div className="flex items-center gap-6">
          <button className="bg-primary text-white px-10 py-5 font-space font-bold rounded-full transition-all hover:bg-secondary-container hover:text-on-secondary-container flex items-center gap-3 shadow-xl">
            Mari Berkolaborasi
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-5 relative">
        <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
          <Image 
            src={portraitUrl}
            alt={name}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 hover:scale-100"
          />
        </div>
        {/* Floating Achievement Card */}
        <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl max-w-[200px] hidden lg:block border border-slate-100 animate-bounce-slow">
           <span className="text-5xl font-black text-secondary-fixed block mb-2 font-space tracking-tighter">24+</span>
           <span className="text-sm font-space font-bold text-primary uppercase leading-tight block">Penghargaan Kepemimpinan</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
