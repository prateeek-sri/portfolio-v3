export interface SocialConfig {
    github: string;
    linkedin: string;
    instagram: string;
    email: string;
}

export interface StackItem {
    id: string;
    name: string;
    image: string;
    className?: string;
}

export interface ProjectConfig {
    name: string;
    description: string;
    tags: string[];
    image: string;
    liveUrl: string;
    githubUrl: string;
    year?: string;
}

export interface BlogConfig {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    image: string;
    content: string;
}

export interface PortfolioConfig {
    name: string;
    age: string;
    roles: string[];
    bio: string[];
    bioHighlights: string[];
    social: SocialConfig;
    resumeUrl: string;
    stack: StackItem[];
    projects: ProjectConfig[];
    github: {
        username: string;
        year: number;
    };
    blogs?: BlogConfig[];
    meta: {
        title: string;
        faviconUrl: string;
    };
    footer: {
        signatureImageUrl: string;
        githubRepoUrl: string;
        credit: string;
    };
    navbar: {
        brandText: string;
    };
    contact: {
        subtitle: string;
        displayEmail: string;
        enquiryEmail: string;
        socialRows: Array<{
            platform: string;
            handle: string;
            url: string;
        }>;
    };
}

export const CONFIG: PortfolioConfig = {
    name: "Prateek Srivastav",
    age: "20",
    roles: [
        "fullstack developer",
        "ui/ux designer"
    ],
    bio: [
        "Hi, I'm a passionate developer focused on building clean, performant, and user-centric web applications working remotely from India.",
        "I’m exploring how to turn ideas into simple, functional projects using Next.js while learning the craft of good design and clean code.",
        "My mission is to build cool things and keep my caffeine intake at socially acceptable levels.",
    ],
    bioHighlights: [
        "design",
        "code",
        "building",
        "build",
        "products",
        "learning",
        "user-centric",
    ],
    social: {
        github: "https://github.com/prateeek-sri",
        linkedin: "https://www.linkedin.com/in/prateek-kumar-srivastav/",
        instagram: "https://www.instagram.com/_.prateeek_/",
        email: "pankaj111sri@gmail.com",
    },
    resumeUrl: "https://drive.google.com/file/d/1FFRenmLVEMmNKcy-1SZ7hXPTUmguJwNm/view?usp=sharing",
    stack: [
        {
            id: "js",
            name: "JavaScript",
            image: "icons/javascript-original.svg",
            className: "",
        },
        {
            id: "c",
            name: "C",
            image: "icons/c-original.svg",
            className: "",
        },
        {
            id: "py",
            name: "Python",
            image: "icons/Python.svg",
            className: "",
        },
        {
            id: "java",
            name: "Java",
            image: "icons/java-original.svg",
            className: "",
        },
        {
            id: "pstrg",
            name: "PostgreSQL",
            image: "icons/PostgresSQL.svg",
            className: "",
        },
        {
            id: "ts",
            name: "TypeScript",
            image: "icons/typescript-plain.svg",
            className: "",
        },
        {
            id: "node",
            name: "Node.js",
            image: "icons/node-original.svg",
            className: "",
        },
        {
            id: "express",
            name: "Express.js",
            image: "icons/express-original.svg",
            className: "",
        },
        {
            id: "mongo",
            name: "MongoDB",
            image: "icons/mongodb-original.svg",
            className: "",
        },
        {
            id: "github",
            name: "GitHub",
            image: "icons/github-original.svg",
            className: "",
        },
        {
            id: "react",
            name: "React.js",
            image: "icons/react-original.svg",
            className: "",
        },
        {
            id: "next",
            name: "Next.js",
            image: "icons/next.js-logo.svg",
            className: "",
        },
        {
            id: "tailwind",
            name: "Tailwind CSS",
            image: "icons/tailwindcss-plain.svg",
            className: "",
        },
    ],
    projects: [
        {
            name: "Jobify",
            description: "A tool that helps you get jobs.",
            tags: ["Express", "TypeScript", "Next.js", "Node.js", "MongoDB", "Tailwind"],
            image: "work/jobify.png",
            liveUrl: "https://jobify-nu-ecru.vercel.app/",
            githubUrl: "https://github.com/prateeek-sri/jobify",
            year: "2026",
        },
        {
            name: "Civic Bridge",
            description: "Unites residents and authorities by providing issue tracking.",
            tags: ["Next.js", "TypeScript", "Tailwind", "Mongo"],
            image: "work/cibi.png",
            liveUrl: "https://cibi-beige.vercel.app/",
            githubUrl: "https://github.com/prateeek-sri/civic-bridge",
            year: "2026",
        },
        {
            name: "Nova",
            description: "RAG chatbot built using Next.js for big three of anime questions",
            tags: ["Next.js", "Mongo", "TypeScript", "Tailwind"],
            image: "work/nova.png",
            liveUrl: "https://nova-weld-sigma.vercel.app/",
            githubUrl: "https://github.com/prateeek-sri/Nova",
            year: "2025",
        },
        {
            name: "AgriNova",
            description: "AI based crop recommendation system for farmers",
            tags: ["React", "TypeScript", "Tailwind","Python"],
            image: "work/agrinova.png",
            liveUrl: "https://sih-agro-prototype.vercel.app/",
            githubUrl: "https://github.com/prateeek-sri/SIH-Agro-Prototype",
            year: "2025",
        },
        {
            name: "Dice Game",
            description: "Roll the dice and guess what number you get!",
            tags: ["React","JavaScript", "Tailwind"],
            image: "work/dice.png",
            liveUrl: "https://dice-game-eight-mocha.vercel.app/",
            githubUrl: "https://github.com/prateeek-sri/Dice-game",
            year: "2024",
        },
        {
            name: "Keepr",
            description: "A note-taking app that keeps your thoughts organized.",
            tags: ["React", "JavaScript", "Tailwind"],
            image: "work/keepr.png",
            liveUrl: "https://keepr-zeta.vercel.app/",
            githubUrl: "https://github.com/prateeek-sri/Keepr",
            year: "2024",
        },
        {
            name: "Velora",
            description: "Image Gallery platform based on unsplash API",
            tags: ["React", "JavaScript", "Tailwind"],
            image: "work/velora.png",
            liveUrl: "https://velora-rouge-rho.vercel.app/",
            githubUrl: "https://github.com/prateeek-sri/Velora-Image-Gallery",
            year: "2024",
        },
    ],
    github: {
        username: "prateeek-sri",
        year: 2026,
    },
    meta: {
        title: "Prateek Kumar Srivastav",
        faviconUrl: "work/favicon.png"
    },
    footer: {
        signatureImageUrl: "",
        githubRepoUrl: "https://www.youtube.com/watch?v=Aq5WXmQQooo",
        credit: "Designed and developed with love",
    },
    navbar: {
        brandText: "Portfolio",
    },
    contact: {
        subtitle: "Let's connect and build something great together.",
        displayEmail: "hello@example.com",
        enquiryEmail: "pankaj111sri@gmail.com",
        socialRows: [
            {
                platform: "GitHub",
                handle: "/prateek",
                url: "https://github.com/prateeek-sri",
            },
            {
                platform: "LinkedIn",
                handle: "/in/prateek",
                url: "https://linkedin.com/in/prateek-kumar-srivastav",
            },
        ],
    },
};
