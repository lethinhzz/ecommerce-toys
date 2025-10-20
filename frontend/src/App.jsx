import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AllProducts from './pages/AllProducts'
import Product from './pages/Product'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer  />
      <Navbar />
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products' element={<AllProducts />}/>
          <Route path='/product/:productID' element={<Product />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/place-order' element={<PlaceOrder />}/>
          <Route path='/orders' element={<Orders />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App