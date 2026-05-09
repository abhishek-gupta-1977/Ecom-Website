import SideBar from '@/components/SideBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex'>
      Dashboard
      <SideBar/>
      <div className='flex-1'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
