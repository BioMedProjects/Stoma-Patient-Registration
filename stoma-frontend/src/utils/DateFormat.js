export default function getFormattedDate(date) {
 const year = date.getFullYear(),
  month = ('0' + (date.getMonth() + 1)).slice(-2),
  day = date.getDate()

 return [year, month, day].join('-')
}
