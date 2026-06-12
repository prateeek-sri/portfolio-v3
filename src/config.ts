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
    slug: string;
    description: string;
    overview?: string;
    features?: string[];
    problemsFaced?: string;
    lessonsLearned?: string;
    implementations?: string[];
    whyChoseThisStack?: { name: string; reason: string }[];
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
    age: "21",
    roles: [
        "fullstack developer",
        "ui/ux designer"
    ],
    bio: [
        "Hi I'm a passionate developer focused on building clean, performant and user-centric web applications working remotely from India.",
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
            slug: "jobify",
            overview: "Jobify is a modern applicant tracking system and job board built to streamline the hiring process. It provides personalized job feeds, application tracking, and an intuitive dashboard for both recruiters and job seekers.",
            problemsFaced: "Managing complex state for the multi-step application forms and securely handling role-based access control (RBAC) across protected API routes posed a significant architectural challenge.",
            lessonsLearned: "Gained deep insights into Next.js middleware for authentication, and learned how to structure scalable MongoDB schemas for relational data like Users and Job Posts.",
            description: "Comprehensive job board and application tracker - A robust platform built with Next.js, Express, and MongoDB, featuring real-time application status updates and personalized job recommendations.",
            features: [
                "Real-time application status tracking and dashboard analytics.",
                "Advanced filtering and search for personalized job matching.",
                "Secure user authentication and role-based access control.",
                "Responsive UI tailored for both recruiters and applicants."
            ],
            implementations: [
                "Implemented secure JWT-based authentication for recruiters and job seekers.",
                "Built an advanced search and filtering system for job matching.",
                "Developed a real-time dashboard for instant application status updates."
            ],
            whyChoseThisStack: [
                { name: "Next.js", reason: "For SEO-friendly server-side rendering and fast routing." },
                { name: "TypeScript", reason: "To ensure type safety across the entire stack, reducing runtime errors." },
                { name: "MongoDB", reason: "Its flexible schema was perfect for dynamic job posts and applicant profiles." },
                { name: "Tailwind CSS", reason: "Allowed rapid styling without leaving the component code." }
            ],
            tags: ["Express", "TypeScript", "Next.js", "Node.js", "MongoDB", "Tailwind"],
            image: "work/jobify.png",
            liveUrl: "https://jobify-nu-ecru.vercel.app/",
            githubUrl: "https://github.com/prateeek-sri/jobify",
            year: "2026",
        },
        {
            name: "Civic Bridge",
            slug: "civic-bridge",
            overview: "Civic Bridge acts as a digital intermediary between local citizens and government authorities. It allows users to geolocate civic issues, upload proof, and track the resolution progress in real time.",
            problemsFaced: "Integrating accurate geolocation APIs and ensuring smooth map rendering across varied mobile devices required extensive optimization and polyfill implementations.",
            lessonsLearned: "Mastered the integration of third-party map libraries and improved my understanding of handling multipart form data (images) in a serverless environment.",
            description: "Community Issue Tracking Platform - A responsive web app connecting citizens with local authorities to report, track, and resolve civic issues using Next.js and MongoDB.",
            features: [
                "Geolocation-based issue reporting and interactive map integration.",
                "Real-time status updates and notification system for reported issues.",
                "Dedicated authority dashboard for efficient ticket management.",
                "Community upvoting system to prioritize critical local problems."
            ],
            implementations: [
                "Integrated third-party geolocation APIs to accurately pinpoint reported issues.",
                "Set up robust form handling for secure image uploads of civic problems.",
                "Created an admin dashboard with role-based access for local authorities."
            ],
            whyChoseThisStack: [
                { name: "Next.js", reason: "Provided an excellent API route system for handling serverless backend logic." },
                { name: "MongoDB", reason: "Handled geolocation coordinates (GeoJSON) queries seamlessly." },
                { name: "Tailwind CSS", reason: "Enabled quick, responsive mobile-first designs crucial for citizen reporting." }
            ],
            tags: ["Next.js", "TypeScript", "Tailwind", "Mongo"],
            image: "work/cibi.png",
            liveUrl: "https://cibi-beige.vercel.app/",
            githubUrl: "https://github.com/prateeek-sri/civic-bridge",
            year: "2026",
        },
        {
            name: "Nova",
            slug: "nova",
            overview: "Nova is an advanced RAG chatbot that exclusively answers questions related to the 'Big Three' anime (Naruto, One Piece, Bleach). It chunks and vectorizes massive lore repositories to provide accurate, citation-backed answers.",
            problemsFaced: "Fine-tuning the vector search threshold to prevent hallucinations while answering niche anime lore questions required extensive prompt engineering and chunk size experimentation.",
            lessonsLearned: "Developed a strong proficiency in Retrieval-Augmented Generation architectures, embeddings, and vector databases like Pinecone/Supabase.",
            description: "AI-Powered Anime Knowledge Base - A specialized RAG (Retrieval-Augmented Generation) chatbot designed to answer deep lore questions about the 'Big Three' anime, powered by Next.js.",
            features: [
                "Context-aware AI responses utilizing Retrieval-Augmented Generation.",
                "Custom vector database integration for deep, series-specific lore.",
                "Sleek, conversational UI with real-time typing indicators.",
                "Optimized edge-function processing for fast query resolution."
            ],
            implementations: [
                "Chunked and vectorized massive anime lore datasets using OpenAI embeddings.",
                "Configured a vector database for semantic similarity searches.",
                "Designed an intuitive, conversational UI with real-time markdown streaming."
            ],
            whyChoseThisStack: [
                { name: "Next.js", reason: "Edge functions allowed for blazing fast AI response streaming." },
                { name: "TypeScript", reason: "Maintained structured type definitions for complex AI conversational contexts." },
                { name: "MongoDB", reason: "Stored conversation histories efficiently alongside user vector mappings." }
            ],
            tags: ["Next.js", "Mongo", "TypeScript", "Tailwind"],
            image: "work/nova.png",
            liveUrl: "https://nova-weld-sigma.vercel.app/",
            githubUrl: "https://github.com/prateeek-sri/Nova",
            year: "2025",
        },
        {
            name: "AgriNova",
            slug: "agrinova",
            overview: "AgriNova is a comprehensive agricultural tool that predicts the most suitable crops for a given region using soil macronutrients and localized weather patterns. The ML models were trained on extensive agricultural datasets.",
            problemsFaced: "Bridging the gap between the Python-based machine learning prediction API and the React frontend securely without introducing severe latency spikes during data fetching.",
            lessonsLearned: "Learned how to deploy Python ML models as serverless APIs and integrate them seamlessly into a modern TypeScript web application.",
            description: "Intelligent Agricultural Assistant - A predictive crop recommendation engine utilizing Python-based machine learning models and a React frontend to optimize yield.",
            features: [
                "Predictive machine learning models based on soil composition and weather.",
                "Interactive data visualization for seasonal crop trends.",
                "Location-based localized climate fetching and processing.",
                "Accessible, mobile-first interface designed for rural farmers."
            ],
            tags: ["React", "TypeScript", "Tailwind","Python"],
            image: "work/agrinova.png",
            liveUrl: "https://sih-agro-prototype.vercel.app/",
            githubUrl: "https://github.com/prateeek-sri/SIH-Agro-Prototype",
            year: "2025",
        },
        {
            name: "Dice Game",
            slug: "dice-game",
            overview: "A fast-paced web arcade game where players predict dice rolls. Built as an exercise in React state management, it handles complex betting logic and CSS-driven physics animations.",
            problemsFaced: "Synchronizing the CSS 3D dice rolling animations with the React component state updates to prevent the UI from resolving before the animation completed.",
            lessonsLearned: "Strengthened my grasp on React's lifecycle hooks and advanced CSS animations, specifically utilizing keyframes for 3D transforms.",
            description: "Interactive Web-Based Dice Game - A lightweight, responsive browser game built with React and Tailwind CSS featuring smooth animations and state-driven gameplay mechanics.",
            features: [
                "State-driven betting and score calculation logic.",
                "Smooth CSS animations for dice rolling sequences.",
                "Dynamic UI feedback based on win/loss conditions.",
                "Responsive design optimized for both desktop and mobile play."
            ],
            tags: ["React","JavaScript", "Tailwind"],
            image: "work/dice.png",
            liveUrl: "https://dice-game-eight-mocha.vercel.app/",
            githubUrl: "https://github.com/prateeek-sri/Dice-game",
            year: "2024",
        },
        {
            name: "Keepr",
            slug: "keepr",
            overview: "Inspired by Google Keep, Keepr is a fully functional note-taking app that leverages local storage for blazing-fast offline access, featuring a responsive masonry layout for optimal screen utilization.",
            problemsFaced: "Implementing a reliable masonry grid layout entirely from scratch without heavy external libraries, while ensuring elements didn't overlap during window resizing.",
            lessonsLearned: "Improved my state management skills by synchronizing React state with the browser's localStorage API, creating a robust offline-first experience.",
            description: "Personalized Note-Taking Application - A clean, fast, and intuitive markdown-supported note manager utilizing React and local storage for seamless task organization.",
            features: [
                "Full CRUD (Create, Read, Update, Delete) functionality for notes.",
                "Persistent local storage integration for offline access.",
                "Masonry grid layout for efficient space utilization.",
                "Clean, minimalist interface inspired by Google Keep."
            ],
            tags: ["React", "JavaScript", "Tailwind"],
            image: "work/keepr.png",
            liveUrl: "https://keepr-zeta.vercel.app/",
            githubUrl: "https://github.com/prateeek-sri/Keepr",
            year: "2024",
        },
        {
            name: "Velora",
            slug: "velora",
            overview: "Velora is a visually-driven image discovery platform powered by the Unsplash API. It implements infinite scrolling and dynamic masonry layouts to provide a Pinterest-like browsing experience.",
            problemsFaced: "Handling rate limits from the Unsplash API and gracefully managing the loading state for high-resolution images in an infinite scroll container without crashing the browser.",
            lessonsLearned: "Learned the intricacies of Intersection Observers for infinite scrolling and optimized image loading techniques using modern React patterns.",
            description: "Dynamic Image Discovery Gallery - A visually stunning, Pinterest-style masonry image gallery built with React, consuming the Unsplash API for infinite high-resolution photo exploration.",
            features: [
                "Infinite scrolling integration via Unsplash API.",
                "Responsive masonry grid layout for dynamic image sizing.",
                "Built-in search functionality with real-time filtering.",
                "High-performance image loading and optimization techniques."
            ],
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
