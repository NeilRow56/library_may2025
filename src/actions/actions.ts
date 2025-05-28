'use server'

import db from '@/lib/db'

import { revalidatePath } from 'next/cache'

////////////////////////////////////////////////////////////////////////////////
//              Category
////////////////////////////////////////////////////////////////////////////////

export async function addCategory(name: string, path: string) {
  try {
    const category = await db.$transaction([
      db.book_categories.create({
        data: {
          category_name: name
        }
      })
    ])

    revalidatePath(path)
    return category
  } catch (error) {
    throw error
  }
}

export async function updateCategory(id: number, name: string, path: string) {
  if (!id) throw new Error('Missing id')

  try {
    await db.$transaction([
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
  } catch (error) {
    throw error
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
