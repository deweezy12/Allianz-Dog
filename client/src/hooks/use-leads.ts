import { useMutation } from "@tanstack/react-query";
import emailjs from "@emailjs/browser";
import { type InsertLead, insertLeadSchema } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateLead() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertLead) => {
      // Validate with schema first to be safe
      const validated = insertLeadSchema.parse(data);

      // Try to load local config (development), fallback to env vars (production)
      let config;
      try {
        const localModule = await import("@/lib/emailjs-config.local");
        config = localModule.EMAILJS_LOCAL_CONFIG;
      } catch {
        // Local config doesn't exist (production), use environment variables
        config = {
          SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
          ADMIN_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID,
          CUSTOMER_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID,
          PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        };
      }

      // Initialize EmailJS with your public key
      emailjs.init(config.PUBLIC_KEY);

      // Send email to admin (agentur.laeutek@allianz.de)
      await emailjs.send(
        config.SERVICE_ID,
        config.ADMIN_TEMPLATE_ID,
        {
          dog_name: validated.dogName,
          termination_protection: validated.terminationProtection,
          coverage_amount: validated.coverageAmount,
          monthly_budget: validated.monthlyBudget,
          dog_age: validated.dogAge,
          dog_breed: validated.dogBreed,
          first_name: validated.firstName,
          last_name: validated.lastName,
          email: validated.email,
          phone: validated.phone,
          to_email: "agentur.laeutek@allianz.de",
        }
      );

      // Send confirmation email to customer
      await emailjs.send(
        config.SERVICE_ID,
        config.CUSTOMER_TEMPLATE_ID,
        {
          first_name: validated.firstName,
          dog_name: validated.dogName,
          to_email: validated.email,
          reply_to: validated.email,
        }
      );

      return validated;
    },
    onSuccess: () => {
      toast({
        title: "Anfrage erfolgreich gesendet",
        description: "Vielen Dank! Ein Berater wird sich in Kürze bei Ihnen melden.",
        variant: "default",
        className: "bg-primary text-primary-foreground border-none",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: error.message || "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    },
  });
}
