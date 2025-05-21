'use server'

import db from '@/lib/db'
import * as z from 'zod'
import { revalidatePath } from 'next/cache'
import { createCategorySchema } from '@/schemas/category'

////////////////////////////////////////////////////////////////////////////////
//              Category
////////////////////////////////////////////////////////////////////////////////

export async function addCategory(
  data: z.infer<typeof createCategorySchema>,
  path: string
) {
  const validatedFields = createCategorySchema.safeParse(data)
  if (!validatedFields.success) {
    return { error: 'Invalid fields!', message: validatedFields.error.message }
  }

  const { name } = validatedFields.data
  try {
    const category = await db.$transaction([
      db.book_categories.create({
        data: {
          category_name: name
        }
      })
    ])

    revalidatePath(path)
    return {
      category,
      success: true
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to create category.')
  }
}

export async function deleteCategory(id: number, path: string) {
  try {
    await db.$transaction([
      db.book_categories.delete({
        where: {
          category_id: id
        }
      })
    ])

    revalidatePath(path)
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to delete category.')
  }
}
