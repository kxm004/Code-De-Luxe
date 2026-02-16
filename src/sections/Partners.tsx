import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { id: 'acme', name: 'ACME' },
  { id: 'pulse', name: 'PULSE' },
  { id: 'north', name: 'NORTH' },
  { id: 'orbit', name: 'ORBIT' },
  { id: 'studio_k', name: 'STUDIO K' },
  { id: 'forge', name: 'FORGE' },
];

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 25%',
        scrub: 1.2,
      },
    });

    // Character entrance for "Partners"
    const titleChars = gsap.utils.toArray('.partners-title .char');
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
        stagger: 0.03, 
        ease: 'power3.out' 
      },
      0
    );

    scrollTl.fromTo(
      '.partners-subtitle',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, ease: 'power2.out' },
      0.1
    );

    // 3D Entrance for logos
    const logos = gsap.utils.toArray('.partner-logo');
    logos.forEach((logo, i) => {
      scrollTl.fromTo(
        logo as Element,
        { 
          opacity: 0, 
          scale: 0.8, 
          rotateY: 45, 
          rotateX: 10,
          transformPerspective: 1000 
        },
        { 
          opacity: 1, 
          scale: 1, 
          rotateY: 0, 
          rotateX: 0,
          ease: 'power2.out' 
        },
        0.2 + (i * 0.05)
      );
    });

    // Trust metrics reveal
    scrollTl.fromTo(
      '.metric-item',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' },
      0.5
    );

    // Parallax Background Text
    scrollTl.fromTo(
      bgTextRef.current,
      { y: '50%', opacity: 0 },
      { y: '-10%', opacity: 0.03, ease: 'none' },
      0
    );
  }, { scope: sectionRef });

  const title = "Partners";

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="relative w-screen min-h-screen bg-terminal-bg overflow-hidden z-[60] flex flex-col justify-center py-24 md:py-0"
    >
      {/* Background Text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-0"
      >
        <div 
          className="font-display font-black text-[25vw] leading-none text-white tracking-tighter"
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)', color: 'transparent' }}
        >
          PARTNERS
        </div>
      </div>

      {/* Section ID */}
      <div className="absolute top-8 left-[5vw] section-id">[06]</div>

      <div ref={containerRef} className="relative z-10 px-[5vw] max-w-[1200px] mx-auto w-full">
        {/* Header */}
        <div className="mb-20">
          <h2 className="partners-title font-display font-bold text-terminal-text flex"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1 }}>
            {title.split('').map((char, i) => (
              <span key={i} className="char inline-block whitespace-pre">
                {char}
              </span>
            ))}
          </h2>
          <p className="partners-subtitle font-body text-terminal-muted mt-6 max-w-md opacity-0"
             style={{ fontSize: 'clamp(14px, 1.1vw, 16px)' }}>
            Trusted by product teams, agencies, and founders who value technical excellence.
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-24">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="partner-logo group relative flex items-center justify-center py-12 px-6 border border-white/5 
                         bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 opacity-0 overflow-hidden"
            >
              <span className="font-mono text-base md:text-lg text-terminal-muted group-hover:text-terminal-accent 
                               tracking-[0.3em] transition-all duration-500 group-hover:scale-110">
                {partner.name}
              </span>
              {/* Subtle hover accent */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-terminal-accent group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* Trust metrics */}
        <div className="flex flex-wrap gap-x-20 gap-y-12 border-t border-white/5 pt-12">
          <div className="metric-item opacity-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-terminal-muted/30 mb-2">// projects_delivered</div>
            <div className="font-display font-bold text-terminal-accent text-4xl md:text-5xl tracking-tighter">50+</div>
          </div>
          <div className="metric-item opacity-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-terminal-muted/30 mb-2">// client_retention</div>
            <div className="font-display font-bold text-terminal-accent text-4xl md:text-5xl tracking-tighter">98%</div>
          </div>
          <div className="metric-item opacity-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-terminal-muted/30 mb-2">// regions_served</div>
            <div className="font-display font-bold text-terminal-accent text-4xl md:text-5xl tracking-tighter">12</div>
          </div>
        </div>
      </div>
    </section>
  );
}
