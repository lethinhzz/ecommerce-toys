import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import NewLetterBox from '../components/NewLetterBox'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const {productID} = useParams()
  const {products, currency, addToCart} = useContext(ShopContext)
  const [productData, setProductData] = useState(false)

  const fetchProductData = async () => {
    products.map((item) => {
      if(item._id === productID ){
        setProductData(item);
        return null;
      }
    })
  }

   const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    fetchProductData()
  },[productID, products])


  return productData ? (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Hình ảnh */}
          <div className="flex justify-center">
            <img
              src={productData.image} 
              alt="Puzzle Toy"
              className="w-80 object-contain"
            />
          </div>

          {/* Thông tin sản phẩm */}
          <div>
            <h2 className="text-3xl font-semibold text-indigo-900 mb-4">
              {productData.name}
            </h2>
            <p className="text-orange-500 text-2xl font-bold mb-4">{productData.price}{currency}</p>
            <p className='font-light text-gray-700 text-base mb-6'>{productData.description}</p>

            <div className="flex items-center gap-4">
              {/* Nút tăng giảm số lượng */}
              <div className="flex items-center border border-orange-400 rounded-full px-3 py-1">
                <button
                  onClick={handleDecrease}
                  className="px-2 text-lg font-bold text-orange-500"
                >
                  -
                </button>
                <span className="px-2">{quantity}</span>
                <button
                onClick={handleIncrease}
                  className="px-2 text-lg font-bold text-orange-500"
                >
                  +
                </button>
              </div>

              {/* Nút Add to cart */}
              <button onClick={() => addToCart(productData._id, quantity)} className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="div">

      </div>
      <RelatedProducts category={productData.category} />
      <NewLetterBox />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product