import z from 'zod'

export const registrationFormSchema = z
  .object({
    login: z.string().min(3).max(16).trim(),
    password: z.string().min(6).max(18),
    confirmationPassword: z.string().min(6).max(18),
    name: z.string().min(3).max(50).trim(),
    surname: z.string().min(3).max(50).trim(),
  })
  .refine(
    ({ password, confirmationPassword }) => password === confirmationPassword,
    {
      message: "The passwords don't match",
      path: ['confirmationPassword'],
    },
  )
