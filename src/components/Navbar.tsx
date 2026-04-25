"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-24 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-full">
        <div className="text-2xl font-bold tracking-tighter text-slate-900 uppercase font-space">
          YouthLeader Portal
        </div>
        <div className="hidden md:flex items-center space-x-12 font-space font-medium tracking-tight">
          <Link href="#beranda" className="text-slate-900 border-b-2 border-lime-400 pb-1 hover:text-lime-500 transition-all">Beranda</Link>
          <Link href="#tentang" className="text-slate-500 hover:text-lime-500 transition-all">Tentang</Link>
          <Link href="#proyek" className="text-slate-500 hover:text-lime-500 transition-all">Proyek</Link>
          <Link href="#keterampilan" className="text-slate-500 hover:text-lime-500 transition-all">Keterampilan</Link>
          <Link href="#kontak" className="text-slate-500 hover:text-lime-500 transition-all">Kontak</Link>
        </div>
        <button className="bg-primary text-white px-8 py-3 font-space font-medium rounded-full hover:bg-secondary-container hover:text-on-secondary-container transition-all active:scale-95">
          Hubungi Saya
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
