import { Wallet, TrendingUp, TrendingDown, Target } from "lucide-react";
import { db } from "@/utils/dbconfig";
import { budgets, expenses } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";

export default async function Dashboard() {
  // 1. Fetch raw data from the database
  const budgetsData = await db.select().from(budgets);
  const expensesData = await db
    .select({
      id: expenses.id,
      amount: expenses.amount,
      createdAt: expenses.createdAt,
      budgetName: budgets.name,
    })
    .from(expenses)
    .leftJoin(budgets, eq(expenses.budgetId, budgets.id))
    .orderBy(desc(expenses.id));

  // 2. Calculate Summary Card Totals
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
      extra: "",
      icon: Wallet,
      iconWrapper: "bg-emerald-500/15 text-emerald-400",
      extraColor: "text-emerald-400",
    },
    {
      title: "Total Budget",
      value: `NRs ${totalBudget.toFixed(2)}`,
      subtitle: "Allocated this month",
      extra: "",
      icon: TrendingUp,
      iconWrapper: "bg-emerald-500/15 text-emerald-400",
      extraColor: "text-slate-400",
    },
    {
      title: "Total Expenses",
      value: `NRs ${totalExpenses.toFixed(2)}`,
      subtitle: "Spent this month",
      extra: "",
      icon: TrendingDown,
      iconWrapper: "bg-rose-500/15 text-rose-400",
      extraColor: "text-slate-400",
    },
    {
      title: "Budget Status",
      value: `NRs ${currentBalance.toFixed(2)}`,
      subtitle: `of NRs ${totalBudget.toFixed(2)} total`,
      extra: "",
      icon: Target,
      iconWrapper: "bg-emerald-500/15 text-emerald-400",
      extraColor: "text-slate-400",
    },
  ];

  // 3. Process Trend Chart Data (Last 7 active days)
  const expensesByDate: Record<string, number> = {};

  expensesData.forEach((exp) => {
    // Extract short date (e.g., "Jan 5")
    const shortDate = exp.createdAt.split(",")[0] || "Unknown";
    expensesByDate[shortDate] =
      (expensesByDate[shortDate] || 0) + Number(exp.amount);
  });

  // Get the last 7 dates and reverse for chronological order
  const chartData = Object.entries(expensesByDate)
    .map(([date, amount]) => ({ date, amount }))
    .slice(0, 7)
    .reverse();

  // If no data exists, provide empty defaults
  const trendLabels =
    chartData.length > 0 ? chartData.map((d) => d.date) : ["No Data"];
  const expensePoints =
    chartData.length > 0 ? chartData.map((d) => d.amount) : [0];
  const incomePoints = trendLabels.map(() => 0); // Flat line since we don't track daily income yet

  const maxY = chartData.length > 0 ? Math.max(...expensePoints) * 1.2 : 1000; // 20% padding at the top

  // 4. Process Category Donut Chart Data (Grouped by Budget Name)
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
    .filter(([_, value]) => value > 0) // Only show categories with expenses
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
    if (values.length === 1)
      return `M0,${100 - (values[0] / maxY) * 100} L100,${100 - (values[0] / maxY) * 100}`;
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

          // If it's a single category taking up 100%, adjust angles slightly so the arc renders correctly
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
          <h2 className="text-xl font-semibold text-white">Spending Trend</h2>

          <div className="mt-6 w-full pb-4 overflow-x-auto">
            <div className="w-full min-w-[400px]">
              <div className="relative h-[220px] sm:h-[300px]">
                {/* Y-Axis Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].reverse().map((multiplier) => {
                  const tick = Math.round(maxY * multiplier);
                  const top = `${100 - (tick / maxY) * 100}%`;
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

                {/* X-Axis Labels */}
                <div className="absolute inset-x-0 bottom-6 top-0 flex justify-between">
                  {trendLabels.map((label, index) => (
                    <div
                      key={index}
                      className="relative border-l border-dashed border-slate-800 flex-1 last:border-r"
                    >
                      <span className="absolute bottom-[-28px] left-0 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-xs text-slate-500">
                        {label}
                      </span>
                    </div>
                  ))}
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

                  {/* Income Line - Flat since no DB incomes yet */}
                  <path
                    d={createLinePath(incomePoints)}
                    fill="none"
                    stroke="#14f1b2"
                    strokeWidth="0.7"
                    strokeDasharray="2,2"
                    opacity="0.3"
                  />
                </svg>
              </div>

              <div className="mt-6 flex items-center justify-center gap-6 text-xs sm:text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500" />
                  <span>Expenses</span>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span>Income (Not Tracked)</span>
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
                No expense data yet.
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
          </div>
        </div>
      </section>
    </div>
  );
}
