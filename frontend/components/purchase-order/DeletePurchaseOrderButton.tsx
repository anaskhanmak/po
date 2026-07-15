"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePurchaseOrder } from "@/lib/client/purchase-order";

interface Props {
  id: string;
  poNo: string;
}

export default function DeletePurchaseOrderButton({
  id,
  poNo,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${poNo}?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await deletePurchaseOrder(id);

      alert("Purchase Order deleted successfully.");

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Failed to delete Purchase Order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}