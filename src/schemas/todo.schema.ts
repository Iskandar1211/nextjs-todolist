import z from 'zod'

export const TodoSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  title: z.string(),
  completed: z.boolean(),
})

export type TodoType = z.infer<typeof TodoSchema>