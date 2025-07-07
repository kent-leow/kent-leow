import type { ContactInfo, SkillCategory, WorkExperience, Project, SocialLink, Education, Course } from "../types/portfolio";

export const portfolioData = {
  personal: {
    name: "ZHENG QIAN (Kent) LEOW",
    title: "Software Engineer III",
    summary: "Full Stack Software Engineer with 6+ years of experience in cross-platform mobile and web development using Flutter, Angular, React.js, Next.js, and TypeScript. Skilled in backend systems with Spring Boot and Node.js, working extensively with SQL, NoSQL, and RESTful APIs. Experienced in deploying and scaling applications on Azure, AWS, and GCP, and proficient in integrating microservices and building secure CI/CD pipelines. Passionate about leveraging AI tools to accelerate development and delivering scalable, user-centric solutions focused on performance, maintainability, and team productivity.",
    location: "Singapore",
    residence: "Permanent Resident"
  },

  contact: {
    phone: "+65 8834 1602",
    location: "Singapore",
    residence: "Permanent Resident"
  } as ContactInfo,

  skills: [
    {
      category: "Frontend Frameworks",
      skills: ["Angular", "ReactJS", "NextJS", "Flutter/Dart", "TypeScript"]
    },
    {
      category: "UI/UX Libraries",
      skills: ["Material UI", "Tailwind CSS", "Bootstrap"]
    },
    {
      category: "Backend Technologies",
      skills: ["Spring Boot (Java/Kotlin)", "NestJS", "Node.js", "Laravel (PHP)"]
    },
    {
      category: "Databases",
      skills: ["MySQL/MSSQL/PostgreSQL", "Firestore/MongoDB", "SQL Server"]
    },
    {
      category: "Cloud & DevOps",
      skills: ["Azure", "AWS", "GCP", "Docker", "CI/CD Pipelines"]
    },
    {
      category: "Development Tools",
      skills: ["Git (GitHub/GitLab/AzureRepo)", "UI/Unit Testing", "ELK Stack", "OpenSearch"]
    }
  ] as SkillCategory[],

  experience: [
    {
      id: "palo-it-gobiz",
      position: "Fullstack Software Engineer",
      company: "PALO IT (GoBiz @ GovTech)",
      location: "Singapore",
      startDate: "July 2024",
      endDate: "Present",
      description: "Leading full-stack development on AWS cloud infrastructure with Angular/ReactJS frontend and Spring Boot backend.",
      achievements: [
        "Leveraged AI tools to automate tasks and optimize workflows",
        "Modernized legacy codebase: upgraded Spring Boot 2 to 3, Angular 9 to 19",
        "Conducted technical evaluation of AWS Lambda for large-scale data export (~1M records)",
        "Resolved complex production issues using ELK Stack and OpenSearch",
        "Managed secure government agency user onboarding with protected API integrations",
        "Drove quality improvements through systematic bug resolution and technical debt reduction"
      ]
    },
    {
      id: "palo-it-iras",
      position: "Frontend Software Engineer",
      company: "PALO IT (IRAS @ EY)",
      location: "Singapore",
      startDate: "May 2024",
      endDate: "July 2024",
      description: "Redesigned Angular application architecture using Atomic Design principles for enhanced modularity.",
      achievements: [
        "Architected component modularity using Atomic Design principles",
        "Developed feature-rich modules with end-to-end backend integration",
        "Built dynamic Excel-like error display for file uploads",
        "Implemented upload/download and export functionality",
        "Created backend abstraction layer (BFF) using NodeJS for improved security"
      ]
    },
    {
      id: "palo-it-cix-2023",
      position: "Fullstack Software Engineer",
      company: "PALO IT (CIX)",
      location: "Singapore",
      startDate: "December 2023",
      endDate: "April 2024",
      description: "Led development of mission-critical carbon market platform features with Salesforce integration.",
      achievements: [
        "Developed user/client module integrated with Salesforce CRM and Cloudflare Turnstile",
        "Maintained platform stability across ReactJS frontend and Spring Boot backend",
        "Led infrastructure refactoring to improve performance and reduce technical debt",
        "Conducted knowledge transfer sessions and mentored fellow engineers"
      ]
    },
    {
      id: "palo-it-libeara",
      position: "Frontend Software Engineer",
      company: "PALO IT (Libeara)",
      location: "Singapore",
      startDate: "March 2023",
      endDate: "November 2023",
      description: "Architected cross-platform applications using Flutter and built crypto-enabled web applications.",
      achievements: [
        "Developed cross-platform application from scratch using Flutter (Android, iOS, web)",
        "Designed scalable component-based design system aligned with Figma specifications",
        "Integrated frontend with distributed microservices using OpenAPI specifications",
        "Built crypto-enabled web application with Next.js and Web3 wallet functionality",
        "Contributed to NestJS backend functions and endpoints"
      ]
    },
    {
      id: "palo-it-cix-2022",
      position: "Fullstack Software Engineer", 
      company: "PALO IT (CIX)",
      location: "Singapore",
      startDate: "August 2022",
      endDate: "February 2023",
      description: "Led ReactJS codebase refactoring and UI architecture optimization using Material Design.",
      achievements: [
        "Led comprehensive ReactJS refactoring initiative using Atomic Design",
        "Redesigned UI architecture with MUI design system for improved UX",
        "Owned end-to-end application maintenance and production risk mitigation",
        "Implemented new functional flows using ReactJS and Spring Boot"
      ]
    },
    {
      id: "palo-it-community",
      position: "Fullstack Software Engineer",
      company: "PALO IT (Community Hub)",
      location: "Singapore", 
      startDate: "May 2022",
      endDate: "July 2022",
      description: "Developed community hub platform for climate impact events and articles using NextJS.",
      achievements: [
        "Built dynamic community platform using NextJS for climate engagement",
        "Implemented secure user authentication flows (login, registration, password reset)",
        "Integrated modular content components for insights and event listings",
        "Leveraged Directus CMS for efficient content management",
        "Integrated Salesforce CRM via Zapier for seamless workflow automation"
      ]
    },
    {
      id: "gigworks-lead",
      position: "Lead Engineer",
      company: "Gigworks",
      location: "Singapore",
      startDate: "April 2021",
      endDate: "April 2022", 
      description: "Led Flutter mobile development team and architected scalable backend systems.",
      achievements: [
        "Led Flutter mobile application development team for cross-platform delivery",
        "Researched Google Cloud Dataflow and Apache Beam for data processing pipelines",
        "Designed modular Flutter package for action tracking and event logging",
        "Built data processing pipelines for AI/ML tasks",
        "Managed freelance developers and delivery timelines",
        "Architected robust NodeJS backend for unified platform (web, mobile, desktop)"
      ]
    },
    {
      id: "gigworks-mobile",
      position: "Mobile Software Engineer",
      company: "Gigworks",
      location: "Singapore",
      startDate: "February 2020",
      endDate: "March 2021",
      description: "Optimized Flutter application performance and implemented business-critical features.",
      achievements: [
        "Led Flutter code refactoring for improved performance and maintainability",
        "Managed cross-platform deployment for Android and iOS",
        "Implemented voucher systems, referral workflows, and image optimization",
        "Redesigned critical UIs: home page, search, seller onboarding",
        "Leveraged Firebase services: cloud functions, BigQuery, ML Kit"
      ]
    },
    {
      id: "plexure",
      position: "Fullstack Software Engineer",
      company: "Plexure",
      location: "Singapore",
      startDate: "November 2018",
      endDate: "January 2020",
      description: "Developed enterprise web applications for global shipping, telecom, and manufacturing clients.",
      achievements: [
        "Designed CRM system for global shipping and logistics company using Laravel",
        "Built secure customer portal with payment gateway and admin panel",
        "Integrated API communication with SGNIC for multinational telecom client",
        "Engineered ticketing system for major global monitor manufacturer",
        "Led R&D of Angular-based modular web application framework POC"
      ]
    },
    {
      id: "meteorsoft",
      position: "IT R&D Intern",
      company: "Meteorsoft",
      location: "Kuala Lumpur",
      startDate: "February 2018",
      endDate: "July 2018",
      description: "Contributed to e-commerce development and Windows application maintenance.",
      achievements: [
        "Developed e-commerce and tour booking website using ASP.NET, C#, VB.NET",
        "Maintained Windows application codebase",
        "Implemented SQL functions for cart checkout functionality",
        "Worked with SQL Server, Bootstrap, and jQuery technologies"
      ]
    }
  ] as WorkExperience[],

  projects: [
    {
      id: "carbon-market-platform",
      title: "Carbon Market Platform",
      description: "Mission-critical platform for carbon trading with Salesforce CRM integration",
      technologies: ["ReactJS", "Spring Boot", "Salesforce CRM", "Cloudflare Turnstile"],
      highlights: [
        "Enhanced scalability for sustainability goals",
        "Integrated user onboarding with external systems",
        "Improved platform stability and reliability"
      ]
    },
    {
      id: "cross-platform-crypto-app",
      title: "Cross-Platform Crypto Application",
      description: "Flutter-based application with Web3 wallet integration across Android, iOS, and web",
      technologies: ["Flutter", "Next.js", "Web3", "OpenAPI", "Figma"],
      highlights: [
        "Consistent experience across all platforms",
        "Scalable component-based design system",
        "Secure blockchain interactions"
      ]
    },
    {
      id: "government-modernization",
      title: "Government System Modernization",
      description: "Legacy system upgrade with modern frameworks and cloud infrastructure",
      technologies: ["Angular 19", "Spring Boot 3", "AWS", "ELK Stack"],
      highlights: [
        "Upgraded from Angular 9 to 19",
        "Modernized Spring Boot 2 to 3",
        "Handled 1M+ record data exports"
      ]
    },
    {
      id: "community-climate-hub",
      title: "Community Climate Hub",
      description: "Platform for sharing climate impact events and fostering environmental awareness",
      technologies: ["NextJS", "Directus CMS", "Salesforce", "Zapier"],
      highlights: [
        "Dynamic content management",
        "Automated workflow integration",
        "Enhanced public engagement"
      ]
    }
  ] as Project[],

  education: [
    {
      id: "ump-bachelor",
      degree: "Bachelor of Computer Science (Computer Systems & Networking) with Honours",
      institution: "Universiti Malaysia Pahang",
      location: "Malaysia",
      startDate: "September 2014",
      endDate: "September 2018"
    }
  ] as Education[],

  courses: [
    {
      id: "github-copilot",
      title: "GitHub Copilot",
      provider: "GitHub", 
      startDate: "January 2025",
      endDate: "January 2028"
    },
    {
      id: "azure-developer",
      title: "Microsoft Certified: Azure Developer Associate",
      provider: "Microsoft",
      startDate: "December 2024", 
      endDate: "January 2026"
    },
    {
      id: "azure-ai-engineer",
      title: "Microsoft Certified: Azure AI Engineer Associate",
      provider: "Microsoft",
      startDate: "April 2025",
      endDate: "April 2026"
    },
    {
      id: "govtech-assessment",
      title: "ICT Assessment Certification for Software Developer",
      provider: "GovTech Singapore",
      startDate: "December 2024",
      endDate: "December 2027"
    }
  ] as Course[],

  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/kent-leow",
      icon: "github"
    },
    {
      platform: "LinkedIn", 
      url: "https://linkedin.com/in/kent-leow",
      icon: "linkedin"
    }
  ] as SocialLink[]
};
