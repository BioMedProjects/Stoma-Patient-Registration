import axios from 'axios'

export function deleteVisit(day, slot) {
 console.log(day, slot)
 const visitData = {
  data: {
   visit: {
    visit_date: day,
    visit_slot: slot,
   },
  },
 }
 axios
  .post('http://127.0.0.1:8000/visits/delete_visit/', visitData)
  .then((response) => {
   return response
  })
  .catch((err) => {
   return err
  })
}
