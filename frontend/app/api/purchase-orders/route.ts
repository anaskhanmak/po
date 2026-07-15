import { NextResponse } from "next/server";
import {
  readPurchaseOrders,
  writePurchaseOrders,
} from "@/lib/server/purchase-order";

export async function GET() {
  const purchaseOrders = await readPurchaseOrders();

  return NextResponse.json(purchaseOrders);
}

export async function POST(req: Request) {
  const body = await req.json();

  const purchaseOrders = await readPurchaseOrders();

  const lastOrder = purchaseOrders[purchaseOrders.length - 1];

  let lastPoNumber = 4021;

  if (lastOrder?.poNo) {
    const number = Number(lastOrder.poNo.replace("PO-", ""));

    if (!isNaN(number)) {
      lastPoNumber = number;
    }
  }

  const purchaseOrder = {
    id: Date.now().toString(),
    poNo: `${lastPoNumber + 1}`,
    status: body.status ?? "Draft",
    ...body,
    createdAt: new Date().toISOString(),
  };

  purchaseOrders.push(purchaseOrder);

  await writePurchaseOrders(purchaseOrders);

  return NextResponse.json(purchaseOrder, {
    status: 201,
  });
}
