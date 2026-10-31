import { useState } from 'react'
import { Check, Minus, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { SearchInput } from '@/components/common/SearchInput'
import { PERMISSION_CATALOG, ROLE_LABELS, ROLE_PERMISSIONS, type Role } from '@/types/roles'

const roles = Object.keys(ROLE_LABELS) as Role[]

export default function Roles() {
  const [search, setSearch] = useState('')

  const groups = PERMISSION_CATALOG.map((group) => ({
    ...group,
    flags: group.flags.filter(
      ({ label }) =>
        group.module.toLowerCase().includes(search.toLowerCase()) ||
        label.toLowerCase().includes(search.toLowerCase()),
    ),
  })).filter((group) => group.flags.length > 0)

  return (
    <>
      <PageHeader
        title="Roles & Claims"
        subtitle="Who can do what, from the Day2Day CARE Role Matrix — each cell is one bit in the JWT's per claim."
      />

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search capabilities..."
        className="max-w-md"
      />

      <section className="glass-panel rounded-3xl p-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-210 border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 border-b border-text-muted/10 bg-white/70 px-3 py-3 text-left text-xs font-semibold tracking-wide text-text-muted uppercase backdrop-blur">
                  Capability
                </th>
                {roles.map((role) => (
                  <th
                    key={role}
                    className="border-b border-text-muted/10 px-3 py-3 text-center text-xs font-semibold tracking-wide text-text-muted uppercase"
                  >
                    {ROLE_LABELS[role]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <Group key={group.module} module={group.module} flags={group.flags} roles={roles} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function Group({
  module,
  flags,
  roles: roleList,
}: {
  module: string
  flags: Array<{ label: string; flag: bigint }>
  roles: Role[]
}) {
  return (
    <>
      <tr>
        <td colSpan={roleList.length + 1} className="px-3 pt-5 pb-1.5 text-sm font-bold text-text">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" /> {module}
          </span>
        </td>
      </tr>
      {flags.map(({ label, flag }) => (
        <tr key={label} className="border-b border-text-muted/5">
          <td className="sticky left-0 z-10 bg-white/40 px-3 py-3 pl-8 text-sm text-text backdrop-blur">
            {label}
          </td>
          {roleList.map((role) => {
            const granted = (ROLE_PERMISSIONS[role] & flag) === flag
            return (
              <td key={role} className="px-3 py-3 text-center">
                {granted ? (
                  <Check className="mx-auto h-4 w-4 text-success" />
                ) : (
                  <Minus className="mx-auto h-4 w-4 text-text-muted/30" />
                )}
              </td>
            )
          })}
        </tr>
      ))}
    </>
  )
}
