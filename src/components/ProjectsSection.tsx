import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, X, Mic, Bot, Music, Sparkles } from "lucide-react";

const projects = [
  {
    icon: Bot,
    title: "AI Farmer Assistant",
    short: "Voice-enabled AI chatbot helping farmers with multilingual support and actionable insights.",
    description:
      "A comprehensive AI-powered assistant for farmers that uses speech recognition and text-to-speech for voice interactions. Supports multiple languages to serve diverse farming communities. Built with Gemini API for intelligent agricultural advice.",
    stack: ["React", "FastAPI", "Gemini API", "Speech API", "Python"],
    gradient: "from-primary/10 to-transparent",
    borderHover: "hover:border-primary/50",
  },
  {
    icon: Mic,
    title: "JARVIS AI Voice Assistant",
    short: "Speech-to-text, text-to-speech AI assistant powered by Gemini API.",
    description:
      "A sophisticated voice assistant inspired by JARVIS from Iron Man. Features real-time speech recognition, natural language processing via Gemini API, and text-to-speech output. Handles complex queries and multi-turn conversations.",
    stack: ["Python", "Gemini API", "Speech Recognition", "pyttsx3"],
    gradient: "from-neon-blue/10 to-transparent",
    borderHover: "hover:border-neon-blue/50",
  },
  {
    icon: Music,
    title: "Music Playlist Organizer",
    short: "Full-stack playlist manager with authentication and CRUD operations.",
    description:
      "A full-stack web application for organizing music playlists. Features JWT-based authentication, full CRUD operations, and a clean responsive UI. Users can create, edit, and manage their playlists seamlessly.",
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    gradient: "from-accent/10 to-transparent",
    borderHover: "hover:border-accent/50",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, type: "spring" as const },
  },
};

const ProjectsSection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 rounded-full bg-primary/3 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-primary font-mono text-xs tracking-widest uppercase border-primary/20 mb-6"
          >
            <Sparkles size={12} /> Featured Work
          </motion.div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold">
            Project <span className="gradient-text">Showcase</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              variants={cardVariants}
              whileHover={{ scale: 1.04, y: -8 }}
              onClick={() => setSelected(i)}
              className={`glass-card p-6 border border-border ${p.borderHover} transition-all duration-300 cursor-pointer group relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
                >
                  <p.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">{p.title}</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{p.short}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-muted text-muted-foreground">
                      {t}
                    </span>
                  ))}
                  {p.stack.length > 3 && (
                    <span className="text-xs font-mono px-2 py-1 rounded bg-muted text-muted-foreground">
                      +{p.stack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-background/80 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card border border-glass-border p-8 max-w-lg w-full relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${projects[selected].gradient} opacity-50`} />

              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-20 w-8 h-8 rounded-full bg-muted flex items-center justify-center"
              >
                <X size={16} />
              </button>

              <div className="relative z-10">
                {(() => {
                  const p = projects[selected];
                  return (
                    <>
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                        <p.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold mb-3">{p.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">{p.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {p.stack.map((t) => (
                          <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-muted text-muted-foreground border border-border">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <a href="#" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                          <Github size={16} /> GitHub
                        </a>
                        <a href="#" className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary/10 transition-colors">
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
