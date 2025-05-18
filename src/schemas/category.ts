import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Category must be entered'
    })
    .max(20)
})

// Schema for updating categories
export const updateProductSchema = createCategorySchema.extend({
  id: z.string().min(1, 'Id is required')
})
