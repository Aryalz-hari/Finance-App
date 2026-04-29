import Link from "next/link";
import React from "react";

// Define the shape of the data we expect to receive
type BudgetType = {
  id: number;
  name: string;
  total: number;
  spent: number;
  remaining: number;
};

export default function BudgetItem({ budget }: { budget: BudgetType }) {
  const spentPercent = Math.min((budget.spent / budget.total) * 100, 100);
  const remainingPercent = Math.max(100 - spentPercent, 0);

  return (
    <Link href={`/dashboard/expenses/${budget.id}`}>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:bg-slate-800/50 sm:rounded-3xl sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-base font-bold text-white sm:text-lg">
                {budget.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Total budget: NRs {budget.total}
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
                NRs {budget.spent}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Remaining
              </p>
              <p className="mt-1 text-base font-bold text-emerald-400 sm:text-lg">
                NRs {budget.remaining}
              </p>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
              <span className="font-medium text-slate-400">Usage</span>
              <span className="font-semibold text-white">
                {spentPercent.toFixed(0)}%
              </span>
            </div>

            {/* Progress Bars */}
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
              <span>NRs {budget.spent} spent</span>
              <span>NRs {budget.remaining} remaining</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
