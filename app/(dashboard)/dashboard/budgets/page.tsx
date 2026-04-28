import React from "react";
import CreateBudget from "./_components/CreateBudget";
import { db } from "@/utils/dbconfig";
import { budgets, expenses } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";

export default async function Budgets() {
  const dbBudgets = await db
    .select({
      id: budgets.id,
      name: budgets.name,
      total: budgets.amount,
      spent: sql`COALESCE(SUM(${expenses.amount}), 0)`.mapWith(Number),
    })
    .from(budgets)
    .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
    .groupBy(budgets.id, budgets.name, budgets.amount);

  const budgetData = dbBudgets.map((b) => ({
    id: b.id,
    name: b.name,
    spent: Number(b.spent),
    total: Number(b.total),
    remaining: Number(b.total) - Number(b.spent),
  }));

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
              <div className="flex min-w-[640px] items-end justify-between gap-4 md:gap-5">
                {budgetData.map((item) => {
                  const totalHeight = `${(item.total / maxTotal) * 100}%`;
                  const spentHeight = `${(item.spent / item.total) * 100}%`;
                  return (
                    <div
                      key={item.id}
                      className="flex flex-1 flex-col items-center gap-2 sm:gap-3"
                    >
                      <div className="text-center">
                        <p className="text-xs font-semibold text-slate-300 sm:text-sm">
                          NRs {item.spent} spent
                        </p>
                        <p className="text-[11px] text-slate-500 sm:text-xs">
                          NRs {item.remaining} left
                        </p>
                      </div>

                      {/* SWAPPED CHART BARS */}
                      <div
                        className="relative flex h-44 w-full min-w-[84px] items-end rounded-2xl bg-gradient-to-t from-[#14f1b2] to-emerald-500 sm:h-52 overflow-hidden"
                        style={{ maxHeight: totalHeight }}
                      >
                        <div
                          className="relative w-full rounded-2xl bg-slate-700 transition-all duration-300"
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
                {/* SWAPPED LEGEND COLORS */}
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
              {budgetData.map((item) => {
                const spentPercent = Math.min(
                  (item.spent / item.total) * 100,
                  100,
                );
                const remainingPercent = Math.max(100 - spentPercent, 0);

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:bg-slate-800/50 sm:rounded-3xl sm:p-5"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-bold text-white sm:text-lg">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            Total budget: NRs {item.total}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <button className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 sm:rounded-xl">
                            Edit
                          </button>
                          <button className="rounded-lg border border-rose-900/50 px-3 py-2 text-xs font-semibold text-rose-400 transition hover:bg-rose-950/30 sm:rounded-xl">
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 rounded-2xl bg-[#0a101f] p-3 border border-slate-800/50">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Spent
                          </p>
                          <p className="mt-1 text-base font-bold text-gray-400 sm:text-lg">
                            NRs {item.spent}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Remaining
                          </p>
                          <p className="mt-1 text-base font-bold text-emerald-400 sm:text-lg">
                            NRs {item.remaining}
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
                          <span className="font-medium text-slate-400">
                            Usage
                          </span>
                          <span className="font-semibold text-white">
                            {spentPercent.toFixed(0)}%
                          </span>
                        </div>

                        {/* SWAPPED HORIZONTAL PROGRESS BARS */}
                        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                          <div className="flex h-full w-full">
                            <div
                              className="h-full rounded-l-full bg-slate-600"
                              style={{ width: `${spentPercent}%` }}
                            />
                            <div
                              className="h-full rounded-r-full bg-gradient-to-r from-[#14f1b2] to-emerald-500"
                              style={{ width: `${remainingPercent}%` }}
                            />
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 sm:text-sm">
                          <span>NRs {item.spent} spent</span>
                          <span>NRs {item.remaining} remaining</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
