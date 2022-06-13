import React, { useContext } from 'react'
import { DateContext } from '../../Context'
import { Navbar } from '../../components'
export function SidebarLayout({ children }) {
  const { active } = useContext(DateContext);
  const [activeValue] = active;
  const storage = localStorage.getItem("user")
  const user = JSON.parse(storage);
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex lg:flex-row flex-1 bg-gradient-to-r from-gray-700 via-gray-900 to-black'>
        <aside className={'bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 w-fit'}>
          <nav>
            {!user.is_staff ?
              (<ul>
                <li className={`m-2 ${activeValue === 'dashboard' ? 'text-black' : 'text-neutral-500'}`}>
                  <a
                    href='/dashboard'
                    className={`flex items-center gap-1 p-1 lg:p-2 rounded-lg hover:text-black cursor-pointer'
           }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <p className="hidden lg:block w-7">Dashboard</p>
                  </a>
                </li>
              </ul>) : null
            }
            <ul>
              <li className={`m-2 ${activeValue === 'account' ? 'text-black' : 'text-neutral-500'}`}>
                <a
                  href={user.is_staff ? '/accountdoc' : '/account'}
                  className={`flex items-center gap-1 p-1 lg:p-2 rounded-lg hover:text-black cursor-pointer'
           }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  <p className="hidden lg:block">Konto</p>
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className='flex-1'>{children}</main>
      </div>
    </div >
  )
}
