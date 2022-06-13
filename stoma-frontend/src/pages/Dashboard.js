import React, { useState, useContext, useEffect } from 'react'
import { SidebarLayout } from '../components/containers'
import { useFetch } from '../api'
import { SelectDate, SelectList, Spinner } from '../components'
import { DateContext } from '../Context'
import getFormattedDate from '../utils/DateFormat'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const { data: info, loading } = useFetch('https://randomuser.me/api/?results=20')
  const { date, time } = useContext(DateContext)
  const [dateValue] = date
  const [timeValue] = time
  const [selectedDoc, setSelectedDoc] = useState(0)
  const [freeSlots, setFreeSlots] = useState(null)
  const { data: docs } = useFetch('http://127.0.0.1:8000/users/doctors/')
  const handleSelectDoc = (index) => {
    setSelectedDoc(index)
  }

  useEffect(() => {
    if (dateValue && docs) {
      const docId = docs.data[selectedDoc].id
      const date = getFormattedDate(dateValue)
      axios
        .get(`http://127.0.0.1:8000/visits/get_free_slots/${docId}/${date}`)
        .then((response) => {
          setFreeSlots(response.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [dateValue, docs, freeSlots, selectedDoc])

  const confirmVisit = () => {
    const storage = localStorage.getItem('user')
    const user = JSON.parse(storage)
    const userId = user.user_id
    const slot = timeValue.slice(0, 5)
    axios
      .get(`http://127.0.0.1:8000/users/patients/${userId}`)
      .then((response) => {
        const visitData = {
          first_patient_name: response.data.data[0].first_name,
          last_patient_name: response.data.data[0].last_name,
          first_doctor_name: docs.data[selectedDoc].first_name,
          last_doctor_name: docs.data[selectedDoc].last_name,
          visit_date: getFormattedDate(dateValue),
          visit_slot: slot,
        }
        axios
          .post('http://127.0.0.1:8000/visits/create_visit/', visitData)
          .then((response) => {
            console.log(response)
            navigate('/account')
          })
          .catch((err) => {
            return err
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <SidebarLayout>
      <div className="p-6">
        <h2 className="mt-6 text-left text-3xl font-extrabold text-white">
          Znajdź lekarza i umów wizytę
        </h2>
        {!loading && info && docs ? (
          <div>
            <h3 className="mt-4 text-left text-xl font-semibold text-neutral-400">
              Wybieraj wśród {docs.data.length} specjalistów i specjalistek
            </h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <SelectList
                results={docs.data}
                images={info.results}
                selectedDoc={selectedDoc}
                handleSelectDoc={handleSelectDoc}
              />
              {freeSlots !== null ? (
                <SelectDate slots={freeSlots} confirmVisit={confirmVisit} />
              ) : null}
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </SidebarLayout>
  )
}
