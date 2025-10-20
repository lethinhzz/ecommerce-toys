import React from 'react'

const Footer = () => {
  return (
    <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        <div>
            <img src="https://demo.assets.templately.com/woo/elementor/33/2024/03/e0b97986-logo.png" className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tempora voluptatum, reprehenderit distinctio corporis inventore eius voluptate praesentium placeat nemo eos eveniet doloribus laborum cum incidunt adipisci ea rem delectus.</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Contact</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1-000-000-0000</li>
                <li>101 Independence Avenue, S.E. Washington, D.C. 20559-6000</li>
                <li>Instagram</li>
            </ul>
        </div>
    </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025 - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer