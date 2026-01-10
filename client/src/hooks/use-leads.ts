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

      // Get EmailJS configuration from environment variables (GitHub Secrets)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
      const customerTemplateId = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Debug logging to check if env vars are loaded
      console.log('EmailJS Config Check:', {
        hasServiceId: !!serviceId,
        hasAdminTemplateId: !!adminTemplateId,
        hasCustomerTemplateId: !!customerTemplateId,
        hasPublicKey: !!publicKey,
        serviceIdPreview: serviceId?.substring(0, 10),
        publicKeyPreview: publicKey?.substring(0, 10)
      });

      // Initialize EmailJS with your public key
      emailjs.init(publicKey);

      try {
        // Send email to admin (agentur.laeutek@allianz.de)
        console.log('Sending admin email...');
        await emailjs.send(
          serviceId,
          adminTemplateId,
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
        console.log('✅ Admin email sent successfully');

        // Send confirmation email to customer
        console.log('Sending customer confirmation email...');
        await emailjs.send(
          serviceId,
          customerTemplateId,
          {
            first_name: validated.firstName,
            dog_name: validated.dogName,
            to_email: validated.email,
            reply_to: validated.email,
          }
        );
        console.log('✅ Customer email sent successfully');
      } catch (error) {
        console.error('❌ Email send failed:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        throw error;
      }

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
