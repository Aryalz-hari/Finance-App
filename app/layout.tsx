import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={`${jost.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
