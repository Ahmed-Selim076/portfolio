import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import ScrollProgress from "../components/ui/ScrollProgress";
import CircuitBackground from "../components/effects/CircuitBackground";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Single ambient circuit-board layer behind the whole page. Sections
          used to each render their own extra instance of this, which meant
          multiple independently-generated grids overlapping (visually messy)
          and multiple canvases redrawing every frame (slow). One instance
          is enough — sections just sit on top of it. */}
      <div className="fixed inset-0 -z-10">
        <CircuitBackground opacity={0.5} pulseCount={16} />
      </div>

      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
