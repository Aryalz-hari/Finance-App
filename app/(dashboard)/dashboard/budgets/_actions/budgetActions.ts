"use server";

import { db } from "@/utils/dbconfig";
import { budgets, expenses } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Action to Delete Budget

export async function deleteBudgetAction(budgetId: number) {
  try {
    // 1. Delete all expenses associated with this budget FIRST
    await db.delete(expenses).where(eq(expenses.budgetId, budgetId));

    // 2. Now it is safe to delete the budget itself
    await db.delete(budgets).where(eq(budgets.id, budgetId));

    // 3. THE FIX: Aggressively clear the cache for the ENTIRE app layout
    // This stops Next.js from showing "ghost" budget cards on the dashboard!
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error deleting budget:", error);
    return { success: false, error: "Failed to delete budget" };
  }
}

// Action to Edit Budget
export async function editBudgetAction(
  budgetId: number,
  name: string,
  amount: number,
) {
  try {
    // 1. Calculate total expenses for this budget
    const result = await db
      .select({
        totalSpent: sql`SUM(${expenses.amount})`.mapWith(Number),
      })
      .from(expenses)
      .where(eq(expenses.budgetId, budgetId));

    const totalSpent = result[0]?.totalSpent || 0;

    // 2. Prohibit update if the new amount is less than what is already spent
    if (amount < totalSpent) {
      return {
        success: false,
        error: `Cannot update! You have already spent NRs ${totalSpent} on this budget.`,
      };
    }

    // 3. Update the database
    await db
      .update(budgets)
      .set({ name: name, amount: amount })
      .where(eq(budgets.id, budgetId));

    // Force Next.js to refresh the UI
    revalidatePath(`/budgets/${budgetId}`);
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error updating budget:", error);
    return { success: false, error: "Failed to update budget" };
  }
}
