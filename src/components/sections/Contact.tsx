import { useState, type FormEvent } from "react";
import Button from "../ui/Button";
import ContactGrid from "./ContactGrid";
import { sendContactForm } from "../../utils/emailjs";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await sendContactForm(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 px-6 overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-primary-bright mb-2">
          // contact.ts
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
          Let&apos;s Work Together
        </h2>
        <p className="text-text-secondary mb-12">
          Got a project in mind? I&apos;m open to freelance work and full-time remote
          opportunities.
        </p>

        <div className="max-w-xl mx-auto text-left mb-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-text-primary placeholder:text-text-secondary transition-colors focus-ring"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-text-primary placeholder:text-text-secondary transition-colors focus-ring"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Message"
                className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-text-primary placeholder:text-text-secondary transition-colors resize-none focus-ring"
              />
            </div>

            <div className="flex items-center gap-4 pt-2 flex-wrap">
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send Message →"}
              </Button>

              {status === "success" && (
                <span className="relative flex items-center gap-2 text-primary-bright text-sm">
                  <span className="relative w-5 h-5 flex items-center justify-center">
                    <span className="success-burst" />
                    ✓
                  </span>
                  Sent — I&apos;ll get back to you soon.
                </span>
              )}

              {status === "error" && <span className="text-red-400 text-sm">{errorMsg}</span>}
            </div>
          </form>
        </div>

        <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-6">
          or connect directly
        </p>
        <ContactGrid />
      </div>
    </section>
  );
}
