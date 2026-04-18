import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./global.css";
import { ClerkProvider, SignInButton } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Finance App",
  description: "Expense and Budget Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${jost.variable} font-sans antialiased`}>
          <Toaster richColors/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );}
