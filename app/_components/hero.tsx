// "use client";

// import { useState } from "react";
// import * as LucideIcons from "lucide-react";

// export default function ExpensesListPage() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");

//   const expensesData = [
//     {
//       id: 1,
//       merchant: "Starbucks Coffee",
//       location: "Downtown Branch",
//       date: "Oct 24, 2023",
//       time: "10:42 AM",
//       category: "Food & Drink",
//       amount: -5.4,
//       icon: "Coffee",
//       color: "orange",
//     },
//     {
//       id: 2,
//       merchant: "Netflix Subscription",
//       location: "Monthly Plan",
//       date: "Oct 23, 2023",
//       time: "Auto-Debit",
//       category: "Entertainment",
//       amount: -15.99,
//       icon: "Movie",
//       color: "red",
//     },
//     {
//       id: 3,
//       merchant: "Shell Station",
//       location: "Gas Refill",
//       date: "Oct 22, 2023",
//       time: "06:15 PM",
//       category: "Transport",
//       amount: -45.0,
//       icon: "Truck",
//       color: "blue",
//     },
//     {
//       id: 4,
//       merchant: "Whole Foods Market",
//       location: "Weekly Groceries",
//       date: "Oct 21, 2023",
//       time: "02:30 PM",
//       category: "Groceries",
//       amount: -124.5,
//       icon: "ShoppingBag",
//       color: "purple",
//     },
//     {
//       id: 5,
//       merchant: "Freelance Payment",
//       location: "Client: TechCorp",
//       date: "Oct 20, 2023",
//       time: "Direct Deposit",
//       category: "Income",
//       amount: 1200.0,
//       icon: "CreditCard",
//       color: "green",
//     },
//   ];

//   const handleEdit = (id: number) => console.log("Edit expense:", id);
//   const handleDelete = (id: number) => console.log("Delete expense:", id);

//   // --- Lucide Icon Renderer ---
//   const LucideIcon = ({
//     icon,
//     className = "",
//     size = 18,
//   }: {
//     icon: keyof typeof LucideIcons;
//     className?: string;
//     size?: number;
//   }) => {
//     const IconComponent = LucideIcons[icon];
//     if (!IconComponent) return null;
//     return <IconComponent className={className} size={size} />;
//   };

//   // --- StatCard Component ---
//   const StatCard = ({
//     title,
//     amount,
//     icon,
//     iconColor,
//     trend,
//     trendLabel,
//     showProgress,
//     progressPercent,
//   }: {
//     title: string;
//     amount: string;
//     icon: keyof typeof LucideIcons;
//     iconColor: string;
//     trend?: string;
//     trendLabel?: string;
//     showProgress?: boolean;
//     progressPercent?: number;
//   }) => (
//     <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
//       <div className="flex items-center justify-between">
//         <p className="text-sm font-medium text-muted-foreground">{title}</p>
//         <span
//           className={`flex size-8 items-center justify-center rounded-full bg-${iconColor}-100 dark:bg-${iconColor}-900/20 text-${iconColor}-600 dark:text-${iconColor}-400`}
//         >
//           <LucideIcon icon={icon} />
//         </span>
//       </div>
//       <p className="mt-4 text-3xl font-bold text-foreground">{amount}</p>
//       {showProgress ? (
//         <div className="mt-2 w-full rounded-full bg-muted h-1.5">
//           <div
//             className="bg-primary h-1.5 rounded-full"
//             style={{ width: `${progressPercent}%` }}
//           />
//         </div>
//       ) : (
//         trend && (
//           <div className="mt-2 flex items-center text-sm">
//             <span
//               className={`font-medium ${
//                 trend.startsWith("+") ? "text-red-500" : "text-green-500"
//               }`}
//             >
//               {trend}
//             </span>
//             <span className="ml-2 text-muted-foreground">{trendLabel}</span>
//           </div>
//         )
//       )}
//     </div>
//   );

  
//   const ExpenseRow = ({ expense }: { expense: (typeof expensesData)[0] }) => {
//     const colorClasses = {
//       orange:
//         "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
//       red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
//       blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
//       purple:
//         "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
//       green:
//         "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
//     };
//     const badgeColors = {
//       orange:
//         "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
//       red: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
//       blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
//       purple:
//         "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
//       green:
//         "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
//     };

