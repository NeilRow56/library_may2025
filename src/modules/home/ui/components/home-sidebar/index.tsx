import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { MainSection } from './mainsection'

export const HomeSidebar = () => {
  return (
    <Sidebar className='z-40 border-r pt-24' collapsible='icon'>
      <SidebarContent className='bg-background'>
        <MainSection />
        <Separator />
      </SidebarContent>
    </Sidebar>
  )
}
