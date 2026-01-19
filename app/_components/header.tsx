import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="bg-blue-950 border-b border-white/10">
      <div className="flex items-center justify-between max-w-6xl mx-auto shadow-lg w-full py-1">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="inline mr-2"
          />
          <span className=" font-jost font-bold text-xl text-white">
            Finance App
          </span>
        </div>
        <Button
          className="cursor-pointer bg-green-500 hover:bg-green-600 hover:text-white text-white shadow-xl"
          variant="outline"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
