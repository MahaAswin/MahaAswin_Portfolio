import { motion } from "framer-motion";
import { Code, Server, Brain, Rocket } from "lucide-react";

const milestones = [
  {
    icon: Code,
    year: "2021",
    title: "The Foundation",
    description: "Started the coding journey with C/C++ and Data Structures & Algorithms. Built a strong problem-solving mindset.",
    color: "text-primary",
    gradient: "from-primary/20 to-transparent",
  },
  {
    icon: Server,
    year: "2022–2023",
    title: "Full Stack Mastery",
    description: "Dove deep into MERN stack and Spring Boot. Built production-ready applications with authentication, APIs, and database design.",
    color: "text-neon-blue",
    gradient: "from-neon-blue/20 to-transparent",
  },
  {
    icon: Brain,
    year: "2024–Present",
    title: "AI & Innovation",
    description: "Created AI-powered systems including JARVIS voice assistant and an AI Farmer Assistant. Pushing boundaries with Gemini API and voice tech.",
    color: "text-accent",
    gradient: "from-accent/20 to-transparent",
  },
];

const JourneySection = () => {
  return (
    <section id="journey" className="section-padding relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[300px] h-[300px] rounded-full bg-accent/3 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-primary font-mono text-xs tracking-widest uppercase border-primary/20 mb-6"
          >
            <Rocket size={12} /> My Path
          </motion.div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold">
            The <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line with glow */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-neon-blue to-accent opacity-40" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-transparent"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>

          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.2, type: "spring" }}
              className={`relative flex items-start mb-20 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex-row`}
            >
              {/* Animated dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3, type: "spring" }}
                className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10"
              >
                <div className="w-4 h-4 rounded-full bg-primary neon-glow" />
                <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary animate-ping opacity-20" />
              </motion.div>

              <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`glass-card p-6 hover:border-primary/30 transition-all group relative overflow-hidden`}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${m.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <m.icon className={`${m.color} w-4 h-4`} />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground px-2 py-0.5 rounded bg-muted">{m.year}</span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">{m.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.description}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
