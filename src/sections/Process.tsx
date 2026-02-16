import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Search, PenTool, Code, Rocket, HeartHandshake } from 'lucide-react';
import LetterGlitch from '../components/LetterGlitch';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    id: 'discovery',
    name: 'Discovery',
    function: 'define_scope()',
    description: 'Goals, constraints, roadmap',
    icon: Search,
  },
  {
    id: 'design',
    name: 'Design',
    function: 'create_ui()',
    description: 'UX flows, UI, motion direction',
    icon: PenTool,
  },
  {
    id: 'build',
    name: 'Build',
    function: 'execute_code()',
    description: 'Component system, frontend, backend',
    icon: Code,
  },
  {
    id: 'launch',
    name: 'Launch',
    function: 'deploy_prod()',
    description: 'QA, performance, handoff',
    icon: Rocket,
  },
  {
    id: 'support',
    name: 'Support',
    function: 'maintain()',
    description: 'Iterate, optimize, scale',
    icon: HeartHandshake,
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // Scroll-driven animation sequence
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1.2,
      },
    });

    // Character entrance for "Process" Title - 3D Decrypt Style
    const titleChars = gsap.utils.toArray('.process-title .char');
    scrollTl.fromTo(
      titleChars,
      { 
        opacity: 0, 
        rotateX: -90,
        y: 50,
        z: -200,
        color: '#61dca3', // Start with glitch green
        filter: 'blur(12px)'
      },
      { 
        opacity: 1, 
        rotateX: 0,
        y: 0,
        z: 0,
        color: '#F4F4F5', // End with white
        filter: 'blur(0px)',
        stagger: { each: 0.1, from: "center" }, 
        duration: 1.2,
        ease: 'circ.out' 
      },
      0
    );

    scrollTl.fromTo(
      '.process-subtitle',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, ease: 'power2.out' },
      0.1
    );

    // Sequential Flow-through reveal for steps
    stepsRefs.current.forEach((step, i) => {
      // Step entrance
      scrollTl.fromTo(
        step,
        { 
          opacity: 0, 
          scale: 0.9, 
          rotateX: 20,
          y: 40,
          transformPerspective: 1000 
        },
        { 
          opacity: 1, 
          scale: 1, 
          rotateX: 0,
          y: 0,
          ease: 'power3.out' 
        },
        0.2 + (i * 0.1)
      );

      // Connector line drawing (if exists)
      const connector = step.querySelector('.process-connector');
      if (connector) {
        scrollTl.fromTo(
          connector,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, ease: 'none' },
          0.3 + (i * 0.1)
        );
      }
    });

    // Final return statement
    scrollTl.fromTo(
      '.process-return',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: 'back.out(1.7)' },
      0.8
    );
  }, { scope: sectionRef });

  const title = "Process";

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-screen min-h-screen bg-terminal-bg py-32 overflow-hidden z-50"
    >
      {/* Section ID */}
      <div className="absolute top-8 left-[5vw] section-id">[04]</div>

      <div ref={containerRef} className="relative z-10 min-h-screen flex flex-col justify-center px-[5vw] gap-12">
        
        {/* UPPER HALF: Massive Title */}
        <div ref={headerRef} className="flex-1 relative flex items-center justify-center min-h-[50vh] border-b border-white/5 overflow-hidden">
          {/* LetterGlitch Background */}
          <div className="absolute inset-0 z-0 opacity-20">
            <LetterGlitch
              glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
              glitchSpeed={50}
              centerVignette={true}
              outerVignette={true}
              smooth={true}
            />
          </div>

          <h2 className="process-title relative z-10 font-coolvetica font-normal text-terminal-text flex items-center justify-center mix-blend-difference"
              style={{ fontSize: 'clamp(60px, 20vw, 300px)', lineHeight: 0.8 }}>
            {title.split('').map((char, i) => (
              <span key={i} className="char inline-block whitespace-pre select-none hover:text-terminal-accent transition-colors duration-300">
                {char}
              </span>
            ))}
          </h2>
        </div>

        {/* LOWER HALF: Steps Grid */}
        <div className="flex-1 min-h-[40vh] flex flex-col justify-center">
            {/* Subtitle/Context */}
            <p className="process-subtitle font-mono text-sm text-terminal-muted mb-8 opacity-0">
               function_sequence: workflow_execution()
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-[1600px] w-full mx-auto">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === processSteps.length - 1;

                return (
                  <div 
                    key={step.id} 
                    ref={(el) => { if (el) stepsRefs.current[index] = el; }}
                    className="flex flex-col gap-4 opacity-0 group"
                  >
                    {/* Step Card - Compact */}
                    <div className="service-card p-6 flex-1 bg-[#060010] border border-white/5 relative transition-all duration-500 hover:border-terminal-accent/30 hover:bg-white/[0.02]">
                      {/* Step Number */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[10px] text-terminal-accent/60">0{index + 1}</span>
                        <Icon className="w-4 h-4 text-terminal-muted group-hover:text-white transition-colors duration-500" />
                      </div>

                      <h3 className="font-pixel text-xl text-white/90 group-hover:text-white transition-colors duration-500 mb-2">
                        {step.name}
                      </h3>
                      
                      <div className="font-mono text-[10px] text-terminal-muted/60 mb-2">
                        {step.function}
                      </div>

                      <p className="font-body text-xs text-terminal-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Simple Connector for mobile/stack */}
                    {!isLast && (
                       <div className="lg:hidden w-px h-6 bg-white/10 mx-auto" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Console-style Return Statement */}
            <div className="process-return mt-8 font-mono text-xs border-l-2 border-terminal-accent/20 pl-4 py-1 opacity-0 self-start">
              <span className="text-terminal-accent">return</span>
              <span className="text-green-500/70 ml-2">{`{ result: "ship_it" }`}</span>
            </div>
        </div>
      </div>
    </section>
  );
}
