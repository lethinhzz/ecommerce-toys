import React from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({id, name, image, price}) => {
  
  return (
    <Link to={`/product/${id}`}>
  <div className="bg-white rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.1)] overflow-hidden w-[300px] p-6 flex flex-col items-center text-center h-[380px]">
    
    {/* Image */}
    <div className="h-[200px] flex items-center justify-center">
      <img
        src={image}
        alt={name}
        className="max-h-full max-w-full object-contain"
      />
    </div>

    {/* Content */}
    <h3 className="mt-4 text-lg font-medium text-[#1a1a66] h-[48px] overflow-hidden">
      {name}
    </h3>

    <p className="mt-2 text-lg font-semibold text-orange-500">${price}</p>
  </div>
</Link>
  )
}

export default ProductItem