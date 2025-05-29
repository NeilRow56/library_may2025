'use server'

import db from '@/lib/db'

import { revalidatePath } from 'next/cache'
import { insertCategorySchema, updateCategorySchema } from '../validators'
import { z } from 'zod'
import { formatError } from '../utils'

//Create a category

export async function createBookCategory(
  data: z.infer<typeof insertCategorySchema>,
  path: string
) {
  try {
    const category = insertCategorySchema.parse(data)
    await db.book_categories.create({ data: category })

    revalidatePath(path)

    return {
      success: true,
      category,
      message: 'Category created successfully'
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// Update a category
export async function updateBookCategory(
  data: z.infer<typeof updateCategorySchema>,
  path: string
) {
  try {
    const category = updateCategorySchema.parse(data)
    const categoryExists = await db.book_categories.findFirst({
      where: { category_id: category.category_id }
    })

    if (!categoryExists) throw new Error('Category not found')

    await db.book_categories.update({
      where: { category_id: category.category_id },
      data: category
    })

    revalidatePath(path)

    return {
      success: true,
      message: 'Category updated successfully'
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export async function deleteCategory(id: number, path: string) {
  try {
    const categoryExists = await db.book_categories.findFirst({
      where: { category_id: id }
    })

    if (!categoryExists) throw new Error('Category not found')
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
