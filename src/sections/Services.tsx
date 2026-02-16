import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: 'Product Design',
    description: 'UI/UX, prototypes, design systems',
    label: 'Design',
    layout: 'col-span-1 row-span-1'
  },
  {
    title: 'Creative Development',
    description: 'WebGL, motion, interaction',
    label: 'Creative',
    layout: 'col-span-1 row-span-1'
  },
  {
    title: 'Frontend Engineering',
    description: 'React, performance, accessibility',
    label: 'Frontend',
    layout: 'col-span-2 row-span-2'
  },
  {
    title: 'Backend & APIs',
    description: 'Scalable architecture, integrations',
    label: 'Backend',
    layout: 'col-span-2 row-span-1'
  },

];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance animations for the header and the bento cards
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%', 
        end: 'top 15%',   
        scrub: 1.2,       
      },
    });

    // Character entrance for Services Title
    const titleChars = gsap.utils.toArray('.services-title .char');
    scrollTl.fromTo(
      titleChars,
      { 
        opacity: 0, 
        y: 40, 
        rotateX: -90,
        filter: 'blur(10px)'
      },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        filter: 'blur(0px)',
        stagger: 0.02, 
        ease: 'power3.out' 
      },
      0
    );

    scrollTl.fromTo(
      '.services-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: 'power2.out' },
      0.2
    );
    
    // 3D Entrance for the mosaic cards
    const cards = gsap.utils.toArray('.service-card');
    cards.forEach((card, i) => {
      scrollTl.fromTo(
        card as Element,
        { 
          y: 100, 
          opacity: 0,
          rotateY: i % 2 === 0 ? -15 : 15,
          rotateX: 10,
          transformPerspective: 1000,
          scale: 0.9
        },
        { 
          y: 0, 
          opacity: 1, 
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          ease: 'power2.out'
        },
        0.1 + (i * 0.05)
      );
    });
  }, { scope: container });

  const title = "Services";

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-screen min-h-screen bg-terminal-bg py-24 overflow-hidden z-40"
    >
      {/* Section ID */}
      <div className="absolute top-8 left-[5vw] section-id">[03]</div>

      <div ref={container} className="relative z-10 h-full flex flex-col items-center px-[2vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <h2 className="services-title font-display font-bold text-terminal-text flex justify-center"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1 }}>
            {title.split('').map((char, i) => (
              <span key={i} className="char inline-block whitespace-pre">
                {char}
              </span>
            ))}
          </h2>
          <p className="services-subtitle mt-4 font-mono text-xs uppercase tracking-widest text-terminal-muted opacity-0">
            specialized solutions for modern digital experiences
          </p>
        </div>

        {/* Custom Mosaic Grid */}
        <div className="w-full max-w-[1600px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className={`service-card group relative p-8 border border-white/10 bg-[#060010] flex flex-col justify-between min-h-[240px] transition-all duration-500 hover:border-white hover:-translate-y-1 ${service.layout}`}
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/100 transition-colors duration-500">
                  {service.label}
                </span>
                <h3 className="font-display font-bold text-2xl text-white/60 group-hover:text-white transition-colors duration-500">
                  {service.title}
                </h3>
              </div>
              
              <p className="font-body text-sm leading-relaxed text-white/40 group-hover:text-white/80 transition-colors duration-500 max-w-[280px]">
                {service.description}
              </p>

              {/* Decorative Corner */}
              <div className="absolute bottom-4 right-4 w-2 h-2 border-r border-b border-white/10 group-hover:border-white transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

