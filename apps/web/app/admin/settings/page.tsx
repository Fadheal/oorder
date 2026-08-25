import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import SidebarAdmin from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { Button } from '@/components/ui/button'
import { CopyIcon, DownloadIcon } from 'lucide-react'

function page() {
  return (
    <SidebarProvider>
      <SidebarAdmin activated={5}/>
      <main className='w-full bg-accent'>
        <Topbar/>
        <div className='p-12 space-y-12'>


          <section className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                QR Code
              </h1>

              <p className="text-muted-foreground">
                Share your ordering page with customers.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col justify-between rounded-xl border bg-background p-6">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">
                    Ordering QR Code
                  </h2>

                  <p className="max-w-md text-sm text-muted-foreground">
                    Customers scan this QR code to open your menu
                    and place an order.
                  </p>

                  <div className="inline-flex rounded-md bg-muted px-3 py-2">
                    <code className="text-sm">
                      oorder.com/order
                    </code>
                  </div>
                </div>

                <div className='mt-8 space-y-2'>
                  <Button className="h-10 rounded-xl w-full">
                    Generate QR-Code
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="h-10 rounded-xl" variant="outline">
                      <DownloadIcon/> Download QR
                    </Button>

                    <Button className="h-10 rounded-xl" variant="outline">
                      <CopyIcon/> Copy Link
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 bg-white p-6 h-fit rounded-2xl">
                <div className="flex size-64 items-center justify-center rounded-xl border-2 border-dashed border-black/10 bg-accent p-5 text-black/52">
                  Generate QR-Code
                </div>
                <div className='space-y-3'>
                  <div>
                    <h1 className='text-2xl font-bold'>Scan Me To Order</h1>
                    <p className='text-black/50'>Keep your time with self-ordering!</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <p className='text-xs text-black/50'>Powered By</p>
                    <h1 className='font-bold text-xl'><span className='text-green-600'>O</span>order</h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </SidebarProvider>
  )
}

export default page