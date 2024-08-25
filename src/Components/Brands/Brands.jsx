
import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'


export default function Brands() {
  const [ brands, setBrands ] = useState([])


  function getBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        // console.log(res.data.data);
        setBrands(res.data.data)
      })
      .catch((res) => {

      })

    
  }


  useEffect(() => {
    getBrands()
  }, [])


  return <>

  <h1 className='my-8 text-emerald-700 font-bold capitalize text-3xl' >All Brands</h1>
  <div className="grid gap-x-5 gap-y-5 grid-cols-4  my-4 py-3 ">

    {brands.map((brand) => <div key={brand._id} >
      <div  className=' card    p-4 text-center  '>
        
        <img src={brand.image} className='     w-[250] h-[250] object-center' alt="" />
        <h3 className='  py-3   font-bold capitalize '>{brand.name}</h3>

      </div>
    </div>)}
  </div>
</>
    
  
}
