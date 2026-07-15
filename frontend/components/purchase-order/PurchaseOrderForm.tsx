"use client";

import { useForm } from "react-hook-form";
import ItemsTable from "./ItemsTable";
import { PurchaseOrderFormData } from "@/types/purchase-order";
import { createPurchaseOrder } from "@/lib/client/purchase-order";

export default function PurchaseOrderForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PurchaseOrderFormData>({
    defaultValues: {
      date: "",

      customer: {
        company: "",
        address: "",
        email: "",
        phone: "",
        vatNumber: "",
      },

      supplier: {
        company: "",
        address: "",
        email: "",
        phone: "",
      },

      items: [
        {
          id: crypto.randomUUID(),
          description: "",
          quantity: "",
          price: "",
          amount: "",
        },
      ],
    },
  });

  const onSubmit = async (data: PurchaseOrderFormData) => {
    try {
      await createPurchaseOrder(data);

      alert("Purchase Order Saved Successfully");

      reset({
        date: "",
        customer: {
          company: "",
          address: "",
          email: "",
          phone: "",
          vatNumber: "",
        },
        supplier: {
          company: "",
          address: "",
          email: "",
          phone: "",
        },
        items: [
          {
            id: crypto.randomUUID(),
            description: "",
            quantity: "",
            price: "",
            amount: "",
          },
        ],
      });
    } catch (error) {
      console.error(error);
      alert("Failed to save Purchase Order");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-7xl mx-auto space-y-10 p-6 **:text-black"
    >
      {/* Purchase Order */}

      <div className="border border-black rounded-lg p-6">
        <h2 className="text-xl font-bold mb-5">
          Purchase Order Details
        </h2>

        <div>
          <label>Date</label>

          <input
            type="date"
            {...register("date", {
              required: "Date is required",
            })}
            className="border border-black rounded-lg w-full p-3 mt-2"
          />

          {errors.date && (
            <p className="text-red-500! text-sm mt-1">
              {errors.date.message}
            </p>
          )}
        </div>
      </div>

      {/* Customer */}

      <div className="border border-black rounded-lg p-6">
        <h2 className="text-xl font-bold mb-5">
          Customer
        </h2>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <input
              placeholder="Company"
              {...register("customer.company", {
                required: "Company is required",
              })}
              className="border border-black rounded-lg p-3 w-full"
            />

            <p className="text-red-500! text-sm mt-1">
              {errors.customer?.company?.message}
            </p>
          </div>

          <div>
            <input
              placeholder="Address"
              {...register("customer.address", {
                required: "Address is required",
              })}
              className="border border-black rounded-lg p-3 w-full"
            />

            <p className="text-red-500! text-sm mt-1">
              {errors.customer?.address?.message}
            </p>
          </div>

          <div>
            <input
              placeholder="Email"
              {...register("customer.email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email",
                },
              })}
              className="border border-black rounded-lg p-3 w-full"
            />

            <p className="text-red-500! text-sm mt-1">
              {errors.customer?.email?.message}
            </p>
          </div>

          <div>
            <input
              placeholder="Phone"
              {...register("customer.phone", {
                required: "Phone is required",
              })}
              className="border border-black rounded-lg p-3 w-full"
            />

            <p className="text-red-500! text-sm mt-1">
              {errors.customer?.phone?.message}
            </p>
          </div>

          <div className="col-span-2">
            <input
              placeholder="VAT Number"
              {...register("customer.vatNumber", {
                required: "VAT Number is required",
              })}
              className="border border-black rounded-lg p-3 w-full"
            />

            <p className="text-red-500! text-sm mt-1">
              {errors.customer?.vatNumber?.message}
            </p>
          </div>

        </div>
      </div>

      {/* Supplier */}

      <div className="border border-black rounded-lg p-6">
        <h2 className="text-xl font-bold mb-5">
          Supplier
        </h2>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <input
              placeholder="Company"
              {...register("supplier.company", {
                required: "Company is required",
              })}
              className="border border-black rounded-lg p-3 w-full"
            />

            <p className="text-red-500! text-sm mt-1">
              {errors.supplier?.company?.message}
            </p>
          </div>

          <div>
            <input
              placeholder="Address"
              {...register("supplier.address", {
                required: "Address is required",
              })}
              className="border border-black rounded-lg p-3 w-full"
            />

            <p className="text-red-500! text-sm mt-1">
              {errors.supplier?.address?.message}
            </p>
          </div>

          <div>
            <input
              placeholder="Email"
              {...register("supplier.email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email",
                },
              })}
              className="border border-black rounded-lg p-3 w-full"
            />

            <p className="text-red-500! text-sm mt-1">
              {errors.supplier?.email?.message}
            </p>
          </div>

          <div>
            <input
              placeholder="Phone"
              {...register("supplier.phone", {
                required: "Phone is required",
              })}
              className="border border-black rounded-lg p-3 w-full"
            />

            <p className="text-red-500! text-sm mt-1">
              {errors.supplier?.phone?.message}
            </p>
          </div>

        </div>
      </div>

      <ItemsTable
        control={control}
        register={register}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white! px-8 py-3 rounded-lg disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save Purchase Order"}
      </button>
    </form>
  );
}