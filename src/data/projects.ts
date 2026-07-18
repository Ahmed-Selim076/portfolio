export interface Project {
  number: string;
  name: string;
  tag: string;
  description: string;
  stack: string[];
  live?: string;
  github?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    number: "01",
    name: "Nexus",
    tag: "Project Management Tool",
    description:
      "A full-stack platform for teams — Kanban boards, task tracking, real-time notifications, threaded comments, and analytics.",
    stack: ["React", "TanStack", "ASP.NET Core", "PostgreSQL", "JWT"],
    live: "https://nexus.t9am-w0rk.workers.dev/",
    github: "https://github.com/Ahmed-Selim076/nexus-frontend",
    image: "/images/projects/nexus.png",
  },
  {
    number: "02",
    name: "Launchly",
    tag: "Multi-Tenant SaaS Store Builder",
    description:
      "A Shopify-like platform where businesses sign up, pick a store type (E-commerce, Booking, or Restaurant), and get their own subdomain with a fully functional storefront and admin dashboard.",
    stack: ["Angular", "ASP.NET Core", "PostgreSQL", "Multi-tenancy"],
    github: "https://github.com/Ahmed-Selim076/Launchly.Frontend",
    image: "/images/projects/launchly.png",
  },
  {
    number: "03",
    name: "Slate",
    tag: "Real-time Collaborative Whiteboard",
    description:
      "Draw, brainstorm, and build together — live. Multiple users on the same infinite canvas with live cursors, sticky notes, and real-time sync.",
    stack: ["React", "ASP.NET Core", "SignalR", "PostgreSQL", "Canvas API"],
    github: "https://github.com/Ahmed-Selim076/Slate.Frontend",
    image: "/images/projects/slate.png",
  },
];

export const codeSnippets = [
  `export function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting)
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}`,
  `public class TaskController : ControllerBase
{
    private readonly ITaskService _service;

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateTaskDto dto)
    {
        var task = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(Get), task);
    }
}`,
  `const particles = useMemo(() => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 5 * Math.cbrt(Math.random());
    positions.set(spherePoint(r), i * 3);
  }
  return positions;
}, [count]);`,
];

export const skills = {
  Frontend: [
    "React",
    "TypeScript",
    "Next.js",
    "TanStack Router/Query",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP",
    "Three.js",
    "Redux Toolkit",
    "Zustand",
  ],
  Backend: [
    "ASP.NET Core",
    "C#",
    "Node.js",
    "Entity Framework Core",
    "SignalR",
    "REST APIs",
    "GraphQL",
    "JWT",
    "Microservices",
  ],
  Database: ["PostgreSQL", "SQL Server", "MongoDB", "Redis"],
  "DevOps & Tools": [
    "Git",
    "GitHub Actions",
    "Docker",
    "Vite",
    "Cloudinary",
    "Vercel",
    "Railway",
    "Nginx",
  ],
  Testing: ["Jest", "React Testing Library", "xUnit", "Postman"],
};

export const stats = [
  { value: 3, suffix: "+", label: "Years Learning" },
  { value: 4, suffix: "", label: "Projects Shipped" },
  { value: 2, suffix: "+", label: "Years React" },
];

export const contact = {
  email: "ahmedxxalaidy1x@gmail.com",
  linkedin: "https://www.linkedin.com/in/ahmed-selim112",
  linkedinLabel: "/in/ahmed-selim112",
  github: "https://github.com/Ahmed-Selim076",
  githubLabel: "/Ahmed-Selim076",
  // Placeholders — swap in the real number/username before deploying.
  whatsapp: "https://wa.me/201000000000",
  telegram: "https://t.me/your_username",
  cv: "/Ahmed_Selim_CV.pdf",
};
