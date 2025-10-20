import React from 'react'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink to={'/add'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <i className="fa-solid fa-circle-plus text-xl"></i>
                <p className='hidden md:block'>Add Item</p>
            </NavLink>
            <NavLink to={'/list'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <i className="fa-solid fa-list text-xl"></i>
                <p className='hidden md:block'>List Item</p>
            </NavLink>
            <NavLink to={'/addCategory'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <i className="fa-solid fa-circle-plus text-xl"></i>
                <p className='hidden md:block'>Add Category</p>
            </NavLink>
            <NavLink to={'/listCategory'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <i className="fa-solid fa-list text-xl"></i>
                <p className='hidden md:block'>List Category</p>
            </NavLink>
            <NavLink to={'/orders'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <i className="fa-solid fa-check-to-slot text-xl"></i>
                <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar