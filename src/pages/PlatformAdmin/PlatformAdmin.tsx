import { useEffect, useMemo, useState } from 'react'
import { Building2, Plus, ShieldAlert, Users } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { SearchInput } from '@/components/common/SearchInput'
import { FilterDropdown } from '@/components/common/FilterDropdown'
import { DataTable, type DataTableColumn } from '@/components/common/DataTable'
import { StatusBadge } from '@/components/common/StatusBadge'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { Modal } from '@/components/common/Modal'
import { platformService } from '@/services/platformService'
import type { Tenant, TenantStatus } from '@/types/tenant'

const statuses: TenantStatus[] = ['Active', 'Trial', 'Suspended']

export default function PlatformAdmin() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [summary, setSummary] = useState<{
    total: number
    active: number
    trial: number
    suspended: number
    totalBranches: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    Promise.all([platformService.listTenants(), platformService.getSummary()]).then(
      ([tenantData, summaryData]) => {
        setTenants(tenantData)
        setSummary(summaryData)
        setLoading(false)
      },
    )
  }, [])

  const filtered = useMemo(() => {
    return tenants.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.code.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = status ? t.status === status : true
      return matchesSearch && matchesStatus
    })
  }, [tenants, search, status])

  const columns: DataTableColumn<Tenant>[] = [
    {
      key: 'name',
      header: 'Clinic',
      sortValue: (row) => row.name,
      render: (row) => (
        <div>
          <strong className="block text-text">{row.name}</strong>
          <small className="text-text-muted">
            tenant_{row.code.replace(/-/g, '_')} · {row.contactEmail}
          </small>
        </div>
      ),
    },
    { key: 'plan', header: 'Plan', sortValue: (row) => row.plan, render: (row) => row.plan },
    {
      key: 'branches',
      header: 'Branches',
      sortValue: (row) => row.branchCount,
      render: (row) => row.branchCount,
    },
    {
      key: 'staff',
      header: 'Staff',
      sortValue: (row) => row.staffCount,
      render: (row) => row.staffCount,
    },
    {
      key: 'onboarded',
      header: 'Onboarded',
      sortValue: (row) => row.onboardedOn,
      render: (row) => row.onboardedOn,
    },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  ]

  if (loading || !summary) return <LoadingSpinner label="Loading tenants..." />

  const cards = [
    {
      label: 'Total Clinics',
      value: summary.total,
      icon: Building2,
      tone: 'bg-primary/15 text-primary',
    },
    { label: 'Active', value: summary.active, icon: Building2, tone: 'bg-success/15 text-success' },
    { label: 'Trial', value: summary.trial, icon: ShieldAlert, tone: 'bg-warning/15 text-warning' },
    {
      label: 'Total Branches',
      value: summary.totalBranches,
      icon: Users,
      tone: 'bg-[#8e6ce3]/15 text-[#8e6ce3]',
    },
  ]

  return (
    <>
      <PageHeader
        title="Platform Admin"
        subtitle="Every clinic on Day2Day CARE — visible only with the Tenants & Subscriptions claim."
        actions={
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-secondary px-4 py-3 text-sm font-semibold text-white shadow-sm"
          >
            <Plus className="h-4 w-4" /> Provision Clinic
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

      <div className="flex flex-wrap gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by clinic or code..."
          className="min-w-65 flex-1"
        />
        <FilterDropdown
          label="All Statuses"
          value={status}
          onChange={setStatus}
          options={statuses}
        />
      </div>

      <section className="glass-panel rounded-3xl p-5">
        <DataTable
          columns={columns}
          rows={filtered}
          rowKey={(row) => row.id}
          emptyTitle="No clinics found"
          emptyDescription="Try adjusting your search or filters."
        />
      </section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Provision Clinic">
        <p className="text-sm text-text-muted">
          Clinic provisioning runs{' '}
          <code className="rounded bg-text/5 px-1.5 py-0.5">manage.py provision_tenant</code> on the
          backend (creates the tenant schema, seeds reference data, and the first Clinic Owner
          account) — wiring this form up to that command is a follow-up, not covered yet.
        </p>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="rounded-xl bg-gradient-to-br from-primary to-secondary px-4 py-2 text-sm font-semibold text-white"
          >
            Got it
          </button>
        </div>
      </Modal>
    </>
  )
}
