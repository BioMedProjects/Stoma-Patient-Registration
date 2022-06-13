import React, { useContext } from 'react'
import { DateContext } from '../../Context'
// const hours = [
//  '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
// ]
export function TimePicker(slots) {
 const { time } = useContext(DateContext)
 const [timeValue, setTimeValue] = time;
 const hours = ((Object.values(slots.slots)[0]))
 return (
  <select id="hours" placeholder="test" className="block w-[170px] p-2 border-2 border-yellow-500 rounded-lg font-semibold" name="hours" value={timeValue} onChange={(value) => setTimeValue(value.target.value)}>
   <option name="placeholder" value={null}>
    Dostępne
   </option>
   {hours.map((hour) => {
    return (
     <option value={hour} key={hour}>
      {hour}
     </option>
    )
   })}
  </select>
 )
}
