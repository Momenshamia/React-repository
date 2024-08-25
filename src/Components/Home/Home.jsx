
import React, { useContext } from 'react'
import style from './Home.module.css'
import RecentProducts from './../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { CounterContext } from './../../Context/CounterContext';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
  let { counter, changeCounter } = useContext(CounterContext)

  return <>

    <MainSlider />
    <CategoriesSlider />
    <RecentProducts />

  </>
}
