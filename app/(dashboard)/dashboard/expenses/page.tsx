// import React from 'react'

// export default function Expenses() {
//   return (
//     <div>Expenses</div>
//   )
// }
export default function Expenses() {
  const weeklySpending = [
    { day: "Sun", amount: 32 },
    { day: "Mon", amount: 48 },
    { day: "Tue", amount: 26 },
    { day: "Wed", amount: 64 },
    { day: "Thu", amount: 41 },
    { day: "Fri", amount: 72 },
    { day: "Sat", amount: 55 },
  ];

  const transactions = [
    {
      id: 1,
      title: "Groceries",
      category: "Food",
      date: "Today, 10:30 AM",
      amount: "-$24.50",
      type: "expense",
    },
    {
      id: 2,
      title: "Taxi Fare",
      category: "Transport",
      date: "Today, 8:15 AM",
      amount: "-$8.20",
      type: "expense",
    },
    {
      id: 3,
      title: "Netflix Subscription",
      category: "Entertainment",
      date: "Yesterday, 9:00 PM",
      amount: "-$12.99",
      type: "expense",
    },
    {
      id: 4,
      title: "Freelance Payment",
      category: "Income",
      date: "Yesterday, 2:45 PM",
      amount: "+$120.00",
      type: "income",
    },
    {
      id: 5,
      title: "Coffee",
      category: "Food",
      date: "Mar 12, 7:50 AM",
      amount: "-$3.75",
      type: "expense",
    },
    {
      id: 6,
      title: "Internet Bill",
      category: "Bills",
      date: "Mar 11, 6:20 PM",
      amount: "-$18.00",
      type: "expense",
    },
  ];

  const maxAmount = Math.max(...weeklySpending.map((item) => item.amount));

  return (
    <main className="min-h-screen bg-slate-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-6xl space-y-4 sm:space-y-6">
        <section className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Expense overview
              </p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
                Daily Spending
              </h1>
            </div>
            <div className="w-fit rounded-xl sm:rounded-2xl bg-slate-100 px-3 py-2 text-xs sm:text-sm font-medium text-slate-600">
              Last 7 days
            </div>
          </div>

          <div className="mt-6 overflow-x-auto pb-2">
            <div className="flex min-w-140 items-end justify-between gap-3 sm:gap-4 md:gap-5">
              {weeklySpending.map((item) => {
                const height = `${(item.amount / maxAmount) * 100}%`;
                return (
                  <div
                    key={item.day}
                    className="flex flex-1 flex-col items-center gap-2 sm:gap-3"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">
                      ${item.amount}
                    </span>
                    <div className="relative flex h-40 sm:h-48 md:h-52 w-full min-w-15 items-end rounded-xl sm:rounded-2xl bg-slate-100">
                      <div
                        className="w-full rounded-xl sm:rounded-2xl bg-linear-to-t from-emerald-500 to-teal-400 transition-all duration-300"
                        style={{ height }}
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-500">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:p-6">
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search transactions"
                className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </div>

            <button className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600">
              <span className="text-lg leading-none">+</span>
              Add Transaction
            </button>
          </div>
        </section>

        <section className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Recent Transactions
              </h2>
              <p className="text-sm text-slate-500">
                Track your latest income and expenses
              </p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-col gap-4 rounded-xl sm:rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                  <div
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold ${
                      transaction.type === "income"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-slate-900">
                      {transaction.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500">
                      <span>{transaction.category}</span>
                      <span>•</span>
                      <span>{transaction.date}</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`text-sm sm:text-base font-bold md:text-right ${
                    transaction.type === "income"
                      ? "text-emerald-600"
                      : "text-slate-900"
                  }`}
                >
                  {transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
