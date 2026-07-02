import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Works from './sections/Works';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import WorkDrawer from './sections/WorkDrawer';
import { PortfolioProvider } from './context/PortfolioContext';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Services />
          <Experience />
          <Skills />
          <Works />
          <Contact />
        </main>
        <Footer />
        <WorkDrawer />
      </div>
    </PortfolioProvider>
  );
}

export default App;
