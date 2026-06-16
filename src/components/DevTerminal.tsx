import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, ChevronRight, CornerDownLeft, Info, HelpCircle, Code, Briefcase, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";

type TerminalTheme = "obsidian" | "matrix" | "amber" | "cyberpunk" | "light";

interface LogEntry {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const DevTerminal = () => {
  const { resolvedTheme, setTheme } = useTheme();
  // Ensure we default to light terminal if system is light, otherwise obsidian
  const [theme, setTerminalTheme] = useState<TerminalTheme>("obsidian");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showMatrix, setShowMatrix] = useState(false);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    if (resolvedTheme === "light") {
      setTerminalTheme("light");
    } else if (theme === "light") {
      setTerminalTheme("obsidian");
    }
  }, [resolvedTheme]);

  // Colors based on selected terminal theme
  const themeStyles = {
    obsidian: {
      bg: "bg-[#050814]/95 backdrop-blur-xl border-blue-500/20 text-[#a0aec0]",
      header: "bg-[#0c1224] border-b border-blue-500/20 text-blue-400",
      prompt: "text-blue-400",
      inputColor: "text-white",
      highlight: "text-cyan-400",
      accent: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      scrollbar: "scrollbar-obsidian",
      textMain: "text-white",
      borderMain: "border-white/10",
      bgSubtle: "bg-white/5",
    },
    matrix: {
      bg: "bg-black border-[#00ff66]/30 text-[#00e65c]",
      header: "bg-black border-b border-[#00ff66]/30 text-[#00ff66]",
      prompt: "text-[#00ff66]",
      inputColor: "text-[#00ff66] caret-[#00ff66]",
      highlight: "text-white font-bold",
      accent: "bg-[#00ff66]/10 text-[#00ff66] border-[#00ff66]/30",
      scrollbar: "scrollbar-matrix",
      textMain: "text-[#00ff66] font-bold",
      borderMain: "border-[#00ff66]/30",
      bgSubtle: "bg-[#00ff66]/10",
    },
    amber: {
      bg: "bg-[#160e08] border-[#ffb000]/30 text-[#e69e00]",
      header: "bg-[#1e130b] border-b border-[#ffb000]/30 text-[#ffb000]",
      prompt: "text-[#ffb000]",
      inputColor: "text-[#ffb000] caret-[#ffb000]",
      highlight: "text-[#ffcc66] font-bold",
      accent: "bg-[#ffb000]/10 text-[#ffb000] border-[#ffb000]/30",
      scrollbar: "scrollbar-amber",
      textMain: "text-[#ffb000] font-bold",
      borderMain: "border-[#ffb000]/30",
      bgSubtle: "bg-[#ffb000]/10",
    },
    cyberpunk: {
      bg: "bg-[#1c072b]/95 backdrop-blur-xl border-[#ff0055]/30 text-[#00f2ff]",
      header: "bg-[#270c3c] border-b border-[#ff0055]/30 text-[#ff0055]",
      prompt: "text-[#ff0055]",
      inputColor: "text-[#00f2ff] caret-[#00f2ff]",
      highlight: "text-[#ff0055] font-black",
      accent: "bg-[#ff0055]/10 text-[#ff0055] border-[#ff0055]/30",
      scrollbar: "scrollbar-cyber",
      textMain: "text-[#00f2ff] font-bold",
      borderMain: "border-[#ff0055]/30",
      bgSubtle: "bg-[#ff0055]/10",
    },
    light: {
      bg: "bg-white/95 backdrop-blur-xl border-gray-300 text-gray-800 shadow-xl",
      header: "bg-gray-100 border-b border-gray-300 text-gray-700",
      prompt: "text-blue-600 font-bold",
      inputColor: "text-black",
      highlight: "text-blue-600 font-bold",
      accent: "bg-gray-100 text-gray-800 border-gray-300",
      scrollbar: "scrollbar-light",
      textMain: "text-black font-semibold",
      borderMain: "border-gray-300",
      bgSubtle: "bg-gray-100",
    }
  };

  const currentStyle = themeStyles[theme];

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Initial greeting
  useEffect(() => {
    setLogs([
      {
        command: "system_init",
        output: (
          <div className="space-y-2 font-mono text-xs">
            <p className={theme === "light" ? "text-emerald-600 font-bold" : "text-emerald-500"}>✔ Connection established with host: maha-aswin-s-b</p>
            <p className={theme === "light" ? "text-blue-600 font-bold" : "text-cyan-400"}>⚡ Dynamic interactive CLI dashboard loaded.</p>
            <p className="opacity-80">Welcome, guest developer! Double-click to focus console.</p>
            <div className={`mt-2 mb-2 p-2 rounded border ${currentStyle.bgSubtle} ${currentStyle.borderMain}`}>
              <p className={`font-bold mb-1 ${currentStyle.textMain}`}>Available commands:</p>
              <p className="text-[10px] sm:text-xs leading-relaxed">
                <span className={currentStyle.highlight}>help</span> - list commands<br/>
                <span className={currentStyle.highlight}>about</span> - biographic overview<br/>
                <span className={currentStyle.highlight}>skills</span> - tech capabilities<br/>
                <span className={currentStyle.highlight}>projects</span> - project database<br/>
                <span className={currentStyle.highlight}>neofetch</span> - system info<br/>
                <span className={currentStyle.highlight}>theme</span> - toggle ui color scheme<br/>
                <span className={currentStyle.highlight}>contact</span> - connect channels<br/>
                <span className={currentStyle.highlight}>matrix</span> - digital rain<br/>
                <span className={currentStyle.highlight}>clear</span> - wipe logs
              </p>
            </div>
            <p className="text-[10px] opacity-50">----------------------------------------------------</p>
          </div>
        ),
        timestamp: getTimestamp(),
      },
    ]);
  }, [theme]);

  const getTimestamp = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const getUptime = () => {
    const diff = Math.floor((Date.now() - startTime.current) / 1000);
    const m = Math.floor(diff / 60);
    const s = diff % 60;
    return `${m}m ${s}s`;
  };

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const parts = trimmed.split(" ");
    const mainCommand = parts[0].toLowerCase();
    const args = parts.slice(1);

    const nextHistory = [...history, trimmed];
    setHistory(nextHistory);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (mainCommand) {
      case "help":
        output = (
          <div className="space-y-1 text-xs">
            <p className={`font-bold border-b pb-1 mb-2 ${currentStyle.borderMain} ${currentStyle.textMain}`}>Available Shell Commands:</p>
            <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-1">
              <span className={`font-bold ${currentStyle.textMain}`}>about</span>
              <span>Prints biographic background overview.</span>
              <span className={`font-bold ${currentStyle.textMain}`}>skills</span>
              <span>Renders skill bars of core tech capabilities.</span>
              <span className={`font-bold ${currentStyle.textMain}`}>projects</span>
              <span>Lists all projects. Type <code className={`${currentStyle.highlight}`}>projects [id]</code> to read description.</span>
              <span className={`font-bold ${currentStyle.textMain}`}>neofetch</span>
              <span>Displays terminal details and customized ASCII header.</span>
              <span className={`font-bold ${currentStyle.textMain}`}>matrix</span>
              <span>Launches fullscreen digital waterfall canvas animation.</span>
              <span className={`font-bold ${currentStyle.textMain}`}>theme</span>
              <span>Toggles system dashboard color scheme (light/dark).</span>
              <span className={`font-bold ${currentStyle.textMain}`}>contact</span>
              <span>Displays clickable contact channels and links.</span>
              <span className={`font-bold ${currentStyle.textMain}`}>clear</span>
              <span>Wipes the terminal display logs clean.</span>
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="text-xs space-y-3 max-w-2xl leading-relaxed">
            <p className={`text-sm font-bold ${currentStyle.textMain}`}>Profile: Maha Aswin S B</p>
            <p>
              I am a dedicated full-stack engineer specialized in creating high-performance, immersive software systems.
              I craft clean architectures using the MERN Stack, Spring Boot, and Python, incorporating modern AI endpoints.
            </p>
            <p>
              Driven by a constant hunger for problem-solving, I've solved over <span className={theme === "light" ? "text-orange-600 font-bold" : "text-amber-500 font-bold"}>250+ LeetCode problems</span> and completed <span className={theme === "light" ? "text-blue-700 font-bold" : "text-indigo-400 font-bold"}>900+ daily challenges on Skillrack</span>.
            </p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="text-xs space-y-3">
            <p className={`font-bold border-b pb-1 mb-2 ${currentStyle.borderMain} ${currentStyle.textMain}`}>Tech Stack Arsenal Metrics:</p>
            <div className="space-y-2">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="space-y-1">
                  <span className={`font-mono uppercase text-[10px] font-bold tracking-widest ${currentStyle.textMain}`}>{cat.title}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                    {cat.skills.map((skill, idx) => {
                      const mockPct = 75 + (skill.name.length * 3) % 21;
                      const barFill = "█".repeat(Math.round(mockPct / 10)) + "░".repeat(10 - Math.round(mockPct / 10));
                      return (
                        <div key={skill.name} className="flex justify-between items-center font-mono">
                          <span>{skill.name}</span>
                          <span className="opacity-80 font-mono text-[10px]">
                            {barFill} {mockPct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        if (args.length > 0) {
          const queryId = args[0].toLowerCase();
          const proj = projects.find(p => p.id.toLowerCase() === queryId);
          if (proj) {
            output = (
              <div className="text-xs space-y-2 max-w-xl">
                <p className={`text-sm font-bold uppercase ${currentStyle.textMain}`}>{proj.title}</p>
                <p className={`${currentStyle.highlight} text-[10px] font-mono`}>{proj.mission}</p>
                <p className="leading-relaxed mt-2">{proj.description}</p>
                <div className="flex gap-2 flex-wrap pt-2">
                  {proj.tags.map(tag => (
                    <span key={tag} className={`px-1.5 py-0.5 border rounded text-[9px] ${currentStyle.bgSubtle} ${currentStyle.borderMain}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={`flex gap-4 mt-4 pt-2 border-t ${currentStyle.borderMain}`}>
                  <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1 font-bold">
                    🔗 GitHub Repository
                  </a>
                  {proj.demoUrl && (
                    <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline flex items-center gap-1 font-bold">
                      🔗 Live Demo
                    </a>
                  )}
                </div>
              </div>
            );
          } else {
            output = <span className="text-red-500">Project id "{args[0]}" not found. Try one of: {projects.map(p => p.id).join(", ")}</span>;
          }
        } else {
          output = (
            <div className="text-xs space-y-2">
              <p className={`font-bold border-b pb-1 mb-2 ${currentStyle.borderMain} ${currentStyle.textMain}`}>Project Database Entries:</p>
              <div className="space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id} className="border border-transparent hover:border-current rounded p-1 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className={`font-bold ${currentStyle.textMain}`}>{proj.title}</span>
                      <span className={`text-[10px] font-mono ${currentStyle.highlight}`}>{proj.id}</span>
                    </div>
                    <p className="opacity-80 text-[11px] line-clamp-1">{proj.shortDescription}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] opacity-70 mt-3">💡 Type <code className={`font-bold ${currentStyle.highlight}`}>projects [id]</code> (e.g. <code className={currentStyle.highlight}>projects jarvis</code>) to load full credentials.</p>
            </div>
          );
        }
        break;

      case "neofetch":
        output = (
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 font-mono text-xs items-center">
            <pre className={`${currentStyle.highlight} font-bold leading-none select-none text-[10px]`}>
{`   __  __ ____  ____  
  |  \\/  / ___|| __ ) 
  | |\\/| \\___ \\|  _ \\ 
  | |  | |___) | |_) |
  |_|  |_|____/|____/ 
  
  -- FULLSTACK ENGINE --
`}
            </pre>
            <div className="space-y-1">
              <p className={`text-sm font-bold ${currentStyle.textMain}`}>visitor@msb-terminal</p>
              <p className="opacity-40">----------------------</p>
              <p><span className={currentStyle.highlight}>OS:</span> MahaOS Web v1.2.0</p>
              <p><span className={currentStyle.highlight}>Kernel:</span> React 18.3 & TypeScript</p>
              <p><span className={currentStyle.highlight}>Uptime:</span> {getUptime()}</p>
              <p><span className={currentStyle.highlight}>Shell:</span> portfolio-zsh-env</p>
              <p><span className={currentStyle.highlight}>Terminal Theme:</span> {theme.toUpperCase()}</p>
              <p><span className={currentStyle.highlight}>Screen Size:</span> {window.innerWidth}x{window.innerHeight} px</p>
              <p><span className={currentStyle.highlight}>CPU Mock:</span> Core Thread (AI Optimized)</p>
            </div>
          </div>
        );
        break;

      case "matrix":
        setShowMatrix(true);
        output = <span className="text-emerald-500 font-bold">Loading digital rain environment... Press ESC or click floating exit button to quit matrix mode.</span>;
        break;

      case "theme": {
        const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        output = <span>System stylesheet theme toggled to: <strong className={currentStyle.textMain}>{nextTheme.toUpperCase()}</strong></span>;
        break;
      }

      case "contact":
        output = (
          <div className="text-xs space-y-2">
            <p className={`font-bold border-b pb-1 mb-2 ${currentStyle.borderMain} ${currentStyle.textMain}`}>Connect Channels:</p>
            <div className="space-y-1">
              <p>📧 Email: <a href="mailto:mahaaswinsb@gmail.com" className="text-blue-500 hover:underline">mahaaswinsb@gmail.com</a></p>
              <p>🔗 LinkedIn: <a href="https://www.linkedin.com/in/maha-aswin-s-b-288b43313/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">maha-aswin-s-b-288b43313</a></p>
              <p>🐙 GitHub: <a href="https://github.com/MahaAswin" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">github.com/MahaAswin</a></p>
              <p>📍 Location: Tamil Nadu, India (IST)</p>
            </div>
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        setInput("");
        return;

      default:
        output = (
          <span className="text-red-500 font-bold">
            command not found: "{mainCommand}". Type <span className="underline">help</span> to view available terminal inputs.
          </span>
        );
    }

    setLogs((prev) => [
      ...prev,
      {
        command: cmdText,
        output,
        timestamp: getTimestamp(),
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(history[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      }
    }
  };

  return (
    <section id="dev-console" className="section-padding relative overflow-hidden bg-background">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="subtitle-glow text-primary mb-4 block">Interactive Workspace</span>
          <h2 className="font-sans text-4xl md:text-6xl font-bold uppercase tracking-tight">
            Developer <span className="gradient-text">Console</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-sm leading-relaxed">
            Run shell commands on an interactive console mockup to inspect skills, neofetch variables, and projects.
          </p>
        </motion.div>

        {/* Terminal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => inputRef.current?.focus()}
          className={`relative h-[480px] rounded-2xl border flex flex-col overflow-hidden shadow-2xl transition-all duration-500 group ${currentStyle.bg}`}
        >
          {/* Header Bar */}
          <div className={`flex items-center justify-between px-5 py-3.5 select-none ${currentStyle.header}`}>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wider uppercase opacity-80">
              <Terminal size={12} />
              <span>bash - maha@aswin-desktop</span>
            </div>

            {/* Theme Selectors */}
            <div className="flex gap-2 z-20">
              {(["obsidian", "matrix", "amber", "cyberpunk", "light"] as TerminalTheme[]).map((t) => (
                <button
                  key={t}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTerminalTheme(t);
                  }}
                  className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold tracking-widest uppercase border transition-all ${
                    theme === t
                      ? "bg-primary text-primary-foreground border-primary"
                      : `${currentStyle.bgSubtle} ${currentStyle.borderMain} hover:opacity-100 opacity-60`
                  }`}
                  title={`Toggle ${t} terminal UI`}
                >
                  {t.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Console Log Output */}
          <div className={`flex-1 p-6 overflow-y-auto font-mono ${currentStyle.scrollbar} relative`}>
            {/* Falling Matrix Rain Screen Overlay */}
            {showMatrix && (
              <MatrixRain
                color={theme === "matrix" ? "#00ff66" : theme === "amber" ? "#ffb000" : theme === "cyberpunk" ? "#ff00aa" : theme === "light" ? "#00d4ff" : "#00d4ff"}
                onExit={() => setShowMatrix(false)}
              />
            )}

            <div className="space-y-4">
              {logs.map((log, index) => (
                <div key={index} className="space-y-2">
                  {log.command !== "system_init" && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`font-bold ${currentStyle.prompt}`}>visitor@msb-terminal:~$</span>
                      <span className={`${currentStyle.textMain}`}>{log.command}</span>
                      <span className="ml-auto text-[9px] opacity-40">{log.timestamp}</span>
                    </div>
                  )}
                  <div className={`pl-2 border-l text-xs whitespace-pre-wrap leading-relaxed ${currentStyle.borderMain}`}>
                    {log.output}
                  </div>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>

          {/* Interactive Shell Prompt Input Bar */}
          <div className={`px-6 py-4 border-t flex items-center gap-2 select-none ${currentStyle.bgSubtle} ${currentStyle.borderMain}`}>
            <span className={`font-mono text-xs shrink-0 ${currentStyle.prompt}`}>
              visitor@msb-terminal:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`flex-1 bg-transparent border-none outline-none font-mono text-xs font-medium focus:ring-0 placeholder:opacity-30 ${currentStyle.inputColor}`}
              placeholder='Type a command (e.g. "help", "neofetch") and hit Enter...'
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
            />
            <button
              onClick={() => handleCommand(input)}
              className={`p-1.5 rounded border transition-all ${currentStyle.prompt} ${currentStyle.bgSubtle} ${currentStyle.borderMain} hover:opacity-80`}
              title="Execute command"
            >
              <CornerDownLeft size={12} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Canvas-based Digital Matrix Falling Rain Effect
interface MatrixRainProps {
  color: string;
  onExit: () => void;
}

const MatrixRain = ({ color, onExit }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters (Katana & Binary & Alphabets)
    const characters = "01011001011001010010101101010101001010101101010101010100110101010110011001010101011001";
    const charArray = characters.split("");
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);

    // Initial drops y positions
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      // semi-transparent background to create trail fade
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // resets y or move down drops randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    // Keyboard listener to quit matrix
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [color, onExit]);

  return (
    <div className="absolute inset-0 z-30 bg-black flex flex-col">
      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Dismiss Button Overlay */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onExit();
        }}
        className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-black/60 border border-white/20 hover:border-white/50 hover:bg-black/90 rounded text-[9px] font-mono tracking-widest uppercase text-white flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
      >
        <X size={10} />
        <span>Exit [Esc]</span>
      </button>
    </div>
  );
};
