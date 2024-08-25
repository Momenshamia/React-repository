
import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios';
import Slider from "react-slick";
import Categories from './../Categories/Categories';


export default function CategoriesSlider() {
  const [categories, setcategories] = useState([])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed:1000,
  };
 
  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        // console.log(res.data);
        setcategories(res.data.data)

      })
  }
  useEffect(() => {
    getCategories()

  }, [])

  return <>
  
  <h2 className='my-3 capitalize font-bold  text-left text-gray-950'>Shop Popular Categories</h2>
    <Slider {...settings}>
      {categories.map((category)=> <div key={category._id}>

        <img src={category.image}   className=' w-full h-[200px] object-cover' alt={category.name} />
        <h4 >{category.name}</h4>

      </div>)}
    </Slider>

  </>
}
