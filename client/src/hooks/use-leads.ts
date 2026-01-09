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

      // Get EmailJS configuration from environment variables
      // In production (GitHub Pages): these come from GitHub Secrets
      // In development: these will be undefined, so use fallback in emailjs-config.local.ts
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
      const customerTemplateId = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // If env vars are undefined (local dev), try to load local config
      let config;
      if (!serviceId || !publicKey) {
        // Only import local config if env vars are missing (development only)
        try {
          const localModule = await import("./emailjs-config.local");
          config = localModule.EMAILJS_LOCAL_CONFIG;
        } catch {
          throw new Error("EmailJS configuration missing. Check environment variables or emailjs-config.local.ts");
        }
      } else {
        // Use environment variables (production)
        config = {
          SERVICE_ID: serviceId,
          ADMIN_TEMPLATE_ID: adminTemplateId,
          CUSTOMER_TEMPLATE_ID: customerTemplateId,
          PUBLIC_KEY: publicKey,
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
