export type Role =
  'superadmin' | 'owner' | 'branch_manager' | 'therapist' | 'front_desk' | 'billing'

export const ROLE_LABELS: Record<Role, string> = {
  superadmin: 'Super Admin',
  owner: 'Clinic Owner',
  branch_manager: 'Branch Manager',
  therapist: 'Therapist',
  front_desk: 'Front Desk',
  billing: 'Billing / Accounts',
}

/**
 * Bitmask permission catalog — mirrors apps/accounts/permissions.py (Perm)
 * in the Day2DayCare-backend repo bit-for-bit. There's no shared package
 * between the two repos, so this comment is the sync mechanism: if a flag
 * is added/removed/reordered on either side, update the other by hand.
 *
 * Source of truth for the grants below: "Day2Day CARE: Role Matrix"
 * (claude.ai/artifact/NyG1JVtbTKT66eUVJc18Nv), draft v1, 31 Oct 2026.
 *
 * Uses `bigint`, not `number`: JS's native `&`/`|`/`<<` truncate operands to
 * 32 bits, which would silently corrupt any flag at bit 32 or above.
 */
export const Permission = {
  TenantsManage: 1n << 0n,

  SettingsView: 1n << 1n,
  SettingsManage: 1n << 2n,

  BranchesView: 1n << 3n,
  BranchesManage: 1n << 4n,
  BranchesViewAll: 1n << 5n,

  StaffAccountsView: 1n << 6n,
  StaffAccountsManage: 1n << 7n,

  StaffProfilesView: 1n << 8n,
  StaffProfilesManage: 1n << 9n,

  PatientsView: 1n << 10n,
  PatientsManage: 1n << 11n,

  ClinicalNotesView: 1n << 12n,
  ClinicalNotesManage: 1n << 13n,

  AssessmentsView: 1n << 14n,
  AssessmentsManage: 1n << 15n,
  AssessmentsApprove: 1n << 16n,

  PlansView: 1n << 17n,
  PlansManage: 1n << 18n,
  PlansApprove: 1n << 19n,

  ExercisesView: 1n << 20n,
  ExercisesManage: 1n << 21n,

  AvatarsView: 1n << 22n,
  AvatarsManage: 1n << 23n,

  ExerciseAssign: 1n << 24n,

  AdherenceView: 1n << 25n,

  AppointmentsView: 1n << 26n,
  AppointmentsManage: 1n << 27n,

  SessionsView: 1n << 28n,
  SessionsManage: 1n << 29n,
  SessionsCheckin: 1n << 30n,

  ProgressView: 1n << 31n,
  ProgressManage: 1n << 32n,

  BillingView: 1n << 33n,
  BillingManage: 1n << 34n,
  BillingCollect: 1n << 35n,

  BillingApproveRefund: 1n << 36n,

  ReportsView: 1n << 37n,

  NotificationsManageTemplates: 1n << 38n,
  NotificationsSend: 1n << 39n,

  AuditLogView: 1n << 40n,

  DataExportManage: 1n << 41n,
} as const

type PermissionFlag = (typeof Permission)[keyof typeof Permission]

const ALL_PERMS: bigint = Object.values(Permission).reduce((acc, flag) => acc | flag, 0n)

/**
 * Same 42 flags as `Permission`, grouped and labelled by Role Matrix module —
 * purely for display (the "view roles and claims" page). Not consulted by `can()`.
 */
