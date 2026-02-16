import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    timestamp: '2024-01-15T09:23:17Z',
    user: 'Sarah Chen',
    company: 'Nova Finance',
    quote: 'Code De Luxe transformed our vision into a product that exceeded every expectation. The attention to detail is unmatched.',
  },
  {
    timestamp: '2023-11-28T14:45:32Z',
    user: 'Marcus Webb',
    company: 'Lumen Care',
    quote: 'Working with this team felt like having an extension of our own. They understood our users better than we did.',
  },
  {
    timestamp: '2023-09-03T11:12:08Z',
    user: 'Elena Rodriguez',
    company: 'Atlas Maps',
    quote: 'The prototype they delivered in week one was more polished than most final products. Incredible velocity.',
  },
  {
    timestamp: '2023-07-19T16:34:55Z',
    user: 'James Park',
    company: 'Kite Studio',
    quote: 'Our conversion rate increased 40% after the redesign. The ROI spoke for itself.',
  },
  {
    timestamp: '2023-05-22T08:56:41Z',
    user: 'Aisha Patel',
    company: 'Rift Games',
    quote: 'They brought a level of craft to our campaign site that elevated our entire brand perception.',
  },
];

function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().replace('T', ' ').slice(0, 19);
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const logEntriesRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1.2,
      },
    });

    // Character entrance for "The Log"
    const titleChars = gsap.utils.toArray('.testimonials-title .char');
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
      '.testimonials-subtitle',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, ease: 'power2.out' },
      0.1
    );

    // Terminal window entrance
    scrollTl.fromTo(
      terminalRef.current,
      { 
        opacity: 0, 
        y: 60, 
        scale: 0.95, 
        rotateX: 10,
        transformPerspective: 1000 
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotateX: 0,
        ease: 'power4.out' 
      },
      0.2
    );

    // Sequential Log streaming
    logEntriesRef.current.forEach((entry, i) => {
      scrollTl.fromTo(
        entry,
        { 
          opacity: 0, 
          x: -15, 
          filter: 'blur(4px)'
        },
        { 
          opacity: 1, 
          x: 0, 
          filter: 'blur(0px)',
          ease: 'power2.out' 
        },
        0.3 + (i * 0.1)
      );
    });

    scrollTl.fromTo(
      '.terminal-footer-line',
      { opacity: 0 },
      { opacity: 1, ease: 'none' },
      0.9
    );
  }, { scope: sectionRef });

  const title = "The Log";

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full min-h-screen bg-terminal-bg py-32 z-[55]"
    >
      {/* Section ID */}
      <div className="absolute top-8 left-[5vw] section-id">[05]</div>

      <div className="px-[5vw] max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="testimonials-title font-display font-bold text-terminal-text mb-4 flex"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1 }}>
            {title.split('').map((char, i) => (
              <span key={i} className="char inline-block whitespace-pre">
                {char}
              </span>
            ))}
          </h2>
          <p className="testimonials-subtitle font-mono text-sm text-terminal-muted opacity-0">
            Client authentications and server logs.
          </p>
        </div>

        {/* Terminal Block */}
        <div ref={terminalRef} className="terminal-window rounded-sm scanlines shadow-2xl opacity-0">
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
                storage_vault://testimonials.log
              </span>
            </div>
            <div className="w-14" />
          </div>

          {/* Log Entries */}
          <div className="px-[clamp(16px,4vw,40px)] py-10 space-y-10 crt-flicker">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                ref={(el) => { if (el) logEntriesRef.current[index] = el; }}
                className="group opacity-0"
              >
                <div className="flex flex-col md:flex-row items-baseline gap-x-4 mb-4">
                  <div className="font-mono text-[10px] text-terminal-muted/30 uppercase tracking-widest bg-white/[0.03] px-2 py-1 mb-2 md:mb-0">
                    [{formatTimestamp(testimonial.timestamp)}]
                  </div>
                  <div className="font-mono text-xs flex items-center gap-2">
                    <span className="text-terminal-accent/40">$</span>
                    <span className="text-terminal-muted">auth_user:</span>
                    <span className="text-white group-hover:text-terminal-accent transition-colors duration-500">{testimonial.user}</span>
                    <span className="text-terminal-muted/40 ml-2">// {testimonial.company}</span>
                  </div>
                </div>
                <div className="pl-6 border-l border-white/5 group-hover:border-terminal-accent/30 transition-all duration-700">
                  <p className="font-body text-base md:text-lg text-terminal-muted/80 leading-relaxed group-hover:text-white transition-colors duration-500">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Footer */}
          <div className="px-[clamp(16px,4vw,40px)] py-4 border-t border-white/10 bg-white/[0.02]">
            <div className="terminal-footer-line font-mono text-xs text-terminal-muted/40 flex items-center gap-3 opacity-0">
              <span className="text-terminal-accent/50">$</span>
              <span>tail -f testimonials.log | filter "high_satisfaction"</span>
              <span className="w-2 h-4 bg-terminal-accent shadow-[0_0_10px_rgba(var(--terminal-accent-rgb),0.5)] cursor-blink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
