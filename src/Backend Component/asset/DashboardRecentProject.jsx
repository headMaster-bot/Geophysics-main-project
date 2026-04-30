import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardRecentData from './DashboardRecentData'

export default function DashboardRecentProject() {
  const viewall = useNavigate()
  const handleViewAll = () => {
    viewall('/dashboard/my-project')
  }
  return (
    <div className='md:mx-0 mx-auto w-11/12 md:w-[967px] py-8'>
      <div className="flex justify-between items-center>">
        <h1 className="font-instrument font-bold md:text-[20px] leading-[32px] tracking-[0.07px]">Recent Projects</h1>
        <div className='w-[95px]'>
            <button type="button" onClick={handleViewAll} className='rounded-[10px] border-2 py-[8px] px-[18px] border-[#DADCE0] capitalize'>view all</button>
        </div>
      </div>
      <DashboardRecentData />
    </div>
  )
}
