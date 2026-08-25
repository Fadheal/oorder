import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import SidebarAdmin from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { Banknote, ChartNoAxesCombinedIcon, Clock, HandbagIcon, ScrollText } from 'lucide-react'

function page() {
  return (
    <SidebarProvider>
      <SidebarAdmin activated={1}/>
      <main className='w-full bg-accent'>
        <Topbar/>
        <div className='p-12'>
          <div className='space-y-1'>
            <h1 className='font-bold text-4xl'>Today's Summary</h1>
            <p className='text-black/62 ml-1'>Here's what's happening at Downtown Branch right now.</p>
          </div>
          <div className='flex w-full items-center justify-between py-6'>

            <div className='w-94 h-52 bg-white rounded-xl shadow-md p-6 flex flex-col justify-between'>
              <div className='flex items-start justify-between w-full'>
                <div className='bg-green-600/10 text-green-600 w-fit h-fit p-3 rounded-full'>
                  <Banknote className='w-6 h-6'/>
                </div>
                <div className='bg-green-600/10 text-green-600 flex gap-2 text-xs items-center px-2 rounded-full border border-green-600/10'>
                  <ChartNoAxesCombinedIcon className='w-4'/>
                  +12,5%
                </div>
              </div>
              <div>
                <h1 className='text-xl'>Total Revenue</h1>
                <h1 className='text-3xl font-semibold font-sans'>Rp.52,000,000.00</h1>
              </div>
            </div>

            <div className='w-94 h-52 bg-white rounded-xl shadow-md p-6 flex flex-col justify-between'>
              <div className='flex items-start justify-between w-full'>
                <div className='bg-yellow-600/10 text-yellow-600 w-fit h-fit p-3 rounded-full'>
                  <ScrollText className='w-6 h-6'/>
                </div>
              </div>
              <div>
                <h1 className='text-xl'>Total Orders</h1>
                <h1 className='text-3xl font-semibold font-sans'>152 Orders</h1>
              </div>
            </div>

            <div className='w-94 h-52 bg-white rounded-xl shadow-md p-6 flex flex-col justify-between'>
              <div className='flex items-start justify-between w-full'>
                <div className='bg-blue-600/10 text-blue-600 w-fit h-fit p-3 rounded-full'>
                  <HandbagIcon className='w-6 h-6'/>
                </div>
              </div>
              <div>
                <h1 className='text-xl'>Avg. Order Value</h1>
                <h1 className='text-3xl font-semibold font-sans'>Rp.32,000.00</h1>
              </div>
            </div>

            <div className='w-94 h-52 bg-white rounded-xl shadow-md p-6 flex flex-col justify-between'>
              <div className='flex items-start justify-between w-full'>
                <div className='bg-gray-600/10 text-gray-600 w-fit h-fit p-3 rounded-full'>
                  <Clock className='w-6 h-6'/>
                </div>
              </div>
              <div>
                <h1 className='text-xl'>Peak Hour</h1>
                <h1 className='text-3xl font-semibold font-sans'>7:00 PM</h1>
              </div>
            </div>

          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}

export default page