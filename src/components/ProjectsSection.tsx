import { motion } from "framer-motion";
import { useState } from "react";
import { Github, ExternalLink, Play, ArrowRight } from "lucide-react";
import { projects, Project } from "@/data/projects";
import ProjectModal from "./ProjectModal";

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="section-padding bg-background relative overflow-hidden">
      {/* Background Decors */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="subtitle-glow text-primary mb-4 block">Active Deployments</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">
              Project <span className="gradient-text">Matrix</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-md md:text-right"
          >
            Architecting robust digital ecosystems from voice-controlled AI to large-scale enterprise platforms.
          </motion.p>
        </div>

        {/* Uniform Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleProjectClick(project)}
              className="group relative bg-white/[0.03] dark:bg-[#0a0c10]/50 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 cursor-pointer flex flex-col h-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              {/* Media Preview */}
              <div className="aspect-video relative overflow-hidden bg-black/5 dark:bg-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                      <ArrowRight className="text-black" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">View Details</span>
                  </div>
                </div>
                
                {/* Corner Label */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                  <span className="text-[8px] font-black tracking-widest text-white/60 uppercase">
                    DEPLOYMENT_ID: 0{index + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-4">
                  <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-bold">
                    {project.mission}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight text-foreground mt-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-3 mb-8">
                  {project.shortDescription}
                </p>

                {/* Full Tech Stack Display (Fixed for Light Theme Visibility) */}
                <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded text-[9px] font-bold text-foreground/40 dark:text-white/40 uppercase tracking-tighter"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[9px] font-bold text-primary/60">+{project.tags.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default ProjectsSection;
