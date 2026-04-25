"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const supabase = createClient();

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-space">Memuat...</div>;
  }

  if (!session && pathname !== "/admin/login") return null;

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar - Only show if logged in and not on login page */}
      {session && pathname !== "/admin/login" && (
        <aside className="w-80 bg-slate-900 border-r border-slate-800 p-12 flex flex-col">
          <div className="text-2xl font-bold tracking-tighter text-white uppercase font-space mb-20">
            Admin Panel
          </div>
          
          <nav className="flex-1 space-y-4">
            <Link href="/admin" className="flex items-center gap-4 text-slate-400 hover:text-white p-4 rounded-2xl hover:bg-slate-800 transition-all font-space font-bold">
              <span className="material-symbols-outlined">dashboard</span> Dashboard
            </Link>
            <Link href="/admin/profile" className="flex items-center gap-4 text-slate-400 hover:text-white p-4 rounded-2xl hover:bg-slate-800 transition-all font-space font-bold">
              <span className="material-symbols-outlined">person</span> Profil & Beranda
            </Link>
            <Link href="/admin/projects" className="flex items-center gap-4 text-slate-400 hover:text-white p-4 rounded-2xl hover:bg-slate-800 transition-all font-space font-bold">
              <span className="material-symbols-outlined">dataset</span> Kelola Proyek
            </Link>
            <Link href="/admin/skills" className="flex items-center gap-4 text-slate-400 hover:text-white p-4 rounded-2xl hover:bg-slate-800 transition-all font-space font-bold">
              <span className="material-symbols-outlined">bolt</span> Keterampilan
            </Link>
            <Link href="/admin/experience" className="flex items-center gap-4 text-slate-400 hover:text-white p-4 rounded-2xl hover:bg-slate-800 transition-all font-space font-bold">
              <span className="material-symbols-outlined">history</span> Pengalaman
            </Link>
            <Link href="/admin/blog" className="flex items-center gap-4 text-slate-400 hover:text-white p-4 rounded-2xl hover:bg-slate-800 transition-all font-space font-bold">
              <span className="material-symbols-outlined">article</span> Blog & Kegiatan
            </Link>
          </nav>

          <button 
            onClick={() => supabase.auth.signOut()}
            className="mt-20 flex items-center gap-4 text-red-400 hover:text-red-300 p-4 rounded-2xl hover:bg-red-500/10 transition-all font-space font-bold"
          >
            <span className="material-symbols-outlined">logout</span> Keluar
          </button>
        </aside>
      )}

      {/* Content */}
      <main className={`flex-1 overflow-auto ${session && pathname !== "/admin/login" ? "p-20" : ""}`}>
        {children}
      </main>
    </div>
  );
}
