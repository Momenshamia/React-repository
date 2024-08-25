
import React, { useContext, useEffect, useState } from 'react';
import style from './RecentProducts.module.css';
import axios from 'axios';
import Products from './../Products/Products';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';





export default function RecentProducts() {

  let { data, isError, isFetched, isLoading, error } = useProducts();
  let { addProductToCart, setnumberItems, numberItems } = useContext(CartContext);
  let { addProductToWishlist, setnumberOfItems, numberOfItems } = useContext(WishlistContext);
  const [ladoing, setladoing] = useState(false);
  const [currentId, setcurrentId] = useState(0);


  async function addToWishlist(id) {
    let responser = await addProductToWishlist(id)
    console.log(responser.data);
    if (responser.data.status == "success") {
      toast.success(responser.data.message)
      setladoing(false);

    }
    else {
      toast.error(responser.data.message)
      setladoing(false);

    }

  }

  async function addToCart(id) {
    setcurrentId(id);
    setladoing(true)
    let response = await addProductToCart(id)
    console.log(response);

    if (response.data.status == "success") {
      setnumberItems(numberItems + 1)
      toast.success(response.data.message)
      setladoing(false);

    }
    else {
      toast.error(response.data.message)
      setladoing(false);

    }
  }


  if (isLoading) {
    return <div className="spinner"></div>
  };

  if (isError) {
    return <h3>{error.message}</h3>
  };


  // const [products, setProducts] = useState([])

  // function getProducts() {
  //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //     .then((res) => {
  //       setProducts(res.data.data)

  //     })
  //     .catch((res) => {

  //     })
  // }

  // useEffect(() => {
  //   getProducts()
  // }, [])

  return <>

    <div className="row">

      {data?.data?.data.map((product) => (
        <div key={product.id} className=' text-left  w-full md:w-1/3 lg:w-1/4  xl:w-1/6 '>



          <div className="product p-2  my-2 ">
            <Link to={`productdetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className='w-full' alt={product.title} />
              <h3 className=' text-emerald-600'>{product.category.name}</h3>
              <h3 className=' mb-1 font-semibold'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
              <div className='flex justify-between p-3'>
                <span>{product.price} EGP</span>
                <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
              </div>

            </Link>
            {/* {ladoing && currentId == product.id ? <i className=' fas fa-spinner fa-spin'></i> : "Add to Cart"} */}
            <button onClick={() => addToWishlist(product.id)}><i className=' fas fa-heart fa-xl text-gray-200 pb-8'></i></button>
            <button onClick={() => addToCart(product.id)} className='btn'>{ladoing && currentId == product.id ? <i className=' fas fa-spinner fa-spin'></i> : "Add to Cart"}</button>
          </div>

        </div>))}
    </div>


  </>
}
