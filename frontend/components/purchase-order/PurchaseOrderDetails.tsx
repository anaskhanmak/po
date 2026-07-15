"use client";

import { Control, Controller } from "react-hook-form";
import { PurchaseOrderFormData } from "@/types/purchase-order";

interface Props {
  control: Control<PurchaseOrderFormData>;
}

export default function PurchaseOrderDetails({ control }: Props) {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-bold mb-5">
        Purchase Order Details
      </h2>

      <div className="grid grid-cols-2 gap-5">

        <Controller
          control={control}
          name="poNo"
          render={({ field }) => (
            <input
              {...field}
              placeholder="PO Number"
              className="border rounded-lg p-3"
            />
          )}
        />

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <input
              type="date"
              {...field}
              className="border rounded-lg p-3"
            />
          )}
        />

      </div>
    </div>
  );
}