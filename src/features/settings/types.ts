import { z } from 'zod'

export const staffMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  role: z.enum(['owner', 'branch_manager', 'therapist', 'front_desk']),
  branch: z.string(),
})

export type StaffMember = z.infer<typeof staffMemberSchema>
