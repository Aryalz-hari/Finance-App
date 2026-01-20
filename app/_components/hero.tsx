import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen bg-blue-950 text-white border-b border-white/10 py-2">
        <main className="mt-20 max-w-7xl mx-auto px-8 pt-24 grid md:grid-cols-2 gap-16 items-center sm:mb-2 ">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Track your expenses.
              <br />
              Control your money.
            </h1>
            <p className="mt-6 text-lg text-[#caf0f8] max-w-lg">
              ExpenseFlow helps you monitor daily spending, analyze habits, and
              stay financially confident — all in one simple dashboard.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/sign-up"
                className="bg-green-500 hover:bg-green-600 border border-white/30 px-7 py-3 rounded-xl font-medium  transition"
              >
                Create Account
              </Link>
              <Link
                href="/sign-in"
                className="bg-white/10 px-7 py-3 rounded-xl font-medium hover:bg-white/20 transition"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-tr from-[#00b4d8] to-[#ade8f4] blur-3xl opacity-40 rounded-full" />
            <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-semibold mb-4">Monthly Overview</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span>Food</span>
                  <span>Rs 6,500</span>
                </li>
                <li className="flex justify-between">
                  <span>Transport</span>
                  <span>Rs 2,100</span>
                </li>
                <li className="flex justify-between">
                  <span>Shopping</span>
                  <span>Rs 4,300</span>
                </li>
                <li className="flex justify-between font-semibold text-[#90e0ef]">
                  <span>Total</span>
                  <span>Rs 12,900</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>

      <section className="bg-blue-950 lg:grid lg:h-screen lg:place-content-center dark:bg-gray-900">
        <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold  sm:text-5xl text-white">
              Understand user expenses and
              <strong className="text-green-500"> manage </strong>
              convinently
            </h1>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <Link
                href="/sign-in"
                className="bg-green-500 text-white hover:bg-green-600 border border-white/30 px-7 py-3 rounded-xl font-medium  transition"
              >
                Get Started
              </Link>
              <Link
                href="/"
                className="bg-white/10 text-white px-7 py-3 rounded-xl font-medium hover:bg-white/20 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <footer className=" pb-8 text-center text-sm text-[#caf0f8]">
          © {new Date().getFullYear()} ExpenseFlow. All rights reserved.
        </footer>
      </section>
    </>
  );
}
