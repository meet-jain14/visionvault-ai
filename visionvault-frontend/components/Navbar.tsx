"use client";

import { useEffect, useState } from "react";
import { Github, Aperture } from "lucide-react";

const NAV_LINKS = [
  { label: "Search", href: "#search" },
  { label: "Upload", href: "#upload" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-line group-hover:border-accent transition-colors">
            <Aperture className="h-3.5 w-3.5 text-inkdim group-hover:text-accent transition-colors" strokeWidth={1.75} />
          </span>
          <span className="text-[13px] font-medium tracking-tight text-ink">
            VisionVault <span className="text-inkdim">AI</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-inkdim hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="https://github.com/meet-jain14"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[13px] text-inkdim hover:text-ink transition-colors"
          aria-label="View on GitHub"
        >
          <Github className="h-4 w-4" strokeWidth={1.75} />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </nav>
    </header>
  );
}
