"use client";

import React from "react";
import {
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Pencil,
  Trash2,
} from "lucide-react";

export default function ExpensesPage() {
  // Chart Data
  const chartData = [
    { date: "Dec 30", amount: 120 },
    { date: "Dec 31", amount: 85 },
    { date: "Jan 01", amount: 50 },
    { date: "Jan 02", amount: 45 },
    { date: "Jan 03", amount: 210 },
    { date: "Jan 04", amount: 140 },
    { date: "Jan 05", amount: 170 },
  ];
  const maxChartValue = 220;
  const yAxisLabels = [220, 165, 110, 55, 0];

  // Transaction Data
  const transactions = [
    {
      id: 1,
      title: "Grocery Shopping",
      category: "Food & Dining",
      date: "Jan 5, 2026",
      amount: -156.5,
      type: "expense",
    },
    {
      id: 2,
      title: "Monthly Salary",
      category: "Salary",
      date: "Jan 1, 2026",
      amount: 5500.0,
      type: "income",
    },
    {
      id: 3,
      title: "Electric Bill",
      category: "Utilities",
      date: "Jan 4, 2026",
      amount: -89.0,
      type: "expense",
    },
    {
      id: 4,
      title: "Netflix Subscription",
      category: "Entertainment",
      date: "Jan 3, 2026",
      amount: -15.99,
      type: "expense",
    },
    {
      id: 5,
      title: "Gas Station",
      category: "Transportation",
      date: "Jan 2, 2026",
      amount: -45.0,
      type: "expense",
    },
    {
      id: 6,
      title: "Coffee Shop",
      category: "Food & Dining",
      date: "Jan 5, 2026",
      amount: -12.5,
      type: "expense",
    },
    {
      id: 7,
      title: "Freelance Project",
      category: "Freelance",
      date: "Jan 2, 2026",
      amount: 800.0,
      type: "income",
    },
    {
      id: 8,
      title: "Gym Membership",
      category: "Health",
      date: "Jan 1, 2026",
      amount: -50.0,
      type: "expense",
    },
    {
      id: 9,
      title: "Online Course",
      category: "Education",
      date: "Jan 3, 2026",
      amount: -199.0,
      type: "expense",
    },
    {
      id: 10,
      title: "Restaurant Dinner",
      category: "Food & Dining",
      date: "Jan 4, 2026",
      amount: -78.0,
      type: "expense",
    },
  ];

  return (
    <div className="px-4 py-6 sm:px-6 md:px-8 max-w-[1400px] mx-auto w-full">
      {/* Page Header */}
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

        <div className="relative h-[200px] w-full mt-4 flex items-end pt-4 pr-2">
          {/* Y-Axis Guidelines */}
          <div className="absolute inset-0 flex flex-col justify-between pb-8">
            {yAxisLabels.map((label, i) => (
              <div
                key={i}
                className="relative w-full border-t border-dashed border-slate-800/80"
              >
                <span className="absolute -top-3 -left-2 bg-[#0a101f] pr-2 text-xs text-slate-500 w-10 text-right">
                  ${label}
                </span>
              </div>
            ))}
          </div>

          {/* Bars - FIXED: Added mb-8 so the bars rest perfectly on the zero line */}
          <div className="relative z-10 flex w-full h-[168px] items-end justify-between pl-12 pr-4 mb-8">
            {chartData.map((data, index) => {
              const heightPercentage = (data.amount / maxChartValue) * 100;
              return (
                <div
                  key={index}
                  className="relative flex flex-col justify-end items-center flex-1 h-full mx-1 sm:mx-2 md:mx-4 group"
                >
                  <div
                    className="w-full bg-red-500/90 rounded-sm transition-all duration-300 group-hover:bg-red-400 max-w-[80px]"
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
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 rounded-xl border border-slate-800/50 bg-slate-900/40 hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${
                  tx.type === "expense"
                    ? "bg-red-500/15 text-red-400"
                    : "bg-emerald-500/15 text-emerald-400"
                }`}
              >
                {tx.type === "expense" ? (
                  <ArrowUpRight className="w-5 h-5" />
                ) : (
                  <ArrowDownLeft className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">{tx.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {tx.category} &bull; {tx.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <span
                className={`text-sm font-semibold whitespace-nowrap ${
                  tx.type === "expense" ? "text-red-400" : "text-emerald-400"
                }`}
              >
                {tx.type === "expense" ? "" : "+"}$
                {Math.abs(tx.amount).toFixed(2)}
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
        ))}
      </div>
    </div>
  );
}
