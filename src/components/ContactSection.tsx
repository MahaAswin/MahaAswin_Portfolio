import { motion } from "framer-motion";
import { Linkedin, Mail, ArrowUpRight, Send } from "lucide-react";
import ContactScene3D from "./ContactScene3D";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* 3D Background */}
      <ContactScene3D />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-primary font-mono text-xs tracking-widest uppercase border-primary/20 mb-6"
          >
            <Send size={12} /> Get In Touch
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6"
          >
            Let's Build{" "}
            <span className="gradient-text">Something Together</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mb-12 max-w-xl mx-auto text-lg"
          >
            I'm always open to new opportunities, collaborations, and interesting conversations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card px-8 py-4 border border-primary/30 hover:border-primary/60 transition-all flex items-center justify-center gap-3 text-primary font-medium group"
            >
              <Linkedin size={20} />
              LinkedIn
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:mahaaswin@example.com"
              className="glass-card px-8 py-4 border border-accent/30 hover:border-accent/60 transition-all flex items-center justify-center gap-3 text-accent font-medium group"
            >
              <Mail size={20} />
              Email Me
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-24 pt-8 border-t border-border/50"
        >
          <p className="text-muted-foreground/50 text-xs font-mono">
            Designed & Built by Maha Aswin S B © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
