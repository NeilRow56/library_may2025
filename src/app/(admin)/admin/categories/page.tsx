import { AddCategoryButton } from '@/modules/categories/ui/components/add-category-button'

const CategoriesPage = () => {
  return (
    <div className='flex flex-col space-y-4 p-2'>
      <div className='flex w-full justify-end'>
        <AddCategoryButton />
      </div>
    </div>
  )
}

export default CategoriesPage
