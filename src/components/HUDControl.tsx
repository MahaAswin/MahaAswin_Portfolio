import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Compass, Cpu, Wifi, Clock, ChevronUp, ChevronDown, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const HUDControl = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [fps, setFps] = useState(60);
  const [ping, setPing] = useState(24);
  const [time, setTime] = useState("");
  const [ramUsage, setRamUsage] = useState(41);
  
  const { theme, setTheme, resolvedTheme } = useTheme();

  const activeTheme = theme === "system" ? resolvedTheme : theme;

  // Monitor scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Digital Clock updating in real-time
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString([], { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Performance calculations: FPS and Ping simulation
  useEffect(() => {
    // Ping fluctuation
    const pingInterval = setInterval(() => {
      setPing(Math.floor(20 + Math.random() * 12));
      setRamUsage(Math.floor(38 + Math.random() * 8));
    }, 4000);

    // Actual FPS calculator
    let frames = 0;
    let lastTime = performance.now();
    let requestFrameId: number;

    const calcFps = (now: number) => {
      frames++;
      if (now >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (now - lastTime)));
        frames = 0;
        lastTime = now;
      }
      requestFrameId = requestAnimationFrame(calcFps);
    };
    requestFrameId = requestAnimationFrame(calcFps);

    return () => {
      clearInterval(pingInterval);
      cancelAnimationFrame(requestFrameId);
    };
  }, []);

  const circumference = 2 * Math.PI * 22; // 22 is radius of progress circle
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-24 right-6 z-50 font-mono select-none">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-4 w-60 rounded-2xl border border-primary/20 bg-background/80 backdrop-blur-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-primary/10 pb-3 mb-3">
              <span className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-1.5">
                <Activity size={10} className="animate-pulse" />
                SYSTEM HUD
              </span>
              <span className="text-[9px] font-bold text-foreground/40 uppercase">v1.2.1</span>
            </div>

            {/* Performance Stats Panel */}
            <div className="space-y-2.5 text-[10px]">
              {/* FPS Metrics */}
              <div className="flex justify-between items-center">
                <span className="text-foreground/60 flex items-center gap-1.5"><Cpu size={10} /> FRAME RATE</span>
                <span className="font-bold text-foreground">{fps} FPS</span>
              </div>
              {/* Connection Ping */}
              <div className="flex justify-between items-center">
                <span className="text-foreground/60 flex items-center gap-1.5"><Wifi size={10} /> LATENCY</span>
                <span className={`font-bold ${ping > 28 ? "text-amber-400" : "text-emerald-400"}`}>{ping}ms</span>
              </div>
              {/* RAM Usage */}
              <div className="flex justify-between items-center">
                <span className="text-foreground/60 flex items-center gap-1.5"><Compass size={10} /> ALLOCATED RAM</span>
                <span className="font-bold text-foreground">{ramUsage}%</span>
              </div>
              {/* Digital Time clock */}
              <div className="flex justify-between items-center border-t border-primary/5 pt-2.5">
                <span className="text-foreground/60 flex items-center gap-1.5"><Clock size={10} /> LOCAL CLOCK</span>
                <span className="font-bold text-foreground tracking-widest">{time}</span>
              </div>
              {/* Theme Toggle option */}
              <div className="flex justify-between items-center border-t border-primary/5 pt-2.5">
                <span className="text-foreground/60 flex items-center gap-1.5"><Sun size={10} /> VISUAL THEME</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme(activeTheme === "dark" ? "light" : "dark");
                  }}
                  className="px-2 py-0.5 rounded border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 text-[9px] font-bold uppercase transition-all"
                >
                  {activeTheme === "dark" ? "LIGHT" : "DARK"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Node */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 rounded-full border border-primary/30 bg-background/80 backdrop-blur-xl shadow-lg flex items-center justify-center cursor-pointer relative"
      >
        {/* Scroll Progress Ring SVG */}
        <svg className="absolute -rotate-90 w-full h-full p-0.5">
          <circle
            cx="22"
            cy="22"
            r="22"
            stroke="hsla(var(--primary) / 0.1)"
            strokeWidth="1.5"
            fill="transparent"
            className="translate-x-[2px] translate-y-[2px]"
          />
          <circle
            cx="22"
            cy="22"
            r="22"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="translate-x-[2px] translate-y-[2px] transition-[stroke-dashoffset] duration-100"
          />
        </svg>

        {/* Center Icons */}
        <div className="text-primary flex flex-col items-center justify-center z-10 transition-colors">
          {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          <span className="text-[7px] font-black tracking-tighter uppercase">HUD</span>
        </div>
      </motion.div>

      {/* Embedded CSS animation for Equalizer */}
      <style>{`
        @keyframes eq {
          0% { height: 2px; }
          100% { height: 12px; }
        }
      `}</style>
    </div>
  );
};
