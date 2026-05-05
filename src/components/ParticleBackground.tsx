import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const ParticleBackground = () => {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      type: "dust" | "debris" | "orb";
      parallax: number;
    }[] = [];

    const isDark = resolvedTheme === "dark";
    const colors = isDark 
      ? ["#00d4ff", "#8b5cf6", "#ffffff", "#3b82f6"] 
      : ["#FFC107", "#FF9800", "#000000", "#FFB300"]; // Keeping Sunlit Gold colors

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = Math.min(100, Math.floor(window.innerWidth / 12));
      particles = Array.from({ length: count }, () => {
        const typeRand = Math.random();
        let type: "dust" | "debris" | "orb" = "dust";
        let size = Math.random() * 1.5 + 0.5;
        let parallax = 0.5 + Math.random() * 0.5;

        if (typeRand > 0.9) {
          type = "orb";
          size = Math.random() * 3 + 2;
          parallax = 1.2;
        } else if (typeRand > 0.7) {
          type = "debris";
          size = Math.random() * 2 + 1;
          parallax = 0.8;
        }

        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size,
          opacity: Math.random() * (isDark ? 0.5 : 0.3) + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          type,
          parallax,
        };
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentScroll = scrollYRef.current;
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const drawY = (p.y - currentScroll * p.parallax) % canvas.height;
        const finalY = drawY < 0 ? drawY + canvas.height : drawY;

        ctx.beginPath();
        if (p.type === "orb") {
          const gradient = ctx.createRadialGradient(p.x, finalY, 0, p.x, finalY, p.size);
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.arc(p.x, finalY, p.size, 0, Math.PI * 2);
        } else if (p.type === "debris") {
          ctx.fillStyle = p.color;
          ctx.rect(p.x, finalY, p.size, p.size);
        } else {
          ctx.fillStyle = p.color;
          ctx.arc(p.x, finalY, p.size, 0, Math.PI * 2);
        }

        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();
    
    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [resolvedTheme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default ParticleBackground;
