"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbconfig";
import { budgets } from "@/utils/schema";
import { toast } from "sonner"; // Optional: for notifications

export default function CreateBudget({
  refreshData,
}: {
  refreshData: () => void;
}) {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { user } = useUser();

  const onCreateBudget = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) return;

    try {
      const result = await db
        .insert(budgets)
        .values({
          name: name,
          amount: amount,
          createdBy:user?.primaryEmailAddress?.emailAddress,
          
        })
        .returning({ insertedId: budgets.id });

      if (result) {
        toast("Budget Created Successfully!");
      }
    } catch (error) {
      console.error("Failed to create budget:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#14f1b2] px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-[#10d49b] sm:w-auto sm:rounded-2xl">
          <span className="text-lg leading-none">+</span>
          Add Budget
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
          <DialogDescription className="text-slate-400">
            Set a limit for a new category.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-slate-300">
              Budget Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. Home Decor"
              className="bg-slate-950 border-slate-800 text-white"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount" className="text-slate-300">
              Amount (Nrs)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="500"
              className="bg-slate-950 border-slate-800 text-white"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            {/* <button
              disabled={!(name && amount)}
              onClick={onCreateBudget}
              className="w-full rounded-xl bg-[#14f1b2] px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-[#10d49b] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Budget
            </button> */}
            <Button
              disabled={!(name && amount)}
              onClick={onCreateBudget}
              className="w-full rounded-xl bg-[#14f1b2] px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-[#10d49b] disabled:opacity-50 disabled:cursor-not-allowed"
            > Create Budget</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
