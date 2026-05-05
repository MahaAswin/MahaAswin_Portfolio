import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Trophy, Medal, Code, Zap, Award } from "lucide-react";

const achievements = [
  {
    id: "hackathon",
    icon: Trophy,
    title: "Top 10 — Origin Hackathon",
    description: "Competed against hundreds of teams and secured a Top 10 finish.",
    value: 10,
    prefix: "Top ",
    color: "#fbbf24", // Gold
  },
  {
    id: "codesprint",
    icon: Medal,
    title: "Top 15 — CodeSprint 2026",
    description: "Ranked among the top 15 in a national-level coding sprint.",
    value: 15,
    prefix: "Top ",
    color: "#f59e0b", // Amber
  },
  {
    id: "leetcode",
    icon: () => (
      <img 
        src="https://cdn.simpleicons.org/leetcode/FFA116" 
        alt="LeetCode" 
        className="w-5 h-5"
      />
    ),
    title: "250+ LeetCode Problems",
    description: "Consistent problem solving across arrays, trees, graphs, and DP.",
    value: 250,
    suffix: "+",
    color: "#FFA116", // LeetCode Orange
  },
  {
    id: "skillrack",
    icon: Zap,
    title: "900+ Skillrack Problems",
    description: "Sharpened fundamentals with intensive daily practice.",
    value: 900,
    suffix: "+",
    color: "#6366f1", // Indigo
  },
];

const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const AchievementCard = ({ achievement, index }: { achievement: typeof achievements[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      animate={{ 
        y: [0, -8, 0],
        rotate: [0, index % 2 === 0 ? 1 : -1, 0]
      }}
      transition={{ 
        y: {
          duration: 5 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5
        },
        rotate: {
          duration: 6 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5
        }
      }}
      whileHover={{ 
        scale: 1.04, 
        y: -10,
        boxShadow: `0 0 30px ${achievement.color}44`,
        borderColor: achievement.color
      }}
      className="glass-card p-8 flex flex-col items-center text-center gap-4 group transition-all duration-500 border border-white/5 relative"
    >
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg]"
        style={{ backgroundColor: `${achievement.color}11`, color: achievement.color }}
      >
        <achievement.icon />
      </div>

      <div className="text-3xl font-bold font-mono" style={{ color: achievement.color }}>
        <AnimatedCounter 
          value={achievement.value} 
          prefix={achievement.prefix} 
          suffix={achievement.suffix} 
        />
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {achievement.description}
        </p>
      </div>

      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
        style={{ backgroundColor: achievement.color }}
      />
    </motion.div>
  );
};

const AchievementsSection = () => {
  return (
    <section id="achievements" className="section-padding relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="subtitle-glow text-primary mb-4 block">Milestones</span>
          <h2 className="font-sans text-4xl md:text-6xl font-bold">
            Key <span className="gradient-text gradient-underline">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((a, i) => (
            <AchievementCard key={a.id} achievement={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
