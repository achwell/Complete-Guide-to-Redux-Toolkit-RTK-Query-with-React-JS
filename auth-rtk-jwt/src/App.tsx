import React, {useEffect} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import {ToastContainer} from "react-toastify";
import {useAppDispatch} from "./app/hooks"
import {setUser} from "./features/authSlice"
import PrivateRoute from "./components/PrivateRoute"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import './App.css'

function App() {
  const dispatch = useAppDispatch()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  useEffect(() => {
    dispatch(setUser(user))
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
          <ToastContainer />
          <Routes>
              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path="/auth" element={<Auth />} />
              <Route
                  path="/dashboard"
                  element={
                      <PrivateRoute>
                          <Dashboard />
                      </PrivateRoute>
                  }
              />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
