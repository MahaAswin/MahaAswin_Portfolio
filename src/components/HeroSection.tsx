import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import HeroScene3D from "./HeroScene3D";

const roles = [
  "Full Stack Developer",
  "Spring Boot Engineer",
  "MERN Stack Builder",
  "AI Systems Creator",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Scene */}
      <HeroScene3D />

      {/* Radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.8, type: "spring" }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-primary font-mono text-xs tracking-widest uppercase border-primary/20">
            ✦ Developer Portfolio ✦
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
        >
          <span className="text-foreground">Maha Aswin</span>
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
        >
          <span className="gradient-text">S B</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="h-10 mb-10"
        >
          <span className="font-mono text-lg md:text-xl text-muted-foreground">
            {"< "}
            {text}
            <span className="animate-pulse-glow text-primary">|</span>
            {" />"}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {["Spring Boot", "MERN", "AI / ML", "Java", "Python"].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.1 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="glass-card px-4 py-2 text-sm font-mono text-primary border-primary/20 cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground font-mono">Scroll to explore</span>
        <ChevronDown className="text-primary animate-scroll-indicator" size={20} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
