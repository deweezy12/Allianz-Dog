import { ShieldCheck, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#00285E] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-8 w-8 text-blue-300" />
              <span className="text-2xl font-display font-bold">Allianzagentur Läutek</span>
            </div>
            <p className="text-blue-100 leading-relaxed max-w-xs">
              Ihr vertrauensvoller Partner für Tierversicherungen. Wir schützen, was Ihnen am Herzen liegt.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Versicherungen</h3>
            <ul className="space-y-4 text-blue-100">
              <li><Link href="#" className="hover:text-white transition-colors">Hundekrankenversicherung</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hundehaftpflicht</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Katzenkrankenversicherung</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">OP-Schutz</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Kontakt</h3>
            <ul className="space-y-4 text-blue-100">
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 opacity-70" />
                <span>02191 5657580</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 opacity-70" />
                <span>agentur.laeutek@allianz.de</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 opacity-70 mt-1" />
                <span>Kölner Straße 231<br/>42897 Remscheid</span>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Auszeichnungen</h3>
            <div className="flex flex-col space-y-4">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                <p className="font-bold text-sm mb-1">TÜV Geprüft</p>
                <div className="h-1 w-12 bg-blue-400 rounded-full"></div>
                <p className="text-xs text-blue-200 mt-2">Kundenzufriedenheit "Sehr Gut"</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                <p className="font-bold text-sm mb-1">Stiftung Warentest</p>
                <div className="h-1 w-12 bg-blue-400 rounded-full"></div>
                <p className="text-xs text-blue-200 mt-2">Finanztest: Testsieger 2024</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-blue-300">
          <p>© 2026 Allianzagentur Läutek. Alle Rechte vorbehalten.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Impressum</Link>
            <Link href="#" className="hover:text-white transition-colors">Datenschutz</Link>
            <Link href="#" className="hover:text-white transition-colors">AGB</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
