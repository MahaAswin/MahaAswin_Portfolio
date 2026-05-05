export interface Skill {
  name: string;
  slug: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Java", slug: "openjdk" },
      { name: "C++", slug: "cplusplus" },
      { name: "Python", slug: "python" },
      { name: "JavaScript", slug: "javascript" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", slug: "react" },
      { name: "HTML5", slug: "html5" },
      { name: "CSS3", slug: "css3" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Express.js", slug: "express" },
      { name: "Spring Boot", slug: "springboot" },
      { name: "FastAPI", slug: "fastapi" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", slug: "mongodb" },
      { name: "MySQL", slug: "mysql" },
      { name: "PostgreSQL", slug: "postgresql" },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git", slug: "git" },
      { name: "Docker", slug: "docker" },
      { name: "Postman", slug: "postman" },
      { name: "VS Code", slug: "visualstudiocode" },
    ],
  },
];
