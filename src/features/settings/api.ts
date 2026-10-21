import { z } from 'zod'
import { api } from '@/lib/api'
import { staffMemberSchema, type StaffMember } from './types'

export async function getStaffRoles(): Promise<StaffMember[]> {
  const { data } = await api.get('/staff')
  return z.array(staffMemberSchema).parse(data)
}

export async function updateStaffRole(id: number, role: StaffMember['role']): Promise<void> {
  await api.patch(`/staff/${id}`, { role })
}
