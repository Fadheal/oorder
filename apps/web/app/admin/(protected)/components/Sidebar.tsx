"use client"

import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { authClient } from '@/lib/auth-client';
import { ChartColumnBig, LayoutDashboard, LogOut, SaladIcon, ScrollTextIcon, SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface SidebarAdminProps {
  activated: number;
}

function SidebarAdmin({ activated } : SidebarAdminProps) {
  async function handleLogout() {
    await authClient.signOut()

    window.location.href = "/admin/login"
  }

  const { data: session } = authClient.useSession()

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
      <SidebarFooter>
        <div className="flex items-center gap-3 rounded-xl border bg-background p-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {session?.user?.name
              ?.slice(0, 1)
              .toUpperCase() ?? "A"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              {session?.user?.name ?? "Admin"}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
          <Button variant='destructive' className='aspect-square p-4' onClick={handleLogout}>
            <LogOut className='size-3.5'/>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default SidebarAdmin