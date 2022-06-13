import React from 'react'
import logo from '../../assets/img/logo.png'
import services from './Services.helper'
export function Services() {
 return (
  <>
   <div className="p-6 bg-white bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 rounded-lg shadow">
    <div className="px-4 border-b-2 border-stone-400">
     <div className="flex justify-center gap-4">
      <p className="py-5 font-semibold md:text-5xl text-3xl leading-tight">Oferujemy</p>
      <img src={logo} alt="logo" className="hidden md:block" />
     </div>
     <p className="py-4 md:text-2xl text-2xl leading-tight text-center text-stone-600">Od profilaktyki przez pełne rekonstrukcje do komputerowego projektowania uśmiechu</p>
    </div>
    <div className="mt-6 px-4 md:grid md:grid-rows-2 md:grid-flow-col gap-4 lg:w-3/4 lg:mx-auto">
     {services.map((service, index) => {
      return (
       <div className="p-2 m-2 border-2 border-black rounded-lg bg-yellow-50 flex flex-col justify-center" key={service.label}>
        <img src={service.img} alt={service.img}></img>
        <p className="text-center mt-4"> {service.label}</p>
       </div>
      )
     })}
    </div>
   </div>
  </>
 )
}
