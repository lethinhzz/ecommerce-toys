import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
        <p className='text-[#1D1568] font-medium'>{text1} <span className='text-orange-500 font-bold'>{text2}</span></p>
    </div>
  )
}

export default Title