import { Button } from '@/components/ui/button'
import React from 'react'

function OrdersCard() {
  return (
    <div className='w-94 h-fit bg-white rounded-lg overflow-clip flex shadow-md'>
      <div className='h-100% w-1.5 bg-yellow-500'/>
      <div className='w-full p-6 space-y-18'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h1 className='font-semibold text-2xl'>Order#702</h1>
            <div className='px-2.5 py-1 w-fit h-fit bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 text-xs rounded-full'>Pending</div>
          </div>

          <div className='text-xs font-medium text-black/50'>
            <p>Name : Aldo</p>
            <p>2 minutes ago</p>
          </div>

          <div className='pt-4'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <h1 className='font-bold text-primary'>3x</h1>
                <h1>Es Kopi F-Duck</h1>
              </div>
              <p className='text-black/50'>18K</p>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <h1 className='font-bold text-primary'>2x</h1>
                <h1>Burger DRS</h1>
              </div>
              <p className='text-black/50'>28K</p>
            </div>
          </div>
        </div>

        <div className='p-1 py-4 pb-0 border-t border-black/10 w-full'>
          <Button className="w-full h-12 rounded-lg">Proceed</Button>
        </div>
      </div>
    </div>
  )
}

export default OrdersCard