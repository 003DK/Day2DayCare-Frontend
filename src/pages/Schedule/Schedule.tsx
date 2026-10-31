import { Fragment, useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { FilterDropdown } from '@/components/common/FilterDropdown'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { scheduleService } from '@/services/scheduleService'
import type { ScheduleEvent } from '@/types/scheduleEvent'

const days: ScheduleEvent['day'][] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hours = Array.from({ length: 9 }, (_, i) => 8 + i)

const statusColors: Record<ScheduleEvent['status'], string> = {
  Scheduled: 'bg-primary/15 border-primary/30 text-primary',
  'In Progress': 'bg-warning/15 border-warning/30 text-warning',
  Completed: 'bg-success/15 border-success/30 text-success',
  Cancelled: 'bg-danger/15 border-danger/30 text-danger line-through opacity-70',
}

export default function Schedule() {
  const [events, setEvents] = useState<ScheduleEvent[]>([])
  const [therapists, setTherapists] = useState<string[]>([])
  const [treatments, setTreatments] = useState<string[]>([])
  const [therapistFilter, setTherapistFilter] = useState('')
  const [treatmentFilter, setTreatmentFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      scheduleService.list(),
      scheduleService.listTherapists(),
      scheduleService.listTreatmentTypes(),
    ]).then(([eventData, therapistData, treatmentData]) => {
      setEvents(eventData)
      setTherapists(therapistData)
      setTreatments(treatmentData)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    return events.filter((event) => {
      const matchesTherapist = therapistFilter ? event.therapist === therapistFilter : true
      const matchesTreatment = treatmentFilter ? event.treatment === treatmentFilter : true
      return matchesTherapist && matchesTreatment
    })
  }, [events, therapistFilter, treatmentFilter])

  if (loading) return <LoadingSpinner label="Loading schedule..." />

  return (
    <>
      <PageHeader
        title="Schedule"
        subtitle="Weekly calendar of therapist availability and appointments."
        actions={
          <button
            type="button"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-secondary px-4 py-3 text-sm font-semibold text-white shadow-sm"
          >
            <Plus className="h-4 w-4" /> Create Appointment
          </button>
        }
      />

      <div className="flex flex-wrap gap-3">
        <FilterDropdown
          label="All Therapists"
          value={therapistFilter}
          onChange={setTherapistFilter}
          options={therapists}
        />
        <FilterDropdown
          label="All Treatments"
          value={treatmentFilter}
          onChange={setTreatmentFilter}
          options={treatments}
        />
      </div>

      <section className="glass-panel overflow-x-auto rounded-3xl p-5">
        <div className="grid min-w-210 grid-cols-[64px_repeat(7,1fr)] gap-2">
          <div />
          {days.map((day) => (
            <div key={day} className="pb-2 text-center text-sm font-bold text-text">
              {day}
            </div>
          ))}

          {hours.map((hour) => (
            <Fragment key={`hour-${hour}`}>
              <div className="pt-1 text-right text-xs text-text-muted">
                {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
              </div>
              {days.map((day) => {
                const event = filtered.find((e) => e.day === day && e.startHour === hour)
                return (
                  <div
                    key={`${day}-${hour}`}
                    className="min-h-13 rounded-xl border border-dashed border-text-muted/10"
                  >
                    {event ? (
                      <div
                        className={`h-full rounded-xl border p-2 text-xs font-semibold ${statusColors[event.status]}`}
                      >
                        <p className="truncate">{event.patientName}</p>
                        <p className="truncate font-normal opacity-80">{event.treatment}</p>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </Fragment>
          ))}
        </div>
      </section>
    </>
  )
}
