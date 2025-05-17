'use client'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { DockIcon, FlameIcon, HomeIcon, PlaySquareIcon } from 'lucide-react'
import Link from 'next/link'

const items = [
  {
    title: 'Admin',
    url: '/admin',
    icon: DockIcon
  },
  {
    title: 'Catalogue',
    url: '/',
    icon: HomeIcon
  },
  {
    title: 'Locations',
    url: '/locations',
    icon: PlaySquareIcon,
    auth: true
  },
  {
    title: 'Activities',
    url: '/activities',
    icon: FlameIcon
  }
]

export const MainSection = () => {
  return (
    <SidebarGroup className=''>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={false} // TODO: Change to look at current pathname
              >
                <Link className='item-center flex gap-4' href={item.url}>
                  <item.icon />
                  <span className='text-sm'>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
