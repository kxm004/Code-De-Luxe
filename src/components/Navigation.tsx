import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

import { File, Folder, Tree, type TreeViewElement } from "@/registry/magicui/file-tree";

const ELEMENTS: TreeViewElement[] = [
  {
    id: "1",
    name: "src",
    children: [
      {
        id: "2",
        name: "sections",
        children: [
          { id: "hero", name: "hero.tsx" },
          { id: "about", name: "about.tsx" },
          { id: "work", name: "portfolio.tsx" },
          { id: "services", name: "services.tsx" },
          { id: "process", name: "process.tsx" },
          { id: "testimonials", name: "the_log.tsx" },
          { id: "partners", name: "partners.tsx" },
          { id: "contact", name: "contact.tsx" },
        ],
      },
      {
        id: "3",
        name: "core",
        children: [
          { id: "global-styles", name: "index.css" },
          { id: "config", name: "tailwind.config.js" },
        ],
      },
    ],
  },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTitle = "Directory Exploration";

  // Update background opacity based on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section for File Tree
  useEffect(() => {
    const sections = ['hero', 'about', 'work', 'services', 'process', 'testimonials', 'partners', 'contact'];
    
    sections.forEach(id => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });
  }, []);

  // Menu open/close animations logic
  useGSAP(() => {
    if (!isMenuOpen) return;

    // Entrance animation for the menu container
    gsap.fromTo(menuRef.current,
      { opacity: 0, scale: 1.02, filter: 'blur(8px)', willChange: "transform, opacity, filter" },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'expo.out', clearProps: "willChange" }
    );

    // Staggered title
    gsap.fromTo('.menu-title-char',
      { opacity: 0, y: 10, rotateX: -90 },
      { opacity: 1, y: 0, rotateX: 0, stagger: 0.02, duration: 0.6, ease: 'power2.out', delay: 0.2 }
    );

    // Staggered links with 3D effect - Optimized for performance
    gsap.fromTo('.menu-item',
      { 
        opacity: 0, 
        x: -20, 
        rotateX: -15, 
        filter: 'blur(5px)',
        transformPerspective: 1000,
        willChange: "transform, opacity, filter"
      },
      { 
        opacity: 1, 
        x: 0, 
        rotateX: 0, 
        filter: 'blur(0px)', 
        stagger: 0.04, 
        duration: 0.6, 
        ease: 'power2.out', 
        delay: 0.3,
        clearProps: "willChange"
      }
    );

    // Footer info
    gsap.fromTo('.menu-footer-item',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out', delay: 0.6 }
    );
  }, { dependencies: [isMenuOpen], scope: menuRef });

  const { contextSafe } = useGSAP({ scope: menuRef });

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = contextSafe(() => {
    gsap.to(menuRef.current, {
      opacity: 0,
      scale: 1.02,
      filter: 'blur(8px)',
      duration: 0.4,
      ease: 'expo.in',
      onComplete: () => setIsMenuOpen(false)
    });
  });

  const handleLinkClick = (href: string) => {
    closeMenu();
    const target = document.querySelector(href);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  // Header links staggered entrance
  useGSAP(() => {
    gsap.fromTo('.nav-link',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out', delay: 0.5 }
    );
  }, { scope: navRef });

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[100]"
      >
        <div className={`transition-all duration-700 border-b ${
          isScrolled 
            ? 'bg-terminal-bg/70 backdrop-blur-xl border-white/5 py-3' 
            : 'bg-transparent border-transparent py-8'
        }`}>
          <div className="flex items-center justify-between px-[5vw]">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-mono text-[10px] uppercase tracking-[0.5em] text-terminal-text hover:text-terminal-accent transition-all duration-500 group"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">[</span>
              <span className="mx-1">code de luxe</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">]</span>
            </a>

            {/* Horizontal Menu Links */}
            <div className="hidden lg:flex items-center gap-8">
              {[
                { label: 'About', href: '#about', id: 'about' },
                { label: 'Work', href: '#work', id: 'work' },
                { label: 'Services', href: '#services', id: 'services' },
                { label: 'Process', href: '#process', id: 'process' },
                { label: 'Log', href: '#testimonials', id: 'testimonials' },
                { label: 'Contact', href: '#contact', id: 'contact' }
              ].map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`nav-link font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-500 bracket-hover opacity-0 ${
                      isActive ? 'text-white' : 'text-terminal-muted hover:text-white'
                    }`}
                  >
                    {isActive && <span className="mr-1 text-terminal-accent">[</span>}
                    {link.label}
                    {isActive && <span className="ml-1 text-terminal-accent">]</span>}
                  </a>
                );
              })}
            </div>

            <button
              onClick={openMenu}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-terminal-muted hover:text-white transition-all duration-500 bracket-hover px-4 py-2 border border-white/5 hover:border-white/20"
            >
              EXPLORE_DIR
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[200] bg-terminal-bg/95 backdrop-blur-3xl flex flex-col pt-32"
        >
          <button
            onClick={closeMenu}
            className="absolute top-8 right-[5vw] p-4 text-terminal-muted hover:text-white transition-all duration-500 hover:rotate-90 group"
          >
            <X className="w-8 h-8 stroke-[1]" />
          </button>

          <div className="px-[10vw] mb-12">
            <h2 className="font-mono text-[10px] text-terminal-accent/50 tracking-[0.6em] uppercase flex flex-wrap">
              {menuTitle.split('').map((char, i) => (
                <span key={i} className="menu-title-char inline-block whitespace-pre">
                  {char}
                </span>
              ))}
            </h2>
            <div className="w-full h-px bg-gradient-to-r from-terminal-accent/20 to-transparent mt-4" />
          </div>

          <div className="flex-1 overflow-auto px-[10vw] pb-32 custom-scrollbar">
            <div className="max-w-3xl">
              <Tree
                className="bg-transparent"
                selectedId={activeSection}
                initialExpandedItems={["1", "2"]}
                elements={ELEMENTS}
              >
                <Folder element="src" value="1" className="menu-item opacity-0">
                  <Folder value="2" element="sections" className="menu-item opacity-0">
                    {[
                      { id: "hero", label: "hero.tsx" },
                      { id: "about", label: "about.tsx" },
                      { id: "work", label: "portfolio.tsx" },
                      { id: "services", label: "services.tsx" },
                      { id: "process", label: "process.tsx" },
                      { id: "testimonials", label: "the_log.tsx" },
                      { id: "partners", label: "partners.tsx" },
                      { id: "contact", label: "contact.tsx" },
                    ].map((item) => (
                      <File key={item.id} value={item.id} onClick={() => handleLinkClick(`#${item.id}`)} className="menu-item opacity-0">
                        <p className="font-mono text-xl md:text-2xl hover:text-terminal-accent transition-all duration-500 py-3 uppercase tracking-wider">{item.label}</p>
                      </File>
                    ))}
                  </Folder>
                  <Folder value="3" element="core" className="menu-item opacity-0">
                    <File value="global-styles" onClick={() => handleLinkClick('#hero')} className="menu-item opacity-0">
                      <p className="font-mono text-xl md:text-2xl py-3 uppercase tracking-wider opacity-30">index.css</p>
                    </File>
                    <File value="config" onClick={() => handleLinkClick('#hero')} className="menu-item opacity-0">
                      <p className="font-mono text-xl md:text-2xl py-3 uppercase tracking-wider opacity-30">tailwind.config.js</p>
                    </File>
                  </Folder>
                </Folder>
              </Tree>
            </div>
          </div>

          <div className="p-12 border-t border-white/5 bg-white/[0.01]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-[5vw]">
              <div className="menu-footer-item font-mono text-[10px] text-terminal-muted/40 tracking-[0.4em] uppercase opacity-0">
                SYSTEM_STATUS: <span className="text-green-500/50 animate-pulse">OPERATIONAL</span>
              </div>
              <div className="menu-footer-item font-mono text-[10px] text-terminal-muted/40 tracking-[0.4em] uppercase opacity-0">
                NODE_REPLICA_ID: <span className="text-white/20">DFX-1099-B</span>
              </div>
              <div className="menu-footer-item font-mono text-[10px] text-terminal-accent/40 tracking-[0.4em] uppercase opacity-0">
                v2.0.4-LATEST
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
