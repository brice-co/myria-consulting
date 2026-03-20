"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Navbar component
// This component is responsible for rendering the navigation bar of the application.
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    const navLinks = [

    { name: "Who We Are", href: "/who-we-are" },   
      
    {
      name: "What We Build",
      children: [        
        { name: "Solutions", href: "/what-we-build" },        
        { name: "Why Voice", href: "/why-voice-is-different" },
        { name: "Use Cases", href: "/what-we-build/use-cases" },
        ],
    },

    {
      name: "How We Build",
      children: [        
        { name: "How We Build", href: "/how-we-build" },
        { name: "Architecture", href: "/what-we-build/architecture" },
        { name: "Technology", href: "/technology" },        
        { name: "Voice Capabilities", href: "/voice/capabilities" },
      ],
    },

    {
      name: "Consulting",
      children: [        
          { name: "Start Lean", href: "/start-lean" },
          { name: "Voice Diagnostic", href: "/realtime-voice-diagnostic" },
        
      ],
    },
    
    
  ];
  

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-2 shadow-md"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
        <div className="relative w-9 h-9 md:w-10 md:h-10">
        <Image
        src="/Myria.png"
        alt="Myria Consulting"
        fill
        className="object-contain"
        priority
      />
    </div>

  <span className="text-lg md:text-xl font-semibold tracking-tight">
    Myria Consulting
  </span>
</Link>


                    {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.name} className="relative group">
                  <button className="flex items-center gap-1 text-sm font-medium hover:text-blue-400">
                    {link.name} <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute left-0 mt-2 w-44 rounded-md bg-black text-white shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm hover:bg-gray-800"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium hover:text-blue-400"
                >
                  {link.name}
                </Link>
              )
            )}
          
           
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
           
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="ml-2 p-2 rounded-md"
              aria-label="Toggle menu"
            >
              {mobileNavOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileNavOpen && (
        <nav className="md:hidden bg-background/95 backdrop-blur-md shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href || "#"}
                    className="flex items-center py-2"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <span className="font-medium">{link.name}</span>
                    <ChevronRight className="ml-auto h-5 w-5" />
                  </Link>
                </li>
              ))}
              
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;