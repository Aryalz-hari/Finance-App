"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";
import {
  editBudgetAction,
  deleteBudgetAction,
} from "../_actions/budgetActions"; // Adjust path if needed

export default function EditDeleteBudget({
  budget,
}: {
  budget: { id: number; name: string; total: number };
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(budget.name);
  const [amount, setAmount] = useState(budget.total.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this budget? All expenses attached to it will also be permanently deleted!",
    );
    if (!confirmDelete) return;

    const res = await deleteBudgetAction(budget.id);
    if (res.success) {
      toast.success("Budget deleted!");

      // TWEAK APPLIED: Just refresh the page so the budget disappears seamlessly
      router.refresh();
    } else {
      toast.error("Failed to delete budget.");
    }
  };

  const handleEdit = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setIsSubmitting(true);
    const res = await editBudgetAction(budget.id, name, Number(amount));

    // STRICT LOGIC: Checks for specific error from backend first
    if (res.error) {
      toast.error(res.error);
      setIsSubmitting(false);
      return; // Stops function so the modal stays open for them to fix it
    }

    if (res.success) {
      toast.success("Budget updated!");
      setIsEditing(false);
      router.refresh();
    } else {
      toast.error("Failed to update budget.");
    }

    setIsSubmitting(false);
  };

  const openEditModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  const closeEditModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(false);
  };

  const modalContent =
    isEditing && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6">
            <div
              className="w-full max-w-md flex flex-col rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-5 text-xl font-bold text-white">Edit Budget</h2>

              <div className="flex flex-col gap-5">
                <div className="space-y-2">
                  <Label htmlFor="edit-name" className="text-slate-300">
                    Budget Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border-slate-800 text-white focus-visible:ring-[#14f1b2]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-amount" className="text-slate-300">
                    Amount (NRs)
                  </Label>
                  <Input
                    id="edit-amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-950 border-slate-800 text-white focus-visible:ring-[#14f1b2]"
                  />
                </div>

                {/* Safely contained buttons */}
                <div className="mt-4 flex w-full flex-col-reverse gap-3 sm:flex-row">
                  <Button
                    onClick={closeEditModal}
                    variant="outline"
                    type="button"
                    className="w-full sm:w-1/2 bg-transparent text-slate-300 hover:text-white border-slate-700 hover:bg-slate-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleEdit}
                    type="button"
                    disabled={isSubmitting || !name || !amount}
                    className="w-full sm:w-1/2 bg-[#14f1b2] text-slate-900 hover:bg-[#10d49b] disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div
        className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <button
          onClick={openEditModal}
          className="p-2 text-slate-400 hover:text-[#14f1b2] hover:bg-slate-800 rounded-full transition-colors"
          title="Edit Budget"
          type="button"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-full transition-colors"
          title="Delete Budget"
          type="button"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {modalContent}
    </>
  );
}
