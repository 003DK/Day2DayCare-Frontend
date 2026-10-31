import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Modal } from '@/components/common/Modal'
import { FormInput } from '@/components/common/FormInput'
import { FormSelect } from '@/components/common/FormSelect'
import type { Patient } from '@/types/patient'

const patientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email'),
  age: z.number().min(1, 'Age must be greater than 0').max(120, 'Age looks invalid'),
  gender: z.enum(['Male', 'Female', 'Other']),
  status: z.enum(['Active', 'In Progress', 'Scheduled', 'Review']),
  treatment: z.string().min(2, 'Treatment is required'),
  address: z.string().min(2, 'Address is required'),
})

export type PatientFormValues = z.infer<typeof patientSchema>

export function PatientFormModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  onSubmit: (
    values: Omit<Patient, 'id' | 'photo' | 'joinedOn' | 'medicalHistory' | 'treatmentHistory'>,
  ) => void
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: { gender: 'Female', status: 'Scheduled' },
  })

  const submit = handleSubmit((values) => {
    onSubmit(values)
    reset()
    onClose()
  })

  return (
    <Modal open={open} onClose={onClose} title="Add Patient">
      <form onSubmit={submit} className="grid gap-4">
        <FormInput
          label="Full Name"
          placeholder="Jane Cooper"
          error={errors.name?.message}
          {...register('name')}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Phone"
            placeholder="+1 555 000 0000"
            error={errors.phone?.message}
            {...register('phone')}
          />
          <FormInput
            label="Email"
            placeholder="jane@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Age"
            type="number"
            placeholder="30"
            error={errors.age?.message}
            {...register('age', { valueAsNumber: true })}
          />
          <FormSelect
            label="Gender"
            options={['Female', 'Male', 'Other']}
            error={errors.gender?.message}
            {...register('gender')}
          />
        </div>
        <FormSelect
          label="Status"
          options={['Active', 'In Progress', 'Scheduled', 'Review']}
          error={errors.status?.message}
          {...register('status')}
        />
        <FormInput
          label="Treatment"
          placeholder="Post-op Knee Rehabilitation"
          error={errors.treatment?.message}
          {...register('treatment')}
        />
        <FormInput
          label="Address"
          placeholder="221 Birchwood Ave, Austin, TX"
          error={errors.address?.message}
          {...register('address')}
        />

        <div className="mt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-white/70 px-4 py-2 text-sm font-semibold text-text-muted"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-gradient-to-br from-primary to-secondary px-5 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
          >
            Save Patient
          </button>
        </div>
      </form>
    </Modal>
  )
}
