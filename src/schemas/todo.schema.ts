import z from 'zod'

export const TodoSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  dateFrom: z.string(),
  start: z.string(),
  end: z.string(),
  title: z.string(),
  completed: z.boolean(),
  description:z.string().optional()
})

export type TodoType = z.infer<typeof TodoSchema>