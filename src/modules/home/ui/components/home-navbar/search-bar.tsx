import React from 'react'

import { redirect } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function SearchBar() {
  async function doSearch(formData: FormData) {
    'use server'
    const search_by = formData.get('search_by') as string
    const search = formData.get('search') as string

    // console.log(search_by, search)

    if (search && search_by) {
      redirect(
        `/search?query=${encodeURIComponent(search)}&search_by=${encodeURIComponent(search_by)}`
      )
    }
  }
  return (
    <form action={doSearch} className='hidden md:flex'>
      <div className='flex w-full space-y-2 sm:items-center sm:space-y-0 sm:space-x-2 md:flex-row lg:max-w-lg'>
        <p className='min-w-[70px] text-sm text-slate-500'>Search by</p>
        <Select name='search_by'>
          <SelectTrigger className='w-full lg:w-[480px]'>
            <SelectValue placeholder='Keyword' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='title'>Title</SelectItem>
            <SelectItem value='category'>Category</SelectItem>
          </SelectContent>
        </Select>
        <Input type='search' placeholder='Search...' name='search' />
        <Button type='submit'>Search</Button>
      </div>
    </form>
  )
}

export default SearchBar
