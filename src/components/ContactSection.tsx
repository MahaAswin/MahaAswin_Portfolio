import { motion } from "framer-motion";
import { Linkedin, Mail, Github, MapPin, ExternalLink, Send } from "lucide-react";
import ContactScene3D from "./ContactScene3D";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <ContactScene3D />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="subtitle-glow text-primary mb-4 block">Connection</span>
          <h2 className="font-sans text-4xl md:text-6xl font-bold mb-8">
            Let's Build <span className="gradient-text gradient-underline">Something Together</span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mb-12 max-w-xl mx-auto text-lg leading-relaxed"
          >
            I'm always open to new opportunities, collaborations, and interesting conversations about the future of tech.
          </motion.p>

          <div className="flex flex-wrap gap-6 justify-center mb-16">
            <motion.a
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card px-8 py-4 flex items-center gap-3 font-medium transition-all border-[#0077b5]/20 bg-[#0077b5]/5 hover:border-[#0077b5]/50 group"
              style={{ "--glow-color": "#0077b5" } as React.CSSProperties}
            >
              <Linkedin className="text-[#0077b5] group-hover:drop-shadow-[0_0_8px_#0077b5]" />
              LinkedIn
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" style={{ boxShadow: "0 0 30px #0077b5", border: "1px solid #0077b5" }} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:mahaaswin@example.com"
              className="glass-card px-8 py-4 flex items-center gap-3 font-medium transition-all border-[#8b5cf6]/20 bg-[#8b5cf6]/5 hover:border-[#8b5cf6]/50 group"
            >
              <Mail className="text-[#8b5cf6] group-hover:drop-shadow-[0_0_8px_#8b5cf6]" />
              Email Me
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" style={{ boxShadow: "0 0 30px #8b5cf6", border: "1px solid #8b5cf6" }} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card px-8 py-4 flex items-center gap-3 font-medium transition-all border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/5 hover:border-black/50 dark:hover:border-white/50 group"
            >
              <Github className="text-white group-hover:drop-shadow-[0_0_8px_white]" />
              GitHub
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" style={{ boxShadow: "0 0 30px white", border: "1px solid white" }} />
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-4 text-sm font-mono text-muted-foreground/60"
          >
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Tamil Nadu, India · IST (UTC+5:30)</span>
            </div>
            <p>Designed & Built by Maha Aswin S B © {new Date().getFullYear()}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
