import { motion } from "framer-motion";
import { Layers, Circle } from "lucide-react";
import SkillsScene3D from "./SkillsScene3D";

const categories = [
  {
    title: "Frontend",
    accent: "#00d4ff",
    skills: [
      { name: "React", level: 5 },
      { name: "HTML5", level: 5 },
      { name: "CSS3", level: 4 },
      { name: "Tailwind CSS", level: 5 }
    ],
  },
  {
    title: "Backend",
    accent: "#8b5cf6",
    skills: [
      { name: "Spring Boot", level: 5 },
      { name: "Node.js", level: 4 },
      { name: "Express.js", level: 4 },
      { name: "FastAPI", level: 5 }
    ],
  },
  {
    title: "Languages",
    accent: "#10b981",
    skills: [
      { name: "Java", level: 5 },
      { name: "C++", level: 4 },
      { name: "Python", level: 5 },
      { name: "JavaScript", level: 5 }
    ],
  },
  {
    title: "Database & Tools",
    accent: "#f59e0b",
    skills: [
      { name: "MongoDB", level: 4 },
      { name: "SQL", level: 4 },
      { name: "Git", level: 5 },
      { name: "Docker", level: 3 }
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative overflow-hidden perspective-1000">
      <SkillsScene3D />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="subtitle-glow text-primary mb-4 block">Capabilities</span>
          <h2 className="font-sans text-4xl md:text-6xl font-bold">
            Tech <span className="gradient-text gradient-underline">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                rotateY: i % 2 === 0 ? 5 : -5,
                rotateX: 5,
                y: -10 
              }}
              style={{ borderColor: cat.accent }}
              className="glass-card p-6 border-t-2 group transition-all duration-500"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: cat.accent }}>
                <Layers size={18} />
                {cat.title}
              </h3>

              <div className="space-y-4">
                {cat.skills.map((skill, j) => (
                  <motion.div
                    key={skill.name}
                    animate={{ 
                      y: [0, -4, 0],
                    }}
                    transition={{ 
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2
                    }}
                    className="flex flex-col gap-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-mono text-foreground/80">{skill.name}</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div 
                          key={dot}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                            dot <= skill.level 
                              ? "bg-current opacity-100 scale-110" 
                              : "bg-white/10 opacity-30"
                          }`}
                          style={{ color: cat.accent }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Subtle Glow Border on Hover */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
                style={{ 
                  boxShadow: `0 0 40px ${cat.accent}`,
                  border: `1px solid ${cat.accent}` 
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
