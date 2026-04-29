import React from "react";
import { db } from "@/utils/dbconfig";
import { budgets, expenses } from "@/utils/schema";
import { eq, desc, sql } from "drizzle-orm";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import Link from "next/link";

export default async function ExpenseDetails({
  params,
}: {
  // Update the type to support Next.js 15 Promises
  params: Promise<{ id: string }>;
}) {
  // 1. Await the params object before reading the ID (Fix for Next.js 15)
  const resolvedParams = await params;
  const budgetId = Number(resolvedParams.id);

  // 2. Safety Check: If the URL ID is not a number, stop right here
  if (isNaN(budgetId)) {
    return (
      <div className="p-8 text-center text-rose-400 mt-10 border border-slate-800 rounded-2xl mx-4 bg-slate-900/50">
        <h2 className="text-xl font-bold mb-2">Invalid Budget ID</h2>
        <p>The budget ID in the URL must be a valid number.</p>
        <Link
          href="/budgets"
          className="text-[#14f1b2] underline mt-4 inline-block"
        >
          Return to Budgets
        </Link>
      </div>
    );
  }

  // 3. Now it is completely safe to run your database query!
  const budgetResult = await db
    .select({
      id: budgets.id,
      name: budgets.name,
      total: budgets.amount,
      spent: sql`COALESCE(SUM(${expenses.amount}), 0)`.mapWith(Number),
    })
    .from(budgets)
    .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
    .where(eq(budgets.id, budgetId))
    .groupBy(budgets.id, budgets.name, budgets.amount);

  const budgetInfo = budgetResult[0];

  // If user types an ID number that doesn't exist in the database
  if (!budgetInfo) {
    return (
      <div className="p-8 text-center text-slate-400 mt-10 border border-slate-800 rounded-2xl mx-4 bg-slate-900/50">
        <h2 className="text-xl font-bold text-white mb-2">Budget Not Found</h2>
        <p>We couldn't find a budget with that ID.</p>
        <Link
          href="/budgets"
          className="text-[#14f1b2] underline mt-4 inline-block"
        >
          Return to Budgets
        </Link>
      </div>
    );
  }

  // Format data for the BudgetItem component
  const formattedBudget = {
    id: budgetInfo.id,
    name: budgetInfo.name,
    spent: Number(budgetInfo.spent),
    total: Number(budgetInfo.total),
    remaining: Number(budgetInfo.total) - Number(budgetInfo.spent),
  };

  // 2. Fetch the list of expenses specifically for this budget
  const expenseList = await db
    .select()
    .from(expenses)
    .where(eq(expenses.budgetId, budgetId))
    .orderBy(desc(expenses.id)); // Newest first

  return (
    <main className="px-4 py-6 sm:px-6 md:px-8 max-w-[1400px] mx-auto w-full">
      <div className="mx-auto w-full space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/budgets" // Navigates back to your main budgets page
            className="rounded-xl border border-slate-700 bg-slate-800/50 p-2 text-slate-300 transition hover:bg-slate-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-white">My Expenses</h1>
        </div>

        {/* Top Grid: Budget Card on Left, Add Expense Form on Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BudgetItem budget={formattedBudget} />

          {/* PASSED THE NEW PROPS HERE */}
          <AddExpense
            budgetId={budgetId}
            budgetAmount={formattedBudget.total}
            totalSpend={formattedBudget.spent}
          />
        </div>

        {/* Bottom Section: Expenses List */}
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:rounded-3xl sm:p-5 md:p-6">
          <h2 className="text-xl font-bold text-white mb-4">Latest Expenses</h2>

          {expenseList.length === 0 ? (
            <div className="text-center py-8 text-slate-400 border border-slate-800 border-dashed rounded-xl">
              No expenses recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-xl rounded-bl-xl">
                      Name
                    </th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 rounded-tr-xl rounded-br-xl text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expenseList.map((expense) => (
                    <tr
                      key={expense.id}
                      className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-4 py-4 font-medium text-white">
                        {expense.name}
                      </td>
                      <td className="px-4 py-4 font-bold text-rose-400">
                        NRs {expense.amount}
                      </td>
                      <td className="px-4 py-4 text-slate-500">
                        {expense.createdAt}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button className="text-rose-500 hover:text-rose-400 font-medium">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
