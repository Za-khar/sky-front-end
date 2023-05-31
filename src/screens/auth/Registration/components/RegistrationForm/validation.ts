import z from 'zod'

export const registrationFormSchema = z
  .object({
    login: z.string().min(3).max(16),
    password: z.string().min(6).max(18),
    confirmationPassword: z.string().min(6).max(18),
  })
  .refine(
    ({ password, confirmationPassword }) => password === confirmationPassword,
    {
      message: "The passwords don't match",
      path: ['confirmationPassword'],
    },
  )
