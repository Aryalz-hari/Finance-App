"use client"

// import React from 'react'

// export default function Dashboard() {

//   return (
//     <div  className=''>Dashboard</div>
//   )
// }

import { Wallet, TrendingUp, TrendingDown, Target } from "lucide-react";

export default function Dashboard() {
  const summaryCards = [
    {
      title: "Balance",
      value: "$5654.01",
      subtitle: "Current month",
      extra: "↑ 12.5% from last month",
      icon: Wallet,
      iconWrapper: "bg-emerald-500/15 text-emerald-400",
      extraColor: "text-emerald-400",
    },
    {
      title: "Total Income",
      value: "$6300.00",
      subtitle: "This month",
      extra: "",
      icon: TrendingUp,
      iconWrapper: "bg-emerald-500/15 text-emerald-400",
      extraColor: "text-slate-400",
    },
    {
      title: "Total Expenses",
      value: "$645.99",
      subtitle: "This month",
      extra: "",
      icon: TrendingDown,
      iconWrapper: "bg-red-500/15 text-red-400",
      extraColor: "text-slate-400",
    },
    {
      title: "Budget Remaining",
      value: "$854.01",
      subtitle: "of $1500.00 total",
      extra: "",
      icon: Target,
      iconWrapper: "bg-emerald-500/15 text-emerald-400",
      extraColor: "text-slate-400",
    },
  ];

  const trendLabels = [
    "Dec 30",
    "Dec 31",
    "Jan 01",
    "Jan 02",
    "Jan 03",
    "Jan 04",
    "Jan 05",
  ];
  const incomePoints = [30, 120, 5400, 700, 40, 20, 15];
  const expensePoints = [40, 55, 35, 90, 140, 110, 105];
  const maxY = 6000;

  const categoryItems = [
    { name: "Food & Dining", value: 37, color: "#22c55e" },
    { name: "Transportation", value: 8, color: "#3b82f6" },
    { name: "Entertainment", value: 4, color: "#a855f7" },
    { name: "Utilities", value: 14, color: "#f59e0b" },
    { name: "Health", value: 7, color: "#ef4444" },
    { name: "Education", value: 30, color: "#06b6d4" },
  ];

  const totalCategoryValue = categoryItems.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  const createLinePath = (values:number[]) => {
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

  const createAreaPath = (values:number[]) => {
    const line = createLinePath(values);
    return `${line} L100,100 L0,100 Z`;
  };

  let cumulative = 0;
  const donutSegments = categoryItems.map((item) => {
    const start = cumulative / totalCategoryValue;
    cumulative += item.value;
    const end = cumulative / totalCategoryValue;

    const polarToCartesian = (cx:number, cy:number, r:number, angle:number) => {
      const radians = ((angle - 90) * Math.PI) / 180;
      return {
        x: cx + r * Math.cos(radians),
        y: cy + r * Math.sin(radians),
      };
    };

    const startAngle = start * 360;
    const endAngle = end * 360;
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
  });

  return (
    <main className="min-h-screen bg-[#020817] px-3 py-4 text-white sm:px-4 sm:py-5 md:px-6 md:py-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-400 sm:text-base">
            Track your financial overview
          </p>
        </div>

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
                    <p className="mt-1 text-sm text-slate-500">
                      {card.subtitle}
                    </p>
                    {card.extra ? (
                      <p
                        className={`mt-2 text-sm font-semibold ${card.extraColor}`}
                      >
                        {card.extra}
                      </p>
                    ) : null}
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

        <section className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-white">Spending Trend</h2>

            <div className="mt-6 overflow-x-auto">
              <div className="min-w-[680px]">
                <div className="relative h-[260px] sm:h-[300px]">
                  {[0, 1500, 3000, 4500, 6000].reverse().map((tick) => {
                    const top = `${100 - (tick / maxY) * 100}%`;
                    return (
                      <div
                        key={tick}
                        className="absolute left-0 right-0 border-t border-dashed border-slate-800"
                        style={{ top }}
                      >
                        <span className="absolute -top-3 left-0 bg-slate-900/70 pr-2 text-xs text-slate-500">
                          ${tick}
                        </span>
                      </div>
                    );
                  })}

                  <div className="absolute inset-x-0 bottom-6 top-0 grid grid-cols-7">
                    {trendLabels.map((label) => (
                      <div
                        key={label}
                        className="relative border-l border-dashed border-slate-800 last:border-r"
                      >
                        <span className="absolute bottom-[-28px] left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-slate-500">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-x-10 bottom-6 top-0 h-[calc(100%-24px)] w-[calc(100%-40px)]"
                  >
                    <defs>
                      <linearGradient
                        id="incomeFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#14f1b2"
                          stopOpacity="0.35"
                        />
                        <stop
                          offset="100%"
                          stopColor="#14f1b2"
                          stopOpacity="0.02"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      d={createAreaPath(incomePoints)}
                      fill="url(#incomeFill)"
                    />
                    <path
                      d={createLinePath(incomePoints)}
                      fill="none"
                      stroke="#14f1b2"
                      strokeWidth="0.7"
                    />
                    <path
                      d={createLinePath(expensePoints)}
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="0.7"
                    />
                  </svg>
                </div>

                <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <span>Expenses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span>Income</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-white">
              Spending by Category
            </h2>

            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="relative h-[260px] w-[260px] sm:h-[290px] sm:w-[290px]">
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full drop-shadow-[0_0_20px_rgba(0,0,0,0.25)]"
                >
                  {donutSegments.map((segment) => (
                    <path
                      key={segment.name}
                      d={segment.d}
                      fill={segment.color}
                      stroke="#e2e8f0"
                      strokeWidth="0.6"
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-slate-900/95 shadow-inner sm:h-28 sm:w-28" />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm text-slate-400">
                {categoryItems.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
