import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './App.css';

// Components
import Navigation from './components/Navigation';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Portfolio from './sections/Portfolio';
import Services from './sections/Services';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import Partners from './sections/Partners';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Lenis is now handling all the scroll feel.
    // We removed the custom snapping to allow for free, smooth scrolling
    // while keeping the pinning and entrance animations intact.



    return () => {
      lenis.destroy();
    };
  }, []);

  // Cleanup all ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Vignette */}
      <div className="vignette" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main ref={mainRef} className="relative">
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Process />
        <Testimonials />
        <Partners />
        <Contact />
      </main>
    </>
  );
}

export default App;
