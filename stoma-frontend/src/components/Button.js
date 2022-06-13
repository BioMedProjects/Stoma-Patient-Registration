import React from 'react'

export function Button({ text, link, children }) {
 return (
  <a href={link} className="flex items-center gap-2 justify-center py-6  w-[300px] md:w-[350px] bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-200 focus:ring-offset-yellow-500 text-white transition ease-in duration-200 sm:text-3xl text-center text-base font-extrabold text-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg z-50">
   {children}
   {text}
  </a>
 )
}
