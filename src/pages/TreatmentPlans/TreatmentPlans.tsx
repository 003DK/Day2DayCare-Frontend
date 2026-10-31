import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { SearchInput } from '@/components/common/SearchInput'
import { FilterDropdown } from '@/components/common/FilterDropdown'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { EmptyState } from '@/components/common/EmptyState'
import { Modal } from '@/components/common/Modal'
import { treatmentPlansService } from '@/services/treatmentPlansService'
import type { TreatmentPlan, TreatmentPlanStatus } from '@/types/treatmentPlan'

const statuses: TreatmentPlanStatus[] = ['Active', 'Completed', 'Paused']

export default function TreatmentPlans() {
  const [plans, setPlans] = useState<TreatmentPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    treatmentPlansService.list().then((data) => {
      setPlans(data)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    return plans.filter((plan) => {
      const matchesSearch = plan.patientName.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = status ? plan.status === status : true
      return matchesSearch && matchesStatus
    })
  }, [plans, search, status])

  if (loading) return <LoadingSpinner label="Loading treatment plans..." />

  return (
    <>
      <PageHeader
        title="Treatment Plans"
        subtitle="Track progress across active, completed, and paused plans."
        actions={
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-secondary px-4 py-3 text-sm font-semibold text-white shadow-sm"
          >
            <Plus className="h-4 w-4" /> New Plan
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

      {filtered.length === 0 ? (
        <EmptyState
          title="No treatment plans found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((plan) => (
            <section key={plan.id} className="glass-panel rounded-3xl p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar src={plan.patientPhoto} name={plan.patientName} />
                  <div>
                    <strong className="block text-text">{plan.patientName}</strong>
                    <small className="text-text-muted">{plan.treatment}</small>
                  </div>
                </div>
                <StatusBadge status={plan.status} />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-text/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${plan.progress}%` }}
                  />
                </div>
                <strong className="text-text">{plan.progress}%</strong>
              </div>

              <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-text-muted">
                <span>
                  {plan.completedSessions}/{plan.totalSessions} sessions
                </span>
                <span>
                  {plan.startDate} – {plan.endDate}
                </span>
              </div>
            </section>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Treatment Plan">
        <p className="text-sm text-text-muted">
          Full plan creation with validation is coming in a follow-up pass — for now this confirms
          the modal flow works.
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
