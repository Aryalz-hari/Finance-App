'use client'

import Image from "next/image";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types";

import Header from "./_components/header";
import LandingPage from "./_components/hero";

export default function Home() {
  const { user } = useUser();

  if (user) {
    redirect("/dashboard");
  }


  return (
    <>
      <Header />
      <div>
        <LandingPage />
      </div>
    </>
  );
}
