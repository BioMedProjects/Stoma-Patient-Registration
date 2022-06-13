import React from 'react'

export function BackgroundWrapper({ children }) {
 return (
  <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black h-screen">
   <div className="h-screen bg-[url('assets/img/logo-opacity.png')] flex flex-col md:flex-row items-center justify-center gap-6 p-6">
    {children}
   </div>
  </div>
 )
}
