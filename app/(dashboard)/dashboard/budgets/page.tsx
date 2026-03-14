// import React from 'react'

// export default function Budgets() {
//   return (
//     <div>Budgets</div>
//   )
// }
export default function Budgets() {
  const budgetOverview = [
    { name: "Food", spent: 220, remaining: 80, total: 300 },
    { name: "Transport", spent: 90, remaining: 60, total: 150 },
    { name: "Shopping", spent: 180, remaining: 70, total: 250 },
    { name: "Bills", spent: 140, remaining: 110, total: 250 },
    { name: "Entertainment", spent: 75, remaining: 45, total: 120 },
  ];

  const budgetItems = [
    { id: 1, name: "Food Budget", spent: 220, total: 300 },
    { id: 2, name: "Transport Budget", spent: 90, total: 150 },
    { id: 3, name: "Shopping Budget", spent: 180, total: 250 },
    { id: 4, name: "Bills Budget", spent: 140, total: 250 },
    { id: 5, name: "Entertainment Budget", spent: 75, total: 120 },
    { id: 6, name: "Health Budget", spent: 40, total: 100 },
  ];

  const maxTotal = Math.max(...budgetOverview.map((item) => item.total));

  return (
    <main className="min-h-screen bg-slate-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-6xl space-y-4 sm:space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5 md:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                Budget overview
              </p>
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
                Budget vs Spending
              </h1>
            </div>
            <div className="w-fit rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 sm:rounded-2xl sm:text-sm">
              This month
            </div>
          </div>

          <div className="mt-6 overflow-x-auto pb-2">
            <div className="flex min-w-[640px] items-end justify-between gap-4 md:gap-5">
              {budgetOverview.map((item) => {
                const totalHeight = `${(item.total / maxTotal) * 100}%`;
                const spentHeight = `${(item.spent / item.total) * 100}%`;
                return (
                  <div
                    key={item.name}
                    className="flex flex-1 flex-col items-center gap-2 sm:gap-3"
                  >
                    <div className="text-center">
                      <p className="text-xs font-semibold text-slate-700 sm:text-sm">
                        ${item.spent} spent
                      </p>
                      <p className="text-[11px] text-slate-500 sm:text-xs">
                        ${item.remaining} left
                      </p>
                    </div>

                    <div
                      className="relative flex h-44 w-full min-w-[84px] items-end rounded-2xl bg-slate-100 sm:h-52"
                      style={{ maxHeight: totalHeight }}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-emerald-100 to-emerald-50" />
                      <div
                        className="relative w-full rounded-2xl bg-gradient-to-t from-emerald-500 to-teal-400 transition-all duration-300"
                        style={{ height: spentHeight }}
                      />
                    </div>

                    <div className="text-center">
                      <p className="text-xs font-semibold text-slate-800 sm:text-sm">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-500 sm:text-xs">
                        Total ${item.total}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-600 sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <span>Spent</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-100" />
              <span>Remaining</span>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5 md:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Manage Budgets
              </h2>
              <p className="text-sm text-slate-500">
                Create and organize your category budgets
              </p>
            </div>

            <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 sm:w-auto sm:rounded-2xl">
              <span className="text-lg leading-none">+</span>
              Add Budget
            </button>
          </div>
        </section>

        <section>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {budgetItems.map((item) => {
              const remaining = item.total - item.spent;
              const spentPercent = Math.min(
                (item.spent / item.total) * 100,
                100,
              );
              const remainingPercent = Math.max(100 - spentPercent, 0);

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-5"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Total budget: ${item.total}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 sm:rounded-xl">
                          Edit
                        </button>
                        <button className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 sm:rounded-xl">
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Spent
                        </p>
                        <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                          ${item.spent}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Remaining
                        </p>
                        <p className="mt-1 text-base font-bold text-emerald-600 sm:text-lg">
                          ${remaining}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-medium text-slate-600">
                          Usage
                        </span>
                        <span className="font-semibold text-slate-800">
                          {spentPercent.toFixed(0)}%
                        </span>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div className="flex h-full w-full">
                          <div
                            className="h-full rounded-l-full bg-gradient-to-r from-emerald-500 to-teal-400"
                            style={{ width: `${spentPercent}%` }}
                          />
                          <div
                            className="h-full rounded-r-full bg-emerald-100"
                            style={{ width: `${remainingPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 sm:text-sm">
                        <span>${item.spent} spent</span>
                        <span>${remaining} remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

