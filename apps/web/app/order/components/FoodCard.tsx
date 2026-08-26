"use client"

import { Button } from '@/components/ui/button'
import { capitalize, formatRupiah } from '@/lib/formarter'
import { useCartStore } from '@/stores/cart.store'
import React from 'react'

interface FoodCardProps {
  id: string
  name: string
  category: string
  price: number
  image: string
}

function FoodCard({id, name, category, price, image}: FoodCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <div className='h-fit w-full bg-white rounded-xl p-3 px-4 shadow-md space-y-2'>
      <div className='flex justify-between'>
        <div className='flex flex-col justify-between p-1'>
          <h1 className='font-bold text-lg'>{name}</h1>
          <p className='text-xs text-foreground'>{capitalize(category)}</p>
          <h3 className='text-green-700 text-xs font-semibold'>{formatRupiah(price)}</h3>
        </div>
        <img src={image} alt="food" className="size-12 rounded-lg border bg-muted object-cover h-19 w-auto aspect-square" />
      </div>
      <div className='w-full'>
        <Button
          className='text-xs bg-transparent border-green-600 text-green-600 px-6 hover:bg-green-600 hover:text-white w-full'
          onClick={() => addItem({
            menuId: id,
            name: name,
            price: price,
            image: image
          })}
        >Add</Button>
      </div>
    </div>
  )
}

export default FoodCard