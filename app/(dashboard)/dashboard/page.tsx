import { Wallet, TrendingUp, TrendingDown, Target } from "lucide-react";
import { db } from "@/utils/dbconfig";
import { budgets, expenses } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // 1. Fetch logged-in user and protect the route
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const userEmail = user?.primaryEmailAddress?.emailAddress;

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

  // 2. Fetch ONLY this user's budgets
  const budgetsData = await db
    .select()
    .from(budgets)
    .where(eq(budgets.createdBy, userEmail));

  // 3. Fetch ONLY expenses tied to this user's budgets
  const expensesData = await db
    .select({
      id: expenses.id,
      amount: expenses.amount,
      createdAt: expenses.createdAt,
      budgetName: budgets.name,
    })
    .from(expenses)
    .innerJoin(budgets, eq(expenses.budgetId, budgets.id))
    .where(eq(budgets.createdBy, userEmail))
    .orderBy(desc(expenses.id));

  // 4. Calculate Summary Card Totals
  const totalBudget = budgetsData.reduce((sum, b) => sum + Number(b.amount), 0);
  const totalExpenses = expensesData.reduce(
    (sum, e) => sum + Number(e.amount),
    0,
  );
  const currentBalance = totalBudget - totalExpenses;

  const summaryCards = [
    {
      title: "Balance",
      value: `NRs ${currentBalance.toFixed(2)}`,
      subtitle: "Remaining funds",
      icon: Wallet,
      iconWrapper: "bg-emerald-500/15 text-emerald-400",
    },
    {
      title: "Total Budget",
      value: `NRs ${totalBudget.toFixed(2)}`,
      subtitle: "Allocated this month",
      icon: TrendingUp,
      iconWrapper: "bg-emerald-500/15 text-emerald-400",
    },
    {
      title: "Total Expenses",
      value: `NRs ${totalExpenses.toFixed(2)}`,
      subtitle: "Spent this month",
      icon: TrendingDown,
      iconWrapper: "bg-rose-500/15 text-rose-400",
    },
    {
      title: "Budget Status",
      value: `NRs ${currentBalance.toFixed(2)}`,
      subtitle: `of NRs ${totalBudget.toFixed(2)} total`,
      icon: Target,
      iconWrapper: "bg-emerald-500/15 text-emerald-400",
    },
  ];

  // 5. Process Trend Chart Data (Continuous 7-Day Timeline)
  const expensesByDate: Record<string, number> = {};

  // Step A: Pre-fill the last 7 days with 0 so the timeline never breaks
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    expensesByDate[dateStr] = 0;
  }

  // Step B: Accurately map real expenses into those 7 buckets
  expensesData.forEach((exp) => {
    const d = new Date(exp.createdAt);
    if (!isNaN(d.getTime())) {
      const dateStr = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      // Only add to the total if it happened within the last 7 days
      if (expensesByDate[dateStr] !== undefined) {
        expensesByDate[dateStr] += Number(exp.amount);
      }
    }
  });

  const chartData = Object.entries(expensesByDate).map(([date, amount]) => ({
    date,
    amount,
  }));

  const trendLabels = chartData.map((d) => d.date);
  const expensePoints = chartData.map((d) => d.amount);

  const maxExpenseValue = Math.max(...expensePoints);
  // Ensure we have a Y-axis ceiling even if expenses are 0
  const maxY = maxExpenseValue > 0 ? maxExpenseValue * 1.2 : 1000;

  // 6. Process Category Donut Chart Data
  const categoryMap: Record<string, number> = {};
  expensesData.forEach((exp) => {
    const name = exp.budgetName || "Uncategorized";
    categoryMap[name] = (categoryMap[name] || 0) + Number(exp.amount);
  });

  const presetColors = [
    "#22c55e",
    "#3b82f6",
    "#a855f7",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#ec4899",
  ];
  const categoryItems = Object.entries(categoryMap)
    .filter(([_, value]) => value > 0)
    .map(([name, value], index) => ({
      name,
      value,
      color: presetColors[index % presetColors.length],
    }));

  const totalCategoryValue = categoryItems.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  // SVG Path Generators for Line Chart
  const createLinePath = (values: number[]) => {
    if (values.length === 0) return "";
    const width = 100;
    const height = 100;
    return values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * width;
        const y = height - (value / maxY) * height;
        return `${index === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");
  };

  const createAreaPath = (values: number[]) => {
    if (values.length === 0) return "";
    const line = createLinePath(values);
    return `${line} L100,100 L0,100 Z`;
  };

  // SVG Path Generator for Donut Chart
  let cumulative = 0;
  const donutSegments =
    totalCategoryValue > 0
      ? categoryItems.map((item) => {
          const start = cumulative / totalCategoryValue;
          cumulative += item.value;
          const end = cumulative / totalCategoryValue;

          const polarToCartesian = (
            cx: number,
            cy: number,
            r: number,
            angle: number,
          ) => {
            const radians = ((angle - 90) * Math.PI) / 180;
            return {
              x: cx + r * Math.cos(radians),
              y: cy + r * Math.sin(radians),
            };
          };

          const startAngle = start * 360;
          const endAngle = end === 1 && start === 0 ? 359.9 : end * 360;
          const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

          const outerStart = polarToCartesian(50, 50, 34, endAngle);
          const outerEnd = polarToCartesian(50, 50, 34, startAngle);
          const innerStart = polarToCartesian(50, 50, 20, endAngle);
          const innerEnd = polarToCartesian(50, 50, 20, startAngle);

          const d = [
            `M ${outerStart.x} ${outerStart.y}`,
            `A 34 34 0 ${largeArcFlag} 0 ${outerEnd.x} ${outerEnd.y}`,
            `L ${innerEnd.x} ${innerEnd.y}`,
            `A 20 20 0 ${largeArcFlag} 1 ${innerStart.x} ${innerStart.y}`,
            "Z",
          ].join(" ");

          return { ...item, d };
        })
      : [];

  return (
    <div className="px-4 py-6 sm:px-6 md:px-8 max-w-[1400px] mx-auto w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-400 sm:text-base">
          Track your financial overview
        </p>
      </div>

      {/* Summary Cards */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_0_0_1px_rgba(15,23,42,0.3)] backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    {card.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                    {card.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{card.subtitle}</p>
                </div>
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.iconWrapper}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Charts Section */}
      <section className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        {/* Spending Trend Chart */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 w-full overflow-hidden">
          <h2 className="text-xl font-semibold text-white">
            Spending Trend (Last 7 Days)
          </h2>

          <div className="mt-6 w-full pb-4 overflow-x-auto">
            <div className="w-full min-w-[500px]">
              <div className="relative h-[240px] sm:h-[320px] mt-4">
                {/* Y-Axis Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].reverse().map((multiplier) => {
                  const tick = Math.round(maxY * multiplier);
                  const top = `${100 - (tick / Math.max(maxY, 1)) * 100}%`;
                  return (
                    <div
                      key={tick}
                      className="absolute left-0 right-0 border-t border-dashed border-slate-800"
                      style={{ top }}
                    >
                      <span className="absolute -top-3 left-0 bg-slate-900/70 pr-2 text-[10px] sm:text-xs text-slate-500">
                        {tick > 0 ? `NRs ${tick}` : "0"}
                      </span>
                    </div>
                  );
                })}

                {/* X-Axis Labels & Vertical Lines */}
                <div className="absolute inset-x-0 bottom-6 top-0">
                  {trendLabels.map((label, index) => {
                    const leftPosition =
                      trendLabels.length > 1
                        ? `${(index / (trendLabels.length - 1)) * 100}%`
                        : "0%";

                    return (
                      <div
                        key={index}
                        className="absolute top-0 bottom-0 border-l border-dashed border-slate-800/50"
                        style={{ left: leftPosition }}
                      >
                        <span className="absolute bottom-[-28px] left-0 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-xs text-slate-500">
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* SVG Lines */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 bottom-6 top-0 h-[calc(100%-24px)] w-full overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="expenseFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#ef4444"
                        stopOpacity="0.25"
                      />
                      <stop
                        offset="100%"
                        stopColor="#ef4444"
                        stopOpacity="0.02"
                      />
                    </linearGradient>
                  </defs>

                  {chartData.length > 0 && (
                    <>
                      <path
                        d={createAreaPath(expensePoints)}
                        fill="url(#expenseFill)"
                      />
                      <path
                        d={createLinePath(expensePoints)}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="0.7"
                      />
                    </>
                  )}
                </svg>

                {/* Data Points and Value Labels (NEW) */}
                <div className="absolute inset-x-0 bottom-6 top-0 pointer-events-none">
                  {chartData.map((data, index) => {
                    const leftPosition =
                      chartData.length > 1
                        ? `${(index / (chartData.length - 1)) * 100}%`
                        : "0%";
                    const bottomPosition = `${(data.amount / Math.max(maxY, 1)) * 100}%`;

                    return (
                      <div
                        key={`point-${index}`}
                        className="absolute w-2.5 h-2.5 bg-rose-500 border-2 border-slate-900 rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                        style={{ left: leftPosition, bottom: bottomPosition }}
                      >
                        {/* The Expense Amount Label */}
                        <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] sm:text-[10px] font-semibold text-slate-200 bg-slate-800/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-slate-700/50">
                          NRs {data.amount}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-10 flex items-center justify-center gap-6 text-xs sm:text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500" />
                  <span>Expenses</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Donut Chart */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 w-full flex flex-col">
          <h2 className="text-xl font-semibold text-white">
            Spending by Category
          </h2>

          <div className="mt-8 flex flex-col flex-1 items-center justify-center">
            {totalCategoryValue === 0 ? (
              <div className="text-slate-500 mb-8 italic">
                No expense data yet. Start adding expenses!
              </div>
            ) : (
              <div className="relative h-[220px] w-[220px] sm:h-[290px] sm:w-[290px]">
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full drop-shadow-[0_0_20px_rgba(0,0,0,0.25)]"
                >
                  {donutSegments.map((segment) => (
                    <path
                      key={segment.name}
                      d={segment.d}
                      fill={segment.color}
                      stroke="#0f172a"
                      strokeWidth="1.2"
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-slate-900/95 shadow-inner sm:h-28 sm:w-28 flex flex-col items-center justify-center">
                    <span className="text-xs text-slate-500">Total Spent</span>
                    <span className="text-sm font-bold text-white">
                      NRs {totalCategoryValue}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {totalCategoryValue > 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-xs sm:text-sm text-slate-400">
                {categoryItems.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>
                      {item.name} (
                      {((item.value / totalCategoryValue) * 100).toFixed(0)}%)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
