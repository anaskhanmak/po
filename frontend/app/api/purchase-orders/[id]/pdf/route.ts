import { NextResponse } from "next/server";
import { getBrowser } from "@/lib/server/browser";
import { readPurchaseOrders } from "@/lib/server/purchase-order";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: Request, { params }: Params) {
  const { id } = await params;

  const browser = await getBrowser();

  try {
    const page = await browser.newPage();

    await page.goto(
      `${process.env.NEXT_PUBLIC_APP_URL}/purchase-orders/${id}/print`,
      {
        waitUntil: "networkidle0",
      },
    );

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
    });

    const purchaseOrders = await readPurchaseOrders();

    const purchaseOrder = purchaseOrders.find((po: any) => po.id === id);

    if (!purchaseOrder) {
      return NextResponse.json(
        { message: "Purchase Order not found" },
        { status: 404 },
      );
    }

    const supplier = purchaseOrder.supplier.company
      .trim()
      .replace(/[^a-zA-Z0-9]/g, "-");

    const fileName = `${supplier}-${purchaseOrder.poNo}.pdf`;

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } finally {
    await browser.close();
  }
}
