import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 'nova_finance', name: 'Nova Finance', category: 'Brand + Web App', year: '2024' },
  { id: 'lumen_care', name: 'Lumen Care', category: 'Design System', year: '2024' },
  { id: 'atlas_maps', name: 'Atlas Maps', category: 'Interaction Prototype', year: '2023' },
  { id: 'kite_studio', name: 'Kite Studio', category: 'E-Commerce', year: '2023' },
  { id: 'rift_games', name: 'Rift Games', category: 'Campaign Site', year: '2023' },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1.2,
      },
    });

    // Character entrance for "Selected Work"
    const titleChars = gsap.utils.toArray('.portfolio-title .char');
    scrollTl.fromTo(
      titleChars,
      { 
        opacity: 0, 
        y: 60, 
        rotateX: -45,
        filter: 'blur(15px)'
      },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        filter: 'blur(0px)',
        stagger: 0.02, 
        ease: 'expo.out' 
      },
      0
    );

    scrollTl.fromTo(
      '.portfolio-subtitle',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, ease: 'power2.out' },
      0.1
    );

    // List items entrance
    itemsRef.current.forEach((item, i) => {
      scrollTl.fromTo(
        item,
        { 
          opacity: 0, 
          x: -40, 
          skewX: 10,
          rotateX: 10,
          transformPerspective: 1000
        },
        { 
          opacity: 1, 
          x: 0, 
          skewX: 0,
          rotateX: 0,
          ease: 'power3.out' 
        },
        0.2 + (i * 0.08)
      );
    });

    // Fade border bottom on entrance
    scrollTl.fromTo(
      '.portfolio-item',
      { borderBottomColor: 'transparent' },
      { borderBottomColor: 'rgba(255, 255, 255, 0.08)', stagger: 0.05, ease: 'none' },
      0.2
    );
  }, { scope: sectionRef });

  const title = "Selected Work";

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full min-h-screen bg-terminal-bg py-32 z-30"
    >
      {/* Section ID */}
      <div className="absolute top-8 left-[5vw] section-id">[02]</div>

      <div ref={containerRef} className="px-[5vw] max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-24">
          <h2 className="portfolio-title font-display font-bold text-terminal-text mb-4 flex"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1 }}>
            {title.split('').map((char, i) => (
              <span key={i} className="char inline-block whitespace-pre">
                {char}
              </span>
            ))}
          </h2>
          <p className="portfolio-subtitle font-mono text-sm text-terminal-muted opacity-0">
            Click to open the case study.
          </p>
        </div>

        {/* Project List */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { if (el) itemsRef.current[index] = el; }}
              className="portfolio-item group cursor-pointer border-b border-white/5 transition-colors duration-500 hover:bg-white/[0.02]"
            >
              <div className="flex items-center justify-between py-10 md:py-12 px-6 -mx-6 transition-all duration-300">
                <div className="flex items-center gap-8 md:gap-16">
                  <span className="font-mono text-[10px] text-terminal-muted/40 w-8 group-hover:text-terminal-accent transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-terminal-text text-2xl md:text-3xl lg:text-4xl 
                                   group-hover:text-terminal-accent transition-all duration-500 group-hover:translate-x-2">
                       {project.name}
                    </h3>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-terminal-muted/60 mt-2 block md:hidden">
                       {project.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-10 md:gap-20">
                  <span className="font-mono text-xs uppercase tracking-widest text-terminal-muted/40 hidden md:block group-hover:text-terminal-muted/80 transition-colors duration-500">
                     {project.category}
                  </span>
                  <span className="font-mono text-xs text-terminal-muted/40 group-hover:text-white transition-colors duration-500">
                     {project.year}
                  </span>
                  <div className="w-10 h-10 border border-white/5 flex items-center justify-center group-hover:border-terminal-accent transition-all duration-500">
                    <ArrowRight className="w-4 h-4 text-terminal-muted group-hover:text-white 
                                          group-hover:-rotate-45 transition-all duration-700" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