//     return (
//       <tr className="group hover:bg-muted/50 transition-colors">
//         <td className="whitespace-nowrap px-6 py-4">
//           <div className="flex items-center gap-4">
//             <div
//               className={`flex size-10 shrink-0 items-center justify-center rounded-full ${colorClasses[expense.color as keyof typeof colorClasses]}`}
//             >
//               <LucideIcon icon={expense.icon as keyof typeof LucideIcons} />
//             </div>
//             <div>
//               <p className="font-semibold text-foreground">
//                 {expense.merchant}
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 {expense.location}
//               </p>
//             </div>
//           </div>
//         </td>
//         <td className="whitespace-nowrap px-6 py-4 text-foreground">
//           <p>{expense.date}</p>
//           <p className="text-xs text-muted-foreground">{expense.time}</p>
//         </td>
//         <td className="whitespace-nowrap px-6 py-4">
//           <span
//             className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeColors[expense.color as keyof typeof badgeColors]}`}
//           >
//             {expense.category}
//           </span>
//         </td>
//         <td className="whitespace-nowrap px-6 py-4 text-right">
//           <span
//             className={`font-bold ${
//               expense.amount > 0
//                 ? "text-green-600 dark:text-green-400"
//                 : "text-foreground"
//             }`}
//           >
//             {expense.amount > 0 ? "+" : ""}$
//             {Math.abs(expense.amount).toFixed(2)}
//           </span>
//         </td>
//         <td className="whitespace-nowrap px-6 py-4 text-center">
//           <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//             <button
//               onClick={() => handleEdit(expense.id)}
//               className="p-1 text-muted-foreground hover:text-primary transition-colors"
//             >
//               <LucideIcon icon="Edit2" className="text-[20px]" />
//             </button>
//             <button
//               onClick={() => handleDelete(expense.id)}
//               className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
//             >
//               <LucideIcon icon="Trash2" className="text-[20px]" />
//             </button>
//           </div>
//         </td>
//       </tr>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-background text-foreground antialiased flex flex-col">
//       <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto w-full">
//         <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//           <div className="flex justify-between items-center w-full">
//             <div>
//               {" "}
//               <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
//                 My Expenses
//               </h2>
//               <p className="mt-2 text-base text-muted-foreground">
//                 Track your daily spending and monitor financial health.
//               </p>
//             </div>
//             <button className="hidden sm:flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
//               <LucideIcon icon="Plus" className="text-[18px]" />
//               <span>New Expense</span>
//             </button>
//           </div>
//           <button className="flex sm:hidden w-full h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">
//             <LucideIcon icon="Plus" className="text-[18px]" />
//             <span>Add Expense</span>
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
//           <StatCard
//             title="Total Spent"
//             amount="$2,450.00"
//             icon="TrendingUp"
//             iconColor="red"
//             trend="+12%"
//             trendLabel="vs last month"
//           />
//           <StatCard
//             title="Monthly Budget"
//             amount="$3,000.00"
//             icon="Bank"
//             iconColor="blue"
//             showProgress
//             progressPercent={81}
//           />
//           <StatCard
//             title="Remaining"
//             amount="$550.00"
//             icon="PiggyBank"
//             iconColor="green"
//             trendLabel="Roughly $18/day left"
//           />
//         </div>

//         {/* Expense Table */}
//         <div className="overflow-hidden rounded-xl bg-card shadow-sm border border-border">
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-left text-sm text-muted-foreground">
//               <thead className="bg-muted text-xs uppercase font-semibold text-foreground">
//                 <tr>
//                   <th className="px-6 py-4">Merchant</th>
//                   <th className="px-6 py-4">Date</th>
//                   <th className="px-6 py-4">Category</th>
//                   <th className="px-6 py-4 text-right">Amount</th>
//                   <th className="px-6 py-4 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-border">
//                 {expensesData.map((expense) => (
//                   <ExpenseRow key={expense.id} expense={expense} />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }



