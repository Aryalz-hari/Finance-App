import React from "react";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { Search, Menu } from "lucide-react";

// Add the prop type definition
export default function DashboardHeader({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  return (
    <header className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-slate-800 bg-[#020817]/95 backdrop-blur z-10 shrink-0">
      <div className="flex items-center flex-1 gap-4">
        {/* Attach the onClick event here */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-slate-400 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>


      </div>

      <div className="flex items-center gap-4">
        <UserButton />
      </div>
    </header>
  );
}
