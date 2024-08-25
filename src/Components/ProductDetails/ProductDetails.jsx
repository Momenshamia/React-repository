
import React, { useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from "react-router-dom"
import axios from 'axios';
import Slider from 'react-slick';


export default function ProductDetails() {
  const [product, setProduct] = useState(null)
  const [relatedProducts, setrelatedProducts] = useState([])
  
  let { id, category } = useParams();
 


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };


  


  function getProduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setProduct(res.data.data)

      })
      .catch((res) => {
        console.log(res);

      });
  }

  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        // res.data.data
        let related = res.data.data.filter((product) => product.category.name == category);
        setrelatedProducts(related);

      })
  }

  useEffect(() => {
    getProduct(id);
    getAllProducts()

  }, [id, category]);

  return <>

    <div className="row items-center text-left">
      <div className='w-1/4'>

        <Slider {...settings}>

          {product?.images.map((src) => <img src={src} key={product.id} className='w-full' />)}

        </Slider>


      </div>
      <div className='w-3/4 p-4'>
        <h3 className=' font-semibold capitalize text-2xl'>{product?.title}</h3>
        <h4 className='text-gray-700 my-4'>{product?.description}</h4>
        <h4 className=''>{product?.category.name}</h4>
        <div className='flex justify-between p-3 my-5'>
          <span>{product?.price} EGP</span>
          <span><i className='fas fa-star text-yellow-400'></i> {product?.ratingsAverage}</span>
        </div>
        <button  className='btn'> Add to Cart</button>
      </div>
    </div>



    <div className="row">

      {relatedProducts.length > 0 ? relatedProducts.map((product) => (
        <div key={product.id} className=' text-left   md:w-1/3 lg:w-1/4  xl:w-1/6 '>



          <div className="product p-2  my-2 ">
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className='w-full' alt="" />
              <h3 className=' text-emerald-500'>{product.category.name}</h3>
              <h3 className=' mb-1 font-semibold'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
              <div className='flex justify-between p-3'>
                <span>{product.price} EGP</span>
                <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
              </div>

            </Link>
            <button  className='btn'> Add to Cart  </button>

          </div>

        </div>)) : <div className="spinner"></div>}
    </div>

  </>

}