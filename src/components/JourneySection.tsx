import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Rocket, Satellite, Radio, Sparkles, Award } from "lucide-react";

const milestones = [
  {
    icon: Rocket,
    year: "2021",
    title: "Launch Phase",
    description: "Started the mission with C/C++ and Data Structures. Initialized core systems and logic protocols.",
    color: "text-cyan-400",
  },
  {
    icon: Satellite,
    year: "2022–2023",
    title: "Orbital Mastery",
    description: "Deployed full-stack satellites using MERN and Spring Boot. Establishing robust communication arrays.",
    color: "text-purple-400",
  },
  {
    icon: Radio,
    year: "2024–Present",
    title: "Deep Space Station",
    description: "Commanding AI-powered research hubs. Integrating Gemini API and voice navigation systems.",
    color: "text-blue-400",
  },
];

const JourneySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <section id="journey" ref={containerRef} className="section-padding relative overflow-hidden bg-background">
      {/* Decorative Ghost Background Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-black text-foreground/5 pointer-events-none select-none z-0">
        JOURNEY
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <span className="subtitle-glow text-primary mb-4 block">Professional Evolution</span>
            <h2 className="font-sans text-4xl md:text-6xl font-black tracking-tighter mb-6">
              THE <span className="gradient-text">TRAJECTORY</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              From coding fundamental logic to architecting complex AI ecosystems, my journey has been a continuous climb toward engineering excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
              <img 
                src="/uploads/profile-white-shirt.png" 
                alt="Professional focus" 
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>
        </div>

        <div className="relative mt-20">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 overflow-hidden hidden md:block">
            <div className="w-full h-full bg-foreground/5" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-accent to-secondary origin-top"
              style={{ scaleY: pathLength }}
            />
          </div>

          <div className="space-y-16">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`relative flex items-center ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:flex-row`}
              >
                {/* Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 hidden md:flex">
                  <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center border-primary/20 bg-background/80 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                    <m.icon className="text-primary w-6 h-6" />
                  </div>
                </div>

                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? "md:pr-24" : "md:pl-24"}`}>
                  <div className={`glass-card p-8 group transition-all duration-500 border-2 ${m.color.replace('text-', 'border-')}/30 ${m.color.replace('text-', 'bg-')}/10 hover:${m.color.replace('text-', 'border-')}/60`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-primary tracking-widest px-3 py-1 bg-primary/10 rounded-full">
                        {m.year}
                      </span>
                      <m.icon className="md:hidden text-primary w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-primary transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
