import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'src/config.ts');
let content = fs.readFileSync(configPath, 'utf8');

// 1. Update interface
content = content.replace(
`export interface ProjectConfig {
    name: string;
    description: string;
    features?: string[];
    tags: string[];
    image: string;
    liveUrl: string;
    githubUrl: string;
    year?: string;
}`,
`export interface ProjectConfig {
    name: string;
    slug: string;
    description: string;
    overview?: string;
    features?: string[];
    problemsFaced?: string;
    lessonsLearned?: string;
    tags: string[];
    image: string;
    liveUrl: string;
    githubUrl: string;
    year?: string;
}`);

// 2. Update projects array using regex to inject the new fields right after `name: "...",`
const slugs = {
    "Jobify": "jobify",
    "Civic Bridge": "civic-bridge",
    "Nova": "nova",
    "AgriNova": "agrinova",
    "Dice Game": "dice-game",
    "Keepr": "keepr",
    "Velora": "velora"
};

const overviews = {
    "jobify": "Jobify is a modern applicant tracking system and job board built to streamline the hiring process. It provides personalized job feeds, application tracking, and an intuitive dashboard for both recruiters and job seekers.",
    "civic-bridge": "Civic Bridge acts as a digital intermediary between local citizens and government authorities. It allows users to geolocate civic issues, upload proof, and track the resolution progress in real time.",
    "nova": "Nova is an advanced RAG chatbot that exclusively answers questions related to the 'Big Three' anime (Naruto, One Piece, Bleach). It chunks and vectorizes massive lore repositories to provide accurate, citation-backed answers.",
    "agrinova": "AgriNova is a comprehensive agricultural tool that predicts the most suitable crops for a given region using soil macronutrients and localized weather patterns. The ML models were trained on extensive agricultural datasets.",
    "dice-game": "A fast-paced web arcade game where players predict dice rolls. Built as an exercise in React state management, it handles complex betting logic and CSS-driven physics animations.",
    "keepr": "Inspired by Google Keep, Keepr is a fully functional note-taking app that leverages local storage for blazing-fast offline access, featuring a responsive masonry layout for optimal screen utilization.",
    "velora": "Velora is a visually-driven image discovery platform powered by the Unsplash API. It implements infinite scrolling and dynamic masonry layouts to provide a Pinterest-like browsing experience."
};

const problemsFaced = {
    "jobify": "Managing complex state for the multi-step application forms and securely handling role-based access control (RBAC) across protected API routes posed a significant architectural challenge.",
    "civic-bridge": "Integrating accurate geolocation APIs and ensuring smooth map rendering across varied mobile devices required extensive optimization and polyfill implementations.",
    "nova": "Fine-tuning the vector search threshold to prevent hallucinations while answering niche anime lore questions required extensive prompt engineering and chunk size experimentation.",
    "agrinova": "Bridging the gap between the Python-based machine learning prediction API and the React frontend securely without introducing severe latency spikes during data fetching.",
    "dice-game": "Synchronizing the CSS 3D dice rolling animations with the React component state updates to prevent the UI from resolving before the animation completed.",
    "keepr": "Implementing a reliable masonry grid layout entirely from scratch without heavy external libraries, while ensuring elements didn't overlap during window resizing.",
    "velora": "Handling rate limits from the Unsplash API and gracefully managing the loading state for high-resolution images in an infinite scroll container without crashing the browser."
};

const lessonsLearned = {
    "jobify": "Gained deep insights into Next.js middleware for authentication, and learned how to structure scalable MongoDB schemas for relational data like Users and Job Posts.",
    "civic-bridge": "Mastered the integration of third-party map libraries and improved my understanding of handling multipart form data (images) in a serverless environment.",
    "nova": "Developed a strong proficiency in Retrieval-Augmented Generation architectures, embeddings, and vector databases like Pinecone/Supabase.",
    "agrinova": "Learned how to deploy Python ML models as serverless APIs and integrate them seamlessly into a modern TypeScript web application.",
    "dice-game": "Strengthened my grasp on React's lifecycle hooks and advanced CSS animations, specifically utilizing keyframes for 3D transforms.",
    "keepr": "Improved my state management skills by synchronizing React state with the browser's localStorage API, creating a robust offline-first experience.",
    "velora": "Learned the intricacies of Intersection Observers for infinite scrolling and optimized image loading techniques using modern React patterns."
};

// Replace each project block by adding the new fields
for (const [name, slug] of Object.entries(slugs)) {
    const regex = new RegExp('name: "' + name + '",');
    const replacement = 'name: "' + name + '",\\n            slug: "' + slug + '",\\n            overview: "' + overviews[slug] + '",\\n            problemsFaced: "' + problemsFaced[slug] + '",\\n            lessonsLearned: "' + lessonsLearned[slug] + '",';
    content = content.replace(regex, replacement);
}

fs.writeFileSync(configPath, content, 'utf8');
console.log('Successfully updated config.ts');
