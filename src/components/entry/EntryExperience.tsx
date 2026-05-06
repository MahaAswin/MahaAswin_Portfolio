import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundManager } from "./useSoundManager";
import { TunnelScene } from "./TunnelScene";

export type EntryState = "door" | "opening" | "teleport" | "final" | "entered";

interface EntryExperienceProps {
  onComplete: () => void;
}

export const EntryExperience = ({ onComplete }: EntryExperienceProps) => {
  const [state, setState] = useState<EntryState>("door");
  const {
    playAmbient,
    playVoice,
    playDoor,
    playTeleport,
    unlockAudio,
    fadeOutAmbient,
    stopAll,
  } = useSoundManager();

  useEffect(() => {
    playAmbient();
  }, [playAmbient]);

  useEffect(() => {
    if (state !== "door") return;
    const voiceTimer = window.setTimeout(() => playVoice(), 1000);
    return () => {
      window.clearTimeout(voiceTimer);
    };
  }, [state, playVoice]);

  useEffect(() => {
    if (state === "entered") {
      stopAll();
      onComplete();
    }
  }, [state, stopAll, onComplete]);

  // Auto-entry after 3 seconds
  useEffect(() => {
    if (state !== "door") return;
    const autoEnterTimer = window.setTimeout(() => {
      handleEnter();
    }, 3000);
    return () => window.clearTimeout(autoEnterTimer);
  }, [state]);

  const handleEnter = () => {
    if (state !== "door") return;
    unlockAudio();
    playDoor();
    setState("opening");

    window.setTimeout(() => {
      playTeleport();
      setState("teleport");
    }, 900);

    window.setTimeout(() => {
      fadeOutAmbient(1200);
      setState("final");
    }, 2500);

    window.setTimeout(() => {
      setState("entered");
    }, 3900);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 38 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 4,
      })),
    []
  );
  const spaceObjects = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        id: i,
        top: 8 + Math.random() * 72,
        left: 6 + Math.random() * 88,
        size: 36 + Math.random() * 120,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 2,
      })),
    []
  );
  const starField = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 4,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      })),
    []
  );
  const flameArcs = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        angle: (i / 18) * 360,
        delay: i * 0.05,
      })),
    []
  );
  const movingTrails = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        top: 8 + Math.random() * 80,
        left: -20 - Math.random() * 40,
        size: 70 + Math.random() * 160,
        duration: 8 + Math.random() * 7,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#02050d] select-none">
      <AnimatePresence>
        {state !== "entered" && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="relative h-full w-full"
          >
            <div className="absolute inset-0 bg-black" />
            <motion.div
              animate={{ opacity: [0.12, 0.26, 0.12] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,116,144,0.35)_0%,rgba(2,6,23,0.96)_62%)]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.95)_15%,rgba(2,6,23,0.5)_50%,rgba(2,6,23,0.95)_100%)]" />
            <motion.div
              animate={{ opacity: [0.45, 0.7, 0.45] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-cyan-300/85 bg-cyan-100/20 shadow-[0_0_60px_rgba(34,211,238,0.6)]"
            />
            {starField.map((star) => (
              <motion.span
                key={star.id}
                animate={{ opacity: [0.2, 0.95, 0.2], scale: [1, 1.2, 1] }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: "easeInOut",
                }}
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
                className="absolute rounded-full bg-white/85"
              />
            ))}
            {spaceObjects.map((obj) => (
              <motion.div
                key={obj.id}
                animate={{
                  x: [0, -18, 16, 0],
                  y: [0, 12, -10, 0],
                  opacity: [0.2, 0.35, 0.25],
                }}
                transition={{
                  duration: obj.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: obj.delay,
                }}
                style={{
                  top: `${obj.top}%`,
                  left: `${obj.left}%`,
                  width: `${obj.size}px`,
                  height: `${obj.size}px`,
                }}
                className="absolute rounded-full border border-cyan-200/10 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.35),rgba(30,58,138,0.18)_45%,rgba(2,6,23,0.05)_100%)] blur-[0.5px]"
              />
            ))}
            {movingTrails.map((trail) => (
              <motion.div
                key={trail.id}
                initial={{ x: "-20vw", opacity: 0 }}
                animate={{ x: "130vw", opacity: [0, 0.75, 0] }}
                transition={{
                  duration: trail.duration,
                  delay: trail.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  top: `${trail.top}%`,
                  left: `${trail.left}%`,
                  width: `${trail.size}px`,
                }}
                className="absolute h-[2px] rotate-[12deg] bg-gradient-to-r from-cyan-200/0 via-cyan-200/95 to-cyan-200/0 blur-[1px]"
              />
            ))}

            {particles.map((particle) => (
              <motion.span
                key={particle.id}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.6, 0], y: [-8, -28] }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                }}
                className="absolute rounded-full bg-cyan-100/80 blur-[1px]"
              />
            ))}

            <motion.div
              animate={
                state === "opening"
                  ? { x: [0, -8, 8, -6, 3, 0], y: [0, 5, -4, 3, -2, 0] }
                  : { x: 0, y: 0 }
              }
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {(state === "door" || state === "opening") && (
                <motion.div
                  whileHover={state === "door" ? { scale: 1.03 } : {}}
                  onClick={state === "door" ? handleEnter : undefined}
                  className={`relative z-30 h-[23rem] w-[23rem] ${state === "door" ? "cursor-pointer" : "cursor-default"}`}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-cyan-300/30"
                  />
                  {flameArcs.map((arc) => (
                    <motion.span
                      key={arc.id}
                      animate={{ opacity: [0.35, 0.95, 0.35], scaleY: [0.7, 1.2, 0.7] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: arc.delay, ease: "easeInOut" }}
                      style={{
                        transform: `translate(-50%, -50%) rotate(${arc.angle}deg) translateY(-10.7rem)`,
                      }}
                      className="absolute left-1/2 top-1/2 h-6 w-1 rounded-full bg-gradient-to-t from-cyan-400/10 via-cyan-300/90 to-blue-100 shadow-[0_0_12px_rgba(56,189,248,0.95)]"
                    />
                  ))}
                  <motion.div
                    animate={{ boxShadow: ["0 0 35px rgba(56,189,248,0.45)", "0 0 85px rgba(56,189,248,0.9)", "0 0 35px rgba(56,189,248,0.45)"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-[14%] rounded-full border-[10px] border-cyan-300/90 bg-black/45"
                  />
                  <div className="absolute inset-[28%] rounded-full bg-black" />
                  <motion.div
                    animate={{ opacity: [0.25, 0.8, 0.25], scale: [0.92, 1.06, 0.92] }}
                    transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                    className="pointer-events-none absolute inset-[8%] rounded-full bg-cyan-300/15 blur-xl"
                  />
                  <motion.div
                    animate={{ opacity: [0.25, 0.7, 0.25], scaleX: [0.8, 1.15, 0.8] }}
                    transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-2 left-1/2 h-8 w-44 -translate-x-1/2 rounded-full bg-cyan-300/40 blur-md"
                  />
                </motion.div>
              )}
            </motion.div>

            <AnimatePresence>
              {state === "opening" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.82, 0.28] }}
                  transition={{ duration: 0.95, ease: "easeInOut" }}
                  className="absolute inset-0 z-40 bg-gradient-to-br from-white via-cyan-100 to-blue-200/75"
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {state === "teleport" && (
                <motion.div
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1.24 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 z-30 overflow-hidden"
                >
                  <div className="absolute inset-0">
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                      <TunnelScene />
                    </Canvas>
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.16)_0%,rgba(30,58,138,0.3)_35%,rgba(2,6,23,0.8)_74%)]" />
                  <motion.div
                    animate={{ rotate: [0, 7, 0], scale: [0.95, 1.38] }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(34,211,238,0),rgba(34,211,238,0.5),rgba(168,85,247,0.55),rgba(34,211,238,0))] blur-md"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {state === "final" && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(14px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 z-40 flex items-center justify-center bg-black/70 text-center"
                >
                  <div>
                    <h1 className="bg-gradient-to-r from-cyan-100 via-blue-300 to-purple-300 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
                      Maha Aswin S B
                    </h1>
                    <p className="mt-4 text-lg text-cyan-100/90 md:text-2xl">The Developer</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
