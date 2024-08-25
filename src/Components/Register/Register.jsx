
import React, { useContext, useState } from 'react';
import style from './Register.module.css';
import { useFormik } from 'formik';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { UserContext } from './../../Context/UserContext';

export default function Register() {
  let {userLogin,setUserLogin} = useContext(UserContext)
  const navigate = useNavigate()
  const [apiError, setApiError] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  // `https://ecommerce.routemisr.com/api/v1/auth/signup`
  //https://jsonplaceholder.typicode.com/users
  // Call API



  function handleRegister(values) {
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setIsLoading(false)
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token)
          setUserLogin(res.data.token)
          navigate("/")
        }
      })

      .catch((res) => {
        // console.log(res.response.data.message)
        setApiError(res.response.data.message)
        setIsLoading(false)
      });
  }


  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "min length is 3").max(10, "max length is 10").required("Name is required"),
    email: Yup.string().email("invalid email").required("Email is required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid Phone Number").required("Phone Number is required"),
    password: Yup.string().matches(/^[A-Za-z0-9]{6,10}$/, "Password Should be between 6 and 10 char").required("Password is required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "rePassword and password not the same").required("rePassword is required"),
  })

  // function validateForm(values) {
  //   let errors = {};

  //   if (!values.name) {
  //     errors.name = "name is required"
  //   }
  //   else if (!/^[A-Z][a-z]{3}$/.test(values.name)) {
  //     errors.name = "not valid name"
  //   }

  //   if (!values.phone) {
  //     errors.phone = "phone is required"
  //   }
  //   else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
  //     errors.phone = " not valid phone number"
  //   }

  //   return errors
  // };

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },

    validationSchema,
    onSubmit: handleRegister,

  });




  return <>
    <div className='my-8'>
      {apiError ? <div className='w-1/2 mx-auto bg-red-100 border border-red-600 text-red-600 font-bold rounded-lg p-3  '>{apiError}!! </div> : null}


      <h2 className='font-bold text-2xl text-emerald-600 mb-4'>Register Now</h2>

      <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">

        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
          <label htmlFor="name" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>

          {formik.errors.name && formik.touched.name ?
            <div className="p-1 mb-4 text-sm text-red-600 flex justify-start	" role="alert">
              {formik.errors.name}
            </div> : null}

        </div>


        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
          <label htmlFor="email" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>


          {formik.errors.email && formik.touched.email ?
            <div className="p-1 mb-4 text-sm text-red-600 flex justify-start	" role="alert">
              {formik.errors.email}
            </div> : null}

        </div>


        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
          <label htmlFor="phone" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>

          {formik.errors.phone && formik.touched.phone ?
            <div className="p-1 mb-4 text-sm text-red-600 flex justify-start	" role="alert">
              {formik.errors.phone}
            </div> : null}


        </div>


        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
          <label htmlFor="password" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>

          {formik.errors.password && formik.touched.password ?
            <div className="p-1 mb-4 text-sm text-red-600 flex justify-start	" role="alert">
              {formik.errors.password}
            </div> : null}

        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
          <label htmlFor="rePassword" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your RePassword</label>

          {formik.errors.rePassword && formik.touched.rePassword ?
            <div className="p-1 mb-4 text-sm text-red-600 flex justify-start	" role="alert">
              {formik.errors.rePassword}
            </div> : null}


        </div>

        <div className='flex gap-4 items-center '>
          <button type="submit" className="   text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Register"}
            {/* flex justify-end */}
          </button>
          <Link to={"/Login"}><span className='text-blue-500 underline' >Do you have an account? Login Now</span></Link>
        </div>


      </form>
    </div>
  </>
}
