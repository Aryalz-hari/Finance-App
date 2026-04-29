import React from "react";
import { db } from "@/utils/dbconfig";
import { budgets, expenses } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
// Import auth tools
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Search, Plus, ArrowUpRight, Pencil, Trash2 } from "lucide-react";

export default async function ExpensesPage() {
  // 1. Secure the page and get the logged-in user
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const userEmail = user.primaryEmailAddress?.emailAddress;
  if (!userEmail) return null;

  // 2. Fetch ONLY expenses tied to this user's budgets
  const expenseList = await db
    .select({
      id: expenses.id,
      name: expenses.name,
      amount: expenses.amount,
      createdAt: expenses.createdAt,
      budgetName: budgets.name, // We can also grab the budget name now!
    })
    .from(expenses)
    .innerJoin(budgets, eq(expenses.budgetId, budgets.id)) // <--- THE FIX
    .where(eq(budgets.createdBy, userEmail)) // <--- THE FIX
    .orderBy(desc(expenses.id));

  // 3. Transform DB data for the Transactions List
  const transactions = expenseList.map((exp) => ({
    id: exp.id,
    title: exp.name,
    category: exp.budgetName || "Expense", // Display the parent budget name as the category
    date: exp.createdAt,
    amount: Number(exp.amount),
    type: "expense",
  }));

  // 4. Transform DB data for the Daily Spending Chart
  const expensesByDate: Record<string, number> = {};

  expenseList.forEach((exp) => {
    const shortDate = exp.createdAt.split(",")[0];
    if (!expensesByDate[shortDate]) {
      expensesByDate[shortDate] = 0;
    }
    expensesByDate[shortDate] += Number(exp.amount);
  });

  const chartData = Object.entries(expensesByDate)
    .map(([date, amount]) => ({ date, amount }))
    .slice(0, 7)
    .reverse();

  const maxChartValue =
    chartData.length > 0
      ? Math.max(...chartData.map((d) => d.amount)) * 1.2 // Add 20% padding to the top
      : 100;

  const yAxisLabels = [
    maxChartValue,
    maxChartValue * 0.75,
    maxChartValue * 0.5,
    maxChartValue * 0.25,
    0,
  ].map((val) => Math.round(val));

  return (
    <div className="px-4 py-6 sm:px-6 md:px-8 max-w-[1400px] mx-auto w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Expenses
        </h1>
        <p className="mt-1 text-sm text-slate-400 sm:text-base">
          Manage your transactions
        </p>
      </div>

      {/* Chart Section */}
      <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_0_0_1px_rgba(15,23,42,0.3)] backdrop-blur sm:p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Daily Spending
        </h2>

        {chartData.length === 0 ? (
          <div className="text-center py-8 text-slate-400 border border-slate-800 border-dashed rounded-xl">
            No expense data available for chart.
          </div>
        ) : (
          <div className="relative h-[200px] w-full mt-4 flex items-end pt-4 pr-2">
            <div className="absolute inset-0 flex flex-col justify-between pb-8">
              {yAxisLabels.map((label, i) => (
                <div
                  key={i}
                  className="relative w-full border-t border-dashed border-slate-800/80"
                >
                  <span className="absolute -top-3 -left-2 bg-[#0a101f] pr-2 text-xs text-slate-500 w-10 text-right">
                    NRs {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative z-10 flex w-full h-[168px] items-end justify-around pl-12 pr-4 mb-8">
              {chartData.map((data, index) => {
                const heightPercentage = (data.amount / maxChartValue) * 100;
                return (
                  <div
                    key={index}
                    className="relative flex flex-col justify-end items-center flex-1 h-full mx-1 sm:mx-2 md:mx-4 group"
                  >
                    <div
                      className="w-full bg-rose-500/90 rounded-sm transition-all duration-300 group-hover:bg-rose-400 max-w-[80px]"
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                    <span className="absolute -bottom-6 text-[10px] sm:text-xs text-slate-500 whitespace-nowrap">
                      {data.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900/70 border border-slate-800 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#14f1b2] hover:bg-[#10d49b] text-slate-900 font-medium rounded-lg transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Transactions List */}
      <div className="flex flex-col gap-2">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-slate-400 border border-slate-800 border-dashed rounded-xl">
            No expenses recorded yet.
          </div>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-800/50 bg-slate-900/40 hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 bg-rose-500/15 text-rose-400">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{tx.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {tx.category} &bull; {tx.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-sm font-semibold whitespace-nowrap text-rose-400">
                  NRs {tx.amount.toFixed(2)}
                </span>

                <div className="flex items-center gap-3 text-slate-500">
                  <button className="hover:text-white transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
