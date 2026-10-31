import { useState, type FormEvent } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { ChartCard } from '@/components/common/ChartCard'
import { FormInput } from '@/components/common/FormInput'
import { FormSelect } from '@/components/common/FormSelect'

export default function Settings() {
  const [saved, setSaved] = useState(false)

  const handleSave = (event: FormEvent) => {
    event.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage clinic information and application preferences."
        actions={
          <button
            type="button"
            onClick={handleSave}
            className="rounded-2xl bg-gradient-to-br from-primary to-secondary px-5 py-3 text-sm font-semibold text-white shadow-sm"
          >
            {saved ? 'Saved ✓' : 'Save Changes'}
          </button>
        }
      />

      <form onSubmit={handleSave} className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard title="Clinic Information">
          <div className="grid gap-4">
            <FormInput label="Clinic Name" defaultValue="PhysioCare Clinic" />
            <FormInput label="Clinic Email" type="email" defaultValue="hello@physiocare.com" />
            <FormInput label="Phone" defaultValue="+1 234 567 890" />
            <FormInput label="Timezone" defaultValue="UTC-5" />
          </div>
        </ChartCard>

        <ChartCard title="Working Hours">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Opening Time" type="time" defaultValue="08:00" />
            <FormInput label="Closing Time" type="time" defaultValue="18:00" />
            <FormSelect
              label="Appointment Duration"
              options={['30 minutes', '45 minutes', '60 minutes']}
              defaultValue="60 minutes"
            />
            <FormSelect
              label="Buffer Between Sessions"
              options={['0 minutes', '10 minutes', '15 minutes']}
              defaultValue="10 minutes"
            />
          </div>
        </ChartCard>

        <ChartCard title="Notification Preferences">
          <div className="grid gap-3 text-sm">
            {[
              'Email reminders for upcoming appointments',
              'SMS alerts for cancellations',
              'Weekly performance summary',
            ].map((label) => (
              <label key={label} className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
                <span className="text-text">{label}</span>
              </label>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Treatment Categories">
          <div className="flex flex-wrap gap-2">
            {[
              'Post-op Rehabilitation',
              'Sports Injury',
              'Neurological',
              'Spinal',
              'Pediatric',
              'Geriatric',
            ].map((category) => (
              <span
                key={category}
                className="glass-card rounded-full px-3.5 py-1.5 text-xs font-semibold text-text"
              >
                {category}
              </span>
            ))}
          </div>
        </ChartCard>
      </form>
    </>
  )
}
