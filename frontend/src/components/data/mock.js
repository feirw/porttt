// Portfolio data aligned with CV (Eleni Zafeiri)
export const portfolioData = {
  personal: {
    name: "Eleni Zafeiri",
    title: "Computer Science Student & Product Owner",
    tagline:
      "Athens · Informatics & Telecommunications (NKUA) · Product Owner",
    bio: "I am a second-year student in the Department of Informatics and Telecommunications NKUA with a current GPA of 8.54/10. I graduated with honors from my high school (Grade: 19.7/20 & Panhellenic exams: 19.000/20.000). After living in a small village without any experience in technology and in just one year at university, I have participated in several hackathons, attended technology events, earned multiple certifications in technology and product management, volunteered in tech-related projects, and built a strong professional network. At the same time, I run a TikTok and Instagram account, where I provide guidance to high school students in Informatics. My goal is to keep growing, while also helping others develop and succeed in technology.",
    email: "elenzaff@icloud.com",
    location: "Athens, Greece",
    resume_url: "/resume.pdf",
    spoken_languages: [
      "English (C2: ECPE, LRN) — fluent",
      "French (B2: DELF) — fluent",
      "Greek — native",
    ],
    social_links: {
      github: "https://github.com/feirw",
      linkedin: "https://www.linkedin.com/in/elenizafeiri",
      instagram: "https://instagram.com/technotesgr",
    },
  },

  skills: {
    languages: ["C", "C++", "Java", "JavaScript", "HTML", "CSS"],
    frameworks: ["React.js", "Tailwind CSS", "WordPress"],
    concepts: [
      "Product discovery",
      "Requirements & MVP",
      "Feature prioritization",
      "Agile / Scrum",
      "Stakeholder communication",
      "User-centered design",
      "Risk management",
      "Prompt engineering",
      "GenAI for PM & sales",
      "Mobile app design & development",
      "Startup development & pitching",
      "ESG & innovation challenges",
    ],
  },

  softskills: {
    corporate: [
      "Cross-functional coordination",
      "Requirements → technical specs",
      "Event & hackathon planning",
      "Mentoring & workshops",
      "Hands-on digital literacy support",
    ],
  },

  projects: [
    {
      id: 1,
      title: "Website for CS students",
      description:
        "TechnotesGR is a modern, student-first platform that helps high-school candidates prepare for the Panhellenic Informatics exam. It combines fast quizzes with instant feedback, clean flashcards, a supportive community forum, a study timer, a progress tracker, and a friendly AI chatbot—wrapped in a responsive, elegant UI with dark mode. Built for speed, stability, and great UX.",
      technologies: ["React.js", "Tailwind CSS", "TypeScript", "JavaScript", "Python"],
      features: [
        "Smart quizzes with instant feedback (local-first, retry on reconnect)",
        "Flashcards for fast revision (keyboard navigation, vertical transitions)",
        "Community forum with user profiles & clean UI",
        "Study timer (start/pause/reset, goals, pink theme)",
        "Progress tracker (interactive syllabus)",
        "Career orientation questionnaire with saved results",
        "Dark mode, responsive design, subtle animations",
        "Session-based AI chatbot (Google Gemini)",
        "Admin dashboard: user list (secure endpoint)",
      ],
      github_url: "https://github.com/feirw/technotesgrr",
      website_url: "https://technotesgr.com/",
      status: "in progress",
      technotesgr_social: {
        youtube: "https://www.youtube.com/@technotesgr-elenizafeiri",
        instagram: "https://www.instagram.com/technotesgr/",
        tiktok: "https://www.tiktok.com/@technotesgr",
        linkedin: "https://www.linkedin.com/company/technotesgr",
      },
    },
  ],

  experience: [
    {
      id: 1,
      company: "HongLong",
      position: "Product Owner",
      duration: "9/2025 – Present",
      location: "Remote",
      description:
        "Joined as Web Developer (9/2025); promoted to Product Owner (2/2026). Owns product prioritization, roadmap alignment, and stakeholder communication for the educational platform, while continuing to maintain and evolve the organization’s WordPress site.",
      achievements: [
        "Promoted to Product Owner in 2/2026, leading product decisions and cross-functional alignment.",
        "Maintained and updated the WordPress site; resolved an average of ~7 technical support tickets weekly in the earlier web-focused phase.",
        "Reduced website errors by 40% within the first six months through systematic fixes and quality improvements.",
      ],
    },
    {
      id: 2,
      company: "Threenitas",
      position: "Project Manager Intern",
      duration: "9/2025 – 10/2025",
      location: "Hybrid,Athens, Greece",
      description:
        "Supported delivery of digital solutions by aligning business and engineering around clear scope and timelines.",
      achievements: [
        "Coordinated cross-functional teams of 5+ members for timely delivery.",
        "Translated business requirements into clear technical specifications for engineering teams.",
      ],
    },
  ],

  education: {
    degree: "Bachelor of Science in Computer Science",
    university: "National and Kapodistrian University of Athens",
    duration: "9/2024 – 6/2028",
    gpa: "8.54/10",
    relevant_courses1: [
      "Computer Fundamentals",
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "Discrete Mathematics",
      "Probability & Statistics",
      "Artificial Intelligence",
      "Web Development",
      "Database Systems",
      "Computer Networks",
      "Operating Systems",
      "Software Engineering",
      "Human–Computer Interaction",
      "Project & Product Management",
    ],
    relevant_courses2: [
      "Computer Science",
      "Microeconomics",
      "Calculus",
      "Linear Algebra",
      "Technology",
    ],
    achievements2: [
      "Top 1% Panhellenic performance (19.00/20.00) — Eurobank recognition.",
      "Highest academic performance — General High School of Spercheiada (19.7/20); recognition by Cultural Center of Lamia & LamiaReport.",
    ],
  },

  /* Certificates: reverse chronological (newest first) by issue month/year */
  certificates: [
    {
      id: 10,
      title: "Product Launches (PRLC)",
      issuer: "Product School",
      date: "1/2026",
      description:
        "Product launch lifecycle and execution — MVP definition, feature prioritization, go-to-market alignment, and cross-functional coordination for successful releases.",
      link: "https://productschool.com/",
    },
    {
      id: 11,
      title: "Product Strategy (PSC)",
      issuer: "Product School",
      date: "1/2026",
      description:
        "Product strategy and roadmap thinking — product management fundamentals, delivery planning, stakeholder alignment, and strategic prioritization.",
      link: "https://productschool.com/",
    },
    {
      id: 0,
      title: "Prompt Engineering",
      issuer: "Amazon Web Services (AWS)",
      date: "12/2025",
      description: "Effective prompting for generative AI workflows.",
      link: "https://www.aws.training/",
      certificatePdf: "/certificates/prompt.pdf",
    },
    {
      id: 1,
      title: "Project Management",
      issuer: "Workearly",
      date: "9/2025",
      description: "Project management practice and AI integrations in delivery.",
      link: "https://workearly.gr/",
      certificatePdf: "/certificates/workearly.pdf",
    },
    {
      id: 3,
      title: "Digital Literacy Awareness",
      issuer: "Cisco Networking Academy",
      date: "8/2025",
      description: "Foundational digital literacy and safe technology use.",
      link: "https://www.netacad.com/",
      certificatePdf: "/certificates/dig.pdf",
    },
    {
      id: 12,
      title: "GenAI for Project Management & Sales",
      issuer: "The Tipping Point in Education",
      date: "6/2025",
      description:
        "Using generative AI in project management and sales — AI for project management, GenAI tooling, and effective AI prompting in professional workflows.",
      link: "https://www.thetippingpoint.org.gr/",
    },
    {
      id: 2,
      title: "Effective Data Communication & Storytelling",
      issuer: "Deloitte",
      date: "1/2025",
      description: "Data storytelling and pitching ideas with clarity.",
      link: "https://www2.deloitte.com/",
      certificatePdf: "/certificates/deloite.pdf",
    },
    {
      id: 13,
      title: "Team Leadership & Problem Solving Training",
      issuer: "Linq",
      date: "1/2025 – 4/2025",
      description:
        "Training on leading teams and solving problems constructively — leadership, mentoring, personal development, team leadership, creativity and innovation, strategy, and creative problem solving.",
      link: "https://linq.co/",
    },
  ],

  /* Display order: Hook & Grab → Crazy Business Ideas → Greece/Türkiye → Ennovation → Crowdpolicy AI */
  hackathons: [
    {
      id: 3,
      title: "Hook & Grab — 2nd Blue & Circular Economy Hackathon",
      organizer: "Odyssea",
      period: "12/2024",
      description:
        "Full-stack marketplace for second-hand fishing gear and marine pollution awareness; co-defined MVP and shipped under hackathon constraints.",
      skills: ["Full-stack delivery", "Product discovery", "Sustainability & circular economy"],
      highlight: "1st place among 10+ competing teams",
      linkUrl: "https://github.com/feirw/hook-and-grab",
      linkLabel: "View repository",
    },
    {
      id: 5,
      title: "Crazy Business Ideas",
      organizer: "IST College",
      period: "11/2025 – 3/2026",
      description:
        "Entrepreneurship and pitching competition for bold venture concepts. Developed “Luggease”, a tourism-focused business idea spanning traveller needs, market fit, and go-to-market storytelling.",
      skills: [
        "Tourism & hospitality",
        "Entrepreneurship",
        "Business model & pitching",
        "Value proposition design",
      ],
      highlight: "3rd place among 130 participations",
    },
    {
      id: 1,
      title: "Startup Development Hackathon — Greece / Türkiye 2025",
      organizer: "Ministry of Foreign Affairs of the Hellenic Republic",
      period: "12/2024 – 2/2025",
      description:
        "Greece–Türkiye bilateral programme: intensive startup development sprint with focus on pitching and building a mobile product narrative under time pressure.",
      skills: [
        "Pitching ideas",
        "Startup development",
        "Mobile application development",
        "Mobile application design",
      ],
      highlight: "Semi-finalist",
    },
    {
      id: 2,
      title: "Business Hackathon “Ennovation”",
      organizer: "ACE | AUEB (Athens Center for Entrepreneurship)",
      period: "2/2025 – 6/2025",
      description:
        "Business and innovation hackathon blending ESG themes, web design, and startup development — from problem framing to demo-ready storytelling.",
      skills: [
        "Environmental, Social & Governance (ESG)",
        "Web design",
        "Startup development",
        "Entrepreneurial ideas",
      ],
      highlight: "Semi-finalist",
    },
    {
      id: 4,
      title: "AI Hackathon by Crowdpolicy — AthensGo",
      organizer: "Crowdpolicy · City of Athens (Apps for Athens)",
      period: "11/2025",
      description:
        "AI hackathon build: AthensGo — accessible, personalized itineraries with persona-driven MVP definition (allergies, mobility, preferences).",
      skills: ["MVP & persona analysis", "Accessibility-minded product", "AI product scoping"],
      highlight: "Participated",
      linkUrl: "https://github.com/Apps4Athens-Hackathon-2-0/39_AthensGo",
      linkLabel: "View repository",
    },
  ],

  /* Volunteer: ongoing first, then reverse chronological by end / recency */
  volunteer: [
    {
      id: 1,
      role: "Project Manager",
      organization: "DiT Coding Club (NKUA)",
      duration: "12/2024 – Present",
      location: "Hybrid, Athens",
      description:
        "Planned and coordinated 4+ hackathons and tech events, managing organizing teams of 10+ members and supporting 150+ student participants.",
    },
    {
      id: 3,
      role: "Project Buddy",
      organization: "Sistech Global",
      duration: "9/2025 – 12/2025",
      location: "Remote",
      description:
        "Hands-on digital and AI support for 10+ refugee women, building practical technology skills for professional integration.",
      },
      {
        id: 4,
        role: "Volunteer for Tech Events",
        organization: "WELEAD",
        duration: "2/2025 – 5/2025",
        location: "Athens, Greece",
        description:
          "Reinforced coordination of 3+ tech events, assisting with logistics and workshops for 100+ participants.",
      },
    {
      id: 2,
      role: "Hackathon Coordinator",
      organization: "Texas A&M University × University of Athens",
      duration: "2/2025 – 3/2025",
      location: "Athens, Greece",
      description:
        "Supported international hackathon operations: logistics and communication for 80+ participants across two universities.",
    },
  ],

  photos: [
    {
      url: "/photos/123.jpg",
      title: "HackHarvard 2025",
      description: "Volunteering as Social Media Manager for HackHarvard 2025.",
      tag: "volunteer",
    },
  ],
};

export default portfolioData;
