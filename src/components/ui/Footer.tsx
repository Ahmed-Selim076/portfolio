import { contact } from "../../data/projects";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative z-10 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-14 grid sm:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-lg font-semibold text-primary-bright mb-2">Ahmed Salim</p>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
            Full-stack developer building things for the web — from idea to production.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4">
            Navigate
          </p>
          <ul className="space-y-2">
            {LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="text-sm text-text-secondary hover:text-primary-bright transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4">
            Connect
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${contact.email}`} className="text-text-secondary hover:text-primary-bright transition-colors">
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-text-secondary hover:text-primary-bright transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="text-text-secondary hover:text-primary-bright transition-colors"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="max-w-6xl mx-auto px-6 py-6 text-center text-text-secondary text-xs font-mono">
          © {year} Ahmed Selim Mohamed — built with React, TypeScript &amp; Three.js
        </p>
      </div>
    </footer>
  );
}
