import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroScene3D from "./HeroScene3D";

const HeroSection = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Values for Parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Effects: Particle Background + Theme Glows */}
      <HeroScene3D />
      
      {/* Background Neon Glows (Deep Theme) */}
      <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SECTION: Info & Branding */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-primary" />
              <span className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Hi, My Name is</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tighter mb-4">
              <span className="text-foreground">MAHA</span><br />
              <span className="gradient-text">ASWIN S B</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed mt-6">
              Full-stack engineer crafting high-performance AI ecosystems and immersive digital experiences with precision and passion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-2.5 h-2.5">
                <div className="status-dot-ripple" />
                <div className="absolute inset-0 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
              </div>
              <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest">Available for Projects</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SECTION: Glassmorphism Card */}
        <div className="relative flex justify-center lg:justify-end perspective-1000">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-[340px] md:w-[380px] h-[450px] md:h-[500px] group cursor-pointer"
          >
            {/* The Glass Card Container */}
            <div className="absolute inset-0 rounded-[20px] bg-white/[0.05] dark:bg-black/[0.1] backdrop-blur-[25px] border border-white/[0.08] dark:border-white/[0.05] shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 group-hover:bg-white/[0.08] dark:group-hover:bg-black/[0.2] group-hover:border-primary/30 group-hover:shadow-[0_0_60px_rgba(255,193,7,0.15)]">
              
              {/* Internal Content: Large Hero Avatar */}
              <div className="absolute inset-0 flex flex-col justify-end items-center">
                {/* Avatar Glow */}
                <div className="absolute bottom-0 w-[120%] h-[120%] bg-primary/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
                
                <motion.img 
                  src="/uploads/profile-red-tie.png" 
                  alt="Maha Aswin" 
                  className="w-auto h-[105%] max-w-none object-contain object-bottom transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                  style={{ 
                    translateZ: "80px", 
                  }}
                />
              </div>

              {/* Decorative Window Elements */}
              <div className="absolute top-6 left-6 flex gap-1.5 z-20">
                <div className="w-2 h-2 rounded-full bg-red-500/40" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                <div className="w-2 h-2 rounded-full bg-green-500/40" />
              </div>
              
              {/* Floating "DEVELOPER" Text Watermark */}
              <div className="absolute bottom-6 right-6 text-foreground/15 dark:text-white/20 font-black text-5xl lg:text-6xl pointer-events-none uppercase tracking-tighter z-10 transition-all duration-500 group-hover:text-primary/40 group-hover:translate-x-[-10px]">
                DEVELOPER
              </div>
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute -inset-8 bg-primary/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
          </motion.div>
        </div>
      </div>

      {/* FOOTER: System Info */}
      <div className="absolute bottom-10 left-10 flex gap-12 text-[10px] text-foreground/20 dark:text-white/20 font-bold uppercase tracking-[0.3em] hidden lg:flex">
        <div className="flex flex-col gap-2">
          <span>Coordinates</span>
          <span className="text-foreground/40 dark:text-white/40">13.0827° N, 80.2707° E</span>
        </div>
        <div className="flex flex-col gap-2">
          <span>System Status</span>
          <span className="text-emerald-500/60 font-black">Nominal / Online</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
