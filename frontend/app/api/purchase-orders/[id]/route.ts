import { NextResponse } from "next/server";
import {
  readPurchaseOrders,
  writePurchaseOrders,
} from "@/lib/server/purchase-order";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET Single Purchase Order
export async function GET(req: Request, { params }: Params) {
  const { id } = await params;

  const purchaseOrders = await readPurchaseOrders();

  const purchaseOrder = purchaseOrders.find(
    (order: any) => order.id === id
  );

  if (!purchaseOrder) {
    return NextResponse.json(
      { message: "Purchase Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(purchaseOrder);
}

// UPDATE
export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  const body = await req.json();

  const purchaseOrders = await readPurchaseOrders();

  const index = purchaseOrders.findIndex(
    (order: any) => order.id === id
  );

  if (index === -1) {
    return NextResponse.json(
      { message: "Purchase Order not found" },
      { status: 404 }
    );
  }

  purchaseOrders[index] = {
    ...purchaseOrders[index],
    ...body,
  };

  await writePurchaseOrders(purchaseOrders);

  return NextResponse.json(purchaseOrders[index]);
}

// DELETE
export async function DELETE(req: Request, { params }: Params) {
  const { id } = await params;

  const purchaseOrders = await readPurchaseOrders();

  const filtered = purchaseOrders.filter(
    (order: any) => order.id !== id
  );

  await writePurchaseOrders(filtered);

  return NextResponse.json({
    message: "Purchase Order deleted successfully",
  });
}