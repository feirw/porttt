// Mock data for CS student portfolio
export const portfolioData = {
  personal: {
    name: "Eleni Zafeiri",
    title: "Project Manager & CS Student",
    tagline: "Building the future with passion and detail",
    bio: "I am a second-year student in the Department of Informatics and Telecommunications with a current GPA of 8.3/10. I graduated with honors from my high school (Grade: 19.7/20 & Panhellenic exams: 19.000/20.000). After living in a small village without any experience in technology and in just one year at university, I have participated in several hackathons, attended technology events, earned multiple certifications in technology and project management, volunteered in tech-related projects, and built a strong professional network. At the same time, I run a TikTok and Instagram account, where I provide guidance to high school students in Informatics. My goal is to keep growing, while also helping others develop and succeed in technology.",
    email: "elenzaff@icloud.com",
    location: "Athens, Greece",
    resume_url: "/resume.pdf",
    social_links: {
      github: "https://github.com/feirw",
      linkedin: "https://linkedin.com/in/elenizafeiri",
      instagram : "https://instagram.com/technotesgr",
    },
  },

  skills: {
    languages: ["C", "C#", "C++", "HTML", "CSS", "SQL"],
    frameworks: ["React.js", "Node.js"],
    concepts: ["Agile", "Scrum"],
    tools: ["GitHub", "VsCode", "Canva", "Jira", "Ora", "Notion", "Asana"],
  },

  softskills: {
    corporate: ["Teamwork", "Communication", "Adaptability"]
  },

  projects: [
    {
      id: 1,
      title: "Full Stack Tutor for Computer Science Students",
      description:
        "Developing a full-stack educational platform designed to support high school students in preparing for the Panhellenic exams in Informatics.",
      technologies: ["HTML", "Tailwind CSS", "JavaScript", "Python", "React.js"],
      features: [
        "Interactive Quizzes",
        "Flashcards Mode",
        "Past Exam Papers",
        "Gamified Learning",
        "Study Notes & Annotations",
      ],
      github_url: "https://github.com/feirw/technotesgr",
      demo_url: "#",
      status: "in progress",
    },
    {
      id: 2,
      title: "Hook & Grab: Online Marketplace for Second-Hand Fishing Gear",
      description:
        "An online marketplace where amateur fishers can buy and sell second-hand fishing gear, promoting sustainability and resource reuse. Developed during the 2nd Blue and Circular Economy Hackathon (1st place).",
      technologies: ["Figma", "HTML", "CSS", "Python", "React.js"],
      features: [
        "User authentication",
        "Product listings",
        "Search and filter",
        "Secure payments",
      ],
      github_url: "https://github.com/feirw/hook-and-grab",
      demo_url: "#",
      status: "completed",
    },
  ],

  experience: [
    {
      id: 1,
      company: "Threenitas",
      position: "Technical Project Manager",
      duration: "October 2025 - Present",
      location: "Hybrid, Athens, Greece",
      description:
        "Leading the planning and execution of software projects, ensuring delivery on time and within budget.",
      achievements: [
        "Implemented Agile methodologies, improving team velocity by 25%.",
        "Managed the successful launch of three major product features.",
        "Improved stakeholder communication and reporting efficiency.",
      ],
    },
     {
      id: 1,
      company: "HongLong",
      position: "Web Developer & Technical Support",
      duration: "September 2025 - Present",
      location: "Remote",
      description:
        "Leading the planning and execution of software projects, ensuring delivery on time and within budget.",
      achievements: [
        "Implemented Agile methodologies, improving team velocity by 25%.",
        "Managed the successful launch of three major product features.",
        "Improved stakeholder communication and reporting efficiency.",
      ],
    },
    {
      id: 2,
      company: "Technotes.gr",
      position: "Computer Science Tutor & Content Creator",
      duration: "Sept 2024 - Present",
      location: "Remote",
      description:
        "Creating educational content and providing tutoring to high school students for the Panhellenic exams in Informatics.",
      achievements: [
        "Grew TikTok and Instagram accounts to over 100.000 views.",
        "Received positive feedback from students with grade improvements.",
        "Authored a book on programming basics for high school students.",
      ],
    },
  ],

  education: {
    degree: "Bachelor in Computer Science",
    university: "National and Kapodistrian University of Athens",
    duration: "2024 - 2028",
    gpa: "8.3/10",
    relevant_courses1: [
      "Programming Fundamentals",
      "Project Management",
      "Data Structures and Algorithms",
      "Web Development",
      "Databases",
      "Object-Oriented Programming",
    ],
    relevant_courses2: [
      "Computer Science",
      "Microeconomics",
      "Calculus",
      "Linear Algebra",
      "Technology",
    ],
    achievements1: [
      "1st Place at 2nd Blue and Circular Economy Hackathon by Odyssea.",
      "Awarded by AUEB's competition ERMIS in Micro & Macro Economics.",
      "Semi Finalist at Business Hackathon Ennovation 2025 (AI-driven maritime consulting).",
      "Participated in Greece-Turkey Hackathon 2025 (step tracker app).",
    ],
    achievements2: [
      "Awarded by Eurobank for being in the top 1% of students in panhellenic exams (19.000/20.000).",
      "Awarded by Cultural Center of Lamia & Newspaper LamiaReport for the highest academic performance in my High School.",
    ],
  },

  certificates: [
    {
      id: 1,
      title: "Elements of AI",
      issuer: "University of Helsinki",
      date: "9/2025-11/2025",
      description: "Validated expertise in AI fundamentals.",
      link: "https://www.elementsofai.com/",
    },
    {
      id: 2,
      title: "McKinsey Forward Program",
      issuer: "McKinsey & Company",
      date: "10/2025-12/2025",
      description: "Specialization in data analysis, visualization, and SQL queries.",
      link: "https://forward.mckinsey.com/",
    },
    {
      id: 3,
      title: "Project Management & AI Integrations",
      issuer: "Workearly",
      date: "9/2025",
      description: "Discovered the role of a project manager and AI tools.",
      link: "https://workearly.gr/",
    },
    {
      id: 4,
      title: "Digital Literacy Awareness",
      issuer: "CISCO Networking Academy",
      date: "8/2025",
      description: "Comprehensive training in digital literacy.",
      link: "https://www.netacad.com/",
    },
    {
      id: 5,
      title: "IoT and Digital Transformation",
      issuer: "CISCO Networking Academy",
      date: "8/2025",
      description: "Studied IoT concepts and applications in digital transformation.",
      link: "https://www.netacad.com/",
    },
    {
      id: 6,
      title: "Cybersecurity Essentials",
      issuer: "Cisco Networking Academy",
      date: "7/2025",
      description: "Learned about malware,protocols,networking and security.",
      link: "https://www.netacad.com/",
    },
    // {
    //   id: 7,
    //   title: "SQL Essentials",
    //   issuer: "Workearly",
    //   date: "7/2025",
    //   description: "Core SQL skills and database management.",
    //   link: "https://workearly.gr/",
    // },
    {
      id: 8,
      title: "GenAI for Project Management & Sales",
      issuer: "The Tipping Point",
      date: "6/2025",
      description: "Learned how to effectively use generative AI in project management and sales.",
      link: "https://thetippingpoint.org/",
    },
    {
      id: 9,
      title: "Effective Data Communication & Storytelling",
      issuer: "Deloitte",
      date: "1/2025",
      description: "How to pitch an idea effectively using data storytelling techniques.",
      link: "https://www2.deloitte.com/",
    },
    {
      id: 10,
      title: "Team Leadership & Problem Solving Training",
      issuer: "Linq",
      date: "1/2025-5/2025",
      description: "How to be an excellent team leader who controls conflicts and does the best for the team without being authoritarian.",
      link: "https://linq.org/",
    },
  ],

  volunteer: [
    {
      id: 1,
      role: "Social Media Manager",
      organization: "HackHarvard 2025",
      duration: "September 2025",
      location: "Remote",
      description:
        "I designed Insta & Linkedin posts, stories, and reels to promote the event and engage participants.",
    },
    {
      id: 2,
      role: "Volunteer for Technology Events",
      organization: "WeLead",
      duration: "March 2024 - Present",
      location: "On-site",
      description:
        "Assisting in organizing and managing tech events aimed at empowering women in Technology.",
     
    },
    {
      id: 3,
      role: "Main Stage Support",
      organization: "Talent Days 2025 by Linq",  
      duration: "April 2025",
      location: "On-site",
      description:
        "Assisted in managing the main stage, coordinating speakers, and ensuring smooth transitions between sessions.",
    },
    {
      id: 3,
      role: "Hackathon Coordinator & Mentor",
      organization: "Texas A&M University Hackathon",  
      duration: "February 2025",
      location: "On-site",
      description:
        "Planed the event,made the time schedule, designed the posts for social media, and mentored participants during the hackathon.The event was hosted by UoA and Texas A&M University in Athens.",
    },
    {
      id: 3,
      role: "Project Manager & Mentor",
      organization: "DIT Coding Club",  
      duration: "December 2024 - Present",
      location: "Hybrid",
      description:
        "My team and I organize events and hackathons in the Department of Informatics and Telecommunications of University of Athens, mentor students on their projects, and help them develop their technical and teamwork skills.",
    },
  ],
};  
export default portfolioData;
