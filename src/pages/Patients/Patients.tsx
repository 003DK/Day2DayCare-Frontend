import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { SearchInput } from '@/components/common/SearchInput'
import { FilterDropdown } from '@/components/common/FilterDropdown'
import { DataTable, type DataTableColumn } from '@/components/common/DataTable'
import { Pagination } from '@/components/common/Pagination'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { PatientFormModal } from '@/components/patients/PatientFormModal'
import { patientsService } from '@/services/patientsService'
import type { Patient, PatientStatus } from '@/types/patient'

const PAGE_SIZE = 5
const statuses: PatientStatus[] = ['Active', 'In Progress', 'Scheduled', 'Review']

export default function Patients() {
  const navigate = useNavigate()
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    patientsService.list().then((data) => {
      setPatients(data)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.phone.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = status ? p.status === status : true
      return matchesSearch && matchesStatus
    })
  }, [patients, search, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const columns: DataTableColumn<Patient>[] = [
    {
      key: 'name',
      header: 'Patient',
      sortValue: (row) => row.name,
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.photo} name={row.name} size="sm" />
          <div>
            <strong className="block text-text">{row.name}</strong>
            <small className="text-text-muted">{row.age} yrs</small>
          </div>
        </div>
      ),
    },
    { key: 'phone', header: 'Contact', sortValue: (row) => row.phone, render: (row) => row.phone },
    { key: 'gender', header: 'Gender', render: (row) => row.gender },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    {
      key: 'treatment',
      header: 'Treatment',
      sortValue: (row) => row.treatment,
      render: (row) => row.treatment,
    },
  ]

  if (loading) return <LoadingSpinner label="Loading patients..." />

  return (
    <>
      <PageHeader
        title="Patients"
        subtitle="Manage your clinic's patient records."
        actions={
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-secondary px-4 py-3 text-sm font-semibold text-white shadow-sm"
          >
            <Plus className="h-4 w-4" /> Add Patient
          </button>
        }
      />

      <div className="flex flex-wrap gap-3">
        <SearchInput
          value={search}
          onChange={(v) => {
            setSearch(v)
            setPage(1)
          }}
          placeholder="Search by name or phone..."
          className="min-w-[260px] flex-1"
        />
        <FilterDropdown
          label="All Statuses"
          value={status}
          onChange={(v) => {
            setStatus(v)
            setPage(1)
          }}
          options={statuses}
        />
      </div>

      <section className="glass-panel rounded-3xl p-5">
        <DataTable
          columns={columns}
          rows={pageRows}
          rowKey={(row) => row.id}
          onRowClick={(row) => navigate(`/patients/${row.id}`)}
          emptyTitle="No patients found"
          emptyDescription="Try adjusting your search or filters."
        />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </section>

      <PatientFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(values) => {
          patientsService
            .create(values)
            .then((created) => setPatients((prev) => [created, ...prev]))
        }}
      />
    </>
  )
}
