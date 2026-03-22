"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, MapPin, Anchor, Landmark, History, MoveRight } from "lucide-react";

export default function HistoryPage() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="bg-[#0f1115] min-h-screen text-slate-200 font-sans overflow-x-hidden selection:bg-amber-600 selection:text-white">
      {/* Navbar / Header */}
      <header className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-[#0f1115]/80 backdrop-blur-md border-b border-white/5">
        <div className="text-xl font-bold tracking-widest uppercase text-amber-500 flex items-center gap-2">
          <Landmark className="w-5 h-5" />
          Northwood Estate
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <a href="/3d-model" className="px-4 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors">Go to 3D Model</a>
          <a href="#the-house" className="hover:text-amber-400 transition-colors">The House</a>
          <a href="#the-church" className="hover:text-amber-400 transition-colors">The Church</a>
          <a href="#relocation" className="hover:text-amber-400 transition-colors">Relocation</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 opacity-40">
          <video
            src="/Videos/Country_Estate_Drone_Shot_Generation.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1115]/50 via-[#0f1115]/80 to-[#0f1115]" />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-amber-500 text-sm font-medium mb-6 uppercase tracking-wider"
          >
            <History className="w-4 h-4" />
            An Architectural & Social History
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-8"
          >
            The Vanished <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Sanctuary</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            The story of the Northwood House Private Chapel, its majestic construction, its exiled Benedictine nuns, and its eventual physical migration to Ryde.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-24 space-y-32">
        
        {/* Section 1: The Estate Context */}
        <section id="the-house" className="grid md:grid-cols-2 gap-16 items-center pt-24 scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">The Estate Context & The Ward Dynasty</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              To understand the history of the lost chapel, one must comprehend the sheer scale and influence of the Ward family, whose tenure at Northwood House spanned six generations. The family's rise was rooted in military and mercantile successes, beginning with John Ward I in the 18th century.
            </p>
            <p className="text-slate-400 leading-relaxed">
              George Ward acquired the Bellevue estate in 1793. Within thirty years, "King Ward" had amassed four-fifths of the parish of Northwood and approximately 20,000 acres—one-fifth of the Isle of Wight’s total landmass. His son, George Henry Ward, expanded the house into the classical nine-bay mansion we recognize today.
            </p>
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
          >
            <Image
              src="/history-images/church_and_northwood_aerial_accurate.png"
              alt="Aerial view of the Estate"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </section>

        {/* Section 2: The Spiritual Pivot */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
           <div className="relative z-10 grid md:grid-cols-12 gap-12">
             <div className="md:col-span-7">
               <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">The Spiritual Pivot: Anglican Benefactors to Catholic Exiles</h2>
               <p className="text-slate-400 leading-relaxed mb-6">
                 Originally prominent Anglican supporters, a radical shift occurred when William George Ward, an Oxford don, converted to Roman Catholicism in 1845. This made the Wards a leading Catholic family on the island.
               </p>
               <p className="text-slate-400 leading-relaxed mb-6">
                 In 1901, due to anti-clerical laws in France, the Benedictine nuns of the Abbey of Ste-Cécile de Solesmes were exiled. Edmund Granville Ward offered Northwood House as a temporary sanctuary. The ballroom initially served as a makeshift chapel before the decision was made to build a "temporary structure"—the Priory Church.
               </p>

               {/* Atmosphere Video */}
               <div className="relative w-full h-64 mt-8 rounded-2xl overflow-hidden shadow-xl border border-white/5 shadow-black/30 group">
                 <video
                   src="/Videos/Edwardian_Church_Video_Generation.mp4"
                   autoPlay
                   loop
                   muted
                   playsInline
                   className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-black/20" />
                 <div className="absolute bottom-4 left-4">
                   <p className="text-white font-medium text-sm drop-shadow-md flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                     The contemplative sanctuary recreated
                   </p>
                 </div>
               </div>
             </div>
             <div className="md:col-span-5 flex flex-col justify-center gap-6 border-l border-white/10 pl-8">
                <div className="flex items-start gap-4">
                  <BookOpen className="w-6 h-6 text-amber-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white">1845</h4>
                    <p className="text-sm text-slate-400">William George Ward converts to Roman Catholicism.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Anchor className="w-6 h-6 text-amber-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white">1901</h4>
                    <p className="text-sm text-slate-400">French Benedictine nuns exiled to Northwood.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-amber-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white">1903</h4>
                    <p className="text-sm text-slate-400">Dedicated private chapel built.</p>
                  </div>
                </div>
             </div>
           </div>
        </section>

        {/* Section 3: Architectural Construction */}
        <section id="the-church" className="space-y-16 pt-24 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white">Architectural Construction:<br/><span className="text-amber-500">The Temporary Masterpiece</span></h2>
            <p className="text-slate-400 leading-relaxed mb-12">
              Built in the winter of 1902–1903 in just three months, this "wooden church" was intended to be a replica of the Abbey of St. Cecilia. Using hybrid construction methods, it defied its temporary status, rising rapidly as a massive timber skeleton before receiving its salvageable stone internal adornments.
            </p>

            {/* Construction Video */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative w-full h-[400px] md:h-[500px] mb-16 rounded-3xl overflow-hidden shadow-2xl border border-white/10 shadow-black/50"
            >
               <video
                 src="/Videos/Edwardian_Church_Construction_Video.mp4"
                 autoPlay
                 loop
                 muted
                 playsInline
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                 <h3 className="text-xl font-bold text-white mb-2">Rapid Edwardian Construction</h3>
                 <p className="text-slate-300">Skilled carpenters assembling the vast timber shell on the grounds of Northwood.</p>
               </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="relative h-64">
                <Image src="/history-images/early_construction_timber.png" alt="Timber Foundations" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">1. The Timber Shell</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Timber framing allowed for quick assembly, avoiding the curing time required for immense traditional masonry walls.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="relative h-64">
                <Image src="/history-images/salvageable_ornaments_timber.png" alt="Salvageable Stone Accents" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">2. High-Value Accents</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  While the shell was wooden, high-value internal components—such as the stone altar and reredos—were designed to be permanent and salvageable.
                </p>
              </div>
            </motion.div>

             {/* Card 3 */}
             <motion.div 
              whileHover={{ y: -10 }}
              className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="relative h-64">
                <Image src="/history-images/roof_construction_timber.png" alt="Roof Timber Framing" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">3. Prefabricated Trusses</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Massive timber roof trusses were expertly hoisted onto the wooden frame, utilizing rapid Edwardian ecclesiastical kit techniques.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 4 & 5: Relocation and The Ryde Connection */}
        <section id="relocation" className="grid md:grid-cols-2 gap-16 items-center pt-24 scroll-mt-24">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative h-[30rem] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-amber-900/20"
          >
            <Image
              src="/history-images/ryde_abbey_red_brick.png"
              alt="St. Cecilia's Rebirth in Red Brick"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
               <h3 className="text-2xl font-serif font-bold text-white">Ryde: St. Cecilia's Rebirth</h3>
               <p className="text-sm text-slate-300">The salvaged internal elements were integrated into a permanent Red Belgian brick masonry church.</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">The "Stone-by-Stone" Migration</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              By 1906, the nuns required a permanent, legally owned residence away from the busy maritime town of Cowes. At the same time, the Ward family was withdrawing from the grand Northwood lifestyle, making the maintenance of a temporary private chapel redundant.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              When the nuns departed for Appley in Ryde, the architectural relocation was an act of technical precision. While the main shell was timber, the high-value liturgical furniture and internal decorative elements were meticulously dismantled.
            </p>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-8">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                Current Status <MoveRight className="w-5 h-5 text-amber-500" />
              </h4>
              <p className="text-sm text-slate-400">
                At the new site in Ryde, Edward Goldie designed a permanent masonry church integrating the salvaged elements. Dedicated in 1907, the site remains active today as St. Cecilia’s Abbey, famous for its Gregorian chant.
              </p>
            </div>
          </motion.div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black py-12 text-center mt-24">
        <Landmark className="w-8 h-8 mx-auto text-white/20 mb-4" />
        <p className="text-slate-500 text-sm">© Copyright 2026. Architectural Heritage of Isle of Wight.</p>
      </footer>
    </div>
  );
}
