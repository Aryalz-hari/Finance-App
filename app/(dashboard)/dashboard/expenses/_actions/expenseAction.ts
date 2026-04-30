"use server";

import { db } from "@/utils/dbconfig";
import { expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteExpenseAction(expenseId: number) {
  try {
    // Delete the specific expense
    await db.delete(expenses).where(eq(expenses.id, expenseId));

    // Force Next.js to refresh these pages so the UI updates instantly
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/expenses");
    revalidatePath("/dashboard/budgets");
    // If your dynamic route is something like /dashboard/expenses/[id], it will refresh automatically if we use layout revalidation, but targeting specific paths is safer.
    revalidatePath("/dashboard", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error deleting expense:", error);
    return { success: false, error: "Failed to delete expense" };
  }
}
