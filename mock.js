// Mock data for CS student portfolio
export const portfolioData = {
  personal: {
    name: "Alex Thompson",
    title: "Computer Science Student",
    tagline: "Building the future with code",
    bio: "Passionate CS student with a love for full-stack development, machine learning, and solving complex problems. Currently pursuing my Bachelor's in Computer Science with experience in modern web technologies and algorithms.",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 123-4567",
    location: "University Campus, Tech City",
    resume: "/resume.pdf",
    social: {
      github: "https://github.com/alexthompson",
      linkedin: "https://linkedin.com/in/alexthompson",
      twitter: "https://twitter.com/alexthompson"
    }
  },
  
  skills: {
    languages: ["JavaScript", "Python", "Java", "C++", "TypeScript", "SQL"],
    frameworks: ["React", "Node.js", "Express", "Django", "Spring Boot", "FastAPI"],
    tools: ["Git", "Docker", "AWS", "MongoDB", "PostgreSQL", "Redis"],
    concepts: ["Data Structures", "Algorithms", "Machine Learning", "System Design", "API Development"]
  },
  
  projects: [
    {
      id: 1,
      title: "AI-Powered Task Manager",
      description: "A smart task management application that uses machine learning to prioritize tasks and predict completion times. Built with React, Node.js, and TensorFlow.js.",
      technologies: ["React", "Node.js", "TensorFlow.js", "MongoDB", "Express"],
      features: ["Smart prioritization", "Time prediction", "Analytics dashboard", "Real-time sync"],
      github: "https://github.com/alexthompson/ai-task-manager",
      demo: "https://ai-taskmanager.demo.com",
      status: "completed"
    },
    {
      id: 2,
      title: "Distributed Chat System",
      description: "A scalable real-time chat application supporting multiple rooms, file sharing, and video calls. Implemented with microservices architecture.",
      technologies: ["React", "Socket.io", "Redis", "Docker", "Kubernetes"],
      features: ["Real-time messaging", "File sharing", "Video calls", "Message encryption"],
      github: "https://github.com/alexthompson/distributed-chat",
      demo: "https://chatapp.demo.com",
      status: "completed"
    },
    {
      id: 3,
      title: "Algorithm Visualizer",
      description: "Interactive web application for visualizing sorting and pathfinding algorithms. Helps students understand complex algorithms through animations.",
      technologies: ["JavaScript", "Canvas API", "CSS3", "HTML5"],
      features: ["Interactive controls", "Multiple algorithms", "Speed adjustment", "Educational content"],
      github: "https://github.com/alexthompson/algo-visualizer",
      demo: "https://algovis.demo.com",
      status: "completed"
    },
    {
      id: 4,
      title: "Blockchain Voting System",
      description: "Secure and transparent voting system built on blockchain technology. Ensures vote integrity and anonymity while maintaining transparency.",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
      features: ["Blockchain security", "Anonymous voting", "Real-time results", "Audit trail"],
      github: "https://github.com/alexthompson/blockchain-voting",
      demo: "https://blockvote.demo.com",
      status: "in-progress"
    }
  ],
  
  experience: [
    {
      id: 1,
      company: "TechCorp Solutions",
      position: "Software Development Intern",
      duration: "Summer 2024",
      location: "San Francisco, CA",
      description: "Developed and maintained React components for the company's main product dashboard. Collaborated with senior developers on API integration and database optimization.",
      achievements: [
        "Improved dashboard loading speed by 40%",
        "Implemented 15+ reusable React components",
        "Contributed to code review process"
      ]
    },
    {
      id: 2,
      company: "University Research Lab",
      position: "Research Assistant",
      duration: "Sept 2023 - Present",
      location: "University Campus",
      description: "Assisting professors with machine learning research focused on natural language processing and sentiment analysis.",
      achievements: [
        "Co-authored 2 research papers",
        "Developed ML models with 95% accuracy",
        "Presented findings at student conference"
      ]
    }
  ],
  
  education: {
    degree: "Bachelor of Science in Computer Science",
    university: "Tech University",
    duration: "2022 - 2026",
    gpa: "3.8/4.0",
    relevant_courses: [
      "Data Structures & Algorithms",
      "Database Systems",
      "Software Engineering",
      "Machine Learning",
      "Computer Networks",
      "Operating Systems"
    ],
    achievements: [
      "Dean's List (3 semesters)",
      "President of CS Student Association",
      "Hackathon winner (2 times)"
    ]
  }
};

export default portfolioData;