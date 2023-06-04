import z from 'zod'

export const changePasswordSchema = z.object({
  password: z.string().min(6).max(18),

  oldPassword: z.string().min(6).max(18),
})
