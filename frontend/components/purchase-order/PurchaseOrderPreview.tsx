type Props = {
  purchaseOrder: any;
};

export default function PurchaseOrderPreview({ purchaseOrder }: Props) {
  return (
    <>
      <div
        id="invoice"
        className="relative w-[210mm] min-h-[297mm] bg-white overflow-hidden"
      >
        {/* Background */}
        <img
          src="/assets/images/po-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content */}
        <div className="relative z-10 px-[7.52mm] pt-[38mm] pb-[18mm]">
          {/* Title */}
          <h2 className="text-center text-[16pt] font-bold italic underline underline-offset-3 uppercase">
            Purchase Order
          </h2>

          {/* Date */}
          <div className="flex justify-end mt-6 **:[text-[11.04pt]]! font-bold!">
            <div className="text-right leading-7 text-primary!">
              <p>
                <span className="text-secondary!">DATE:</span>{" "}
                {purchaseOrder.date}
              </p>

              <p>
                <span className="text-secondary!">LPO No.</span>{" "}
                {purchaseOrder.poNo}
              </p>
            </div>
          </div>

          {/* Customer Supplier */}
          <div className="grid grid-cols-2 border-b-[1.39px] border-x-[1.39px] border-black mt-3">
            {/* Customer */}
            <div className="border-r-[1.39px] border-black h-[35.62mm]">
              <div className="bg-primary text-[9.79pt] h-[3.955mm] text-center font-bold border-y-[1.39px] border-black flex justify-center items-center">
                CUSTOMER
              </div>

              <div className="px-1 py-0.5 text-[8.85pt] [&_span]:font-bold">
                <p>{purchaseOrder.customer.company}</p>

                <p className="w-[84.289mm]">
                  <span>Address:</span> {purchaseOrder.customer.address}
                </p>

                <p>
                  <span>Mail:</span> {purchaseOrder.customer.email}
                </p>

                <p>
                  <span>Phone:</span> {purchaseOrder.customer.phone}
                </p>

                <p>
                  <span>VAT Number:</span> {purchaseOrder.customer.vatNumber}
                </p>
              </div>
            </div>

            {/* Supplier */}
            <div>
              <div className="bg-primary text-[9.79pt] h-[3.955mm] text-center font-bold border-y-[1.39px] border-black flex justify-center items-center">
                SUPPLIER
              </div>

              <div className="px-1 py-0.5 text-[8.85pt]">
                <p>
                  <b>{purchaseOrder.supplier.company}</b>
                </p>

                <p>Address: {purchaseOrder.supplier.address}</p>

                <p>Phone: {purchaseOrder.supplier.phone}</p>

                <p>Mail: {purchaseOrder.supplier.email}</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-[1.39px] border-black border-collapse mt-[2mm] text-[12px]">
            <thead>
              <tr className="bg-primary text-[9.79pt] h-[14.308mm]">
                <th className="border border-black">No</th>
                <th className="border border-black">DESCRIPTION</th>
                <th className="border border-black">TOTAL QUANTITY</th>
                <th className="border border-black">PRICE</th>
                <th className="border border-black">AMOUNT</th>
              </tr>
            </thead>

            <tbody>
              {purchaseOrder.items.map((item: any, index: number) => (
                <tr key={item.id}>
                  <td className="border border-black text-[12pt] text-center h-[35.216mm]">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="border border-black text-[12pt] text-center h-[35.216mm]">
                    {item.description}
                  </td>

                  <td className="border border-black text-[12pt] text-center h-[35.216mm]">
                    {item.quantity}
                  </td>

                  <td className="border border-black text-[12pt] text-center h-[35.216mm]">
                    {item.price}
                  </td>

                  <td className="border border-black text-[12pt] text-center h-[35.216mm]">
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <table>
              <tbody>
                <tr className="font-bold">
                  <td
                    colSpan={4}
                    className="border border-black text-[9.79pt] text-right"
                  >
                    TOTAL AMOUNT IN USD
                  </td>

                  <td className="border border-black text-[9.79pt] text-center">
                    $
                    {purchaseOrder.items.reduce(
                      (total: number, item: any) =>
                        total + Number(item.amount || 0),
                      0,
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Terms */}
          <div className="mt-8 w-fit">
            <div>
              <div className="bg-secondary text-white inline-block px-5 py-1 font-bold text-[11.04pt] w-[77.872mm] h-[7.639mm]">
                PAYMENT TERMS AND CONDITION
              </div>

              <ol className="list-decimal pl-6 mt-4 text-[8.12pt] font-bold">
                <li>100% against complete documents.</li>
              </ol>
            </div>

            <div className="w-full mt-12 flex justify-center">
              <img
                src="/assets/images/sign-stamp.png"
                className="w-[40.748mm]"
                alt="sign"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
