import React, { useContext } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { DateContext } from '../../Context'
import { getDay } from 'date-fns';
import pl from "date-fns/locale/pl"
import './datepicker.css'

export function DatePickerCustom() {
 const { date } = useContext(DateContext)
 const [dateValue, setDateValue] = date;
 registerLocale("pl", pl);
 const isWeekday = (date) => {
  const day = getDay(date);
  return day !== 0 && day !== 6;
 };
 return (
  <DatePicker
   locale="pl"
   filterDate={isWeekday}
   className="border-2 border-yellow-500 rounded-lg font-semibold p-2 w-[170px] block"
   selected={dateValue}
   onChange={(date) => setDateValue(date)}
  />
 );
}
