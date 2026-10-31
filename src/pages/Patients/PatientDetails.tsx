import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { EmptyState } from '@/components/common/EmptyState'
import { patientsService } from '@/services/patientsService'
import type { Patient } from '@/types/patient'

export default function PatientDetails() {
  const { id } = useParams()
  const [patient, setPatient] = useState<Patient | null | undefined>(undefined)

  useEffect(() => {
    if (!id) return
    patientsService.getById(id).then((data) => setPatient(data ?? null))
  }, [id])

  if (patient === undefined) return <LoadingSpinner label="Loading patient..." />
  if (patient === null)
    return <EmptyState title="Patient not found" description="This patient record doesn't exist." />

  return (
    <>
      <Link
        to="/patients"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Patients
      </Link>

      <PageHeader title={patient.name} subtitle={patient.treatment} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <section className="glass-panel rounded-3xl p-5 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <Avatar src={patient.photo} name={patient.name} size="lg" />
            <h3 className="mt-3 text-lg font-bold text-text">{patient.name}</h3>
            <p className="text-sm text-text-muted">
              Age: {patient.age} · {patient.gender}
            </p>
            <div className="mt-2">
              <StatusBadge status={patient.status} />
            </div>
          </div>

          <div className="mt-5 grid gap-3 border-t border-text/10 pt-5 text-sm">
            <div className="flex items-center gap-2 text-text-muted">
              <Phone className="h-4 w-4" /> {patient.phone}
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <Mail className="h-4 w-4" /> {patient.email}
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <MapPin className="h-4 w-4" /> {patient.address}
            </div>
          </div>

          <p className="mt-4 text-xs text-text-muted">Patient since {patient.joinedOn}</p>
        </section>

        <div className="grid gap-5 lg:col-span-2">
          <section className="glass-panel rounded-3xl p-5">
            <h3 className="mb-3 text-lg font-bold text-text">Medical History</h3>
            {patient.medicalHistory.length === 0 ? (
              <p className="text-sm text-text-muted">No medical history on file.</p>
            ) : (
              <ul className="grid gap-2 text-sm text-text-muted">
                {patient.medicalHistory.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {item}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="glass-panel rounded-3xl p-5">
            <h3 className="mb-3 text-lg font-bold text-text">Treatment History</h3>
            {patient.treatmentHistory.length === 0 ? (
              <p className="text-sm text-text-muted">No treatment sessions recorded yet.</p>
            ) : (
              <div className="grid gap-3">
                {patient.treatmentHistory.map((entry) => (
                  <div
                    key={`${entry.date}-${entry.treatment}`}
                    className="glass-card rounded-2xl p-3.5"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-text">{entry.treatment}</strong>
                      <span className="text-xs text-text-muted">{entry.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-text-muted">{entry.notes}</p>
                    <p className="mt-1 text-xs text-text-muted">Therapist: {entry.therapist}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}
