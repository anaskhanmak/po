export async function createPurchaseOrder(data: any) {
  const response = await fetch("/api/purchase-orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create purchase order");
  }

  return response.json();
}