import React from 'react'
import Sidebar from './_components/sidebar'
import Header from '@/app/_components/header';
export default function DashboardLayout({children}:{children:React.ReactNode}) {
  return (
    <div>
      <div className='fixed md:w-60  bg-blue-950 sm:w-40'>
        <Sidebar/>
      </div>
      <div className='md:ml-60 bg-gray-800 flex items-center'>{children}</div>
    </div>
  );
}
