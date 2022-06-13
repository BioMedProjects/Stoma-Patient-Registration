import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { DateContext } from './Context'
import Landing from './pages/Landing.js'
import Login from './pages/Login.js'
import Registry from './pages/Registry.js'
import Dashboard from './pages/Dashboard.js'
import Select from './pages/Select.js'
import Account from './pages/Account.js'
import AccountDoc from './pages/AccountDoc.js'

const PrivateRoute = ({ children }) => {
 const storage = localStorage.getItem('user')
 const user = JSON.parse(storage)
 return user && !user.is_staff ? children : <Navigate to="/" />
}

const PrivateRouteStaff = ({ children }) => {
 const storage = localStorage.getItem('user')
 const user = JSON.parse(storage)
 return user && user.is_staff ? children : <Navigate to="/" />
}

export default function App() {
 const [date, setDate] = useState(new Date())
 const [time, setTime] = useState(null)
 const [active, setActive] = useState('dashboard')
 return (
  <DateContext.Provider
   value={{
    date: [date, setDate],
    time: [time, setTime],
    active: [active, setActive],
   }}
  >
   <Router>
    <Routes>
     <Route exact path="/" element={<Landing />} />
     <Route exact path="/registry" element={<Registry />} />
     <Route exact path="/login" element={<Login />} />
     <Route
      path="/select"
      element={
       <PrivateRoute>
        <Select />
       </PrivateRoute>
      }
     />
     <Route
      path="/dashboard"
      element={
       <PrivateRoute>
        <Dashboard />
       </PrivateRoute>
      }
     />
     <Route
      path="/account"
      element={
       <PrivateRoute>
        <Account />
       </PrivateRoute>
      }
     />
     <Route
      path="/accountdoc"
      element={
       <PrivateRouteStaff>
        <AccountDoc />
       </PrivateRouteStaff>
      }
     />
    </Routes>
   </Router>
  </DateContext.Provider>
 )
}
