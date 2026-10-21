import { useAuth } from '@/hooks/useAuth'
import { can } from '@/types/roles'
import { Tabs } from '@/components/Tabs'
import { BranchSelector } from './BranchSelector'
import { OverviewTab } from './OverviewTab'
import { StaffTab } from './StaffTab'
import { ReportsTab } from './ReportsTab'
import { CompareBranchesTab } from './CompareBranchesTab'

export default function BranchAdminPage() {
  const { role } = useAuth()

  const tabs = [
    { id: 'overview', label: 'Overview', content: <OverviewTab /> },
    { id: 'staff', label: 'Staff', content: <StaffTab /> },
    { id: 'reports', label: 'Reports', content: <ReportsTab /> },
    ...(can(role, 'compareBranches')
      ? [{ id: 'compare', label: 'Compare Branches', content: <CompareBranchesTab /> }]
      : []),
  ]

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <BranchSelector />
      </div>
      <Tabs tabs={tabs} />
    </div>
  )
}
