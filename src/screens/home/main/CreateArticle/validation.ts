import z from 'zod'

export const createArticleSchema = z.object({
  title: z.string().min(1).max(50),
  text: z.string().min(1).max(1000),
  topics: z.array(z.any()).min(1).max(10),
})
