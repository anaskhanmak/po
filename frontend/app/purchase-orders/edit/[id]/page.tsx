import { notFound } from "next/navigation";
import PurchaseOrderForm from "@/components/purchase-order/PurchaseOrderForm";

async function getPurchaseOrder(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/purchase-orders`,
    {
      cache: "no-store",
    }
  );

  const orders = await res.json();

  const order = orders.find((item: any) => item.id === id);

  return order;
}

export default async function EditPurchaseOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const purchaseOrder = await getPurchaseOrder(id);

  if (!purchaseOrder) {
    notFound();
  }

  return (
    <PurchaseOrderForm
      initialData={purchaseOrder}
      isEdit
    />
  );
}