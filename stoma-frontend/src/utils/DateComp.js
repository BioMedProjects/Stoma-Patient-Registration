export default function dateComp(day) {
 const newDay = day.replace(new RegExp('-', 'g'), '.')
 const date = new Date()
 const currentYear = date.getFullYear()
 const today = date.getDate()
 const currentMonth = date.getMonth() + 1
 const day2 = currentYear + '.0' + currentMonth + '.' + today
 const convertToDate = (d) => {
  const [day, month, year] = d.split('.')
  return new Date(year, month - 1, day)
 }

 return convertToDate(newDay) > convertToDate(day2)
}
