export type Role = 'owner' | 'branch_manager' | 'therapist' | 'front_desk'

export const ROLE_LABELS: Record<Role, string> = {
  owner: 'Clinic Owner',
  branch_manager: 'Branch Manager',
  therapist: 'Therapist',
  front_desk: 'Front Desk',
}

// What each role can do. Add to this as new features need checks.
export const PERMISSIONS = {
  viewAllBranches: ['owner'],
  compareBranches: ['owner'],
  editStaff: ['owner'],
  editOwnShift: ['owner', 'branch_manager'],
  manageBilling: ['owner'],
  manageRoles: ['owner'],
} as const satisfies Record<string, Role[]>

export function can(role: Role, permission: keyof typeof PERMISSIONS): boolean {
  return (PERMISSIONS[permission] as readonly Role[]).includes(role)
}
