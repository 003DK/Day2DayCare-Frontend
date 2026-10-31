import { useEffect, useState } from 'react'
import { Download, FileText, Plus, Wallet } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { DataTable, type DataTableColumn } from '@/components/common/DataTable'
import { StatusBadge } from '@/components/common/StatusBadge'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { billingService } from '@/services/billingService'
import type { Invoice } from '@/types/invoice'

export default function Billing() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [summary, setSummary] = useState<{
    totalRevenue: number
    outstanding: number
    paidCount: number
    pendingCount: number
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([billingService.listInvoices(), billingService.getSummary()]).then(
      ([invoiceData, summaryData]) => {
        setInvoices(invoiceData)
        setSummary(summaryData)
        setLoading(false)
      },
    )
  }, [])

  const columns: DataTableColumn<Invoice>[] = [
    { key: 'id', header: 'Invoice', sortValue: (row) => row.id, render: (row) => row.id },
    {
      key: 'patient',
      header: 'Patient',
      sortValue: (row) => row.patientName,
      render: (row) => row.patientName,
    },
    {
      key: 'amount',
      header: 'Amount',
      sortValue: (row) => row.amount,
      render: (row) => `$${row.amount}`,
    },
    { key: 'date', header: 'Date', render: (row) => row.date },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    {
      key: 'actions',
      header: '',
      render: () => (
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs font-semibold text-primary"
        >
          <Download className="h-3.5 w-3.5" /> Download
        </button>
      ),
    },
  ]

  if (loading || !summary) return <LoadingSpinner label="Loading billing..." />

  const cards = [
    {
      label: 'Total Revenue',
      value: `$${summary.totalRevenue}`,
      icon: Wallet,
      tone: 'bg-success/15 text-success',
    },
    {
      label: 'Outstanding',
      value: `$${summary.outstanding}`,
      icon: FileText,
      tone: 'bg-warning/15 text-warning',
    },
    {
      label: 'Paid Invoices',
      value: summary.paidCount,
      icon: FileText,
      tone: 'bg-primary/15 text-primary',
    },
    {
      label: 'Pending Invoices',
      value: summary.pendingCount,
      icon: FileText,
      tone: 'bg-danger/15 text-danger',
    },
  ]

  return (
    <>
      <PageHeader
        title="Billing"
        subtitle="Track invoices, payments, and outstanding balances."
        actions={
          <button
            type="button"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-secondary px-4 py-3 text-sm font-semibold text-white shadow-sm"
          >
            <Plus className="h-4 w-4" /> Create Invoice
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="glass-card flex items-center gap-3 rounded-3xl p-5">
            <span className={`grid h-11 w-11 place-items-center rounded-xl ${card.tone}`}>
              <card.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-text-muted">{card.label}</p>
              <strong className="text-xl font-extrabold text-text">{card.value}</strong>
            </div>
          </div>
        ))}
      </div>

      <section className="glass-panel rounded-3xl p-5">
        <DataTable
          columns={columns}
          rows={invoices}
          rowKey={(row) => row.id}
          emptyTitle="No invoices yet"
        />
      </section>
    </>
  )
}
