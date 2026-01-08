import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  Dog, 
  ShieldAlert, 
  Euro, 
  Heart, 
  Calendar, 
  Ruler, 
  User,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { insertLeadSchema } from "@shared/schema";
import { useCreateLead } from "@/hooks/use-leads";

// Steps definition
const STEPS = [
  { id: 'dogName', title: 'Name', icon: Dog },
  { id: 'termination', title: 'Schutz', icon: ShieldAlert },
  { id: 'coverage', title: 'Summe', icon: Euro },
  { id: 'budget', title: 'Budget', icon: Heart },
  { id: 'age', title: 'Alter', icon: Calendar },
  { id: 'breed', title: 'Rasse', icon: Ruler },
  { id: 'contact', title: 'Kontakt', icon: User },
];

export function QuizWizard() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for back
  const [isSuccess, setIsSuccess] = useState(false);
  
  const createLead = useCreateLead();

  const form = useForm<z.infer<typeof insertLeadSchema>>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      dogName: "",
      terminationProtection: "",
      coverageAmount: "",
      monthlyBudget: "",
      dogAge: "",
      dogBreed: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    mode: "onChange"
  });

  const { watch, register, setValue, formState: { errors, isValid } } = form;
  const dogName = watch("dogName");

  const nextStep = () => {
    // Validate current step before proceeding
    let fieldsToValidate: any[] = [];
    
    switch(step) {
      case 0: fieldsToValidate = ['dogName']; break;
      case 1: fieldsToValidate = ['terminationProtection']; break;
      case 2: fieldsToValidate = ['coverageAmount']; break;
      case 3: fieldsToValidate = ['monthlyBudget']; break;
      case 4: fieldsToValidate = ['dogAge']; break;
      case 5: fieldsToValidate = ['dogBreed']; break;
      case 6: fieldsToValidate = ['firstName', 'lastName', 'email', 'phone']; break;
    }

    form.trigger(fieldsToValidate).then((valid) => {
      if (valid) {
        if (step < STEPS.length - 1) {
          setDirection(1);
          setStep(s => s + 1);
        } else {
          handleSubmit();
        }
      }
    });
  };

  const prevStep = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  const handleSubmit = () => {
    form.handleSubmit((data) => {
      createLead.mutate(data, {
        onSuccess: () => {
          setIsSuccess(true);
        }
      });
    })();
  };

  const currentProgress = ((step + 1) / STEPS.length) * 100;

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-2xl mx-auto border border-blue-100">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-6"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold text-[#003781] mb-4">Vielen Dank!</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
              Wir haben Ihre Anfrage für <span className="font-bold text-[#003781]">{dogName}</span> erhalten. Ein Allianz-Experte wird sich in Kürze bei Ihnen melden, um den optimalen Schutz zu besprechen.
            </p>
          </div>
          <Button 
            className="bg-[#003781] hover:bg-[#00285E] text-white px-8 py-6 text-lg rounded-xl"
            onClick={() => window.location.reload()}
          >
            Zurück zur Startseite
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          <span>Start</span>
          <span>{Math.round(currentProgress)}% Fertig</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#003781] to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${currentProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl border border-blue-50 overflow-hidden relative min-h-[500px] flex flex-col">
        {/* Step Content */}
        <div className="p-6 md:p-10 flex-grow relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -50 : 50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full h-full flex flex-col justify-center"
            >
              {/* Step 0: Dog Name */}
              {step === 0 && (
                <div className="space-y-8 text-center">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Dog className="w-10 h-10 text-[#003781]" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">
                    Wie heißt Ihr Hund?
                  </h2>
                  <div className="max-w-sm mx-auto">
                    <Input 
                      placeholder="Name des Hundes eingeben..." 
                      className="text-center text-2xl h-16 rounded-xl border-2 border-slate-200 focus:border-[#003781] focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-300"
                      {...register("dogName")}
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && nextStep()}
                    />
                    {errors.dogName && <p className="text-red-500 mt-2 text-sm">Bitte geben Sie einen Namen ein</p>}
                  </div>
                </div>
              )}

              {/* Step 1: Termination Protection */}
              {step === 1 && (
                <div className="space-y-8">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-slate-900 leading-tight">
                    Soll Ihre Hundeversicherung auch dann bestehen bleiben, wenn <span className="text-[#003781]">{dogName || "Ihr Hund"}</span> krank wird?
                  </h2>
                  <RadioGroup 
                    onValueChange={(val) => {
                      setValue("terminationProtection", val);
                      nextStep(); // Auto advance
                    }}
                    value={watch("terminationProtection")}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto"
                  >
                    <OptionCard value="important" label="Ja, wichtig" subLabel="Kündigungsschutz im Schadensfall" recommended />
                    <OptionCard value="not_important" label="Nicht so wichtig" subLabel="Günstigere Beiträge möglich" />
                  </RadioGroup>
                </div>
              )}

              {/* Step 2: Coverage Amount */}
              {step === 2 && (
                <div className="space-y-8">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-slate-900 leading-tight">
                    Wie hoch soll die jährliche Versicherungssumme für Tierarztbehandlungen ohne Operation sein?
                  </h2>
                  <RadioGroup 
                    onValueChange={(val) => {
                      setValue("coverageAmount", val);
                      nextStep();
                    }}
                    value={watch("coverageAmount")}
                    className="grid grid-cols-1 gap-4 max-w-md mx-auto"
                  >
                    <OptionCard value="unlimited" label="Unbegrenzt" subLabel="Rundum-Sorglos-Schutz" recommended />
                    <OptionCard value="800" label="Bis zu 800€" subLabel="Solide Basisabsicherung" />
                    <OptionCard value="400" label="Bis zu 400€" subLabel="Einstiegsschutz" />
                    <OptionCard value="0" label="0€" subLabel="Nur OP-Schutz gewünscht" />
                  </RadioGroup>
                </div>
              )}

              {/* Step 3: Monthly Budget */}
              {step === 3 && (
                <div className="space-y-8">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-slate-900 leading-tight">
                    Was ist Ihnen Sicherheit für <span className="text-[#003781]">{dogName || "Ihren Hund"}</span> im Monat wert?
                  </h2>
                  <RadioGroup 
                    onValueChange={(val) => {
                      setValue("monthlyBudget", val);
                      nextStep();
                    }}
                    value={watch("monthlyBudget")}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto"
                  >
                    <OptionCard value="30-60" label="30 - 60€" />
                    <OptionCard value="60-80" label="60 - 80€" recommended />
                    <OptionCard value="80-100" label="80 - 100€" />
                    <OptionCard value="100-120" label="100 - 120€" />
                  </RadioGroup>
                </div>
              )}

              {/* Step 4: Age */}
              {step === 4 && (
                <div className="space-y-8">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-slate-900">
                    Wie alt ist <span className="text-[#003781]">{dogName || "Ihr Hund"}</span>?
                  </h2>
                  <RadioGroup 
                    onValueChange={(val) => {
                      setValue("dogAge", val);
                      nextStep();
                    }}
                    value={watch("dogAge")}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto"
                  >
                    <OptionCard value="0-2" label="0 - 2 Jahre" centered />
                    <OptionCard value="3" label="3 Jahre" centered />
                    <OptionCard value="4" label="4 Jahre" centered />
                    <OptionCard value="5" label="5 Jahre" centered />
                    <OptionCard value="6" label="6 Jahre" centered />
                    <OptionCard value="7-9" label="7 - 9 Jahre" centered />
                    <OptionCard value="10+" label="Älter als 10" centered className="col-span-2 md:col-span-3" />
                  </RadioGroup>
                </div>
              )}

              {/* Step 5: Breed */}
              {step === 5 && (
                <div className="space-y-8">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-slate-900">
                    Welche Rasse ist <span className="text-[#003781]">{dogName || "Ihr Hund"}</span>?
                  </h2>
                  <RadioGroup 
                    onValueChange={(val) => {
                      setValue("dogBreed", val);
                      if (val !== "other") nextStep(); // Don't auto advance for 'other' if we had a text input there, but here it's just a selection
                    }}
                    value={watch("dogBreed")}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto"
                  >
                    <OptionCard value="mischling_s" label="Mischling bis 44 cm" />
                    <OptionCard value="mischling_l" label="Mischling ab 45 cm" />
                    <OptionCard value="chihuahua" label="Chihuahua" />
                    <OptionCard value="labrador" label="Labrador" />
                    <OptionCard value="bulldog" label="Französische Bulldogge" />
                    <div className="relative">
                       <Input 
                        placeholder="Andere Rasse eingeben..."
                        className="h-full min-h-[4rem] text-lg px-6 rounded-xl border-2 border-slate-200 focus:border-[#003781]"
                        onChange={(e) => setValue("dogBreed", e.target.value)}
                       />
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 6: Contact Form */}
              {step === 6 && (
                <div className="space-y-6 max-w-xl mx-auto w-full">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-[#003781]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">
                      Wohin dürfen wir Ihr Angebot senden?
                    </h2>
                    <p className="text-slate-500 mt-2">Wir erstellen Ihnen ein unverbindliches Angebot.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Vorname</Label>
                      <Input id="firstName" {...register("firstName")} className="h-12 rounded-lg" />
                      {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nachname</Label>
                      <Input id="lastName" {...register("lastName")} className="h-12 rounded-lg" />
                      {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail Adresse</Label>
                    <Input id="email" type="email" {...register("email")} className="h-12 rounded-lg" />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefonnummer (für Rückfragen)</Label>
                    <Input id="phone" type="tel" {...register("phone")} className="h-12 rounded-lg" />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-800 flex items-start space-x-2">
                    <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>Ihre Daten werden sicher SSL-verschlüsselt übertragen und nur für die Angebotserstellung verwendet.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={prevStep}
            disabled={step === 0 || createLead.isPending}
            className={`text-slate-500 hover:text-slate-900 ${step === 0 ? 'invisible' : ''}`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>

          {step < STEPS.length - 1 ? (
            <Button 
              onClick={nextStep}
              className="bg-[#003781] hover:bg-[#00285E] text-white rounded-xl px-8 py-6 text-lg font-semibold shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 transition-all hover:-translate-y-0.5"
            >
              Weiter
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={createLead.isPending}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-8 py-6 text-lg font-semibold shadow-lg shadow-green-900/10 hover:shadow-green-900/20 transition-all hover:-translate-y-0.5 w-full md:w-auto min-w-[200px]"
            >
              {createLead.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Wird gesendet...
                </>
              ) : (
                <>
                  Angebot anfordern
                  <CheckCircle2 className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function OptionCard({ value, label, subLabel, recommended, centered, className }: { 
  value: string; 
  label: string; 
  subLabel?: string;
  recommended?: boolean;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <RadioGroupItem value={value} id={`option-${value}`} className="peer sr-only" />
      <Label
        htmlFor={`option-${value}`}
        className={cn(
          "flex flex-col p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md h-full",
          "peer-data-[state=checked]:border-[#003781] peer-data-[state=checked]:bg-blue-50/50 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-[#003781]/20",
          "border-slate-100 bg-white hover:border-blue-200",
          centered && "items-center text-center justify-center"
        )}
      >
        <span className="text-lg font-bold text-slate-800">{label}</span>
        {subLabel && <span className="text-sm text-slate-500 mt-1">{subLabel}</span>}
      </Label>
      {recommended && (
        <div className="absolute -top-3 right-4 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full border border-green-200 shadow-sm">
          Empfehlung
        </div>
      )}
    </div>
  );
}
