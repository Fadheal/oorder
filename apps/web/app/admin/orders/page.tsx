import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import SidebarAdmin from '../components/Sidebar'
import Topbar from '../components/Topbar'
import OrdersCard from './components/OrdersCard'

function page() {
  return (
    <SidebarProvider>
      <SidebarAdmin activated={3}/>
      <main className='w-full bg-accent'>
        <Topbar/>
        <div className='p-12 grid grid-cols-4 gap-6'>
          <OrdersCard/>
          <OrdersCard/>
          <OrdersCard/>
          <OrdersCard/>
          <OrdersCard/>
        </div>
      </main>
    </SidebarProvider>
  )
}

export default page