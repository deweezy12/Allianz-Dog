import { Construction } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <Construction className="h-24 w-24 text-[#003781] mx-auto mb-8 animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[#003781] mb-4">
          Under Construction
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          Diese Seite ist derzeit in Arbeit und wird bald verfügbar sein.
        </p>
        <p className="text-lg text-slate-500 mb-12">
          This page is currently under construction and will be available soon.
        </p>
        <Link href="/">
          <Button className="bg-[#003781] hover:bg-[#00285E] text-white shadow-lg">
            Zurück zur Startseite
          </Button>
        </Link>
      </div>
    </div>
  );
}
