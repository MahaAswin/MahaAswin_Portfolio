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
    image: "/uploads/screenshots/jarvis/jarvis-main.png",
    //videoUrl: "https://www.youtube.com/embed/example", // Use embed link for iframe
    demoUrl: "https://jarvis-demo.com",
    githubUrl: "https://github.com/MahaAswin/Jarvis",
    screenshots: [
      "/uploads/screenshots/jarvis/jarvis-1.png",
      "/uploads/screenshots/jarvis/jarvis-2.png"
    ],
  },
  {
    id: "playlist",
    title: "Musify",
    mission: "MISSION: MUSIC-ORG",
    shortDescription: "A full-stack MERN application that allows users to upload MP3 songs, organize music by artist, and create personalized playlists through a modern and user-friendly interface.",
    description: "Built a full-stack Music Playlist Organizer using MongoDB, Express.js, React.js, and Node.js, enabling users to upload MP3 songs with singer details, organize tracks by artist, and create and manage personalized playlists. The application features a clean and user-friendly interface for seamless music management and playlist customization.",
    tags: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    image: "/uploads/screenshots/musify/musify.jpg",
    demoUrl: "https://drive.google.com/file/d/17bSFhjUbuec6b75xHAWSzhQOJgN9wLsf/view?usp=sharing",
    githubUrl: "https://github.com/MahaAswin/Music-Playlist-Organizer",
    screenshots: [
      "/uploads/screenshots/musify/musify_dashboard.png",
      "/uploads/screenshots/musify/musify_fav.png",
      "/uploads/screenshots/musify/musify_artists.png",
      "/uploads/screenshots/musify/musify_playlist.png",
      "/uploads/screenshots/musify/musify_addsong.png",
      "/uploads/screenshots/musify/musify_song.png",
      "/uploads/screenshots/musify/musify_login.png",
      "/uploads/screenshots/musify/musify_darkmode.png"
    ],
  },
  {
    id: "arivon",
    title: "Arivon Platform",
    mission: "MISSION: ED-TECH",
    shortDescription: "AI-powered career intelligence platform that helps students improve job readiness through ATS-based resume analysis, skill gap identification, real-time industry insights, and recruiter-driven candidate filtering.",
    description: "Arivon is a full-stack AI-powered career platform designed to bridge the gap between academic learning and industry requirements. The platform analyzes resumes using ATS-based scoring, identifies missing skills, provides real-time industry news and job opportunities, and enables recruiters to efficiently discover and filter candidates based on skills and readiness. Built using the MERN stack with API integrations, Arivon focuses on improving employability and creating a smarter hiring ecosystem.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    image: "/placeholder.svg",
    videoUrl: "https://www.youtube.com/embed/example2",
    demoUrl: "https://arivon.com",
    githubUrl: "https://github.com/MahaAswin/Arivon",
    screenshots: [
      "/uploads/screenshots/arivon-1.png",
      "/uploads/screenshots/arivon-2.png"
    ],
  },
];
