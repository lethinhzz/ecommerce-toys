import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
const AddCategory = ({token}) => {
    const [name, setName] = useState('')
    const [image, setImage] = useState(false)
    const [bgColor, setBgColor] = useState('#000000')
    
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name)
            formData.append("bgColor", bgColor)
            image && formData.append("image", image)
            const response = await axios.post(backendUrl + "/api/category/add", formData, {headers:{token}})
            if(response.data.success){
                toast.success(response.data.message)
                setName('')
                setImage('')
                setBgColor('')
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
            <p className='mb-2'>Category Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
        </div>
        <div className=''>
            <p className='mb-2'>Category Background Color</p>
            <input onChange={(e) => setBgColor(e.target.value)} value={bgColor} className='' type="color"  required />
        </div>
        <button type='submit' className='w-32 py-3 cursor-pointer mt-4 bg-orange-500 text-white'>Add Category</button>
    </form>
  )
}

export default AddCategory