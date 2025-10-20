import React from 'react'
import Title from '../components/Title'
import { useContext } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const PlaceOrder = () => {
  const [method, setMethod] = useState('');
  const [showBank, setShowBank] = useState(false)
  const {navigate, backendURL, token, cartItems, setCartItems, getCartAmount, deliveryFee, products} = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street:'',
    city: '',
    country: '',
    phone: '' 
  })
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({...data, [name]: value}))
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = []
      for(const items in cartItems){
          if (cartItems[items] > 0) {
              const itemInfo = structuredClone(products.find(product => product._id === items))
              if(itemInfo){
                itemInfo.quantity = cartItems[items]
                orderItems.push(itemInfo)
              }
            }
        
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount(),
        paymentMethod: method
      }
      switch(method) {
        case 'cod': 
            setMethod('COD')
            const response = await axios.post(backendURL+ '/api/order/place', orderData, {headers: {token}})
            if (response.data.success) {
              setCartItems({})
              navigate('/orders')
            }else{
              toast.error(response.data.message)
            }
            break;
        case 'vnpay':
            setMethod('VN PAY')
             const response1 = await axios.post(backendURL+ '/api/order/place', orderData, {headers: {token}})
            if (response1.data.success) {
              setCartItems({})
              navigate('/orders')
            }else{
              toast.error(response1.data.message)
            }
            break;
        default:
            break;
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t sm:px-14'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-3'>
              <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>
          <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='First name' />
              <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='Last name' />
          </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email"  placeholder='Email address' />
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='Street' />
          <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='City' />
              <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='Country' />
          </div>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number"  placeholder='Phone' />
      </div>
      {/* Show Banking */}
      {
        showBank ? <>
          <div className='mt-8'>
            <div className='mt-8 text-xl'>
              <Title text1={'RECEIVER'} />
            </div>
            <img className='w-80' src="qr-code.jpg" alt="" />
          </div>
        </> : <></>
      }
      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => {setMethod('vnpay'), setShowBank(true)}} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'vnpay' ? 'bg-green-500' : ''}`}></p>
              <img className='h-6 mx-4' src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png" alt="" />
            </div>
            <div onClick={() => {setMethod('cod'), setShowBank(false)}} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
              <button type='submit' onClick={() => navigate('/orders')} className='bg-black  text-white px-20 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder