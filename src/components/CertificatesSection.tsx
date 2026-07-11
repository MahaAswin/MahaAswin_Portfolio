import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const certificatesData = [
  {
    id: "nptel",
    title: "Design Thinking — A Primer",
    issuer: "IIT Madras / NPTEL",
    year: 2026,
    description: "A professional certification in product design thinking and ideation methodology.",
    driveLink: "https://drive.google.com/file/d/1ibQk3L8Czo39q24WRN99uqvciAyI-hcw/view?usp=sharing",
  },
  {
    id: "java-cert",
    title: "Java Programming",
    issuer: "Infosys",
    year: 2026,
    description: "Certified completion of Java programming fundamentals and project development.",
    driveLink: "https://drive.google.com/file/d/1NPKqWUu00RYcuEu-YdOXRgwG8nDaWPwY/view?usp=sharing",
  },
  {
    id: "genai",
    title: "Introduction to Gen AI",
    issuer: "IBM SkillBuild",
    year: 2025,
    description: "Training in generative AI applications, prompts, and modern AI workflows.",
    driveLink: "https://drive.google.com/file/d/1xgXeQnQR9C_lueeLGHEqy8eX0mdG5DD0/view?usp=sharing",
  },
  {
    id: "dsalg",
    title: "Data Structures & Algorithms",
    issuer: "Udemy",
    year: 2025,
    description: "Mastered core algorithms and data structures in C and C++.",
    driveLink: "https://drive.google.com/file/d/1PrJgzNs0xlF9dKxV2_SNNpSJTpQg_9j4/view?usp=sharing",
  },
  {
    id: "python",
    title: "Python Programming Masterclass",
    issuer: "Udemy",
    year: 2025,
    description: "Completed professional Python training covering scripting and automation.",
    driveLink: "https://drive.google.com/file/d/1TvsPcTWPhiVPu8h34wecCwhWONAwzaty/view?usp=sharing",
  },
];

const CertificateCard = ({
  cert,
  index,
}: {
  cert: (typeof certificatesData)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-primary/10 bg-surface/80 p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-xl backdrop-blur-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-primary/70">
              {cert.issuer}
            </span>
            <span className="text-xs text-muted-foreground/50">•</span>
            <span className="text-xs font-semibold text-primary/60">{cert.year}</span>
          </div>
          <h3 className="text-lg font-bold leading-tight mb-2">{cert.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {cert.description}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
          <Download size={20} className="text-primary" />
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-primary/5">
        <a
          href={cert.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center"
        >
          <Button
            variant="outline"
            size="sm"
            className="gap-2 group/btn"
          >
            View Certificate
            <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Button>
        </a>
      </div>
    </motion.div>
  );
};

const CertificatesSection = () => {
  return (
    <section id="certifications" className="section-padding relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="subtitle-glow text-primary mb-4 block">Credentials</span>
          <h2 className="font-sans text-4xl md:text-6xl font-bold">
            Professional <span className="gradient-text gradient-underline">Certifications</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm md:text-base leading-relaxed">
            A collection of verified credentials from industry leaders and educational institutions demonstrating continuous learning and skill development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificatesData.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-cyan-500/5 p-8 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            All certificates are verified and accessible via Google Drive links above.
          </p>
          <p className="text-xs text-primary/60">
            Last updated: May 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificatesSection;
