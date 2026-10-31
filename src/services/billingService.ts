import type { Invoice } from '@/types/invoice'

const invoices: Invoice[] = [
  {
    id: 'INV-0012',
    patientName: 'Sarah Johnson',
    amount: 120,
    date: 'Apr 24, 2025',
    dueDate: 'May 1, 2025',
    status: 'Paid',
    treatment: 'Post-op Knee Rehabilitation',
  },
  {
    id: 'INV-0013',
    patientName: 'Michael Anderson',
    amount: 220,
    date: 'Apr 23, 2025',
    dueDate: 'Apr 30, 2025',
    status: 'Pending',
    treatment: 'Shoulder Mobility Therapy',
  },
  {
    id: 'INV-0014',
    patientName: 'Emily Davis',
    amount: 90,
    date: 'Apr 22, 2025',
    dueDate: 'Apr 29, 2025',
    status: 'Paid',
    treatment: 'Spinal Rehabilitation',
  },
  {
    id: 'INV-0015',
    patientName: 'Robert Wilson',
    amount: 310,
    date: 'Apr 10, 2025',
    dueDate: 'Apr 17, 2025',
    status: 'Overdue',
    treatment: 'Neurological Rehabilitation',
  },
  {
    id: 'INV-0016',
    patientName: 'Jessica Martinez',
    amount: 150,
    date: 'Apr 20, 2025',
    dueDate: 'Apr 27, 2025',
    status: 'Pending',
    treatment: 'Sports Injury Recovery',
  },
]

export const billingService = {
  listInvoices: (): Promise<Invoice[]> => Promise.resolve(invoices),
  getSummary: () => {
    const totalRevenue = invoices
      .filter((i) => i.status === 'Paid')
      .reduce((sum, i) => sum + i.amount, 0)
    const outstanding = invoices
      .filter((i) => i.status !== 'Paid')
      .reduce((sum, i) => sum + i.amount, 0)
    const paidCount = invoices.filter((i) => i.status === 'Paid').length
    const pendingCount = invoices.filter((i) => i.status !== 'Paid').length
    return Promise.resolve({ totalRevenue, outstanding, paidCount, pendingCount })
  },
}
