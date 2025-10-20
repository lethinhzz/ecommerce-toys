import React, { useEffect, useState } from 'react'
import Category from './Category'
import Title from './Title'
import axios from 'axios'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
        async function fetchData() {
            const response = await axios.get(backendURL + '/api/category/list')
            setCategories(response.data.categories)
        }
        fetchData()
        console.log(categories)
    },[])
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'Shop By'} text2={'Categories'} />
      </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 gap-y-6 justify-items-center'>
          {categories.map((item, index) => (
            <Category key={index} id={item._id} name={item.name} img={item.image} bgColor={item.bgColor} />
          ))}
           
        </div>
    </div>
  )
}

export default Categories