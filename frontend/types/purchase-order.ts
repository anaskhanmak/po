export interface Customer {
  company: string;
  address: string;
  email: string;
  phone: string;
  vatNumber: string;
}

export interface Supplier {
  company: string;
  address: string;
  email: string;
  phone: string;
}

export interface PurchaseOrderItem {
  id: string;
  description: string;
  quantity: string;
  price: string;
  amount: string;
}

export interface PurchaseOrderFormData {
  poNo: string;
  date: string;

  customer: Customer;
  supplier: Supplier;

  items: PurchaseOrderItem[];

  paymentTerms: string[];

  signature: string;
}