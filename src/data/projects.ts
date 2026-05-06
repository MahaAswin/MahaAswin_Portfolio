export interface Project {
  id: string;
  title: string;
  mission: string;
  description: string;
  shortDescription: string;
  tags: string[];
  image: string;
  videoUrl?: string; // YouTube or direct video link
  demoUrl?: string;  // Live project link
  githubUrl: string;
  screenshots: string[];
}

export const projects: Project[] = [
  {
    id: "jarvis",
    title: "JARVIS AI Voice Assistant",
    mission: "MISSION: BUILD AN INTELLIGENT VOICE ASSISTANT",
    shortDescription: "Full-stack AI voice assistant with real-time speech recognition and conversational AI.",
    description: "Developed a full-stack AI voice assistant inspired by modern conversational systems, enabling real-time voice interaction through speech-to-text, natural language processing, and voice response generation. Integrated Faster-Whisper for speech recognition, Groq/Gemini LLM APIs for intelligent responses, and gTTS for realistic voice output with a modern React-based interface.",
    tags: ["React", "FastAPI", "Python", "Groq API", "Faster-Whisper", "gTTS"],
    image: "/uploads/screenshots/jarvis-main.png",
    //videoUrl: "https://www.youtube.com/embed/example", // Use embed link for iframe
    demoUrl: "https://jarvis-demo.com",
    githubUrl: "https://github.com/MahaAswin/Jarvis",
    screenshots: [
      "/uploads/screenshots/jarvis-1.png",
      "/uploads/screenshots/jarvis-2.png"
    ],
  },
  {
    id: "playlist",
    title: "Playlist Organizer",
    mission: "MISSION: MUSIC-ORG",
    shortDescription: "Full-stack music management system with JWT auth and dynamic CRUD.",
    description: "A comprehensive music management platform that allows users to organize their digital libraries, create dynamic playlists, and share music with friends. Features include high-security JWT authentication and a highly responsive React frontend.",
    tags: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    image: "/placeholder.svg",
    demoUrl: "https://playlist-app.com",
    githubUrl: "https://github.com/mahaaswin",
    screenshots: [
      "/uploads/screenshots/music-1.png",
      "/uploads/screenshots/music-2.png"
    ],
  },
  {
    id: "arivon",
    title: "Arivon Platform",
    mission: "MISSION: ED-TECH",
    shortDescription: "Modern education platform with real-time candidate tracking.",
    description: "A full-scale ed-tech solution designed to bridge the gap between candidates and recruiters. Includes a recruiter dashboard, real-time status updates, and automated email workflows.",
    tags: ["Next.js", "Express", "PostgreSQL", "Tailwind CSS"],
    image: "/placeholder.svg",
    videoUrl: "https://www.youtube.com/embed/example2",
    demoUrl: "https://arivon.com",
    githubUrl: "https://github.com/mahaaswin",
    screenshots: [
      "/uploads/screenshots/arivon-1.png",
      "/uploads/screenshots/arivon-2.png"
    ],
  },
];
