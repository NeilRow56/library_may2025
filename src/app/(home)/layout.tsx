import { HomeLayout } from '@/modules/home/ui/layouts/home-layout'
import React from 'react'

function HomeSectionLayout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>
}

export default HomeSectionLayout
