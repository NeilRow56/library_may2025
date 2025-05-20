import { addCategory } from '@/actions/actions'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createCategorySchema } from '@/schemas/category'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Inputs = z.infer<typeof createCategorySchema>

type AddCategoryFormProps = {
  onSave: () => void
}

export const AddCategoryForm = ({ onSave }: AddCategoryFormProps) => {
  const path = usePathname()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: ''
    }
  })

  const processForm: SubmitHandler<Inputs> = async data => {
    startTransition(async () => {
      const result = await addCategory(data, path)

      if (result.error) {
        toast.error(result.error)
        return
      }
      onSave()

      toast.success(`${data.name} category created`)
    })
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processForm)} className='space-y-1'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder='category name...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='w-[150px] py-2'>
            {isPending ? (
              <Button disabled className='w-full'>
                <Loader2 className='mr-2 size-4 animate-spin' /> Please wait...
              </Button>
            ) : (
              <Button type='submit' className='w-full'>
                Save category
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  )
}
