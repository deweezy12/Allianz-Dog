import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuizWizard } from "@/components/QuizWizard";
import { 
  Shield, 
  Award, 
  Stethoscope, 
  CheckCircle,
  Star,
  ArrowDown
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-body bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-br from-slate-50 to-blue-50/30">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#003781]">
              <path transform="translate(100 100)" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.8,34.8C59.4,46.5,47.9,56.2,35.2,63.4C22.5,70.6,8.6,75.3,-4.5,83.1C-17.6,90.9,-29.9,101.8,-41.1,98.9C-52.3,96,-62.4,79.3,-71.3,64.2C-80.2,49.1,-87.9,35.6,-89.6,21.3C-91.3,7,-87,-8.1,-80.4,-21.8C-73.8,-35.5,-64.9,-47.8,-53.4,-55.8C-41.9,-63.8,-27.8,-67.5,-14.2,-68.3C-0.6,-69.1,13,-67,30.5,-83.6" />
            </svg>
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center space-x-2 bg-blue-100/50 border border-blue-200 rounded-full px-4 py-1.5 text-sm font-semibold text-[#003781]">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Testsieger bei Stiftung Warentest</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 leading-[1.1]">
                  Ausgezeichnete <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003781] to-blue-600">
                    Hundekrankenversicherung
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                  Schützen Sie Ihren Liebling vor hohen Tierarztkosten. Mit der Allianz sind Sie und Ihr Vierbeiner in den besten Händen.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    onClick={() => document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-[#003781] hover:bg-[#00285E] text-white text-lg font-bold px-8 py-4 rounded-xl shadow-xl shadow-blue-900/20 hover:shadow-blue-900/30 transition-all hover:-translate-y-1 flex items-center justify-center"
                  >
                    Jetzt Beitrag berechnen
                    <ArrowDown className="ml-2 w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white overflow-hidden">
                           {/* Placeholder for user avatars */}
                           <div className="w-full h-full bg-slate-300" />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-slate-900">4.9/5 Sterne</p>
                      <p className="text-slate-500">aus 2.000+ Bewertungen</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-200">
                  <FeatureItem text="100% Kostenübernahme" />
                  <FeatureItem text="Freie Tierarztwahl" />
                  <FeatureItem text="Sofortiger Schutz bei Unfällen" />
                  <FeatureItem text="Täglich kündbar" />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden md:block"
              >
                {/* Image Placeholder using Unsplash */}
                {/* Happy dog running in grass */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Glücklicher Hund im Grünen" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                    <div className="bg-white/95 backdrop-blur rounded-xl p-4 inline-flex items-center gap-4 shadow-lg">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                        1,6
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Finanztest 09/2023</p>
                        <p className="font-bold text-slate-900">Sehr Gut</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section id="quiz-section" className="py-24 bg-white relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900">
                Finden Sie den <span className="text-[#003781]">perfekten Tarif</span>
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                Beantworten Sie wenige Fragen zu Ihrem Vierbeiner und erhalten Sie sofort Ihr persönliches Angebot.
              </p>
            </div>
            
            <QuizWizard />
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-8">
              <TrustCard 
                icon={Shield}
                title="Rundum abgesichert"
                description="Egal ob Krankheit oder Unfall – wir übernehmen die Kosten, damit Sie sich voll auf die Genesung konzentrieren können."
              />
              <TrustCard 
                icon={Stethoscope}
                title="Beste medizinische Versorgung"
                description="Dank freier Tierarztwahl und Telemedizin erhalten Sie immer die beste Behandlung für Ihren Hund."
              />
              <TrustCard 
                icon={Award}
                title="Ausgezeichneter Service"
                description="Unser Service-Team ist 24/7 für Sie da. Schnelle Schadensregulierung oft innerhalb von 24 Stunden."
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
      <span className="text-slate-700 font-medium">{text}</span>
    </div>
  );
}

function TrustCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-[#003781]">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold font-display text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
