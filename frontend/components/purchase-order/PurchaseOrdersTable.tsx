"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DeletePurchaseOrderButton from "./DeletePurchaseOrderButton";
import { PurchaseOrder } from "@/types/purchase-order";

// interface PurchaseOrder {
//   id: string;
//   poNo: string;
//   date: string;
//   status: "Draft" | "Approved" | "Sent" | "Cancelled";
//   customer: {
//     company: string;
//   };
//   supplier: {
//     company: string;
//   };
// }

interface Props {
  orders: PurchaseOrder[];
}

export default function PurchaseOrdersTable({
  orders,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    const value = search.toLowerCase();

    return orders.filter((order) => {
      return (
        order.poNo.toLowerCase().includes(value) ||
        order.customer.company.toLowerCase().includes(value) ||
        order.supplier.company.toLowerCase().includes(value)
      );
    });
  }, [orders, search]);

  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search PO Number, Customer or Supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3 w-full max-w-md text-black"
        />
      </div>

      <div className="overflow-x-auto border rounded-lg max-w-5xl">
        <table className="w-full">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="border p-3 text-left">PO No</th>
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Customer</th>
              <th className="border p-3 text-left">Supplier</th>
              <th className="border p-3 text-center">Status</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-black">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-8">
                  No Purchase Orders Found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="border p-3">{order.poNo}</td>
                  <td className="border p-3">{order.date}</td>
                  <td className="border p-3">{order.customer.company}</td>
                  <td className="border p-3">{order.supplier.company}</td>
                  <td className="border p-3 text-center">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        order?.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : order?.status === "Sent"
                            ? "bg-blue-100 text-blue-700"
                            : order?.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order?.status ?? "Draft"}
                    </span>
                  </td>

                  <td className="border p-3">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/purchase-orders/${order.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        View
                      </Link>

                      <Link
                        href={`/purchase-orders/edit/${order.id}`}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </Link>

                      <a
                        href={`/api/purchase-orders/${order.id}/pdf`}
                        className="bg-purple-500 text-white px-3 py-1 rounded"
                      >
                        PDF
                      </a>

                      <DeletePurchaseOrderButton
                        id={order.id}
                        poNo={order.poNo}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
