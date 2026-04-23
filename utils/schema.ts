import { serial } from "drizzle-orm/mysql-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const budgets = pgTable("budgets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  amount: integer().notNull(),
  createdBy: varchar({ length: 255 }).notNull(),
});

export const expenses= pgTable("expenses",{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  amount: integer().notNull(),
  budgetId:integer('budgetId').references(()=>budgets.id),
  createdAt:varchar({length:255}).notNull()
});