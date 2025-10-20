import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({id, name, img, bgColor}) => {
  return (
    <Link className='cursor-pointer' to={`/products`}>
        <div className="bg-white rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden w-[300px] p-4">
        {/* Image */}
        <div className={`bg-[${bgColor}] h-[200px] p-6 flex items-center justify-center rounded-xl`}>
            <img
            src={img}
            alt={name}
            className="max-h-full max-w-full object-contain"
            />
        </div>

        {/* Content */}
        <div className="p-4">
            <h3 className="text-lg font-medium text-gray-800">{name}</h3>
            <p
            className="mt-4 inline-flex items-center text-sm font-medium text-orange-500 hover:text-orange-600"
            >
            Buy Now
            <span className="ml-1">→</span>
            </p>
        </div>
        </div>
    </Link>
   
  )
}

export default Category