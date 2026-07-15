import Link from "next/link";
type PurchaseOrder = {
  id: string;
  poNo: string;
  date: string;
  customer: {
    company: string;
  };
  supplier: {
    company: string;
  };
  createdAt: string;
};

async function getPurchaseOrders(): Promise<PurchaseOrder[]> {
  const res = await fetch("http://localhost:3000/api/purchase-orders", {
    cache: "no-store",
  });

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
          + New Purchase Order
        </Link>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="border p-3 text-left">PO No</th>
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Customer</th>
              <th className="border p-3 text-left">Supplier</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-black">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-8">
                  No Purchase Orders Found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="border p-3">{order.poNo}</td>
                  <td className="border p-3">{order.date}</td>
                  <td className="border p-3">{order.customer.company}</td>
                  <td className="border p-3">{order.supplier.company}</td>

                  <td className="border p-3">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/purchase-orders/${order.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        View
                      </Link>

                      <button className="bg-green-500 text-white px-3 py-1 rounded">
                        Edit
                      </button>

                      <button className="bg-red-500 text-white px-3 py-1 rounded">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
