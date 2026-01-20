"use client"

import { Button } from "@/components/ui/button";
import { navigate } from "next/dist/client/components/segment-cache/navigation";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types";

export type AuthProps = {
  user: UserResource | null | undefined;
  isSignedIn: boolean | undefined;
};

export default function Header() {
    const router = useRouter();
  const { user, isSignedIn} = useUser();
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
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Button
            onClick={() => router.push("/sign-in")}
            className="cursor-pointer bg-green-500 hover:bg-green-600 hover:text-white text-white shadow-xl"
            variant="outline"
          >
            Get Started
          </Button>
        )}
      </div>
    </div>
  );
}
