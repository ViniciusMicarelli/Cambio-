'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

export default function SiteFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
        setIsVisible(false);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasScrolled) {
          setIsVisible(true);
        } else if (!entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    window.addEventListener('scroll', handleScroll, { passive: true });

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, [hasScrolled]);

  return (
    <footer 
      ref={footerRef}
      className="sticky bottom-0 z-20 w-full px-3 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="my-2 flex justify-center">
          <div
            className={[
              'inline-flex items-center whitespace-nowrap',
              'gap-2 sm:gap-3 rounded-xl border border-white/15 bg-black/65',
              'backdrop-blur-xl px-3 py-2 sm:px-4 sm:py-2.5',
              'shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
              'text-[15px] sm:text-sm',
              'transition-all duration-700 ease-out',
              isVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            ].join(' ')}
          >
            {/* Texto */}
            <span 
              className={[
                'text-muted-foreground transition-all duration-700 delay-100',
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              ].join(' ')}
            >
              Developed by
            </span>
            
            <strong 
              className={[
                'font-semibold text-foreground bg-gradient-to-r from-white to-white/80',
                'bg-clip-text transition-all duration-700 delay-200',
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              ].join(' ')}
            >
              viniciusmicarelli
            </strong>

            <span 
              className={[
                'mx-1 h-4 w-px bg-white/12 transition-all duration-700 delay-300',
                isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
              ].join(' ')}
              aria-hidden 
            />

            <nav className="inline-flex items-center gap-2 sm:gap-3">
              <Link
                href="https://github.com/viniciusmicarelli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de viniciusmicarelli"
                className={[
                  'inline-flex items-center gap-1.5 rounded-lg px-2 py-1',
                  'text-foreground/90 hover:text-foreground',
                  'hover:bg-white/[0.08] active:bg-white/[0.12]',
                  'transition-all duration-300 hover:scale-105',
                  'hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]',
                  isVisible ? 'opacity-100 translate-x-0 delay-400' : 'opacity-0 translate-x-4'
                ].join(' ')}
                style={{ transitionDuration: '700ms' }}
              >
                <Github className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                <span className="hidden xs:inline">GitHub</span>
              </Link>

              <Link
                href="https://www.linkedin.com/in/viníciusmicarelli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de viniciusmicarelli"
                className={[
                  'inline-flex items-center gap-1.5 rounded-lg px-2 py-1',
                  'text-foreground/90 hover:text-foreground',
                  'hover:bg-white/[0.08] active:bg-white/[0.12]',
                  'transition-all duration-300 hover:scale-105',
                  'hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]',
                  isVisible ? 'opacity-100 translate-x-0 delay-500' : 'opacity-0 translate-x-4'
                ].join(' ')}
                style={{ transitionDuration: '700ms' }}
              >
                <Linkedin className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                <span className="hidden xs:inline">LinkedIn</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}