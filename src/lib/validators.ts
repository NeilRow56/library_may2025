import { z } from 'zod'

// category_name and category_id are the schema.prisma field titles

export const insertCategorySchema = z.object({
  category_name: z
    .string()
    .min(2, {
      message: 'Category name must be entered'
    })
    .max(20)
})

export const updateCategorySchema = insertCategorySchema.extend({
  category_id: z.number().min(1)
})
