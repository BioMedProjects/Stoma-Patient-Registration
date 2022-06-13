import React from 'react'
import sideways from '../assets/img/sideways.png'

export function Footer() {
 return (
  <footer className="dark:bg-black w-full py-8">
   <div className="max-w-screen-xl mx-auto">
    <ul className="flex flex-col md:flex-row flex-wrap justify-between px-6 py-4">
     <img src={sideways} alt="logo sideways" className="w-1/5 h-auto hidden md:block" />
     <li className="my-2">
      <div className="text-white">
       <p className="font-semibold text-yellow-400">TELEFON</p>
       <p>tel. 605-312-333</p>
       <p>tel. 555-111-333</p>
      </div>
     </li>
     <li className="my-2">
      <div className="text-white">
       <p className="font-semibold text-yellow-400">ADRES</p>
       <p>Gdanska 23</p>
       <p>80-756 Gdańsk</p>
      </div>
     </li>
     <li className="my-2">
      <div className="text-white">
       <p className="font-semibold text-yellow-400">EMAIL</p>
       <p>rejestracja@saglad.pl</p>
      </div>
     </li>
     <li className="my-2">
      <div className="text-white">
       <p className="font-semibold text-yellow-400">GODZINY</p>
       <p>pn-pt</p>
       <p>8-16</p>
      </div>
     </li>
    </ul>
   </div >
  </footer >
 )
}
