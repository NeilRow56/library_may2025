import { AddCategoryButton } from '@/modules/categories/ui/components/add-category-button'
import db from '@/lib/db'
import CategoriesTable from '@/modules/categories/ui/components/categories-table'

const CategoriesPage = async () => {
  const [categories] = await db.$transaction([db.book_categories.findMany()])
  return (
    <div className='flex flex-col space-y-4 p-2'>
      <div className='flex w-full justify-end'>
        <AddCategoryButton />
      </div>
      <CategoriesTable data={{ data: categories }} />
    </div>
  )
}

export default CategoriesPage
