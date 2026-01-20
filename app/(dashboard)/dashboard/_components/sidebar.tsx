import React from 'react'
import Image from 'next/image'
import { LayoutDashboard, Receipt, PiggyBank, Menu } from "lucide-react";
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: <LayoutDashboard />,
    href: "/#",
  },
  {
    id: 2,
    title: "Expenses",
    icon: <Receipt/>,
    href: "/#",
  },
  {
    id: 3,
    title: "Budgets",
    icon: <PiggyBank />,
    href: "/#",
  },
];


export default function Sidebar() {
  return (
    <div className="h-screen shadow-sm ">
      <div className=" p-2 flex items-center  border-b border-white/10">
        <Image src="/logo.svg" width={40} height={40} alt="logo"></Image>
        <span className="ml-2 text-white font-jost">Finance App</span>
      </div>
      <div className="flex flex-col p-2 ml-2  mt-2 gap-3 ">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors"
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
      <div className=" flex items-center gap-2 fixed bottom-10 p-2 ml-2 text-gray-300 ">
        
          <UserButton />
        Profile
      </div>
    </div>
  );
}
