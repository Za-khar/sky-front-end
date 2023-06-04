import z from 'zod'

export const loginFormSchema = z.object({
  login: z.string().min(3).max(16).trim(),
  password: z.string().min(6).max(18),
})
