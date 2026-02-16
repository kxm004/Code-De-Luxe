import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'years_active', value: '08' },
  { label: 'projects_shipped', value: '127' },
  { label: 'lines_of_code', value: '2.4M' },
  { label: 'client_satisfaction', value: '99%' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const geometricRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1.2,
      },
    });

    // Content reveal sequence
    scrollTl.fromTo(
      '.about-heading .line',
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.1, ease: 'power3.out' },
      0
    );

    scrollTl.fromTo(
      '.about-paragraph',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' },
      0.3
    );

    // Stats staggered 3D entrance
    scrollTl.fromTo(
      '.stat-card',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.05, ease: 'power2.out' },
      0.4
    );

    // Parallax Geometric Pattern
    scrollTl.to(
      geometricRef.current,
      { y: '-15%', scale: 1.1, ease: 'power2.out' },
      0
    );

    scrollTl.fromTo(
      '.about-cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' },
      0.6
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-screen min-h-screen bg-terminal-bg overflow-hidden z-20 py-24 md:py-0"
    >
      {/* Section ID */}
      <div className="absolute top-8 left-[5vw] section-id">[01]</div>

      <div className="flex flex-col md:flex-row h-full">
        {/* Left Content */}
        <div
          ref={containerRef}
          className="w-full md:w-[45%] h-full flex flex-col justify-center px-[5vw] md:pl-[5vw] md:pr-12 md:min-h-screen"
        >
          <div className="about-heading mb-8">
            <h2 className="font-display font-bold text-terminal-text leading-tight"
                style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}>
              <span className="line block overflow-hidden">We build digital</span>
              <span className="line block overflow-hidden">products with precision.</span>
            </h2>
          </div>

          <div className="space-y-6 mb-12">
            <p className="about-paragraph font-body text-terminal-muted leading-relaxed opacity-0"
               style={{ fontSize: 'clamp(14px, 1.1vw, 16px)' }}>
              Code De Luxe is a small studio designing and engineering web experiences 
              for teams who want clarity, speed, and craft.
            </p>
            <p className="about-paragraph font-body text-terminal-muted leading-relaxed opacity-0"
               style={{ fontSize: 'clamp(14px, 1.1vw, 16px)' }}>
              We prototype fast, polish obsessively, and ship work that scales.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card border-l border-white/5 pl-6 opacity-0">
                <div className="font-mono text-[10px] uppercase tracking-widest text-terminal-muted/40 mb-2">
                  {stat.label}
                </div>
                <div className="font-display font-bold text-terminal-accent text-3xl md:text-4xl">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-6">
            <a
              href="#work"
              className="about-cta execute-btn text-[10px] uppercase tracking-widest opacity-0"
            >
              See our work
            </a>
            <a
              href="#contact"
              className="about-cta font-mono text-[10px] uppercase tracking-[0.2em] text-terminal-muted hover:text-white transition-all duration-500 px-6 py-4 border border-white/5 hover:border-white/20 opacity-0"
            >
              Initialize project
            </a>
          </div>
        </div>

        {/* Right Geometric Panel */}
        <div className="hidden md:block w-[55%] h-screen relative bg-terminal-bg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-terminal-bg via-transparent to-transparent z-10" />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-60">
            <svg 
              ref={geometricRef}
              className="w-[120%] h-[120%] scale-110" 
              viewBox="0 0 800 1000" 
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern id="grid-about" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-about)" />
              <circle cx="600" cy="300" r="200" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              <circle cx="600" cy="300" r="300" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="0" y1="800" x2="800" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <line x1="0" y1="900" x2="800" y2="300" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            </svg>
          </div>

          {/* Technical Overlay */}
          <div className="absolute top-12 right-12 font-mono text-[9px] text-terminal-muted/20 uppercase tracking-[0.5em] flex flex-col items-end gap-2">
            <span>geo_matrix_active</span>
            <div className="w-16 h-px bg-white/5" />
            <span>coord_x.774_y.112</span>
          </div>
          
          <div className="absolute bottom-12 right-12 flex gap-4">
            <div className="w-1 h-1 bg-white/10" />
            <div className="w-1 h-1 bg-white/10" />
            <div className="w-1 h-1 bg-white/20 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
