import React from 'react'

const Hero = () => {
  return (
    <div>
        <div className="flex flex-col sm:flex-row p-5 " style={{backgroundColor: "#1D1568"}}>
                <div className="w-full sm:w-1/2 flex items-center justify-center py-10 ps-10 sm:py-0">
                    <div className="mb-4">
                        <h1 className="text-5xl font-bold text-[#a199c9] leading-tight mb-6 lg:text-[90px]">Fun Toys For <br /> Your Kids</h1>
                        <p className="text-white text-base md:text-lg mb-8">
                          Browse through our huge collection of fun toys, dolls, puzzle games
                          and more for your kids. Shop, play and create fond memories with your
                          little ones!
                        </p>
                        <button className="bg-orange-500 text-white font-semibold px-6 py-3 md:px-8 md:py-3 rounded-full shadow-lg hover:bg-orange-600 transition">
                          Shop Now
                        </button>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
                    <div className='p-10 py-30'>
                        <img src="https://demo.assets.templately.com/woo/elementor/33/2024/03/93f96b1b-img-1.png" id="maybay" alt=""/>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Hero
