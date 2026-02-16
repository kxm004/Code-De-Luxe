import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail, MapPin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1.2,
      },
    });

    // Character entrance for "Let's build something great."
    const titleChars = gsap.utils.toArray('.contact-title .char');
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
        stagger: 0.015, 
        ease: 'power3.out' 
      },
      0
    );

    scrollTl.fromTo(
      '.contact-subtitle',
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, ease: 'power2.out' },
      0.2
    );

    // Fade in contact items
    scrollTl.fromTo(
      '.contact-item',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.1, ease: 'power2.out' },
      0.3
    );

    // Form unfolding entrance
    scrollTl.fromTo(
      '.form-field-wrapper',
      { 
        opacity: 0, 
        scaleY: 0, 
        transformOrigin: 'top',
        rotateX: -10 
      },
      { 
        opacity: 1, 
        scaleY: 1, 
        rotateX: 0,
        stagger: 0.08, 
        ease: 'power2.out' 
      },
      0.4
    );

    scrollTl.fromTo(
      '.execute-btn-contact',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, ease: 'back.out(1.7)' },
      0.8
    );

    // Footer items reveal
    scrollTl.fromTo(
      '.footer-item',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' },
      0.9
    );
  }, { scope: sectionRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // GSAP launch animation for the icon
    gsap.to('.send-icon', {
      x: 100,
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.in',
      onComplete: () => {
        setTimeout(() => {
          setIsSubmitting(false);
          setSubmitted(true);
        }, 800);
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const title = "Let's build something great.";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen bg-terminal-bg py-32 z-[70]"
    >
      {/* Section ID */}
      <div className="absolute top-8 left-[5vw] section-id">[07]</div>

      <div ref={containerRef} className="px-[5vw] max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-20 md:gap-32">
          {/* Left Content */}
          <div className="relative">
            <h2 className="contact-title font-display font-bold text-terminal-text mb-8 flex flex-wrap"
                style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.1 }}>
              {title.split('').map((char, i) => (
                <span key={i} className="char inline-block whitespace-pre">
                  {char}
                </span>
              ))}
            </h2>
            <p className="contact-subtitle font-body text-terminal-muted mb-12 leading-relaxed opacity-0"
               style={{ fontSize: 'clamp(14px, 1.1vw, 16px)' }}>
              Tell us what you're making. We'll reply within 48 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-12">
              <div className="contact-item flex items-center gap-4 opacity-0 group">
                <div className="w-10 h-10 border border-white/5 flex items-center justify-center group-hover:border-terminal-accent transition-colors duration-500">
                  <Mail className="w-4 h-4 text-terminal-muted group-hover:text-white transition-colors" />
                </div>
                <a 
                  href="mailto:hello@codedeluxe.studio" 
                  className="font-mono text-sm text-terminal-text hover:text-terminal-accent transition-colors duration-500"
                >
                  hello@codedeluxe.studio
                </a>
              </div>
              <div className="contact-item flex items-center gap-4 opacity-0 group">
                <div className="w-10 h-10 border border-white/5 flex items-center justify-center group-hover:border-terminal-accent transition-colors duration-500">
                  <MapPin className="w-4 h-4 text-terminal-muted group-hover:text-white transition-colors" />
                </div>
                <span className="font-mono text-sm text-terminal-muted">
                  Based in UTC+1 — working worldwide
                </span>
              </div>
            </div>

            {/* Social Links as Comments */}
            <div className="contact-item space-y-4 opacity-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-terminal-muted/30">// Follow us</div>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'Dribbble'].map((social) => (
                  <a key={social} href="#" className="font-mono text-xs text-terminal-muted hover:text-white transition-all duration-500 bracket-hover">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="relative">
            {submitted ? (
              <div className="terminal-window p-12 border border-terminal-accent/20 bg-[#060010] relative overflow-hidden">
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-none border border-terminal-accent flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <Send className="w-6 h-6 text-terminal-accent" />
                  </div>
                  <h3 className="font-display font-bold text-terminal-text text-2xl mb-4">
                    Message sent!
                  </h3>
                  <p className="font-mono text-sm text-terminal-muted leading-relaxed">
                    System acknowledgment received. <br/>
                    We'll be in touch within 48 hours.
                  </p>
                </div>
                <div className="absolute inset-0 bg-terminal-accent/5 opacity-20 scanlines" />
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="form-field-wrapper opacity-0">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-terminal-muted/50 mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full terminal-input border-white/5 focus:border-terminal-accent transition-colors duration-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-field-wrapper opacity-0">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-terminal-muted/50 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full terminal-input border-white/5 focus:border-terminal-accent transition-colors duration-500"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="form-field-wrapper opacity-0">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-terminal-muted/50 mb-3">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full terminal-input border-white/5 focus:border-terminal-accent transition-colors duration-500"
                      placeholder="Acme Inc."
                    />
                  </div>
                  <div className="form-field-wrapper opacity-0">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-terminal-muted/50 mb-3">
                      Budget
                    </label>
                    <div className="relative">
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full terminal-input border-white/5 focus:border-terminal-accent appearance-none cursor-pointer"
                      >
                        <option value="">Select range</option>
                        <option value="10k-25k">$10k — $25k</option>
                        <option value="25k-50k">$25k — $50k</option>
                        <option value="50k-100k">$50k — $100k</option>
                        <option value="100k+">$100k+</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-terminal-muted/30 text-[8px]">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-field-wrapper opacity-0">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-terminal-muted/50 mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full terminal-input border-white/5 focus:border-terminal-accent resize-none p-6"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="execute-btn-contact execute-btn w-full md:w-auto flex items-center justify-center gap-4 py-6 px-12 group opacity-0 transition-all duration-500"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 border border-terminal-text/30 border-t-terminal-text rounded-none animate-spin" />
                      <span className="font-mono text-xs uppercase tracking-[0.2em]">Processing...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="send-icon w-4 h-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                      <span className="font-mono text-xs uppercase tracking-[0.2em]">Initialize_Sync</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="footer-item font-mono text-[10px] uppercase tracking-[0.5em] text-terminal-muted/40 flex items-center gap-2 opacity-0">
              <span className="w-2 h-px bg-terminal-accent/30" />
              code de luxe studio
            </div>
            <div className="footer-item font-mono text-[9px] text-terminal-muted/30 uppercase tracking-widest opacity-0">
              © {new Date().getFullYear()} / root.all_rights_reserved
            </div>
            <div className="footer-item font-mono text-[9px] text-terminal-accent/40 uppercase tracking-[0.3em] flex items-center gap-3 opacity-0">
              <span className="w-1 h-1 bg-green-500/40 rounded-full animate-pulse" />
              system_online.v2.4
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
