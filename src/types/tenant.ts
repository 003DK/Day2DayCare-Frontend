export type TenantStatus = 'Active' | 'Trial' | 'Suspended'

export interface Tenant {
  id: string
  code: string
  name: string
  plan: string
  status: TenantStatus
  branchCount: number
  staffCount: number
  onboardedOn: string
  contactEmail: string
}
