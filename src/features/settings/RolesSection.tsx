import { ROLE_LABELS, type Role } from '@/types/roles'
import { useStaffRoles, useUpdateStaffRole } from './useStaffRoles'

export function RolesSection() {
  const { data, isPending, error } = useStaffRoles()
  const updateRole = useUpdateStaffRole()

  if (isPending) return <p>Loading staff...</p>
  if (error) return <p>Could not load staff list.</p>

  return (
    <div>
      <h2>Roles & Access</h2>
      <p>Decide what each staff member can see and do in the app.</p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th>Name</th>
            <th>Branch</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.branch}</td>
              <td>
                <select
                  value={person.role}
                  onChange={(e) =>
                    updateRole.mutate({ id: person.id, role: e.target.value as Role })
                  }
                >
                  {Object.entries(ROLE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {updateRole.isSuccess && <p>Saved.</p>}
    </div>
  )
}
