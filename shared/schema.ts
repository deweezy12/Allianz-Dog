
import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  dogName: text("dog_name").notNull(),
  terminationProtection: text("termination_protection").notNull(), // "important", "not_important"
  coverageAmount: text("coverage_amount").notNull(), // "unlimited", "800", "400", "0"
  monthlyBudget: text("monthly_budget").notNull(), // "30-60", "60-80", "80-100", "100-120"
  dogAge: text("dog_age").notNull(), // "0-2", "3", "4", "5", "6", "7-9", "10+"
  dogBreed: text("dog_breed").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({ 
  id: true, 
  createdAt: true 
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
