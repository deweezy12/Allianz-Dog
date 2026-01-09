import { z } from "zod";

// Lead form validation schema for client-side validation
export const insertLeadSchema = z.object({
  dogName: z.string().min(1, "Dog name is required"),
  terminationProtection: z.enum(["important", "not_important"]),
  coverageAmount: z.enum(["unlimited", "800", "400", "0"]),
  monthlyBudget: z.enum(["30-60", "60-80", "80-100", "100-120"]),
  dogAge: z.enum(["0-2", "3", "4", "5", "6", "7-9", "10+"]),
  dogBreed: z.string().min(1, "Dog breed is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type NewLead = InsertLead; // Alias for compatibility
