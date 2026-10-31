import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { SearchInput } from '@/components/common/SearchInput'
import { FilterDropdown } from '@/components/common/FilterDropdown'
import { DataTable, type DataTableColumn } from '@/components/common/DataTable'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog'
import { appointmentsService } from '@/services/appointmentsService'
import type { Appointment, AppointmentStatus } from '@/types/appointment'

const statuses: AppointmentStatus[] = [
  'Scheduled',
  'In Progress',
  'Completed',
  'Cancelled',
  'Home Visit',
]

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null)

  useEffect(() => {
    appointmentsService.list().then((data) => {
      setAppointments(data)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchesSearch = a.patientName.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = status ? a.status === status : true
      return matchesSearch && matchesStatus
    })
  }, [appointments, search, status])

  const columns: DataTableColumn<Appointment>[] = [
    {
      key: 'patient',
      header: 'Patient',
      sortValue: (row) => row.patientName,
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.patientPhoto} name={row.patientName} size="sm" />
          <div>
            <strong className="block text-text">{row.patientName}</strong>
            <small className="text-text-muted">{row.treatment}</small>
          </div>
        </div>
      ),
    },
    { key: 'date', header: 'Date', sortValue: (row) => row.date, render: (row) => row.date },
    { key: 'time', header: 'Time', render: (row) => row.duration },
    { key: 'therapist', header: 'Therapist', render: (row) => row.therapist },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) =>
        row.status === 'Cancelled' || row.status === 'Completed' ? (
          <span className="text-xs text-text-muted">—</span>
        ) : (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              setCancelTarget(row)
            }}
            className="rounded-lg bg-danger/10 px-3 py-1.5 text-xs font-semibold text-danger"
          >
            Cancel
          </button>
        ),
    },
  ]

  if (loading) return <LoadingSpinner label="Loading appointments..." />

  return (
    <>
      <PageHeader
        title="Appointments"
        subtitle="All upcoming and past clinic appointments."
        actions={
          <button
            type="button"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-secondary px-4 py-3 text-sm font-semibold text-white shadow-sm"
          >
            <Plus className="h-4 w-4" /> New Appointment
          </button>
        }
      />

      <div className="flex flex-wrap gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by patient..."
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
          emptyTitle="No appointments found"
          emptyDescription="Try adjusting your search or filters."
        />
      </section>

      <ConfirmationDialog
        open={Boolean(cancelTarget)}
        title="Cancel appointment?"
        description={
          cancelTarget
            ? `This will cancel ${cancelTarget.patientName}'s appointment on ${cancelTarget.date}.`
            : ''
        }
        confirmLabel="Cancel Appointment"
        danger
        onCancel={() => setCancelTarget(null)}
        onConfirm={() => {
          if (!cancelTarget) return
          appointmentsService.updateStatus(cancelTarget.id, 'Cancelled').then(setAppointments)
          setCancelTarget(null)
        }}
      />
    </>
  )
}
