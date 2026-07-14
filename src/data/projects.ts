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
  liveUrl?: string;  // Hosted web link
  githubUrl: string;
  screenshots: string[];
}

export const projects: Project[] = [
  {
    id: "packngo",
    title: "PackNgo Platform",
    mission: "MISSION: TRAVEL-TECH",
    shortDescription: "Multi-vendor travel package booking platform that enables verified travel partners to publish travel packages while allowing travelers to compare, wishlist, and book the best packages through a secure and user-friendly marketplace.",
    description: "PackNgo is a full-stack multi-vendor travel marketplace designed to connect travelers with verified travel agencies on a single platform. The system enables travel partners to register, upload verification documents, create and manage travel packages, while travelers can explore, compare, wishlist, and book packages based on price, duration, ratings, and reviews. It features role-based authentication for Travelers, Travel Partners, and Admins, an admin approval workflow for partner verification, package management, feedback and complaint handling, and responsive dashboards. Built using React.js, Spring Boot, Spring Security, PostgreSQL, JWT Authentication, and REST APIs, PackNgo is deployed on Vercel and Render, providing a scalable and secure travel booking experience.",
    tags: [
      "React.js",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "PostgreSQL",
      "REST APIs",
      "Tailwind CSS",
      "Vite"
      ],
      image: "./uploads/screenshots/packngo/packngo_1.jpeg",
      videoUrl: "https://drive.google.com/file/d/1-Ng2ZO11571fljq5_-YUQR2VeHPkFxsu/view?usp=sharing",
      liveUrl: "https://packngo-official.vercel.app/",
      githubUrl: "https://github.com/MahaAswin/PackNgo",
      screenshots: [
      "./uploads/screenshots/packngo/packngo_1.jpeg",
      "./uploads/screenshots/packngo/packngo_2.jpeg",
      "./uploads/screenshots/packngo/packngo_3.jpeg",
      "./uploads/screenshots/packngo/packngo_4.jpeg",
      "./uploads/screenshots/packngo/packngo_5.jpeg",
      "./uploads/screenshots/packngo/packngo_6.jpeg",
      "./uploads/screenshots/packngo/packngo_7.jpeg",
      "./uploads/screenshots/packngo/packngo_8.jpeg",
      "./uploads/screenshots/packngo/packngo_9.jpeg",
      "./uploads/screenshots/packngo/packngo_10.jpeg",
      "./uploads/screenshots/packngo/packngo_11.jpeg",
      "./uploads/screenshots/packngo/packngo_12.jpeg",
      "./uploads/screenshots/packngo/packngo_13.jpeg",
      "./uploads/screenshots/packngo/packngo_14.jpeg",
      "./uploads/screenshots/packngo/packngo_15.jpeg",
      "./uploads/screenshots/packngo/packngo_16.jpeg"
    ]
  },
  {
    id: "arivon",
    title: "Arivon Platform",
    mission: "MISSION: ED-TECH",
    shortDescription: "AI-powered career intelligence platform that helps students improve job readiness through ATS-based resume analysis, skill gap identification, real-time industry insights, and recruiter-driven candidate filtering.",
    description: "Arivon is a full-stack AI-powered career platform designed to bridge the gap between academic learning and industry requirements. The platform analyzes resumes using ATS-based scoring, identifies missing skills, provides real-time industry news and job opportunities, and enables recruiters to efficiently discover and filter candidates based on skills and readiness. Built using the MERN stack with API integrations, Arivon focuses on improving employability and creating a smarter hiring ecosystem.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    image: "./uploads/screenshots/arivon/arivon-1.jpeg",
    videoUrl: "https://drive.google.com/file/d/1RgVhPPzWpeE4SYsfX7oV9t2rMttPTvIr/view?usp=sharing",
    liveUrl: "https://arivon.vercel.app",
    githubUrl: "https://github.com/MahaAswin/Arivon",
    screenshots: [
      "./uploads/screenshots/arivon/arivon-1.jpeg",
      "./uploads/screenshots/arivon/arivon-2.jpeg",
      "./uploads/screenshots/arivon/arivon-3.jpeg",
      "./uploads/screenshots/arivon/arivon-4.jpeg",
      "./uploads/screenshots/arivon/arivon-5.jpeg",
      "./uploads/screenshots/arivon/arivon-6.jpeg",
      "./uploads/screenshots/arivon/arivon-7.jpeg",
      "./uploads/screenshots/arivon/arivon-8.jpeg",
      "./uploads/screenshots/arivon/arivon-9.jpeg",
      "./uploads/screenshots/arivon/arivon-10.jpeg",
      "./uploads/screenshots/arivon/arivon-11.jpeg",
      "./uploads/screenshots/arivon/arivon-12.jpeg",
      "./uploads/screenshots/arivon/arivon-13.jpeg"
    ],
  },
  {
    id: "playlist",
    title: "Musify",
    mission: "MISSION: MUSIC-ORG",
    shortDescription: "A full-stack MERN application that allows users to upload MP3 songs, organize music by artist, and create personalized playlists through a modern and user-friendly interface.",
    description: "Built a full-stack Music Playlist Organizer using MongoDB, Express.js, React.js, and Node.js, enabling users to upload MP3 songs with singer details, organize tracks by artist, and create and manage personalized playlists. The application features a clean and user-friendly interface for seamless music management and playlist customization.",
    tags: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    image: "./uploads/screenshots/musify/musify_dashboard.png",
    demoUrl: "https://drive.google.com/file/d/17bSFhjUbuec6b75xHAWSzhQOJgN9wLsf/view?usp=sharing",
    githubUrl: "https://github.com/MahaAswin/Music-Playlist-Organizer",
    screenshots: [
      "./uploads/screenshots/musify/musify_dashboard.png",
      "./uploads/screenshots/musify/musify_fav.png",
      "./uploads/screenshots/musify/musify_artists.png",
      "./uploads/screenshots/musify/musify_playlist.png",
      "./uploads/screenshots/musify/musify_addsong.png",
      "./uploads/screenshots/musify/musify_song.png",
      "./uploads/screenshots/musify/musify_login.png",
      "./uploads/screenshots/musify/musify_darkmode.png"
    ],
  },
  {
    id: "jarvis",
    title: "JARVIS AI Voice Assistant",
    mission: "MISSION: BUILD AN INTELLIGENT VOICE ASSISTANT",
    shortDescription: "Full-stack AI voice assistant with real-time speech recognition and conversational AI.",
    description: "Developed a full-stack AI voice assistant inspired by modern conversational systems, enabling real-time voice interaction through speech-to-text, natural language processing, and voice response generation. Integrated Faster-Whisper for speech recognition, Groq/Gemini LLM APIs for intelligent responses, and gTTS for realistic voice output with a modern React-based interface.",
    tags: ["React", "FastAPI", "Python", "Groq API", "Faster-Whisper", "gTTS"],
    image: "./uploads/screenshots/jarvis/jarvis-main.png",
    //videoUrl: "https://www.youtube.com/embed/example", // Use embed link for iframe
    demoUrl: "https://jarvis-demo.com",
    githubUrl: "https://github.com/MahaAswin/Jarvis",
    screenshots: [
      "./uploads/screenshots/jarvis/jarvis-1.png",
      "./uploads/screenshots/jarvis/jarvis-2.png"
    ],
  },
];
