import type { Tenant } from '@/types/tenant'

const tenants: Tenant[] = [
  {
    id: 't-1',
    code: 'alpha',
    name: 'Alpha Physio Clinic',
    plan: 'Growth',
    status: 'Active',
    branchCount: 3,
    staffCount: 18,
    onboardedOn: 'Jan 12, 2025',
    contactEmail: 'admin@alphaphysio.in',
  },
  {
    id: 't-2',
    code: 'beta',
    name: 'Beta Rehab Center',
    plan: 'Starter',
    status: 'Trial',
    branchCount: 1,
    staffCount: 4,
    onboardedOn: 'Apr 2, 2025',
    contactEmail: 'owner@betarehab.in',
  },
  {
    id: 't-3',
    code: 'cbe-01',
    name: 'Coimbatore Sports Physio',
    plan: 'Growth',
    status: 'Active',
    branchCount: 2,
    staffCount: 11,
    onboardedOn: 'Nov 3, 2024',
    contactEmail: 'hello@cbesportsphysio.in',
  },
  {
    id: 't-4',
    code: 'northside',
    name: 'Northside Physiotherapy',
    plan: 'Enterprise',
    status: 'Active',
    branchCount: 6,
    staffCount: 42,
    onboardedOn: 'Jun 18, 2024',
    contactEmail: 'ops@northsidephysio.in',
  },
  {
    id: 't-5',
    code: 'riverdale',
    name: 'Riverdale Spine & Joint',
    plan: 'Starter',
    status: 'Suspended',
    branchCount: 1,
    staffCount: 3,
    onboardedOn: 'Feb 25, 2025',
    contactEmail: 'admin@riverdalespine.in',
  },
]

export const platformService = {
  listTenants: (): Promise<Tenant[]> => Promise.resolve(tenants),
  getSummary: () => {
    const active = tenants.filter((t) => t.status === 'Active').length
    const trial = tenants.filter((t) => t.status === 'Trial').length
    const suspended = tenants.filter((t) => t.status === 'Suspended').length
    const totalBranches = tenants.reduce((sum, t) => sum + t.branchCount, 0)
    return Promise.resolve({ total: tenants.length, active, trial, suspended, totalBranches })
  },
}
