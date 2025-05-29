'use server'

import db from '@/lib/db'

import { revalidatePath } from 'next/cache'

import { formatError } from '../utils'

//Create a category

export async function createBookCategory(name: string, path: string) {
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
      success: true,
      category
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// Update a category
export async function updateBookCategory(
  id: number,
  name: string,
  path: string
) {
  if (!id) throw new Error('Missing id')
  try {
    const category = await db.$transaction([
      db.book_categories.update({
        where: {
          category_id: id
        },
        data: {
          category_name: name
        }
      })
    ])

    revalidatePath(path)

    return {
      success: true,
      category
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

// Get single category by it's ID
export async function getCategoryById(categoryId: number) {
  const data = await db.book_categories.findFirst({
    where: { category_id: categoryId }
  })

  return data
}
