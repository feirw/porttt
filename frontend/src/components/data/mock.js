// Mock data for CS student portfolio
export const portfolioData = {
  personal: {
    name: "Ελένη Ζαφείρη",
    title: "Project Manager & CS Student",
    tagline: "Building the future with passion and detail",
    bio: "Hello, my name is Eleni Zafeiri. I am a second-year student in the Department of Informatics and Telecommunications with a current GPA of 8.3/10. I graduated top of my class from high school with a grade of 19.7/20, and in the national entrance exams I ranked first in the Economics track with 19,000 points.In just one year at university, I have participated in several hackathons, attended technology events, earned multiple certifications in technology and project management, volunteered in tech-related projects, and built a strong professional network. At the same time, I run a TikTok and Instagram account, where I provide guidance to high school students in Informatics.My goal is to keep growing, while also helping others develop and succeed in technology.",
    email: "elenzaff@icloud.com",
    phone: "+30 123 456 7890", 
    location: "Athens, Greece",
    resume_url: "/resume.pdf", 
    social_links: { 
      github: "https://github.com/feirw",
      linkedin: "https://linkedin.com/in/elenizafeiri",
    }
  },
  
  skills: {
    languages: ["C", "C#", "C++", "HTML", "CSS","SQL"],
    frameworks: ["React", "Node.js"], 
    concepts: ["Agile", "Scrum"],
    tools: ["Git", "GitHub", "AWS", "Canva", "Jira", "Ora", "Notion", "Asana"],
  },
  
  projects: [
    {
      id: 1,
      title: "Full Stack Tutor for Computer Science Students",
      description: "I am currently developing a full-stack educational platform designed to support high school students in preparing for the Panhellenic exams in Informatics. The platform offers a wide variety of learning tools, including interactive quizzes, flashcards, annotated textbook notes, algorithm visualizations, past exam papers, and educational games.",
      technologies: ["HTML", "Tailwind CSS", "JavaScript", "Python", "React.js"],
      features: ["Interactive Quizzes", "Flashcards Mode", "Past Exam Papers", "Gamified Learning","Study Notes & Annotations"],
      github_url: "https://github.com/feirw/technotesgr", // Renamed from github
      demo_url: "#", // Added demo url
      status: "in progress"
    },
    {
      id: 2,
      title: "Hook & Grab : Online Marketplace for Second-Hand Fishing Gear",
      description: "An online marketplace where amateur fishers can buy and sell second-hand fishing gear, promoting sustainability and resource reuse in the fishing community. Developed during the 2nd Blue and Circular Economy Hackathon where my team won 1st place.",
      technologies: ["Figma", "React", "Node.js", "MongoDB"],
      features: ["User authentication", "Product listings", "Search and filter", "Secure payments"],
      github_url: "https://github.com/feirw/hook-and-grab", // Renamed from github
      demo_url: "#", // Renamed from demo
      status: "completed"
    },
    {
      id: 3,
      title: "Algorithm Visualizer",
      description: "Interactive web application for visualizing sorting and pathfinding algorithms. Helps students understand complex algorithms through animations.",
      technologies: ["JavaScript", "Canvas API", "CSS3", "HTML5"],
      features: ["Interactive controls", "Multiple algorithms", "Speed adjustment", "Educational content"],
      github_url: "https://github.com/feirw/algo-visualizer", // Renamed from github
      demo_url: "#", // Renamed from demo
      status: "completed"
    },
    {
      id: 4,
      title: "Blockchain Voting System",
      description: "Secure and transparent voting system built on blockchain technology. Ensures vote integrity and anonymity while maintaining transparency.",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
      features: ["Blockchain security", "Anonymous voting", "Real-time results", "Audit trail"],
      github_url: "https://github.com/feirw/blockchain-voting", // Renamed from github
      demo_url: "#", // Renamed from demo
      status: "in-progress"
    }
  ],
  
  experience: [
    {
      id: 1,
      company: "Threenitas",
      position: "Technical Project Manager",
      duration: "October 2025 - Present",
      location: "Hybrid, Athens, Greece",
      description: "Leading the planning and execution of software projects, ensuring they are delivered on time and within budget. I coordinate between cross-functional teams, manage project timelines, and facilitate communication between stakeholders and developers.",
      achievements: [
        "Implemented Agile methodologies, improving team velocity by 25%.",
        "Managed the successful launch of three major product features.",
        "Improved stakeholder communication and reporting efficiency."
      ]
    },
    {
      id: 2,
      company: "Technotes.gr",
      position: "Computer Science Tutor & Content Creator",
      duration: "Sept 2024 - Present",
      location: "Remote",
      description: "Creating educational content and providing tutoring to high school students for the Panhellenic exams in Informatics through social media platforms.",
      achievements: [
        "Grew TikTok and Instagram accounts to over 5,000 followers combined.",
        "Developed a comprehensive curriculum covering the entire exam syllabus.",
        "Received positive feedback from students who saw significant grade improvements."
      ]
    }
  ],
  
  education: {
    degree: "Bachelor in Computer Science",
    university: "National and Kapodistrian University of Athens",
    duration: "2024 - 2028",
    gpa: "8.3/10",
    relevant_courses: [
      "Programming Fundamentals",
      "Project Management",
      "Data Structures and Algorithms",
      "Web Development",
      "Databases",
      "Object-Oriented Programming"
    ],
    achievements: [
      "1st Place at 2nd Blue and Circular Economy Hackathon.",
      "Awarded by Athens University of Economics and Business in ERMIS competition.",
      "Awarded by Eurobank for being in the top 1% of students.",
      "Awarded by Cultural Center of Lamia for top high school performance.",
    ]
  }
};

export default portfolioData;