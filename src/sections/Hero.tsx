import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GridScan } from '@/components/GridScan';

gsap.registerPlugin(ScrollTrigger);

const asciiHeader = [
  "  ____ ___  ____  _____   ____  _____   _    _   _  __  _______ ",
  " / ___/ _ \\|  _ \\| ____| |  _ \\| ____| | |  | | | | \\ \\/ / ____|",
  "| |  | | | | | | |  _|   | | | |  _|   | |  | | | |  \\  /|  _|  ",
  "| |__| |_| | |_| | |___  | |_| | |___  | |__| |_| |  /  \\| |___ ",
  " \\____\\___/|____/|_____| |____/|_____| |_____\\___/  /_/\\_\\_____|",
];

const terminalLines = [
  '> system_boot --v=2.0.4',
  '> initializing_creative_engine...',
  '> modules: [motion, interface, branding]',
  '> mount_volume("/portfolio/2026")',
  '> decryption: complete',
  '> status: online',
  '> user: guest@codeluxe',
];

interface TypewriterProps {
  text: string;
  delay: number;
  onComplete?: () => void;
  className?: string;
}

const Typewriter = ({ text, delay, onComplete, className }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, delay, onComplete]);

  return <span className={className}>{displayedText}</span>;
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [showAscii, setShowAscii] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Sequence the typing effect
  useEffect(() => {
    const timer = setTimeout(() => setShowAscii(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // GSAP entrance and scroll animations
  useGSAP(() => {
    // 1. Entrance Sequence
    const entranceTl = gsap.timeline({
      defaults: { ease: 'power4.out', duration: 1.4 }
    });

    entranceTl.fromTo(gridRef.current, 
      { opacity: 0 }, 
      { opacity: 0.4, duration: 1.5, ease: 'power2.inOut', overwrite: 'auto' }
    );

    entranceTl.fromTo(
      terminalRef.current,
      { 
        opacity: 0, 
        y: 60, 
        scale: 0.95, 
        rotateX: 15,
        transformPerspective: 1000 
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotateX: 0,
        overwrite: 'auto'
      },
      0.2
    );

    const brandChars = gsap.utils.toArray('.brand-char');
    entranceTl.fromTo(
      brandChars,
      { 
        opacity: 0, 
        y: 100, 
        rotateX: -90,
        filter: 'blur(15px)',
        scale: 1.2
      },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        filter: 'blur(0px)',
        scale: 1,
        duration: 1.5, 
        stagger: { each: 0.05, from: 'center' }, 
        ease: 'expo.out',
        overwrite: 'auto'
      },
      0.4
    );

    entranceTl.fromTo(
      ctaRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', overwrite: 'auto' },
      1.5
    );

    // 2. Idle Floating (on a separate wrapper to avoid conflicts)
    gsap.to(floatRef.current, {
      y: '+=10',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // 3. Scroll-driven Exit Animation
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    scrollTl.to(gridRef.current, { opacity: 0, ease: 'power1.in', immediateRender: false }, 0);

    scrollTl.to(brandRef.current, { 
      y: '30vh', 
      scale: 0.85, 
      opacity: 0,
      filter: 'blur(10px)',
      ease: 'none',
      immediateRender: false 
    }, 0);

    scrollTl.to(terminalRef.current, { 
      y: '-40vh', 
      scale: 1.15, 
      rotateX: -15,
      rotateY: 5,
      opacity: 0, 
      ease: 'power2.in',
      immediateRender: false 
    }, 0);

    scrollTl.to(ctaRef.current, { 
      opacity: 0, 
      x: -100,
      ease: 'power2.in',
      immediateRender: false 
    }, 0);
  }, { scope: sectionRef });

  const headline = "Code De Luxe";

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-screen h-screen bg-terminal-bg overflow-hidden z-10"
      style={{ perspective: '1000px' }}
    >
      <div ref={gridRef} className="absolute inset-0 z-0 opacity-0 overflow-hidden">
        <GridScan 
          linesColor="#392e4e"
          scanColor="#B9B9B9"
          scanOpacity={0.5}
          gridScale={0.10}
          noiseIntensity={0.03}
          enablePost={true}
          bloomIntensity={1}
        />
      </div>
      <div className="vignette" />
      
      {/* Terminal Panel */}
      <div
        ref={terminalRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,1100px)] z-20"
      >
        <div ref={floatRef} className="terminal-window rounded-sm scanlines shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
          <div className="flex gap-2">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-terminal-muted">
              session: codeluxe_root — 80x24
            </span>
          </div>
          <div className="w-14" />
        </div>

        {/* Terminal Content */}
        <div className="px-[clamp(16px,4vw,40px)] py-10 min-h-[360px] crt-flicker">
          {/* ASCII Header Staggered Reveal */}
          <div className="mb-8 overflow-hidden">
            {asciiHeader.map((line, i) => (
              <div key={i} className="font-mono text-[6px] sm:text-[8px] md:text-[10px] text-terminal-accent/40 whitespace-pre leading-none">
                {line}
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            {terminalLines.map((line, index) => (
              <div
                key={index}
                className="font-mono text-xs md:text-sm text-terminal-text/80 leading-relaxed flex items-start"
              >
                {index <= currentLineIndex ? (
                  <span className="terminal-glow">{line}</span>
                ) : index === currentLineIndex + 1 ? (
                  <Typewriter
                    text={line}
                    delay={Math.random() * 15 + 15}
                    onComplete={() => setCurrentLineIndex(index)}
                    className="terminal-glow text-terminal-accent"
                  />
                ) : null}
              </div>
            ))}
            
            {currentLineIndex === terminalLines.length - 1 && (
              <div className="pt-6 flex items-center gap-3">
                <span className="text-terminal-accent/40 font-mono text-sm leading-none">$</span>
                <span
                  className={`inline-block w-2 h-4 bg-terminal-accent shadow-[0_0_12px_rgba(var(--terminal-accent-rgb),0.5)] ${
                    showCursor ? 'opacity-80' : 'opacity-0'
                  }`}
                />
              </div>
            )}

            {currentLineIndex === -1 && showAscii && (
              <Typewriter
                text={""}
                delay={600}
                onComplete={() => setCurrentLineIndex(0)}
              />
            )}
          </div>
          </div>
        </div>
      </div>

      {/* Brand Headline - Character Staggered */}
      <div
        ref={brandRef}
        className="absolute left-1/2 top-[22vh] -translate-x-1/2 z-0 pointer-events-none w-full text-center overflow-hidden"
      >
        <h1 className="font-coolvetica font-normal text-terminal-accent flex justify-center perspective-1000"
            style={{ fontSize: 'clamp(50px, 14vw, 180px)', lineHeight: 0.85 }}>
          {headline.split('').map((char, i) => (
            <span key={i} className="brand-char inline-block whitespace-pre relative translate-z-0">
              {char}
            </span>
          ))}
        </h1>
      </div>

      {/* CTA - More sophisticated look */}
      <a
        ref={ctaRef}
        href="#work"
        className="absolute left-[5vw] bottom-[6vh] font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all duration-500 flex items-center gap-4 group overflow-hidden"
      >
        <div className="relative overflow-hidden flex items-center gap-4">
          <span className="w-10 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-terminal-accent transition-all duration-700" />
          <span className="group-hover:translate-x-1 transition-transform duration-500">Scroll</span>
        </div>
      </a>
    </section>
  );
}
