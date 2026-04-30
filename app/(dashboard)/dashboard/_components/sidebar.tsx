"use client";

import React from "react";
import Image from "next/image";
import { LayoutDashboard, Receipt, PiggyBank, X } from "lucide-react"; // Import X icon
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const menuItems = [
  { id: 1, title: "Dashboard", icon: <LayoutDashboard />, href: "/dashboard" },
  { id: 2, title: "Expenses", icon: <Receipt />, href: "/dashboard/expenses" },
  { id: 3, title: "Budgets", icon: <PiggyBank />, href: "/dashboard/budgets" },
];

// Add onClose to the props
export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const path = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#020817] text-slate-300">
      {/* Logo Area updated with optional Close Button */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800 shrink-0">
        <div className="flex items-center">
          <Image src="/logo.svg" width={32} height={32} alt="logo" />
          <span className="ml-3 text-white font-semibold tracking-wide">
            Finance App
          </span>
        </div>

        {/* Render close button ONLY if onClose is provided (mobile view) */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 -mr-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = path === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose} // Auto-close sidebar when a link is clicked on mobile
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-emerald-500/15 text-emerald-400 font-medium border border-emerald-500/20"
                  : "border border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              {React.cloneElement(
                item.icon as React.ReactElement<{ className?: string }>,
                {
                  className: "w-5 h-5",
                },
              )}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 pb-10 border-t border-slate-800 shrink-0">
        <div className="flex items-center gap-3 px-3 py-2">
          <UserButton />
          <span className="text-sm font-medium text-slate-300">Profile</span>
        </div>
      </div>
    </div>
  );
}
