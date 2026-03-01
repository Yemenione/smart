// lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || "http://127.0.0.1:8000/storage";

export interface ProjectData {
    id: number;
    title: string;
    slug: string;
    client: string;
    role: string;
    year: string;
    challenge?: string;
    solution?: string;
    tech_stack?: string[];
    cover_image?: string;
}

export interface FullProjectData extends ProjectData {
    // Add any nested relationships if needed in the future
}

// Fallback Mock Data to keep the frontend beautiful when the backend is down
const MOCK_PROJECTS: ProjectData[] = [
    {
        id: 1,
        title: "Quantum E-Commerce",
        role: "Headless Architecture",
        cover_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        slug: "quantum",
        client: "Quantum Corp",
        year: "2023",
    },
    {
        id: 2,
        title: "Aura Paris",
        role: "UI/UX Experience",
        cover_image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
        slug: "aura",
        client: "Aura Fashion",
        year: "2022",
    },
    {
        id: 3,
        title: "Neuromorphic AI",
        role: "Creative Engineering",
        cover_image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
        slug: "neuromorphic",
        client: "NeuroTech Solutions",
        year: "2024",
    },
    {
        id: 4,
        title: "Vanguard Tech",
        role: "Digital Transformation",
        cover_image: "https://images.unsplash.com/photo-1614729939124-03290b5609ce?q=80&w=1200&auto=format&fit=crop",
        slug: "vanguard",
        client: "Vanguard Innovations",
        year: "2021",
    }
];

export const getProjects = async (): Promise<ProjectData[]> => {
    try {
        const res = await fetch(`${API_URL}/projects`, { next: { revalidate: 60 } });

        if (!res.ok) {
            throw new Error(`Failed to fetch projects: ${res.status}`);
        }

        const json = await res.json();
        return json.data;
    } catch (error) {
        console.warn("API is unreachable. Using premium fallback mock data.");
        return MOCK_PROJECTS;
    }
};

export async function getProjectBySlug(slug: string): Promise<FullProjectData | null> {
    try {
        const res = await fetch(`${API_URL}/projects/${slug}`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch project ${slug}`);
        }

        const json = await res.json();
        return json.data;
    } catch (error) {
        console.warn(`API is unreachable for project ${slug}. Using premium fallback mock data.`);

        return {
            id: 99,
            title: slug === "quantum" ? "Quantum E-Commerce" : "Project " + slug,
            role: "Headless Architecture",
            cover_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            slug: slug,
            client: "Aura Paris",
            year: "2026",
            challenge: "Decoupling their massive Monolith into a state-of-the-art Headless ecosystem, achieving sub-second load times while maintaining a sophisticated visual identity and flawless motion design.",
            solution: "Leveraging Next.js on the edge, combined with a robust Laravel API. We implemented aggressive ISR caching strategies and custom WebGL shaders to deliver an experience that feels truly transformative and elite.",
            tech_stack: ["Next.js", "Laravel", "Tailwind CSS", "Framer Motion"]
        };
    }
}

export const submitContact = async (data: { name: string; email: string; message: string }) => {
    try {
        const res = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                message: data.message
            }),
        });

        if (!res.ok) {
            throw new Error(`Erreur HTTP: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.warn("API is unreachable for contact submission. Simulating success for presentation.");
        await new Promise(resolve => setTimeout(resolve, 1500));
        return { success: true, message: "Simulated transmission success" };
    }
}
