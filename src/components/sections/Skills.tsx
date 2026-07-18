import { useInView } from "../../hooks/useInView";
import { skills } from "../../data/projects";
import Badge from "../ui/Badge";

export default function Skills() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section id="skills" className="relative py-28 md:py-36 px-6">
      <div ref={ref} className={`max-w-6xl mx-auto fade-up ${inView ? "is-visible" : ""}`}>
        <p className="font-mono text-xs uppercase tracking-widest text-primary-bright mb-2">
          // skills.ts
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10">Skills</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge key={skill} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
