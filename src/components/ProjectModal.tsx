import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Play, Globe } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="relative w-full max-w-6xl h-[95vh] md:h-[85vh] bg-[#0a0c10] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[110] w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Left Side: Media Gallery */}
            <div className="w-full md:w-[65%] h-[40%] md:h-full bg-black/40 overflow-y-auto custom-scrollbar p-6 md:p-8">
              <div className="space-y-8">
                {/* Main Media (Video or Image) */}
                <div className="aspect-video w-full rounded-xl bg-white/5 overflow-hidden relative border border-white/10 shadow-2xl">
                  {project.videoUrl ? (
                    <iframe
                      src={project.videoUrl}
                      className="w-full h-full"
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Screenshots Gallery Section */}
                <div className="space-y-4">
                  <h4 className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black">Visual Assets</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {project.screenshots.map((src, i) => (
                      <div key={i} className="aspect-video rounded-lg overflow-hidden border border-white/5 hover:border-primary/30 transition-all group">
                        <img 
                          src={src} 
                          alt={`${project.title} screenshot ${i}`} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Project Data */}
            <div className="w-full md:w-[35%] h-[60%] md:h-full p-8 md:p-12 flex flex-col border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto custom-scrollbar bg-gradient-to-br from-transparent to-primary/5">
              <div className="flex-1">
                <span className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">
                  {project.mission}
                </span>
                <h2 className="text-4xl font-black text-white tracking-tighter mb-8 leading-tight">
                  {project.title}
                </h2>
                
                <div className="space-y-8">
                  {/* Tech Stack Full Names */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-bold text-primary/80 uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">System Intelligence</h4>
                    <p className="text-white/60 text-sm leading-relaxed font-medium">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Deployment & Source Controls */}
              <div className="mt-auto pt-12 flex flex-col gap-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-black font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-primary/90 transition-all hover:translate-y-[-2px] shadow-[0_10px_30px_rgba(255,193,7,0.2)]"
                  >
                    <Globe size={16} />
                    View Demo Video
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-white/10 transition-all hover:translate-y-[-2px]"
                >
                  <Github size={16} />
                  Access Source Code
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
