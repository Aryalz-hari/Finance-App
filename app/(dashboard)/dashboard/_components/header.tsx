import React from 'react'
import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'
export default function DashboardHeader() {
  return (
    <div className='  flex justify-between items-center border-b bg-blue-950/95 border-gray-300 w-full h-15 p-3 '>
      <div className='sm:ml-10 text-white'> Search Bar
        <Input className='ml-2 text-black w-2xs bg-white'/>
      </div>
      <div><UserButton/></div>
    </div>
  )
}
