import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "purchase-orders.json");

export async function readPurchaseOrders() {
  try {
    const data = await fs.readFile(filePath, "utf8");

    if (!data.trim()) return [];

    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writePurchaseOrders(data: any) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}