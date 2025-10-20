import React from 'react'

const NewLetterBox = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <div className='flex flex-col sm:flex-rows justify-center text-center'>
        <img src="https://demo.assets.templately.com/woo/elementor/33/2024/03/28fc9a59-newslatter.png" alt="" className='w-100 mx-auto'/>
        <div className='p-20'>
            <p className='text-2xl font-medium text-[#1D1568]'>Subscribe To Our Newsletter</p>
            <p className='text-xl font-medium text-gray-700'>Want to get special offers before they run out? Subscribe to our email to get exclusive discounts and offers.</p>
            <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 rounded-full bg-[#FFF6E6] pl-3'>
                <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your Email' required/>
                <button onSubmit={handleSubmit} type='submit' className='bg-orange-500 text-white text-base px-10 py-4 rounded-full'>
                    Subcribe
                </button>
            </form>
        </div>
    </div>
  )
}

export default NewLetterBox