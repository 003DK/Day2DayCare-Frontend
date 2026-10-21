import { useAuth } from '@/hooks/useAuth'
import { can } from '@/types/roles'

export function StaffTab() {
  const { role } = useAuth()
  const canEdit = can(role, 'editStaff')

  return (
    <div>
      <h3>Staff</h3>
      <p>Therapist list, specialization, utilization and shift roster.</p>
      {canEdit ? <button>Add Staff</button> : <p>Only the Clinic Owner can add or remove staff.</p>}
    </div>
  )
}
