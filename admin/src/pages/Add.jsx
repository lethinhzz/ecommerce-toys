import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Add = ({token}) => {

    const [image, setImage] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [bestseller, setBestseller] = useState(false)

    const [listCategories, setListCategories] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(backendUrl + '/api/category/list')
            setListCategories(response.data.categories)
        }
        fetchData()
    },[])
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("image", image)
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("bestseller", bestseller)

            const response = await axios.post(backendUrl + "/api/product/add", formData, {headers:{token}})
            if(response.data.success){
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage(false)
                setPrice('')
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div>
            <p className='mb-2'>Upload Image</p>
            <div className='flex gap-4'>
                <label htmlFor="image">
                    <img className='w-48' src={!image ? `./upload_area.png` : URL.createObjectURL(image)} alt="" />
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden/>
                </label>
            </div>
        </div>
        <div className='w-full '>
            <p className='mb-2'>Product Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
        </div>
        <div className='w-full '>
            <p className='mb-2'>Product Description</p>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
        </div>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div>
                <p className='mb-2'>Product Category</p>
                <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                    {
                        listCategories.map((category, index) => (
                            <option key={index} value={category.name}>{category.name}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <p className='mb-2'>Product Price</p>
                <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25' />
                <span> $ </span>
            </div>
        </div>
        <div className='flex gap-2 mt-2 '>
            <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
            <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>
        <button type='submit' className='w-32 py-3  mt-4 bg-orange-500 text-white cursor-pointer'>Add Product</button>
    </form>
  )
}

export default Add