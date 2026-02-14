import Image from "next/image";

import React from "react";
import Header from "./_components/header";
import LandingPage from "./_components/hero";

export default function Home() {
  return (
    <>
      <Header />
      <div>
        <LandingPage />
      </div>
    </>
  );
}
