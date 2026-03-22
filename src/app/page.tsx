"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Maximize, Layers } from "lucide-react";

// Dynamically import the 3D model with SSR disabled since Three.js relies on window
const ChurchModel = dynamic(() => import("@/components/ChurchModel"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full text-white bg-slate-900">
      Loading 3D Architect Model...
    </div>
  ),
});

export default function Home() {
  const [showInterior, setShowInterior] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-950 overflow-hidden">
      <header className="absolute top-0 w-full p-6 z-10 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md font-serif">
            Northwood House Church
          </h1>
          <p className="text-slate-300 mt-2 font-light">Interactive Architectural 3D Reconstruction</p>
        </div>
        <nav className="flex gap-6">
          <a href="/history" className="px-6 py-2 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/50 hover:bg-amber-500 hover:text-white transition-all font-medium backdrop-blur-md">
            Read The History
          </a>
        </nav>
      </header>

      {/* 3D Canvas Container */}
      <div className="relative w-full h-screen">
        <ChurchModel showInterior={showInterior} />

        {/* Controls Overlay */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4 bg-slate-900/80 p-3 rounded-full backdrop-blur-md shadow-2xl border border-slate-700/50">
          <button
            onClick={() => setShowInterior(!showInterior)}
            className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ${showInterior
                ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
          >
            <Layers className="w-4 h-4 mr-2" />
            {showInterior ? "View Exterior" : "X-Ray Inner Workings"}
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex items-center p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
            title="Toggle Fullscreen"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions Overlay */}
        <div className="absolute top-24 left-6 max-w-xs bg-slate-900/70 p-4 rounded-xl backdrop-blur-sm border border-slate-700 text-sm text-slate-300 pointer-events-none">
          <h3 className="text-white font-semibold mb-2">Controls</h3>
          <ul className="space-y-1">
            <li>• <b>Left Click + Drag:</b> Rotate camera</li>
            <li>• <b>Right Click + Drag:</b> Pan camera</li>
            <li>• <b>Scroll Wheel:</b> Zoom in/out</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
