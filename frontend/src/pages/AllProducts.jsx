import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const AllProducts = () => {

  const { products } = useContext(ShopContext); 
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setCategory(prev => [...prev, e.target.value])
    }
  }
  const applyFilter = () => {
    let productsCopy = products.slice()
    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    setFilterProducts(productsCopy)
  }

  const sortProducts = () => {
    let fpCopy = filterProducts.slice()
    switch (sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)))
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)))
        break;
      default:
        applyFilter()
        break;
    }
  }

  useEffect(() => {
    setFilterProducts(products)
  }, [products])

  useEffect(() => {
    applyFilter()
  }, [category])

  useEffect(() => {
    sortProducts()
  },[sortType])

  return (
    <div>
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        {/* Filter Option */}
        <div className="min-w-60">
          <div onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
            <div className={`h-3 sm:hidden ${showFilter ? 'rotate-90':''}`}><i className="fa-solid fa-chevron-right"></i></div>
          </div>
          {/* Category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '':'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>Categories</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                  <input type="checkbox" className='w-3' value={'Robot Toys'} onChange={toggleCategory}/> Robot Toys
                </p>
                <p className='flex gap-2'>
                  <input type="checkbox" className='w-3' value={'Teddy Bear'} onChange={toggleCategory}/> Teddy Bear
                </p>
                <p className='flex gap-2'>
                  <input type="checkbox" className='w-3' value={'Car toys'} onChange={toggleCategory}/> Car Toys
                </p>
                <p className='flex gap-2'>
                  <input type="checkbox" className='w-3' value={'Lego'} onChange={toggleCategory}/> Lego
                </p>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={'All'} text2={'Products'} />
            {/* products sort */}
            <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relavent">Sort by: Default</option>
              <option value="low-high">Sort by: Low To Hight</option>
              <option value="high-low">Sort by: Hight To Low</option>
            </select>
          </div>
          {/* Map Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6 justify-items-center">
              {
                filterProducts.map((item, index) => (
                  <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                ))
              }
          </div>


        </div>
      </div>
    </div>
  )
}

export default AllProducts