import React from 'react'
import logo from '../../Fontend Component/image/brandLogo.png'
export default function NavBarBand() {
  return (
    <div className='max-w-[202px]  flex gap-3 items-center'>
       <div className='md:w-[32px] '>
          <img src={logo} alt="brand" />
          <p className=""></p>
       </div>
       <div className=''>
         <p className="font-instrument font-semibold md:text-[18px] text-10 leading-[28.2px] tracking-[-0.44px] text-[#101828]">
            GeoSurvey Planner
         </p>
       </div>
    </div>
  )
}
