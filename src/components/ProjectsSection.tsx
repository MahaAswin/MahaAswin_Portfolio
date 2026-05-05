import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, Bot, Mic, Music, Sparkles, Layout } from "lucide-react";

const projects = [
  {
    id: "ai-farmer",
    icon: Bot,
    title: "AI Farmer Assistant",
    short: "Multilingual voice AI helping farmers with actionable insights and agricultural intelligence.",
    description: "A comprehensive AI-powered assistant that uses speech recognition and text-to-speech for voice interactions. Built with Gemini API for intelligent agricultural advice, supporting diverse farming communities.",
    stack: [
      { name: "React", type: "frontend" },
      { name: "FastAPI", type: "backend" },
      { name: "Gemini API", type: "ai" },
      { name: "Python", type: "language" }
    ],
    isHero: true,
    accent: "#00d4ff",
  },
  {
    id: "jarvis",
    icon: Mic,
    title: "JARVIS AI Assistant",
    short: "Iron Man-inspired voice assistant with NLP and real-time speech processing.",
    description: "Sophisticated voice assistant featuring real-time speech recognition, natural language processing via Gemini, and text-to-speech output. Handles complex multi-turn conversations.",
    stack: [
      { name: "Python", type: "language" },
      { name: "Gemini API", type: "ai" },
      { name: "Speech Recog", type: "tools" }
    ],
    accent: "#8b5cf6",
  },
  {
    id: "music-org",
    icon: Music,
    title: "Playlist Organizer",
    short: "Full-stack music management system with JWT auth and dynamic CRUD.",
    description: "Secure web application for organizing music playlists. Features JWT-based authentication, full CRUD operations, and a responsive glassmorphism UI.",
    stack: [
      { name: "MongoDB", type: "db" },
      { name: "Node.js", type: "backend" },
      { name: "React", type: "frontend" }
    ],
    accent: "#10b981",
  },
];

const tagColors: Record<string, string> = {
  frontend: "text-cyan-400 bg-cyan-400/10",
  backend: "text-purple-400 bg-purple-400/10",
  ai: "text-blue-400 bg-blue-400/10",
  language: "text-emerald-400 bg-emerald-400/10",
  db: "text-orange-400 bg-orange-400/10",
  tools: "text-pink-400 bg-pink-400/10",
};

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{ 
        y: [0, -6, 0],
      }}
      transition={{ 
        y: {
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }
      }}
      whileHover={{ y: -12 }}
      className={`glass-card p-1 group relative overflow-hidden flex flex-col h-full ${
        project.isHero ? "md:col-span-3" : "md:col-span-1"
      }`}
    >
      {/* Mockup / Preview Area */}
      <div className="relative aspect-video md:aspect-auto md:h-48 rounded-xl overflow-hidden bg-white/5 mb-4">
        <div 
          className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-40" 
          style={{ background: `linear-gradient(135deg, ${project.accent}, transparent)` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <project.icon size={project.isHero ? 64 : 48} className="text-white/20 group-hover:text-white/40 transition-all duration-500 group-hover:scale-110" />
        </div>
        
        {/* Action Buttons (Fade in on hover) */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-20">
          <a href="#" className="p-3 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform">
            <ExternalLink size={20} />
          </a>
          <a href="#" className="p-3 rounded-full bg-white/10 text-white hover:scale-110 transition-transform">
            <Github size={20} />
          </a>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">Mission: {project.id}</span>
        </div>
        
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          {project.isHero ? project.description : project.short}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <span 
              key={tag.name}
              className={`px-3 py-1 rounded-full text-[10px] font-mono border border-white/5 ${tagColors[tag.type]}`}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Glow Border on Hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"
        style={{ border: `1px solid ${project.accent}`, boxShadow: `0 0 30px ${project.accent}` }}
      />
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="subtitle-glow text-primary mb-4 block">Manifest</span>
          <h2 className="font-sans text-4xl md:text-6xl font-bold">
            Project <span className="gradient-text gradient-underline">Showcase</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
