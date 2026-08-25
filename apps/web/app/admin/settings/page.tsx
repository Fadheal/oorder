import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import SidebarAdmin from '../components/Sidebar'

function page() {
  return (
    <SidebarProvider>
      <SidebarAdmin activated={5}/>
      <main className='w-full bg-accent'>
      
      </main>
    </SidebarProvider>
  )
}

export default page