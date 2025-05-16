import { SidebarProvider } from '@/components/ui/sidebar'
import { HomeNavbar } from '../components/home-navbar'
import { HomeSidebar } from '../components/home-sidebar'
import Footer from '../components/footer'

interface HomeLayoutProps {
  children: React.ReactNode
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <div className='w-full'>
        <HomeNavbar />

        <div className='flex min-h-full pt-[4rem]'>
          <HomeSidebar />
          <main className='flex-1 overflow-auto p-4'>
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
