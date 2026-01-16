
import { Invoice, InvoiceStatus, EmailStatus, Client, Item } from './types';

export const MOCK_INVOICES: Invoice[] = [
  { id: '1', invoiceNumber: 'INV-88219', clientName: 'Acme Cloud Services', issueDate: 'Oct 24, 2023', dueDate: 'Nov 24, 2023', emailStatus: EmailStatus.SENT, status: InvoiceStatus.PENDING, amount: 12450.00 },
  { id: '2', invoiceNumber: 'INV-88220', clientName: 'Global Logistics Inc.', issueDate: 'Oct 25, 2023', dueDate: 'Nov 10, 2023', emailStatus: EmailStatus.UNSENT, status: InvoiceStatus.PAID, amount: 3120.50 },
  { id: '3', invoiceNumber: 'INV-88221', clientName: 'Design System Pro', issueDate: 'Oct 26, 2023', dueDate: 'Nov 26, 2023', emailStatus: EmailStatus.UNSENT, status: InvoiceStatus.DRAFT, amount: 980.00 },
  { id: '4', invoiceNumber: 'INV-88222', clientName: 'Metrix Data Corp', issueDate: 'Oct 26, 2023', dueDate: 'Nov 01, 2023', emailStatus: EmailStatus.SENT, status: InvoiceStatus.OVERDUE, amount: 22000.00 },
];

export const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'Acme Cloud Services', email: 'billing@acme.cloud', address: '123 Tech Way, San Francisco, CA', balanceDue: 12450.00 },
  { id: '2', name: 'Global Logistics Inc.', email: 'finance@globallogistics.com', address: '888 Port Blvd, Miami, FL', balanceDue: 3120.50 },
  { id: '3', name: 'Design System Pro', email: 'hello@designsystem.pro', address: '42 Creative St, Austin, TX', balanceDue: 980.00 },
];

export const MOCK_ITEMS: Item[] = [
  { id: '1', name: 'MacBook Pro 14"', description: 'Apple M2 Pro Chip, 16GB RAM, 512GB SSD', amount: 1999.00, inventory: 42, unit: 'Each', imageUrl: 'https://picsum.photos/100/100?random=1' },
  { id: '2', name: 'Software Subscription', description: 'Enterprise Cloud License - Monthly Billing', amount: 450.00, inventory: 'Unlimited', unit: 'User / Month', imageUrl: 'https://picsum.photos/100/100?random=2' },
  { id: '3', name: 'Ergonomic Office Chair', description: 'High-back mesh design with lumbar support', amount: 299.99, inventory: 3, unit: 'Each', imageUrl: 'https://picsum.photos/100/100?random=3' },
];