export const PERMISSION_CATALOG: Array<{
  module: string
  flags: Array<{ label: string; flag: PermissionFlag }>
}> = [
  {
    module: 'Tenants and subscriptions',
    flags: [{ label: 'Manage', flag: Permission.TenantsManage }],
  },
  {
    module: 'Clinic settings and branding',
    flags: [
      { label: 'View', flag: Permission.SettingsView },
      { label: 'Manage', flag: Permission.SettingsManage },
    ],
  },
  {
    module: 'Branches',
    flags: [
      { label: 'View', flag: Permission.BranchesView },
      { label: 'Manage', flag: Permission.BranchesManage },
      { label: 'View all (cross-branch)', flag: Permission.BranchesViewAll },
    ],
  },
  {
    module: 'Users and roles',
    flags: [
      { label: 'View', flag: Permission.StaffAccountsView },
      { label: 'Manage', flag: Permission.StaffAccountsManage },
    ],
  },
  {
    module: 'Therapist profiles and availability',
    flags: [
      { label: 'View', flag: Permission.StaffProfilesView },
      { label: 'Manage', flag: Permission.StaffProfilesManage },
    ],
  },
  {
    module: 'Patient registration and demographics',
    flags: [
      { label: 'View', flag: Permission.PatientsView },
      { label: 'Manage', flag: Permission.PatientsManage },
    ],
  },
  {
    module: 'Patient clinical history and notes',
    flags: [
      { label: 'View', flag: Permission.ClinicalNotesView },
      { label: 'Manage', flag: Permission.ClinicalNotesManage },
    ],
  },
  {
    module: 'Assessments',
    flags: [
      { label: 'View', flag: Permission.AssessmentsView },
      { label: 'Manage', flag: Permission.AssessmentsManage },
      { label: 'Approve / sign-off', flag: Permission.AssessmentsApprove },
    ],
  },
  {
    module: 'Treatment plans',
    flags: [
      { label: 'View', flag: Permission.PlansView },
      { label: 'Manage', flag: Permission.PlansManage },
      { label: 'Approve / sign-off', flag: Permission.PlansApprove },
    ],
  },
  {
    module: 'Exercise Studio: library and authoring',
    flags: [
      { label: 'View', flag: Permission.ExercisesView },
      { label: 'Manage', flag: Permission.ExercisesManage },
    ],
  },
  {
    module: 'Exercise Studio: avatars',
    flags: [
      { label: 'View', flag: Permission.AvatarsView },
      { label: 'Manage (generate, upload)', flag: Permission.AvatarsManage },
    ],
  },
  {
    module: 'Assign exercises to patient',
    flags: [{ label: 'Assign', flag: Permission.ExerciseAssign }],
  },
  {
    module: 'Home exercise player and adherence logging',
    flags: [{ label: 'View', flag: Permission.AdherenceView }],
  },
  {
    module: 'Appointments',
    flags: [
      { label: 'View', flag: Permission.AppointmentsView },
      { label: 'Manage', flag: Permission.AppointmentsManage },
    ],
  },
  {
    module: 'Sessions (check-in, treatment record, outcome)',
    flags: [
      { label: 'View', flag: Permission.SessionsView },
      { label: 'Manage', flag: Permission.SessionsManage },
      { label: 'Check-in only', flag: Permission.SessionsCheckin },
    ],
  },
  {
    module: 'Progress tracking and outcome measures',
    flags: [
      { label: 'View', flag: Permission.ProgressView },
      { label: 'Manage', flag: Permission.ProgressManage },
    ],
  },
  {
    module: 'Invoices and payments',
    flags: [
      { label: 'View', flag: Permission.BillingView },
      { label: 'Manage', flag: Permission.BillingManage },
      { label: 'Collect payment only', flag: Permission.BillingCollect },
    ],
  },
  {
    module: 'Refunds, discounts and write-offs',
    flags: [{ label: 'Approve', flag: Permission.BillingApproveRefund }],
  },
  { module: 'Reports and analytics', flags: [{ label: 'View', flag: Permission.ReportsView }] },
  {
    module: 'Notifications and reminders',
    flags: [
      { label: 'Manage templates', flag: Permission.NotificationsManageTemplates },
      { label: 'Send', flag: Permission.NotificationsSend },
    ],
  },
  { module: 'Audit log', flags: [{ label: 'View', flag: Permission.AuditLogView }] },
  {
    module: 'Data export and deletion requests',
    flags: [{ label: 'Manage', flag: Permission.DataExportManage }],
  },
]

/**
 * Per-role grants, mirroring ROLE_PERMISSIONS in the backend's
 * apps/accounts/permissions.py — with one deliberate difference: `superadmin`
 * here gets every flag (`ALL_PERMS`), matching how the backend actually
 * authorizes a platform admin (`ALL_PERMS if user.is_platform_admin else
 * ROLE_PERMISSIONS[role]` in D2DTokenSerializer), not the narrower
 * audit-only row the matrix doc gives "Platform Admin" as a tenant role.
 */
