import React, { useContext } from 'react'
import { DatePickerCustom, TimePicker } from '../components'
import { DateContext } from '../Context'

export function SelectDate({ confirmVisit, ...slots }) {
 const { time } = useContext(DateContext)
 const [timeValue] = time;

 return (
  <div className="mt-6 xl:w-1/3 rounded-lg border-2 border-yellow-500 mt-6 bg-neutral-200 pb-6">
   <h3 className="py-4 text-center text-left text-xl font-semibold text-neutral-600 border-b-2 border-yellow-500">
    Wybierz odpowiedni termin
   </h3>
   <div className="p-2 py-4 flex justify-start items-center">
    <p className="font-semibold w-10">Wybierz date: </p>
    <DatePickerCustom />
   </div>
   <div className="p-2 py-4 flex justify-start items-center">
    <p className="font-semibold w-10">Wybierz godzine: </p>
    <TimePicker slots={slots.slots} />
   </div>
   <button onClick={confirmVisit} disabled={!timeValue || timeValue.length < 9} className="mx-auto mt-4 group relative w-3/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
    Potwierdź
   </button>
  </div>
 )
}
