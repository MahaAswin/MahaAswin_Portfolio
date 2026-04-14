import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import SkillsScene3D from "./SkillsScene3D";

const categories = [
  {
    title: "Frontend",
    gradient: "from-primary/10 to-primary/5",
    borderColor: "hover:border-primary/40",
    iconBg: "bg-primary/10",
    skills: ["React", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    title: "Backend",
    gradient: "from-neon-blue/10 to-neon-blue/5",
    borderColor: "hover:border-neon-blue/40",
    iconBg: "bg-neon-blue/10",
    skills: ["Spring Boot", "Node.js", "Express.js", "FastAPI"],
  },
  {
    title: "Languages",
    gradient: "from-accent/10 to-accent/5",
    borderColor: "hover:border-accent/40",
    iconBg: "bg-accent/10",
    skills: ["Java", "C++", "Python", "JavaScript"],
  },
  {
    title: "Database & Tools",
    gradient: "from-secondary/10 to-secondary/5",
    borderColor: "hover:border-secondary/40",
    iconBg: "bg-secondary/10",
    skills: ["MongoDB", "SQL", "Git", "Docker"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, type: "spring" as const },
  },
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* 3D Background */}
      <SkillsScene3D />

      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px] pointer-events-none" />

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
            <Layers size={12} /> Tech Stack
          </motion.div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold">
            Tech <span className="gradient-text">Arsenal</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -6 }}
              className={`glass-card p-6 border border-border ${cat.borderColor} transition-all duration-300 group relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <h3 className="font-heading text-lg font-semibold mb-5 text-foreground flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${cat.iconBg} flex items-center justify-center`}>
                    <span className="text-xs font-mono text-primary">{`{}`}</span>
                  </div>
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1.5 rounded-lg text-sm font-mono bg-muted/80 text-foreground border border-border/50 cursor-default transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
