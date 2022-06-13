import React from 'react'
import heroImg from '../assets/img/straight.png'
import './landing.css'
import { Button, Navbar, Footer, Services, Reviews } from '../components'

export default function Landing() {
 return (
  <>
   <Navbar />
   <div className="flex flex-col items-center py-6 px-5 bg-gradient-to-r from-gray-700 via-gray-900 to-black relative">
    <img src={heroImg} alt="Hero Logo" />
    <Button link="/login" text="Zaloguj się" />
    <div className="custom-shape-divider-top-1648310260">
     <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
     >
      <path
       fill="white"
       d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
       className="shape-fill"
      ></path>
     </svg>
    </div>
   </div>
   <div className="flex flex-col lg:flex-row py-6 lg:px-5 items-center gap-3 lg:gap-6 border-4 border-yellow-400 rounded-md w-4/5 mx-auto my-6 justify-center">
    <h1 className="font-extrabold text-center md:text-6xl text-4xl text-yellow-400 leading-tight">
     Poznaj nasze usługi
    </h1>
    <div className="border-8 border-yellow-400 border-double rounded-lg">
     <svg
      className="md:w-6 md:h-6 w-4 w-4 dark:text-white"
      stroke="black"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       strokeWidth="4"
       d="M19 14l-7 7m0 0l-7-7m7 7V3"
      ></path>
     </svg>
    </div>
   </div>
   <Services />
   <Reviews />
   <Footer />
  </>
 )
}