export default function ExpenseTrackerLandingPage() {
  const features = [
    {
      title: "Track every expense",
      description:
        "Log daily spending in seconds and keep all your transactions organized in one place.",
      icon: "💸",
    },
    {
      title: "Smart insights",
      description:
        "See where your money goes with simple charts, trends, and monthly summaries.",
      icon: "📊",
    },
    {
      title: "Budget with confidence",
      description:
        "Set category budgets and get a clear picture before you overspend.",
      icon: "🎯",
    },
  ];

  const stats = [
    { label: "Expenses managed", value: "50K+" },
    { label: "Active users", value: "10K+" },
    { label: "Money saved", value: "$1.2M+" },
  ];

  const steps = [
    "Add your income and expenses",
    "Organize spending by category",
    "View reports and stay on budget",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-transparent" />
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute top-24 right-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/30">
                ET
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide">
                  ExpenseFlow
                </p>
                <p className="text-xs text-slate-400">
                  Personal expense tracker
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
              <a href="#features" className="hover:text-white transition">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-white transition">
                How it works
              </a>
              <a href="#pricing" className="hover:text-white transition">
                Pricing
              </a>
            </nav>

            <button className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]">
              Get Started
            </button>
          </header>

          <div className="grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-24">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Manage your money with clarity
              </div>

              <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                The easiest way to track expenses and stay in control of your
                budget.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                ExpenseFlow helps you record spending, monitor categories, and
                understand your financial habits with a clean and simple
                dashboard.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button className="rounded-2xl bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5">
                  Start Tracking Free
                </button>
                <button className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10">
                  Watch Demo
                </button>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur">
                <div className="rounded-[1.5rem] bg-slate-900 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Total balance</p>
                      <h2 className="mt-1 text-3xl font-bold">$8,420.50</h2>
                    </div>
                    <div className="rounded-2xl bg-emerald-400/15 px-4 py-2 text-sm font-medium text-emerald-300">
                      +12.4% this month
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-slate-800 p-4">
                      <p className="text-sm text-slate-400">Income</p>
                      <p className="mt-2 text-xl font-semibold">$4,500</p>
                    </div>
                    <div className="rounded-2xl bg-slate-800 p-4">
                      <p className="text-sm text-slate-400">Expenses</p>
                      <p className="mt-2 text-xl font-semibold">$1,280</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl bg-slate-800 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="font-semibold">Top categories</p>
                      <p className="text-sm text-slate-400">March</p>
                    </div>

                    <div className="space-y-4">
                      {[
                        { name: "Food", amount: "$420", width: "w-[82%]" },
                        { name: "Transport", amount: "$210", width: "w-[54%]" },
                        { name: "Shopping", amount: "$310", width: "w-[68%]" },
                      ].map((item) => (
                        <div key={item.name}>
                          <div className="mb-2 flex justify-between text-sm">
                            <span className="text-slate-300">{item.name}</span>
                            <span className="text-slate-400">
                              {item.amount}
                            </span>
                          </div>
                          <div className="h-3 rounded-full bg-slate-700">
                            <div
                              className={`h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 ${item.width}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl border border-emerald-400/15 bg-emerald-400/10 p-4">
                    <p className="text-sm text-emerald-300">Budget alert</p>
                    <p className="mt-1 text-sm text-slate-200">
                      You are close to your food budget limit this month.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 hidden rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur md:block">
                <p className="text-sm text-slate-300">Weekly savings</p>
                <p className="mt-1 text-2xl font-bold">$185</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Features
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Everything you need to manage personal finances
          </h2>
          <p className="mt-4 text-slate-400">
            Built for simplicity, speed, and better daily money decisions.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-1"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-6 py-8 lg:px-8"
      >
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Start in minutes and track smarter every day
            </h2>
            <p className="mt-4 max-w-xl text-slate-400">
              No complex setup. Just add your records, review insights, and
              improve your spending habits over time.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-3xl bg-slate-900/70 p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 font-bold text-slate-950">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{step}</h3>
                  <p className="mt-1 text-slate-400">
                    Keep your financial data structured and easy to understand
                    with a clean workflow.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 p-8 text-center md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Pricing
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Start free and upgrade when you grow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Perfect for students, freelancers, and anyone who wants a better
            grip on everyday spending.
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-black/20">
            <p className="text-sm text-slate-400">Free plan</p>
            <div className="mt-3 flex items-end justify-center gap-2">
              <span className="text-5xl font-bold">$0</span>
              <span className="pb-2 text-slate-400">/month</span>
            </div>
            <div className="mt-6 space-y-3 text-left text-slate-300">
              <p>✓ Unlimited expense entries</p>
              <p>✓ Category-wise reports</p>
              <p>✓ Monthly budget tracking</p>
              <p>✓ Simple analytics dashboard</p>
            </div>
            <button className="mt-8 w-full rounded-2xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.01]">
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
        © 2026 ExpenseFlow. Built to make money management simple.
      </footer>
    </div>
  );
}
