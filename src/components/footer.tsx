'use client';

import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="fixed bottom-3 inset-x-0 z-20 flex justify-center px-4">
      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/50 px-4 py-2 backdrop-blur-md shadow-lg">
        <span className="text-sm text-muted-foreground">
          Developed by <strong className="text-foreground">viniciusmicarelli</strong>
        </span>

        <span className="h-4 w-px bg-white/15" aria-hidden />

        <nav className="flex items-center gap-3">
          <Link
            href="https://github.com/viniciusmicarelli"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-foreground/90 hover:text-foreground hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Abrir GitHub de viniciusmicarelli"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>

          <Link
            href="https://www.linkedin.com/in/viníciusmicarelli"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-foreground/90 hover:text-foreground hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Abrir LinkedIn de viniciusmicarelli"
          >
            <Linkedin className="h-4 w-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
