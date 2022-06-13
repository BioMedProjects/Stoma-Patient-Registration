import React, { useContext, useEffect } from 'react'
import { DateContext } from '../Context'
import { SidebarLayout } from '../components/containers'
import { Spinner, YourAccount } from '../components'
import dateComp from '../utils/DateComp'
import { useFetch, deleteVisit } from '../api'

export default function Account() {
  const { active } = useContext(DateContext)
  const [, setActive] = active
  useEffect(() => {
    setActive('account')
  })

  const storage = localStorage.getItem('user')
  const user = JSON.parse(storage)
  const userId = user.user_id
  const { data } = useFetch(`http://127.0.0.1:8000/users/patients/${userId}`)
  const { data: visits } = useFetch(
    `http://127.0.0.1:8000/visits/list_patient_visits/${userId}`
  )

  const handleClick = (date, slot, index) => {
    deleteVisit(date, slot)
    window.location.reload(true)
  }

  return (
    <SidebarLayout>
      {data ? (
        <>
          <YourAccount data={data.data} />
          <div className="p-6 w-full flex items-center justify-center">
            <div className="mt-6 bg-neutral-200 xl:w-1/2 border-2 rounded-lg border-yellow-500 w-4/5">
              <h3 className="py-4 text-center text-xl font-semibold text-neutral-600 border-b-2 border-yellow-500">
                Twoja lista wizyt
              </h3>
              {visits && visits.data.length > 0 ? (
                visits.data.map((visit, index) => {
                  return (
                    <div
                      className={'flex gap-6 items-center p-2 p-4 justify-between'}
                      key={index}
                    >
                      <p>{visit.id}</p>
                      <p>{visit.first_doctor_name + ' ' + visit.last_doctor_name}</p>
                      <p>{visit.visit_date}</p>
                      <p>{visit.visit_slot}</p>
                      {dateComp(visit.visit_date) ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleClick(visit.visit_date, visit.visit_slot, index)
                          }
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-4 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          Odwołaj
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-4 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 invisible"
                        >
                          Odwołaj
                        </button>
                      )}
                    </div>
                  )
                })
              ) : (
                <div className={'flex gap-6 items-center p-2 p-4 justify-between'}>
                  Brak wizyt
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </SidebarLayout>
  )
}
