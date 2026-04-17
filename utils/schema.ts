import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const budgets = pgTable("budgets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  amount: integer().notNull(),
  createdBy: varchar({ length: 255 }).notNull(),
});
