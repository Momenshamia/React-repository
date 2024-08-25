
import React, { useEffect } from 'react'
import style from './Categories.module.css'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Categories() {
 

  const [CategoriesData, setCategoriesData] = useState([])

  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setCategoriesData(res.data.data)
      })
      .catch((res) => {

      })

    
  }


  useEffect(() => {
    getCategories()
  }, [])

  return <>

    <h1 className='my-8 text-emerald-700 font-bold capitalize text-3xl' >Categories</h1>
    <div className="grid gap-x-5 gap-y-5 grid-cols-3  my-4 py-3 ">

     
      {CategoriesData.map((category) => <div key={category._id} >
        <div className=' card    p-4 text-center  '>
          
          <img src={category.image} className='     w-[400px] h-[400px] object-center' alt="" />
          <h3 className='  py-3  text-emerald-700 font-bold capitalize text-2xl'>{category.name}</h3>

        </div>

      </div>)}
      
    </div>
  </>
}
