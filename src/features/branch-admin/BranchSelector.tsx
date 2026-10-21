import { useAuth } from '@/hooks/useAuth'
import { can } from '@/types/roles'

const BRANCHES = ['Anna Nagar', 'Porur', 'Velachery'] // replace with API data later

export function BranchSelector() {
  const { role, branchId, setRole } = useAuth()
  const canSeeAll = can(role, 'viewAllBranches')

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <select defaultValue={branchId ?? 'all'} disabled={!canSeeAll}>
        {canSeeAll && <option value="all">All Branches</option>}
        {BRANCHES.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      <span style={{ padding: '2px 10px', borderRadius: 999, background: '#eef2ff' }}>
        {role === 'owner' ? 'Owner' : 'Manager'}
      </span>
      {/* Temporary: lets you preview both roles until real login is wired up */}
      <button onClick={() => setRole(role === 'owner' ? 'branch_manager' : 'owner')}>
        Switch role (test)
      </button>
    </div>
  )
}
