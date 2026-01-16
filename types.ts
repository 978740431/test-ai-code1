
export enum InvoiceStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  DRAFT = 'DRAFT',
  OVERDUE = 'OVERDUE'
}

export enum EmailStatus {
  SENT = 'SENT',
  UNSENT = 'UNSENT'
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  issueDate: string;
  dueDate: string;
  emailStatus: EmailStatus;
  status: InvoiceStatus;
  amount: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
  balanceDue: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  amount: number;
  inventory: number | 'Unlimited';
  unit: string;
  imageUrl: string;
}

export type ViewType = 'OVERVIEW' | 'INVOICES' | 'CLIENTS' | 'ITEMS' | 'SUBSCRIPTION' | 'SETTINGS';
