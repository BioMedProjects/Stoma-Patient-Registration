import React from 'react'
import reviews from '../assets/img/reviews.png'

export function Reviews() {
 return (
  <div className="bg:white w-full mx-auto p-8 my-6">
   <img src={reviews} className="h-10 w-10 mb-8 m-auto p-4" />
   <p className="text-gray-600 w-full md:w-2/3 m-auto text-center text-lg md:text-3xl pb-4">
    <span className="font-bold text-yellow-500">
     “
    </span>
    Nie wyobrażam sobie korzystać z usług innej kliniki. Najlepsza rejestracja online na rynku.
    <span className="font-bold text-yellow-500">
     ”
    </span>
   </p>
   <div className="flex items-center justify-center mt-8">
    <a href="#" className="block relative">
     <img alt="profil" src='https://randomuser.me/api/portraits/women/4.jpg' className="mx-auto object-cover rounded-full h-10 w-10 shadow-lg" />
    </a>
    <div className="flex ml-2 items-center justify-center">
     <span className="font-semibold text-black-500 mr-2 text-lg">
      Janina Żuk
     </span>
     <span className="text-gray-400 text-xl font-light">
      /
     </span>
     <span className="text-gray-400 text-md ml-2">
      Wieloletnia pacjentka
     </span>
    </div>
   </div>
  </div>


 )
}
