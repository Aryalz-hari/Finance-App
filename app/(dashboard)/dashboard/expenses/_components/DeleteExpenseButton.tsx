"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteExpenseAction } from "../_actions/expenseAction";

export default function DeleteExpenseButton({
  expenseId,
}: {
  expenseId: number;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?",
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    const res = await deleteExpenseAction(expenseId);

    if (res.success) {
      toast.success("Expense deleted successfully!");
    } else {
      toast.error("Failed to delete expense.");
    }
    setIsDeleting(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex items-center justify-end gap-1 ml-auto text-rose-500 hover:text-rose-400 font-medium transition-colors disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
      <span className="hover:cursor-pointer">{isDeleting ? "Deleting..." : "Delete"}</span>
    </button>
  );
}
