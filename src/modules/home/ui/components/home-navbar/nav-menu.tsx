import Link from 'next/link'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'

export const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='pb-2'>
            Library resources
          </NavigationMenuTrigger>
          <NavigationMenuContent className=''>
            <ul className='flex flex-col justify-center md:w-[300px] 2xl:w-[400px]'>
              <li className=''>
                <Link
                  href='library-card'
                  className='hover:bg-accent block space-y-1 rounded p-3'
                >
                  <div className='leading-none font-medium'>Library card</div>
                  <p className='text-muted-foreground text-sm text-wrap'>
                    Use your library card to borrow materials, access digital
                    resources, and explore library technology.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  href='book-a-room'
                  className='hover:bg-accent block space-y-1 rounded p-3'
                >
                  <div className='leading-none font-medium'>Book a room</div>
                  <p className='text-muted-foreground text-sm'>
                    Book a room for a meeting or group discussions.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  href='equipment-rental'
                  className='hover:bg-accent block space-y-1 rounded p-3'
                >
                  <div className='leading-none font-medium'>
                    Equipment rental
                  </div>
                  <p className='text-muted-foreground text-sm'>
                    Rent 3D printers, projectors and more.
                  </p>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
