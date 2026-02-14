"use client";

import { useState } from "react";
import * as LucideIcons from "lucide-react";

export default function ExpensesListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const expensesData = [
    {
      id: 1,
      merchant: "Starbucks Coffee",
      location: "Downtown Branch",
      date: "Oct 24, 2023",
      time: "10:42 AM",
      category: "Food & Drink",
      amount: -5.4,
      icon: "Coffee",
      color: "orange",
    },
    {
      id: 2,
      merchant: "Netflix Subscription",
      location: "Monthly Plan",
      date: "Oct 23, 2023",
      time: "Auto-Debit",
      category: "Entertainment",
      amount: -15.99,
      icon: "Movie",
      color: "red",
    },
    {
      id: 3,
      merchant: "Shell Station",
      location: "Gas Refill",
      date: "Oct 22, 2023",
      time: "06:15 PM",
      category: "Transport",
      amount: -45.0,
      icon: "Truck",
      color: "blue",
    },
    {
      id: 4,
      merchant: "Whole Foods Market",
      location: "Weekly Groceries",
      date: "Oct 21, 2023",
      time: "02:30 PM",
      category: "Groceries",
      amount: -124.5,
      icon: "ShoppingBag",
      color: "purple",
    },
    {
      id: 5,
      merchant: "Freelance Payment",
      location: "Client: TechCorp",
      date: "Oct 20, 2023",
      time: "Direct Deposit",
      category: "Income",
      amount: 1200.0,
      icon: "CreditCard",
      color: "green",
    },
  ];

  const handleEdit = (id: number) => console.log("Edit expense:", id);
  const handleDelete = (id: number) => console.log("Delete expense:", id);

  // --- Lucide Icon Renderer ---
  const LucideIcon = ({
    icon,
    className = "",
    size = 18,
  }: {
    icon: keyof typeof LucideIcons;
    className?: string;
    size?: number;
  }) => {
    const IconComponent = LucideIcons[icon];
    if (!IconComponent) return null;
    return <IconComponent className={className} size={size} />;
  };

  // --- StatCard Component ---
  const StatCard = ({
    title,
    amount,
    icon,
    iconColor,
    trend,
    trendLabel,
    showProgress,
    progressPercent,
  }: {
    title: string;
    amount: string;
    icon: keyof typeof LucideIcons;
    iconColor: string;
    trend?: string;
    trendLabel?: string;
    showProgress?: boolean;
    progressPercent?: number;
  }) => (
    <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <span
          className={`flex size-8 items-center justify-center rounded-full bg-${iconColor}-100 dark:bg-${iconColor}-900/20 text-${iconColor}-600 dark:text-${iconColor}-400`}
        >
          <LucideIcon icon={icon} />
        </span>
      </div>
      <p className="mt-4 text-3xl font-bold text-foreground">{amount}</p>
      {showProgress ? (
        <div className="mt-2 w-full rounded-full bg-muted h-1.5">
          <div
            className="bg-primary h-1.5 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      ) : (
        trend && (
          <div className="mt-2 flex items-center text-sm">
            <span
              className={`font-medium ${
                trend.startsWith("+") ? "text-red-500" : "text-green-500"
              }`}
            >
              {trend}
            </span>
            <span className="ml-2 text-muted-foreground">{trendLabel}</span>
          </div>
        )
      )}
    </div>
  );

  
  const ExpenseRow = ({ expense }: { expense: (typeof expensesData)[0] }) => {
    const colorClasses = {
      orange:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
      red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      purple:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      green:
        "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    };
    const badgeColors = {
      orange:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
      red: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
      purple:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
      green:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    };

    return (
      <tr className="group hover:bg-muted/50 transition-colors">
        <td className="whitespace-nowrap px-6 py-4">
          <div className="flex items-center gap-4">
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-full ${colorClasses[expense.color as keyof typeof colorClasses]}`}
            >
              <LucideIcon icon={expense.icon as keyof typeof LucideIcons} />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {expense.merchant}
              </p>
              <p className="text-xs text-muted-foreground">
                {expense.location}
              </p>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-foreground">
          <p>{expense.date}</p>
          <p className="text-xs text-muted-foreground">{expense.time}</p>
        </td>
        <td className="whitespace-nowrap px-6 py-4">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeColors[expense.color as keyof typeof badgeColors]}`}
          >
            {expense.category}
          </span>
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-right">
          <span
            className={`font-bold ${
              expense.amount > 0
                ? "text-green-600 dark:text-green-400"
                : "text-foreground"
            }`}
          >
            {expense.amount > 0 ? "+" : ""}$
            {Math.abs(expense.amount).toFixed(2)}
          </span>
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-center">
          <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => handleEdit(expense.id)}
              className="p-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <LucideIcon icon="Edit2" className="text-[20px]" />
            </button>
            <button
              onClick={() => handleDelete(expense.id)}
              className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
            >
              <LucideIcon icon="Trash2" className="text-[20px]" />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased flex flex-col">
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto w-full">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex justify-between items-center w-full">
            <div>
              {" "}
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                My Expenses
              </h2>
              <p className="mt-2 text-base text-muted-foreground">
                Track your daily spending and monitor financial health.
              </p>
            </div>
            <button className="hidden sm:flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <LucideIcon icon="Plus" className="text-[18px]" />
              <span>New Expense</span>
            </button>
          </div>
          <button className="flex sm:hidden w-full h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">
            <LucideIcon icon="Plus" className="text-[18px]" />
            <span>Add Expense</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <StatCard
            title="Total Spent"
            amount="$2,450.00"
            icon="TrendingUp"
            iconColor="red"
            trend="+12%"
            trendLabel="vs last month"
          />
          <StatCard
            title="Monthly Budget"
            amount="$3,000.00"
            icon="Bank"
            iconColor="blue"
            showProgress
            progressPercent={81}
          />
          <StatCard
            title="Remaining"
            amount="$550.00"
            icon="PiggyBank"
            iconColor="green"
            trendLabel="Roughly $18/day left"
          />
        </div>

        {/* Expense Table */}
        <div className="overflow-hidden rounded-xl bg-card shadow-sm border border-border">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-muted-foreground">
              <thead className="bg-muted text-xs uppercase font-semibold text-foreground">
                <tr>
                  <th className="px-6 py-4">Merchant</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {expensesData.map((expense) => (
                  <ExpenseRow key={expense.id} expense={expense} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}



