import PurchaseOrderPreview from "@/components/purchase-order/PurchaseOrderPreview";

async function getPurchaseOrder(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/purchase-orders/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Purchase Order not found");
  }

  return res.json();
}

export default async function PurchaseOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const purchaseOrder = await getPurchaseOrder(id);

  return <PurchaseOrderPreview purchaseOrder={purchaseOrder} />;
}