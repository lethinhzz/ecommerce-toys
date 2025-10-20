import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const Bestseller = () => {
    const {products} = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])
    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller))
        setBestSeller(bestProduct.slice(0,5))
    }, [])
  return (
    <div className='my-10'>
        <div className="text-center text-3xl py-8">
            <Title text1={"Best Seller"} text2={"In 2025"} />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 gap-y-6 justify-items-center'>
            {
                bestSeller.map((item, index) => (
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    
                ))
            }
        </div>
    </div>
  )
}

export default Bestseller