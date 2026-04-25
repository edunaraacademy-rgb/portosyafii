"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const Footer = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from("profile").select("*").single();
      if (data) setProfile(data);
    };
    fetchProfile();
  }, []);

  const links = [
    { label: "LinkedIn", url: profile?.contact_linkedin || "#" },
    { label: "Instagram", url: profile?.contact_instagram || "#" },
    { label: "Email", url: profile?.contact_email ? `mailto:${profile.contact_email}` : "#" },
  ];

  return (
    <footer id="kontak" className="bg-white border-t border-slate-200 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        <div>
          <div className="text-3xl font-bold tracking-tighter text-slate-900 uppercase font-space mb-8">
            YouthLeader Portal
          </div>
          <p className="text-xl text-slate-500 max-w-sm mb-12 leading-relaxed">
            Memberdayakan ekosistem pemuda Dairi melalui kepemimpinan yang berprinsip dan inovasi berkelanjutan.
          </p>
          <div className="flex items-center gap-6 text-slate-400">
             <span className="material-symbols-outlined text-4xl">handshake</span>
             <span className="font-space font-medium tracking-wide">Terbuka untuk kolaborasi pembangunan daerah</span>
          </div>
        </div>

        <div className="flex flex-col md:items-end gap-12">
          <div className="flex flex-wrap gap-12 justify-start md:justify-end">
            {links.map((link) => (
              <a 
                key={link.label} 
                href={link.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="font-space text-lg font-bold text-slate-400 hover:text-slate-900 underline decoration-lime-400 decoration-4 underline-offset-8 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="text-slate-400 font-space font-medium tracking-widest text-sm text-right mt-12 opacity-60">
            © {new Date().getFullYear()} {profile?.name || "Syafii Yuska Kudadiri"}. HAK CIPTA DILINDUNGI.
          </div>
        </div>
      </div>
      
      {/* Decorative Quote Block at bottom */}
      <div className="mt-32 border-t border-slate-100 pt-20 max-w-7xl mx-auto px-8">
         <div className="flex gap-12 items-start opacity-30">
            <div className="w-1.5 h-40 bg-primary shrink-0" />
            <blockquote className="font-space text-4xl font-bold text-primary leading-tight">
               "Tujuannya bukan untuk hidup selamanya, tetapi untuk menciptakan sesuatu yang akan terus hidup."
            </blockquote>
         </div>
      </div>
    </footer>
  );
};

export default Footer;
