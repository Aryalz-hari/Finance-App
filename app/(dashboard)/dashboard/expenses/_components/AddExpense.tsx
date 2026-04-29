"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { db } from "@/utils/dbconfig";
import { expenses } from "@/utils/schema";

// 1. Add budgetAmount and totalSpend to your props
export default function AddExpense({
  budgetId,
  budgetAmount,
  totalSpend,
}: {
  budgetId: number;
  budgetAmount: number;
  totalSpend: number;
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    const expenseAmount = Number(amount);

    // 2. Validate if the budget is already exhausted or if this expense exceeds the limit
    if (totalSpend >= budgetAmount) {
      toast.error("Budget limit reached! You cannot add more expenses.");
      return; // Stop the execution here
    }

    if (totalSpend + expenseAmount > budgetAmount) {
      toast.error(
        `Error: This expense exceeds your remaining budget of NRs ${budgetAmount - totalSpend}`,
      );
      return; // Stop the execution here
    }

    setIsSubmitting(true);
    try {
      const result = await db
        .insert(expenses)
        .values({
          name: name,
          amount: expenseAmount,
          budgetId: budgetId,
          createdAt: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        })
        .returning({ insertedId: expenses.id });

      if (result) {
        toast.success("Expense Added Successfully!");
        setName("");
        setAmount("");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to add expense:", error);
      toast.error("Error adding expense.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm sm:rounded-3xl sm:p-6">
      <h2 className="mb-4 text-lg font-bold text-white">Add New Expense</h2>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-slate-300">
            Expense Name
          </Label>
          <Input
            id="name"
            placeholder="e.g. Groceries"
            value={name}
            className="bg-slate-950 border-slate-800 text-white"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="amount" className="text-slate-300">
            Amount (NRs)
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="50"
            value={amount}
            className="bg-slate-950 border-slate-800 text-white"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Button
          disabled={
            !(name && amount) || isSubmitting || totalSpend >= budgetAmount
          }
          onClick={onSubmit}
          className="mt-2 w-full rounded-xl bg-[#14f1b2] px-5 py-2.5 font-semibold text-slate-900 transition hover:bg-[#10d49b] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding..." : "Add Expense"}
        </Button>
      </div>
    </div>
  );
}
