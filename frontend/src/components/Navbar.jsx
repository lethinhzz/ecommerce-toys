import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { navigate, token, setToken, setCartItems } = useContext(ShopContext)
   const logout = () => {
        navigate('/login')
        localStorage.removeItem('token');
        setToken('');
        setCartItems({})
    }
  return (
    <div className="flex items-center justify-between py-5 px-4 md:px-20 lg:px-48 font-medium">
      <NavLink to="/">
        <img
          src="https://demo.assets.templately.com/woo/elementor/33/2024/03/e0b97986-logo.png"
          alt=""
          className="w-36"
        />
      </NavLink>
      <ul className="hidden sm:flex gap-10 text-xl text-gray-700 ">
        <NavLink to="/">
          <p className="py-2">HOME</p>
        </NavLink>
        <NavLink to="/products">
          <p className="py-2">PRODUCTS</p>
        </NavLink>
        <NavLink to="/cart">
          <p className="py-2">CART</p>
        </NavLink>
        {token ? (<NavLink to="/orders">
          <p className="py-2">MY ORDERS</p>
        </NavLink>) : ""}
        {token ? (<button onClick={() => logout()} className="px-5 rounded-full py-2 text-white bg-orange-300 cursor-pointer">
            Logout
          </button>): <NavLink to="/login">
          <button className="px-5 rounded-full py-2 text-white bg-orange-300 cursor-pointer">
            SIGN UP
          </button>
        </NavLink>}
        
      </ul>
      <button onClick={() => setVisible(true)} className="sm:hidden">
        <i className="fa-solid fa-bars text-xl"></i>
      </button>
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <i className="fa-solid fa-angle-left"></i>
            <p>Back</p>
          </div>
          <NavLink
            to="/"
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
          >
            HOME
          </NavLink>
          <NavLink
            to="/products"
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
          >
            PRODUCTS
          </NavLink>
          <NavLink
            to="/cart"
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
          >
            CART
          </NavLink>
          {token ? (<button onClick={() => {logout(); setVisible(false)}} className="px-5 rounded-full py-2 text-white bg-orange-300 cursor-pointer">
            Logout
          </button>): <NavLink to="/login" onClick={() => setVisible(false)} >
          <button className="px-5 rounded-full py-2 text-white bg-orange-300 cursor-pointer">
            SIGN UP
          </button>
        </NavLink>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
