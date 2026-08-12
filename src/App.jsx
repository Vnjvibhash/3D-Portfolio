import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";

const App = () => {
  return (
    <div className="relative min-h-screen selection:bg-lavender selection:text-white overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <main className="container mx-auto max-w-7xl">
        <About />
        <Projects />
        <Experiences />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;
