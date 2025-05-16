import { SidebarTrigger } from '@/components/ui/sidebar'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchBar from './search-bar'

export const HomeNavbar = () => {
  return (
    <nav className='fixed top-0 right-0 left-0 z-50 h-16 items-center border px-2 pr-5'>
      <div className='flex w-full items-center gap-4'>
        {/* Menu and Logo */}
        <div className='flex flex-shrink-0 items-center'>
          <SidebarTrigger />
          <Link href='/'>
            <div className='flex items-center gap-5 p-4'>
              <Image
                src='/logo.png'
                alt='logo'
                height={32}
                width={32}
                style={{ width: 32, height: 32 }}
                unoptimized
                priority
              />
              <p className='text-xl font-semibold tracking-tight'>
                Online Library
              </p>
            </div>
          </Link>
        </div>
        <div className='container mx-auto flex flex-col pr-8'>
          <div className='flex'>
            {/* Search bar */}
            <div className='mx-auto flex max-w-[720px] flex-1 justify-center'>
              <SearchBar />
            </div>
            <div className='flex flex-shrink-0 items-center gap-4'>
              Auth Button
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
