'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

interface iAppProps {
  text: string
  children: React.ReactNode
  className?: string
  loading: boolean | undefined
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined
}

export function SubmitButton({
  text,
  variant,
  children,
  className,
  loading,
  disabled
}: iAppProps & React.HTMLProps<HTMLButtonElement>) {
  const { pending } = useFormStatus()
  const isSubmitting = pending || loading
  return (
    <Button
      disabled={isSubmitting || disabled}
      type='submit'
      className={className}
    >
      {isSubmitting ? (
        <div className='flex items-center justify-center gap-2'>
          {children}
          <div className='h-fit w-fit animate-spin'>
            <Loader2 />
          </div>
        </div>
      ) : (
        <Button type='submit' className='w-full' variant={variant}>
          {text}
        </Button>
      )}
    </Button>
  )
}
