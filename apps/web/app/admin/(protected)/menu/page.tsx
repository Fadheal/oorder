"use client"

import { SidebarProvider } from '@/components/ui/sidebar'
import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { columns, Items } from './tables/Columns'
import DataTable from './tables/DataTable'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import AddMenuDialog, { MenuFormValues } from './components/AddMenuDialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from "axios"

async function getData(): Promise<Items[]> {
  const response = await axios.get<Items[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/menu`
  )

  return response.data
}

async function createMenu(data: MenuFormValues) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/menu`,
    data
  )

  return response.data
}

function page() {
  const [openAdd, setOpenAdd] = useState(false)
  
  const queryClient = useQueryClient()

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: getData,
  })

  const createMutation = useMutation({
    mutationFn: createMenu,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menu"],
      })

      setOpenAdd(false)
    },

    onError: (error) => {
      console.error("Failed create menu:", error)
    },
  })

  const handleSubmit = async (data: MenuFormValues) => {
    await createMutation.mutateAsync(data)
  }

  return (
    <SidebarProvider>
      <SidebarAdmin activated={2}/>
      <main className='w-full bg-accent'>
        <Topbar/>
        <div className='p-12 space-y-6'>
          <div className='w-full flex items-center justify-between'>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Menu Management
              </h1>

              <p className="text-muted-foreground">
                Manage your menu here.
              </p>
            </div>
            
            <Button className="p-4 gap-2" onClick={() => setOpenAdd(true)}>
              <PlusIcon className="size-4" />
              Add Menu
            </Button>
          </div>
          <DataTable columns={columns} data={data} />
        </div>
        <AddMenuDialog
          open={openAdd}
          onOpenChange={setOpenAdd}
          onSubmit={handleSubmit}
        />
      </main>
    </SidebarProvider>
  )
}

export default page