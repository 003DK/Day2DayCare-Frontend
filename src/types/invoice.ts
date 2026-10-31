export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue'

export interface Invoice {
  id: string
  patientName: string
  amount: number
  date: string
  dueDate: string
  status: InvoiceStatus
  treatment: string
}
