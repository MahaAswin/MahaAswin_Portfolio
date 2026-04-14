import { useEffect, useRef } from "react";

const SOUNDS = {
  ambient: "/audio/ambient.mp3",
  voice: "/audio/voice.mp3",
  door: "/audio/door.mp3",
  teleport: "/audio/teleport.mp3",
};

export const useSoundManager = () => {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    Object.entries(SOUNDS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.preload = "auto";
      audioRefs.current[key] = audio;
    });

    if (audioRefs.current.ambient) {
      audioRefs.current.ambient.loop = true;
      audioRefs.current.ambient.volume = 0.35;
    }
    if (audioRefs.current.voice) audioRefs.current.voice.volume = 0.9;
    if (audioRefs.current.door) audioRefs.current.door.volume = 0.9;
    if (audioRefs.current.teleport) audioRefs.current.teleport.volume = 0.85;

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
        audio.src = "";
      });
    };
  }, []);

  const tryPlay = (audio?: HTMLAudioElement, restart = false) => {
    if (!audio) return;
    if (restart) audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const playAmbient = () => tryPlay(audioRefs.current.ambient);
  const playVoice = () => tryPlay(audioRefs.current.voice, true);
  const playDoor = () => tryPlay(audioRefs.current.door, true);
  const playTeleport = () => tryPlay(audioRefs.current.teleport, true);
  const unlockAudio = () => {
    Object.values(audioRefs.current).forEach((audio) => {
      const previousVolume = audio.volume;
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = previousVolume;
        })
        .catch(() => {
          audio.volume = previousVolume;
        });
    });
  };

  const stopAll = () => {
    Object.values(audioRefs.current).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  };

  const fadeOutAmbient = (duration = 1800) => {
    const ambient = audioRefs.current.ambient;
    if (!ambient) return;

    const startVolume = ambient.volume;
    const startTime = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      ambient.volume = startVolume * (1 - progress);
      if (progress < 1) requestAnimationFrame(tick);
      else ambient.pause();
    };

    requestAnimationFrame(tick);
  };

  return {
    playAmbient,
    playVoice,
    playDoor,
    playTeleport,
    unlockAudio,
    stopAll,
    fadeOutAmbient,
  };
};
