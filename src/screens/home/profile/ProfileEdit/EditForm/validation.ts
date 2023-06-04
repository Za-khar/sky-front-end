import z from 'zod'

export const editFormSchema = z.object({
  login: z.string().min(3).max(16).optional(),

  name: z.string().min(3).max(50).optional(),

  surname: z.string().min(3).max(50).optional(),

  description: z.string().max(255).optional(),

  avatar: z.string().optional(),
})
