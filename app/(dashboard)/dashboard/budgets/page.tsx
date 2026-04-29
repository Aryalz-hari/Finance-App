import React from "react";
import CreateBudget from "./_components/CreateBudget";
import BudgetItem from "./_components/BudgetItem";
import { db } from "@/utils/dbconfig";
import { budgets, expenses } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Budgets() {
  // 1. Get the logged-in user
  const user = await currentUser();

  // Safety check: if no user is logged in, redirect them to sign-in
  if (!user) {
    redirect("/sign-in");
  }

  // Get the user's primary email address
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  // Render a safe error if Clerk hasn't loaded the email properly
  if (!userEmail) {
    return (
      <div className="p-8 text-center text-white mt-10">
        <h2 className="text-xl font-bold">Authentication Error</h2>
        <p className="text-slate-400">
          Could not retrieve your user profile. Please try logging in again.
        </p>
      </div>
    );
  }

  // 2. Fetch budgets filtered by the logged-in user
  const dbBudgets = await db
    .select({
      id: budgets.id,
      name: budgets.name,
      total: budgets.amount,
      spent: sql`COALESCE(SUM(${expenses.amount}), 0)`.mapWith(Number),
    })
    .from(budgets)
    .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
    .where(eq(budgets.createdBy, userEmail))
    .groupBy(budgets.id, budgets.name, budgets.amount);

  // 3. Format the data for your UI
  const budgetData = dbBudgets.map((b) => ({
    id: b.id,
    name: b.name,
    spent: Number(b.spent),
    total: Number(b.total),
    remaining: Number(b.total) - Number(b.spent),
  }));

  // Handle the case where there are no budgets yet to prevent Infinity errors
  const maxTotal =
    budgetData.length > 0
      ? Math.max(...budgetData.map((item) => item.total))
      : 1;

  return (
    <main className="px-4 py-6 sm:px-6 md:px-8 max-w-[1400px] mx-auto w-full">
      <div className="mx-auto w-full space-y-4 sm:space-y-6">
        {/* Budget vs Spending Chart Section */}
        {budgetData.length > 0 && (
          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-[0_0_0_1px_rgba(15,23,42,0.3)] backdrop-blur sm:rounded-3xl sm:p-5 md:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 sm:text-sm">
                  Budget overview
                </p>
                <h1 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                  Budget vs Spending
                </h1>
              </div>
              <div className="w-fit rounded-xl bg-slate-800/80 px-3 py-2 text-xs font-medium text-slate-300 sm:rounded-2xl sm:text-sm">
                This month
              </div>
            </div>

            <div className="mt-6 overflow-x-auto pb-2">
              <div className="flex min-w-[640px] items-end justify-start gap-6 md:gap-8">
                {budgetData.map((item) => {
                  const totalHeight = `${(item.total / maxTotal) * 100}%`;
                  const spentHeight = `${(item.spent / item.total) * 100}%`;

                  return (
                    <div
                      key={item.id}
                      className="flex flex-1 max-w-[120px] flex-col items-center gap-2 sm:gap-3"
                    >
                      <div className="text-center">
                        <p className="text-xs font-semibold text-slate-300 sm:text-sm">
                          NRs {item.spent} spent
                        </p>
                        <p className="text-[11px] text-slate-500 sm:text-xs">
                          NRs {item.remaining} left
                        </p>
                      </div>

                      <div
                        className="relative flex h-44 w-full min-w-[84px] items-start rounded-2xl bg-gradient-to-t from-[#14f1b2] to-emerald-500 sm:h-52 overflow-hidden"
                        style={{ maxHeight: totalHeight }}
                      >
                        <div
                          className="relative w-full bg-slate-700 transition-all duration-300"
                          style={{ height: spentHeight }}
                        />
                      </div>

                      <div className="text-center">
                        <p className="text-xs font-semibold text-slate-300 sm:text-sm">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-500 sm:text-xs">
                          Total NRs {item.total}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-400 sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-slate-500" />
                <span>Spent</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#14f1b2]" />
                <span>Remaining</span>
              </div>
            </div>
          </section>
        )}

        {/* Manage Budgets Header */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-[0_0_0_1px_rgba(15,23,42,0.3)] backdrop-blur sm:rounded-3xl sm:p-5 md:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Manage Budgets
              </h2>
              <p className="text-sm text-slate-400">
                Create and organize your category budgets
              </p>
            </div>

            <CreateBudget />
          </div>
        </section>

        {/* Budget Cards Grid */}
        <section>
          {budgetData.length === 0 ? (
            <div className="text-center py-10 text-slate-400 border border-slate-800 rounded-2xl bg-slate-900/40">
              No budgets found. Create one to get started!
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
              {/* CLEAN MAPPING: Just rendering the BudgetItem component since the edit buttons are now inside it! */}
              {budgetData.map((item) => (
                <BudgetItem key={item.id} budget={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
