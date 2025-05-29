import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getCategoryById } from '@/lib/actions/category'
import CategoryForm from '@/modules/categories/ui/components/category-form'

export const metadata: Metadata = {
  title: 'Update Product'
}

const AdminCategoryUpdatePage = async (props: {
  params: Promise<{
    id: number
  }>
}) => {
  const { id } = await props.params

  const category = await getCategoryById(id)
  const onSave = () => {}
  if (!category) return notFound()

  return (
    <div className='mx-auto max-w-5xl space-y-8'>
      <h1 className='h2-bold'>Update Category</h1>

      <CategoryForm
        type='Update'
        onSave={onSave}
        category_id={category.category_id}
      />
    </div>
  )
}

export default AdminCategoryUpdatePage
