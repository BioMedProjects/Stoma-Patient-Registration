import React from 'react'

export function YourAccount(data) {
 return (
  <div className="p-6 w-full flex items-center justify-center">
   <div className="mt-6 w-4/5 bg-neutral-200 xl:w-1/2 border-2 rounded-lg border-yellow-500">
    <h3 className="py-4 text-center text-xl font-semibold text-neutral-600 border-b-2 border-yellow-500">
     Twoje Konto
    </h3>
    <div className={'p-4 text-xl font-semibold text-neutral-600'}>
     <div className={'grid grid-cols-2 py-4'}>
      <p>Imię i nazwisko:</p>
      <p>
       {data.data[0].first_name + ' ' + data.data[0].last_name}
      </p>
     </div>
     <div className={'grid grid-cols-2 py-4'}>
      <p>E-mail:</p>
      <p>{data.data[0].email}</p>
     </div>
    </div>
   </div>
  </div>
 )
}

export default YourAccount
