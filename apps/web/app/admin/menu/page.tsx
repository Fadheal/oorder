import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import SidebarAdmin from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { columns, Items } from './tables/Columns'
import DataTable from './tables/DataTable'

async function getData(): Promise<Items[]> {
  
  return [
    {
      id: "k3j2hdf844",
      image: "https://media.istockphoto.com/id/1309352410/id/foto/cheeseburger-dengan-tomat-dan-selada-di-papan-kayu.jpg?s=612x612&w=0&k=20&c=bPYfZhKoGj_WVMLCkqIPGOdofWajqU7Dh6yWrhmtM9I=",
      name: "Burger DRS",
      category: "Snack",
      price: 28000
    },
    {
      id: "k3j2hdf844",
      image: "https://cdn1-production-images-kly.akamaized.net/uccajd5ZfGlabswvtbfnGA37eRE=/469x625/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/5415424/original/027565900_1763370720-IMG_4093-01.jpeg",
      name: "Es Kopi F-Duck",
      category: "Drink",
      price: 18000
    },
  ]
}

async function page() {
  const data = await getData()

  return (
    <SidebarProvider>
      <SidebarAdmin activated={2}/>
      <main className='w-full bg-accent'>
        <Topbar/>
        <div className='p-12'>
          <DataTable columns={columns} data={data} />
        </div>
      </main>
    </SidebarProvider>
  )
}

export default page