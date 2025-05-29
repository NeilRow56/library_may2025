// import { AddCategoryButton } from '@/components/dialogs/add-category-button'

import { Card } from '@/components/ui/card'
import CategoryForm from '@/modules/categories/ui/components/category-form'

const ActivitiesPage = () => {
  return (
    <div className='4xl:pr-96 3xl:pr-36 container mx-auto flex flex-col space-y-4 py-2 md:pr-12 2xl:pr-24'>
      {/* <AddCategoryButton /> */}
      <div className='m-auto'>
        <Card className='flex min-w-2xl p-4'>
          <CategoryForm type='Create' />
        </Card>
      </div>
    </div>
  )
}

export default ActivitiesPage
