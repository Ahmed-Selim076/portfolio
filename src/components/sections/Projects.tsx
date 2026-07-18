import { useInView } from "../../hooks/useInView";
import { projects, type Project } from "../../data/projects";
import Badge from "../ui/Badge";
import Panel from "../ui/Panel";

function ProjectCard({ project, reverse }: { project: Project; reverse: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className={`fade-up ${inView ? "is-visible" : ""} relative grid md:grid-cols-2 gap-8 md:gap-12 items-center py-12 border-b border-border last:border-none`}
    >
      <div className={reverse ? "md:order-2" : ""}>
        <Panel tilt>
          <div className="aspect-video bg-surface flex items-center justify-center overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.name} preview`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-primary-bright/10 flex items-center justify-center">
                <span className="font-mono text-text-secondary text-sm">
                  {project.name} preview
                </span>
              </div>
            )}
          </div>
        </Panel>
      </div>

      <div className={reverse ? "md:order-1" : ""}>
        <span className="absolute -z-10 top-0 font-display text-7xl md:text-8xl font-bold text-primary/5 select-none">
          {project.number}
        </span>

        <p className="font-mono text-xs uppercase tracking-widest text-primary-bright mb-3">
          Featured Project
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2">{project.name}</h3>
        <p className="text-text-secondary text-sm mb-4">{project.tag}</p>
        <p className="text-text-secondary leading-relaxed mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <Badge key={tech} label={tech} />
          ))}
        </div>

        <div className="flex gap-6 text-sm font-medium">
          {project.live && (
            
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="text-primary-bright hover:text-glow transition"
            >
              Live Demo &#8599;
            </a>
          )}
          {project.github && (
            
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-text-secondary hover:text-text-primary transition"
            >
              GitHub &#8599;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-primary-bright mb-2">
          // modules.ts
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">Projects</h2>
        <p className="text-text-secondary mb-4 max-w-xl">
          A few things I&apos;ve built end-to-end — architecture, backend, and frontend.
        </p>

        <div>
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
