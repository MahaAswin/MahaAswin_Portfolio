import { motion } from "framer-motion";
import { Trophy, Medal, Code, Zap, Award } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Top 10 — Origin Hackathon",
    description: "Competed against hundreds of teams and secured a Top 10 finish.",
    stat: "Top 10",
  },
  {
    icon: Medal,
    title: "Top 15 — CodeSprint 2026",
    description: "Ranked among the top 15 in a national-level coding sprint.",
    stat: "Top 15",
  },
  {
    icon: Code,
    title: "250+ LeetCode Problems",
    description: "Consistent problem solving across arrays, trees, graphs, and DP.",
    stat: "250+",
  },
  {
    icon: Zap,
    title: "900+ Skillrack Problems",
    description: "Sharpened fundamentals with intensive daily practice.",
    stat: "900+",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, type: "spring" as const },
  },
};

const AchievementsSection = () => {
  return (
    <section id="achievements" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-neon-blue/3 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
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
            <Award size={12} /> Milestones
          </motion.div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold">
            Key <span className="gradient-text">Achievements</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {achievements.map((a) => (
            <motion.div
              key={a.title}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass-card p-6 flex gap-5 items-start border border-border hover:border-primary/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex gap-5 items-start w-full">
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <a.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-mono font-bold text-primary">{a.stat}</span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">{a.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{a.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
