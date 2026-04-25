"use client";
import React from "react";

export default function AdminDashboard() {
  return (
    <div>
      <header className="mb-16">
        <h1 className="font-space text-5xl text-white font-bold mb-4">Selamat Datang, Admin</h1>
        <p className="text-xl text-slate-400">Kelola konten portofolio Anda secara real-time.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Total Proyek", count: "3", icon: "dataset", color: "bg-blue-500" },
          { label: "Pencapaian", count: "24", icon: "workspace_premium", color: "bg-amber-500" },
          { label: "Pesan Masuk", count: "12", icon: "mail", color: "bg-emerald-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 shadow-xl">
             <div className={`${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                <span className="material-symbols-outlined text-white text-3xl">{stat.icon}</span>
             </div>
             <p className="text-slate-400 font-space font-bold uppercase tracking-widest text-sm mb-2">{stat.label}</p>
             <h3 className="text-4xl text-white font-bold">{stat.count}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
