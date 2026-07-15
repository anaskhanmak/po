"use client";

import { PurchaseOrderFormData } from "@/types/purchase-order";
import { useFieldArray, Control, UseFormRegister } from "react-hook-form";
import { FaPlus, FaTrash } from "react-icons/fa";

// type FormValues = {
//   items: {
//     id: string;
//     description: string;
//     quantity: string;
//     price: string;
//     amount: string;
//   }[];
// };

interface Props {
    control: Control<PurchaseOrderFormData>;
    register: UseFormRegister<PurchaseOrderFormData>;
}
export default function ItemsTable({
  control,
  register,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <div className="border rounded-lg p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold">
          Items
        </h2>

        <button
          type="button"
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              description: "",
              quantity: "",
              price: "",
              amount: "",
            })
          }
          className="flex items-center gap-2 bg-black text-white! px-4 py-2 rounded-lg"
        >
          <FaPlus />
          Add Item
        </button>

      </div>

      <table className="w-full border">

        <thead>

          <tr className="bg-gray-100">

            <th className="border p-3">
              Description
            </th>

            <th className="border p-3">
              Qty
            </th>

            <th className="border p-3">
              Price
            </th>

            <th className="border p-3">
              Amount
            </th>

            <th className="border p-3 w-20">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {fields.map((field, index) => (

            <tr key={field.id}>

              <td className="border">

                <input
                  {...register(`items.${index}.description`)}
                  className="w-full p-3 outline-none"
                />

              </td>

              <td className="border">

                <input
                  {...register(`items.${index}.quantity`)}
                  className="w-full p-3 outline-none"
                />

              </td>

              <td className="border">

                <input
                  {...register(`items.${index}.price`)}
                  className="w-full p-3 outline-none"
                />

              </td>

              <td className="border">

                <input
                  {...register(`items.${index}.amount`)}
                  className="w-full p-3 outline-none"
                />

              </td>

              <td className="border text-center">

                <button
                  type="button"
                  onClick={() => remove(index)}
                >
                  <FaTrash color="text-red-500 mx-auto" />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}