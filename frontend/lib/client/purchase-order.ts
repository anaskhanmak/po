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

export async function updatePurchaseOrder(id: string, data: any) {
  const response = await fetch(`/api/purchase-orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update Purchase Order");
  }

  return response.json();
}

export async function deletePurchaseOrder(id: string) {
  const response = await fetch(`/api/purchase-orders/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete Purchase Order");
  }

  return response.json();
}