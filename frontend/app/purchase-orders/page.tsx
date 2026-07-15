import Link from "next/link";
import DeletePurchaseOrderButton from "@/components/purchase-order/DeletePurchaseOrderButton";
import PurchaseOrdersTable from "@/components/purchase-order/PurchaseOrdersTable";
import { PurchaseOrder } from "@/types/purchase-order";

async function getPurchaseOrders(): Promise<PurchaseOrder[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/purchase-orders`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch purchase orders");
  }

  return res.json();
}

export default async function PurchaseOrdersPage() {
  const orders = await getPurchaseOrders();

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Purchase Orders</h1>

        <Link
          href="/purchase-orders/create"
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          + <span className="hidden lg:inline ms-2">New Purchase Order</span>
        </Link>
      </div>

      <PurchaseOrdersTable orders={orders} />
    </div>
  );
}
