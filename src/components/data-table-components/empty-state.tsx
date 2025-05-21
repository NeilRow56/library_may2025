import { Ban } from 'lucide-react'

interface iAppProps {
  title: string
  description: string
}

export function EmptyState({
  description,

  title
}: iAppProps) {
  return (
    <div className='h-ful animate-in fade-in-50 flex flex-1 flex-col items-center justify-center rounded-md border-2 border-dashed p-8 text-center'>
      <div className='bg-primary/10 flex size-20 items-center justify-center rounded-full'>
        <Ban className='size-10 text-red-300' />
      </div>
      <h2 className='mt-6 text-xl font-semibold'>{title}</h2>
      <p className='max-w-xm text-muted-foreground mx-auto mt-2 mb-8 text-center text-sm'>
        {description}
      </p>
    </div>
  )
}
