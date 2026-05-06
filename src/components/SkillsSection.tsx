import { motion } from "framer-motion";
import SkillsScene3D from "./SkillsScene3D";
import { skillCategories } from "@/data/skills";

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-background">
      <SkillsScene3D />

      <div className="max-w-6xl mx-auto relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="subtitle-glow text-primary mb-4 block">Capabilities</span>
          <h2 className="font-sans text-5xl md:text-7xl font-black tracking-tighter uppercase">
            Tech <span className="gradient-text">Arsenal</span>
          </h2>
        </motion.div>

        {/* 2-Column Grid (One row, two boxes on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillCategories.map((group, groupIdx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.1, duration: 0.8 }}
              className="glass-card p-10 border-2 border-primary/10 dark:border-primary/20 bg-primary/[0.02] dark:bg-primary/[0.03] relative group overflow-hidden shadow-2xl"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />

              <div className="flex items-center gap-4 mb-12">
                <div className="w-10 h-[2px] bg-primary rounded-full" />
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary">
                  {group.title}
                </h3>
              </div>

              {/* Icon Grid inside the Category Box */}
              <div className="flex flex-wrap gap-5 md:gap-8 justify-center md:justify-start">
                {group.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ 
                      scale: 1.15,
                      rotate: 5,
                      y: -8,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 15,
                      delay: (groupIdx * 0.05) + (skillIdx * 0.05) 
                    }}
                    className="group/icon relative"
                  >
                    {/* The Icon Box */}
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-primary/[0.05] border border-primary/10 dark:border-primary/20 rounded-xl flex items-center justify-center p-3 md:p-5 transition-all duration-500 group-hover/icon:border-primary/50 group-hover/icon:bg-primary/10 shadow-lg backdrop-blur-md">
                      <img 
                        src={`https://cdn.simpleicons.org/${skill.slug}`}
                        alt={skill.name}
                        className="w-full h-full object-contain relative z-10"
                        title={skill.name}
                      />
                    </div>

                    {/* Hover Label */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 transition-all duration-300 pointer-events-none z-20">
                      <span className="text-[8px] font-bold uppercase tracking-widest text-primary whitespace-nowrap bg-black px-2 py-1 rounded border border-primary/20">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