export const ROLE_PERMISSIONS: Record<Role, bigint> = {
  superadmin: ALL_PERMS,
  owner:
    Permission.SettingsView |
    Permission.SettingsManage |
    Permission.BranchesView |
    Permission.BranchesManage |
    Permission.BranchesViewAll |
    Permission.StaffAccountsView |
    Permission.StaffAccountsManage |
    Permission.StaffProfilesView |
    Permission.StaffProfilesManage |
    Permission.PatientsView |
    Permission.PatientsManage |
    Permission.ClinicalNotesView |
    Permission.AssessmentsView |
    Permission.PlansView |
    Permission.ExercisesView |
    Permission.AvatarsView |
    Permission.AvatarsManage |
    Permission.AdherenceView |
    Permission.AppointmentsView |
    Permission.AppointmentsManage |
    Permission.SessionsView |
    Permission.ProgressView |
    Permission.BillingView |
    Permission.BillingManage |
    Permission.BillingApproveRefund |
    Permission.ReportsView |
    Permission.NotificationsManageTemplates |
    Permission.AuditLogView |
    Permission.DataExportManage,
  branch_manager:
    Permission.SettingsView |
    Permission.BranchesView |
    Permission.BranchesManage |
    Permission.StaffAccountsView |
    Permission.StaffAccountsManage |
    Permission.StaffProfilesView |
    Permission.StaffProfilesManage |
    Permission.PatientsView |
    Permission.PatientsManage |
    Permission.ClinicalNotesView |
    Permission.AssessmentsView |
    Permission.PlansView |
    Permission.ExercisesView |
    Permission.AvatarsView |
    Permission.AdherenceView |
    Permission.AppointmentsView |
    Permission.AppointmentsManage |
    Permission.SessionsView |
    Permission.ProgressView |
    Permission.BillingView |
    Permission.BillingApproveRefund |
    Permission.ReportsView |
    Permission.AuditLogView,
  therapist:
    Permission.BranchesView |
    Permission.StaffProfilesView |
    Permission.PatientsView |
    Permission.PatientsManage |
    Permission.ClinicalNotesView |
    Permission.ClinicalNotesManage |
    Permission.AssessmentsView |
    Permission.AssessmentsManage |
    Permission.AssessmentsApprove |
    Permission.PlansView |
    Permission.PlansManage |
    Permission.PlansApprove |
    Permission.ExercisesView |
    Permission.ExercisesManage |
    Permission.AvatarsView |
    Permission.AvatarsManage |
    Permission.ExerciseAssign |
    Permission.AdherenceView |
    Permission.AppointmentsView |
    Permission.AppointmentsManage |
    Permission.SessionsView |
    Permission.SessionsManage |
    Permission.ProgressView |
    Permission.ProgressManage |
    Permission.BillingView |
    Permission.ReportsView,
  front_desk:
    Permission.BranchesView |
    Permission.StaffProfilesView |
    Permission.PatientsView |
    Permission.PatientsManage |
    Permission.AppointmentsView |
    Permission.AppointmentsManage |
    Permission.SessionsView |
    Permission.SessionsCheckin |
    Permission.BillingView |
    Permission.BillingCollect |
    Permission.ReportsView |
    Permission.NotificationsSend,
  billing:
    Permission.BranchesView |
    Permission.StaffProfilesView |
    Permission.PatientsView |
    Permission.AppointmentsView |
    Permission.SessionsView |
    Permission.BillingView |
    Permission.BillingManage |
    Permission.ReportsView,
}

// What each role can do. Add to this as new features need checks.
// Values are one flag, or several OR'd together when a gate needs ALL of
// them present (e.g. editStaff requires org-wide staff management AND
// cross-branch visibility, which Branch Manager has only the first of).
export const PERMISSIONS = {
  viewAllBranches: Permission.BranchesViewAll,
  compareBranches: Permission.BranchesViewAll,
  editStaff: Permission.StaffAccountsManage | Permission.BranchesViewAll,
  editOwnShift: Permission.StaffProfilesManage,
  manageBilling: Permission.BillingManage,
  manageRoles: Permission.StaffAccountsManage | Permission.BranchesViewAll,
  manageTenants: Permission.TenantsManage,
} as const satisfies Record<string, PermissionFlag | bigint>

export function can(role: Role, permission: keyof typeof PERMISSIONS): boolean {
  const required = PERMISSIONS[permission]
  return (ROLE_PERMISSIONS[role] & required) === required
}
