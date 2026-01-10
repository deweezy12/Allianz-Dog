import { Phone } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
            <img
              src="/Allianz-Dog/allianz.png"
              alt="Allianz Logo"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl leading-none text-[#003781]">Allianz</span>
              <span className="text-sm text-slate-500 font-medium leading-none mt-0.5 tracking-wide">Agentur Läutek</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/vorteile" className="text-slate-600 font-medium hover:text-[#003781] transition-colors">Vorteile</Link>
            <Link href="/tarife" className="text-slate-600 font-medium hover:text-[#003781] transition-colors">Tarife</Link>
            <Link href="/ueber-uns" className="text-slate-600 font-medium hover:text-[#003781] transition-colors">Über Uns</Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center space-x-4">
            <a href="tel:021915657580" className="hidden lg:flex items-center text-[#003781] font-bold text-sm hover:underline">
              <Phone className="h-4 w-4 mr-2" />
              02191 5657580
            </a>
            <Button 
              className="bg-[#003781] hover:bg-[#00285E] text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 transition-all hover:-translate-y-0.5 rounded-lg px-6"
              onClick={() => {
                document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Angebot berechnen
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
