export interface Project {
  number: string;
  name: string;
  tag: string;
  description: string;
  highlights: string[];
  stack: string[];
  live?: string;
  github?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    number: "01",
    name: "Nexus",
    tag: "Project Management Platform",
    description:
      "A Jira-style workspace built solo, end to end — from database schema to deployed UI. Teams organize work on Kanban boards, track progress in real time, and keep every conversation attached to the task it belongs to.",
    highlights: [
      "JWT + refresh-token auth with Google OAuth sign-in",
      "Real-time notifications and threaded task comments",
      "Drag-and-drop Kanban boards with live status sync",
      "Analytics dashboard tracking team velocity and overdue work",
    ],
    stack: ["React", "TanStack", "ASP.NET Core", "PostgreSQL", "JWT"],
    live: "https://nexus.t9am-w0rk.workers.dev/",
    github: "https://github.com/Ahmed-Selim076/nexus-frontend",
    image: "/images/nexus.png",
  },
  {
    number: "02",
    name: "Launchly",
    tag: "Multi-Tenant SaaS Store Builder",
    description:
      "A Shopify-style platform where any business signs up and gets a fully working storefront — E-commerce, Booking, or Restaurant — in minutes. Every tenant's data is completely isolated at the database layer, not just the UI.",
    highlights: [
      "True multi-tenancy via EF Core global query filters — zero data leakage between tenants",
      "9 live storefronts across 3 store types × 3 templates",
      "Super Admin, Tenant Admin, and Customer role tiers with scoped permissions",
      "Cloudinary image pipeline and full audit logging on tenant actions",
    ],
    stack: ["Angular", "ASP.NET Core", "PostgreSQL", "Multi-tenancy"],
    github: "https://github.com/Ahmed-Selim076/Launchly.Frontend",
    image: "/images/launchly.png",
  },
  {
    number: "03",
    name: "Slate",
    tag: "Real-time Collaborative Whiteboard",
    description:
      "A live multiplayer canvas where a team sketches, plans, and thinks together in the same space at the same time — built on SignalR WebSockets for sub-second sync, not polling.",
    highlights: [
      "Live multi-user cursors and presence over SignalR",
      "Infinite pan/zoom canvas with auto-save",
      "Built-in real-time Chess and card-game modes on the same socket layer",
      "Conflict-free sync tested with multiple concurrent editors",
    ],
    stack: ["React", "ASP.NET Core", "SignalR", "PostgreSQL", "Canvas API"],
    github: "https://github.com/Ahmed-Selim076/Slate.Frontend",
    image: "/images/slate.png",
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
    "Angular",
    "TypeScript",
    "TanStack (Router/Query/Start)",
    "RxJS",
    "Tailwind CSS",
    "Radix UI",
    "React Hook Form",
    "Zod",
    "Framer Motion",
    "Recharts",
    "Chart.js",
  ],
  Backend: [
    "ASP.NET Core",
    "C#",
    "Entity Framework Core",
    "ASP.NET Identity",
    "SignalR",
    "REST APIs",
    "Clean Architecture",
    "JWT & OAuth 2.0 (Google)",
    "FluentValidation",
    "AutoMapper",
  ],
  Database: ["PostgreSQL", "Multi-Tenant Data Isolation"],
  "DevOps & Tools": [
    "Git & GitHub",
    "Vercel",
    "Railway",
    "Cloudflare Workers",
    "Cloudinary",
  ],
  Testing: ["xUnit"],
};

export const stats = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 3, suffix: "", label: "Full-Scale Projects" },
  { value: 140, suffix: "+", label: "REST Endpoints Shipped" },
];

export const contact = {
  email: "ahmedxxalaidy1x@gmail.com",
  linkedin: "https://www.linkedin.com/in/ahmed-selim112",
  linkedinLabel: "/in/ahmed-selim112",
  github: "https://github.com/Ahmed-Selim076",
  githubLabel: "/Ahmed-Selim076",
  // WhatsApp + Telegram both resolve via the real phone number.
  whatsapp: "https://wa.me/201021399112",
  telegram: "https://t.me/+201021399112",
  cv: "/Ahmed_Selim_CV.pdf",
};
