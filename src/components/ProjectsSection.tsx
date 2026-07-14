import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Github, Globe, Play, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { projects, Project } from "@/data/projects";
import ProjectModal from "./ProjectModal";
import { useTheme } from "next-themes";

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleNext = () => {
    if (activeIndex < projects.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  // Helper to determine if a URL represents a video demo (e.g. Google Drive, YouTube)
  const isVideoLink = (url?: string) => {
    if (!url) return false;
    return url.includes("drive.google.com") || url.includes("youtube.com") || url.includes("vimeo.com") || url.endsWith(".mp4") || url.includes("/file/d/");
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;

      if (e.key === "ArrowRight") {
        if (activeIndex < projects.length - 1) {
          e.preventDefault();
          setActiveIndex((prev) => prev + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (activeIndex > 0) {
          e.preventDefault();
          setActiveIndex((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  // Trackpad/Mouse-wheel scroll-pinning logic (bi-directional scroll locking)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lastTime = 0;

    const onWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      // Section is completely in the screen if it fills the viewport (with a 50px tolerance)
      const isCompletelyInScreen = rect.top <= 50 && rect.bottom >= window.innerHeight - 50;

      if (!isCompletelyInScreen) {
        // Let natural page scroll happen so the section can scroll into full view
        return;
      }

      const now = Date.now();
      const deltaY = e.deltaY;
      if (Math.abs(deltaY) < 35) return; // Ignore slight scroll shifts

      if (deltaY > 0) {
        // Scrolling Down:
        // Lock page scroll and step to next card ONLY if we haven't reached the last project
        if (activeIndex < projects.length - 1) {
          e.preventDefault();
          if (now - lastTime > 800) {
            setActiveIndex((prev) => prev + 1);
            lastTime = now;
          }
        }
        // If we are at the last project, let scroll bubble to scroll past to Achievements
      } else {
        // Scrolling Up:
        // Lock page scroll and step to previous card ONLY if we haven't reached the first project (01)
        if (activeIndex > 0) {
          e.preventDefault();
          if (now - lastTime > 800) {
            setActiveIndex((prev) => prev - 1);
            lastTime = now;
          }
        }
        // If we are at the first project, let scroll bubble to scroll past up to Skills
      }
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      section.removeEventListener("wheel", onWheel);
    };
  }, [activeIndex]);

  // Touch & drag gestures
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      if (activeIndex < projects.length - 1) {
        setActiveIndex((prev) => prev + 1);
      }
    } else if (info.offset.x > swipeThreshold) {
      if (activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
    }
  };

  const isMobile = windowWidth < 768;
  const cardWidth = isMobile ? 90 : 80; // in vw (enlarged from 85/75)
  const gap = isMobile ? 4 : 3; // in vw
  const trackOffset = -activeIndex * (cardWidth + gap) + (100 - cardWidth) / 2;

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="section-padding bg-background relative overflow-hidden min-h-screen flex flex-col justify-between"
    >
      {/* Background Neon Decor Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 flex flex-col justify-between flex-1 gap-12">
        {/* Header Row */}
        <div className="flex items-end justify-between w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="subtitle-glow text-primary mb-2 block">Featured Work</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase">
              Project <span className="gradient-text">Showcase</span>
            </h2>
          </motion.div>

          {/* Luxury Circular Nav Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                activeIndex === 0 
                  ? "border-white/5 text-white/20 cursor-not-allowed" 
                  : "border-primary/20 hover:border-primary/60 text-primary hover:bg-primary/10 active:scale-95"
              }`}
              title="Previous project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === projects.length - 1}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                activeIndex === projects.length - 1 
                  ? "border-white/5 text-white/20 cursor-not-allowed" 
                  : "border-primary/20 hover:border-primary/60 text-primary hover:bg-primary/10 active:scale-95"
              }`}
              title="Next project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Premium Cinematic Horizontal Showcase Slider */}
        <div className="relative w-full h-[65vh] md:h-[70vh] flex items-center overflow-visible select-none">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={{
              x: `${trackOffset}vw`
            }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="flex gap-[3vw] absolute left-0 items-center overflow-visible cursor-grab active:cursor-grabbing w-max"
          >
            {projects.map((project, idx) => {
              const isActive = idx === activeIndex;
              const projectNumber = String(idx + 1).padStart(2, "0");

              return (
                <motion.div
                  key={project.id}
                  onClick={() => {
                    if (!isActive) {
                      setActiveIndex(idx);
                    }
                  }}
                  animate={{
                    scale: isActive ? 1.05 : 0.95,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-[90vw] md:w-[80vw] max-w-[1200px] h-[65vh] md:h-[60vh] shrink-0 rounded-3xl border border-primary/20 bg-card dark:bg-black/60 backdrop-blur-3xl overflow-hidden flex flex-col md:flex-row relative transition-all duration-500 shadow-2xl ${
                    isActive ? "hover:border-primary/50" : "cursor-pointer"
                  }`}
                >
                  {/* Left Panel: Text Details */}
                  <div className="w-full md:w-[50%] h-[55%] md:h-full p-6 md:p-10 flex flex-col justify-between z-10 relative overflow-y-auto custom-scrollbar">
                    {/* Big Watermark Index Number */}
                    <div className="absolute top-2 right-6 text-[8rem] md:text-[11rem] font-black text-foreground/[0.04] dark:text-white/[0.01] pointer-events-none select-none font-mono tracking-tighter leading-none">
                      {projectNumber}
                    </div>

                    <div className="space-y-3">
                      <span className="text-[9px] font-mono text-primary uppercase tracking-[0.3em] font-bold block">
                        {project.mission}
                      </span>
                      <h3 className="text-xl md:text-3xl font-black tracking-tight text-foreground leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm font-medium leading-relaxed max-w-md line-clamp-3 md:line-clamp-4">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Tech Stack Chips & Action Buttons */}
                    <div className="space-y-4 pt-4 border-t border-border/40 mt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-2.5 py-1 bg-primary/5 border border-primary/10 rounded text-[8px] md:text-[9px] font-bold text-primary uppercase tracking-widest"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-wrap gap-2.5 pt-2">
                        {/* Live Site button */}
                        {(project.liveUrl || (project.demoUrl && !isVideoLink(project.demoUrl))) && (
                          <a
                            href={project.liveUrl || project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3.5 py-2 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[9px] rounded-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-[0_5px_15px_rgba(255,193,7,0.15)]"
                          >
                            <Globe size={12} />
                            Visit Live Site
                          </a>
                        )}
                        {/* Demo Video button */}
                        {(project.videoUrl || (project.demoUrl && isVideoLink(project.demoUrl))) && (
                          <a
                            href={project.videoUrl || project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3.5 py-2 bg-secondary text-secondary-foreground border border-border/30 font-black uppercase tracking-widest text-[9px] rounded-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95"
                          >
                            <Play size={12} />
                            View Demo Video
                          </a>
                        )}
                        {/* Github Source button */}
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3.5 py-2 bg-transparent border border-border/40 text-foreground font-black uppercase tracking-widest text-[9px] rounded-lg hover:bg-muted/40 transition-all hover:scale-105 active:scale-95"
                        >
                          <Github size={12} />
                          Source Code
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel: Screenshot Preview Mockup */}
                  <div className="w-full md:w-[50%] h-[45%] md:h-full bg-muted/5 flex items-center justify-center p-6 relative overflow-hidden">
                    <div 
                      onClick={() => handleProjectClick(project)}
                      className="relative w-full max-w-[400px] aspect-video rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-border/30 group/mockup cursor-pointer"
                    >
                      {/* Fake Web Browser header */}
                      <div className="absolute top-0 left-0 right-0 h-5 bg-muted dark:bg-black/80 border-b border-border/40 dark:border-white/10 flex items-center gap-1.5 px-3 z-20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
                      </div>

                      {/* Main Image */}
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover pt-5 transition-transform duration-700 group-hover/mockup:scale-105"
                        loading="lazy"
                      />

                      {/* Expand overlay */}
                      {isActive && (
                        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pt-5">
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                              <Maximize2 size={14} />
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-white mt-1">Expand Gallery</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Page Indicator Dots */}
        <div className="flex justify-center items-center gap-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className="py-2 focus:outline-none"
              title={`View project ${idx + 1}`}
            >
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === activeIndex 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Embedded details / screenshots gallery Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default ProjectsSection;
