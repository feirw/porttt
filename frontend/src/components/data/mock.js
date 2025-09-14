// Mock data for CS student portfolio
export const portfolioData = {
  personal: {
    name: "Ελένη Ζαφείρη",
    title: "Project Manager & CS Student",
    tagline: "Building the future with passion and detail",
    bio: "Hello, my name is Eleni Zafeiri. I am a second-year student in the Department of Informatics and Telecommunications with a current GPA of 8.3/10. I graduated top of my class from high school with a grade of 19.7/20, and in the national entrance exams I ranked first in the Economics track with 19,000 points.In just one year at university, I have participated in several hackathons, attended technology events, earned multiple certifications in technology and project management, volunteered in tech-related projects, and built a strong professional network. At the same time, I run a TikTok and Instagram account, where I provide guidance to high school students in Informatics.My goal is to keep growing, while also helping others develop and succeed in technology.",
    email: "elenzaff@icloud.com",
    location: "Athens, Greece",
    resume: "/resume.pdf",
    social: {
      github: "https://github.com/feirw",
      linkedin: "https://linkedin.com/in/elenizafeiri",
    }
  },
  
  skills: {
    languages: ["C", "C#", "C++", "HTML", "CSS","SQL"],
    tools: ["Git", "GitHub", "AWS", "Canva", "Jira", "Ora", "Notion", "Asana"],
    methodologies: ["Agile", "Scrum"],
  },
  
  projects: [
    {
      id: 1,
      title: "Full Stack Tutor for Computer Science Students",
      description: "I am currently developing a full-stack educational platform designed to support high school students in preparing for the Panhellenic exams in Informatics. The platform offers a wide variety of learning tools, including interactive quizzes, flashcards, annotated textbook notes, algorithm visualizations, past exam papers, and educational games. By combining study resources with gamified elements, it provides both an engaging and efficient way for students to learn. The project’s goal is not only to help students practice and succeed in their exams but also to make Informatics more approachable, enjoyable, and deeply understood.",
      technologies: ["HTML", "Tailwind CSS", "JavaScript", "Python", "React.js"],
      features: ["Interactive Quizzes", "Flashcards Mode", "Past Exam Papers", "Gamified Learning","Study Notes & Annotations"],
      github: "https://github.com/feirw/technotesgr",
      status: "in progress"
    },
    {
      id: 2,
      title: "Hook & Grab : Online Marketplace for Second-Hand Fishing Gear",
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
      company: "Threenitas",
      position: "Technical Project Manager",
      duration: "October 2025 - Present",
      location: "Hybrid,Athens,Greece",
      description: "Developed and maintained React components for the company's main product dashboard. Collaborated with senior developers on API integration and database optimization.",
      achievements: [
        "Improved dashboard loading speed by 40%",
        "Implemented 15+ reusable React components",
        "Contributed to code review process"
      ]
    },
    {
      id: 2,
      company: "Technotesgr",
      position: "Computer Science Tutor & Content Creator",
      duration: "Sept 2024 - Present",
      location: "Remote",
      description: "Assisting professors with machine learning research focused on natural language processing and sentiment analysis.",
      achievements: [
        "Co-authored 2 research papers",
        "Developed ML models with 95% accuracy",
        "Presented findings at student conference"
      ]
    }
  ],
  
  education: {
    degree: "Bachelor in Computer Science",
    university: "University of Athens",
    duration: "2024 - 2028",
    gpa: "8.3/10",
    relevant_courses: [
      "Programming Fundamentals",
      "Project Management",
      "Tutoring for Computer Science Students",
      "Data Structures and Algorithms",
      "Web Development",
    ],
    achievements: [
      "1st Place at 2nd Blue and Circular Economy Hackathon : My team and I won a hackathon focused on the blue economy. We developed an online marketplace where amateur fishers can buy and sell second-hand fishing gear, promoting sustainability and resource reuse in the fishing community.",
      "Awarded by the Athens University of Economics and Business in the ERMIS student economics competition, among over 1,000 participants.The exam covered topics in micro and macroeconomics, accounting, and business administration.",
      "Awarded from Eurobank - mprosta gia thn paideia for being in the top 1% of students in Fthiotida",
      "Awarded from Cultural Center of Lamia & Newspaper Lamia Report, for being the top student in high school(Panhellenic exams 19.000/20.000)",
    ]
  }
};

export default portfolioData;