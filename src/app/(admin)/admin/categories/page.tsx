import db from '@/lib/db'
import { AddCategoryButton } from '@/modules/categories/ui/components/add-category-button'

import CategoriesTable from '@/modules/categories/ui/components/categories-table'

async function CategoriesPage() {
  const [categories, total] = await db.$transaction([
    db.book_categories.findMany(),
    db.book_categories.count()
  ])

  return (
    <div className='container mx-auto flex flex-col space-y-4 p-2'>
      <div className='flex w-full justify-end'>
        <AddCategoryButton />
      </div>

      <CategoriesTable data={{ data: categories, total: total }} />
    </div>
  )
}

export default CategoriesPage
