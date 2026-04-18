"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./_components/sidebar";
import DashboardHeader from "./_components/header"; 
import { useUser } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types";
import { db } from "@/utils/dbconfig";
import { budgets } from "@/utils/schema";
import { useRouter } from "next/navigation";
import { eq } from "drizzle-orm";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {user}=useUser();
  const router= useRouter();
useEffect(()=>{
user&&checkUserBudgets();
},[user])

  
  const checkUserBudgets = async () => {
  const result = await db
    .select()
    .from(budgets)
    .where(eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

  console.log(result);

  if (result?.length === 0) {
    router.replace("/dashboard/budgets");
  }
};

  return (
    <div className="flex h-screen overflow-hidden bg-[#020817]">
      {/* 1. Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden md:block w-64 flex-shrink-0 border-r border-slate-800 bg-[#020817]">
        <Sidebar />
      </aside>

      {/* 2. Mobile Sidebar Drawer (Visible only when open on small screens) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Dark backdrop overlay - clicking it closes the menu */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sliding Sidebar */}
          <aside className="relative w-64 bg-[#020817] border-r border-slate-800 flex-shrink-0 shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Pass the close function so we can add an 'X' button inside the sidebar */}
            <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Pass the open function to the Header */}
        <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
