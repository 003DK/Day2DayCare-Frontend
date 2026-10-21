import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getStaffRoles, updateStaffRole } from './api'
import type { StaffMember } from './types'

export function useStaffRoles() {
  return useQuery({ queryKey: ['staff'], queryFn: getStaffRoles })
}

export function useUpdateStaffRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: StaffMember['role'] }) =>
      updateStaffRole(id, role),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['staff'] }),
  })
}
