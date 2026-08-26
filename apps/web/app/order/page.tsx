"use client"

import React from 'react'
import FoodCard from './components/FoodCard'
import { Items } from '../admin/menu/tables/Columns'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Cart from './components/Cart'

async function getData(): Promise<Items[]> {
  const response = await axios.get<Items[]>(
    "http://localhost:3001/api/menu/available"
  )

  return response.data
}

function page() {
  const queryClient = useQueryClient()

  const {
    data = []
  } = useQuery({
    queryKey: ["menu"],
    queryFn: getData,
  })

  return (
    <main className='bg-accent w-full h-screen'>
      <header className='w-full h-18 flex items-center justify-center'>
        <h1 className='font-bold text-4xl'><span className='text-green-600'>O</span>order</h1>
      </header>
      <section className='p-4 space-y-4'>
        {data.map((item) => (
          <FoodCard
            key={item.id}
            id={item.id}
            name={item.name}
            category={item.category}
            price={item.price}
            image={item.image}
          />
        ))}
        <Cart/>
      </section>
    </main>
  )
}

export default page