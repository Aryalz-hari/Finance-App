


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
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 via-cyan-500/10 to-transparent" />
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute top-24 right-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">
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
              <div className="rounded-4xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur">
                <div className="rounded-3xl bg-slate-900 p-5">
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
                              className={`h-3 rounded-full bg-linear-to-r from-emerald-400 to-cyan-400 ${item.width}`}
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
        <div className="grid gap-10 rounded-4xl border border-white/10 bg-white/5 p-8 md:p-12 lg:grid-cols-2">
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
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-400 to-cyan-400 font-bold text-slate-950">
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

     

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
        © 2026 ExpenseFlow. Built to make money management simple.
      </footer>
    </div>
  );
}
