import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { ChartColumnBig, LayoutDashboard, SaladIcon, ScrollTextIcon, SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface SidebarAdminProps {
  activated: number;
}

function SidebarAdmin({ activated } : SidebarAdminProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className='p-4'>
          <h1 className='font-bold text-4xl'><span className='text-green-600'>O</span>order</h1>
          <p className='text-xs text-black/60 ml-0.5'>Self Order System</p>
        </div>
      </SidebarHeader>
      <SidebarContent className='px-4'>
        <SidebarMenu>
          <SidebarMenuItem className='space-y-2'>
            <SidebarMenuButton className='h-12 rounded-lg data-active:bg-green-600 data-active:text-white data-active:hover:bg-green-600 data-active:hover:text-white transition-colors' isActive={activated==1}>
              <Link href="/admin/dashboard" className='flex items-center gap-2 w-full h-full p-2'>
                <LayoutDashboard/>
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton className='h-12 rounded-lg text-black/72 data-active:bg-green-600 data-active:text-white data-active:hover:bg-green-600 data-active:hover:text-white transition-colors' isActive={activated==2}>
              <Link href="/admin/menu" className='flex items-center gap-2 w-full h-full p-2'>
                <SaladIcon/>
                <span>Menu Management</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton className='h-12 rounded-lg text-black/72 data-active:bg-green-600 data-active:text-white data-active:hover:bg-green-600 data-active:hover:text-white transition-colors' isActive={activated==3}>
              <Link href="/admin/orders" className='flex items-center gap-2 w-full h-full p-2'>
                <ScrollTextIcon/>
                <span>Orders</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton className='h-12 rounded-lg text-black/72 data-active:bg-green-600 data-active:text-white data-active:hover:bg-green-600 data-active:hover:text-white transition-colors' isActive={activated==5}>
              <Link href="/admin/settings" className='flex items-center gap-2 w-full h-full p-2'>
                <SettingsIcon/>
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  )
}

export default SidebarAdmin