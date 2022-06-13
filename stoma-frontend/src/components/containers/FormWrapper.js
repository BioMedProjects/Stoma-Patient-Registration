import React from 'react'
import { BackgroundWrapper } from './index'
export function FormWrapper({ children }) {
 return (
  <BackgroundWrapper>
   <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-lg w-full space-y-8 bg-white p-6 rounded-xl border-4 border-yellow-400">
     {children}
     <a href="/" className="mt-4 inline-flex items-center group w-1/4 text-sm font-medium rounded-md text-black hover:text-yellow-300">
      Powrót
     </a>
    </div>
   </div>
  </BackgroundWrapper>
 )
}
