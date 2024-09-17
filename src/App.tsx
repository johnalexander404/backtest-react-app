import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import {CredentialResponse, GoogleOAuthProvider} from '@react-oauth/google'
import Login from './Login'
import Dashboard from './Dashboard'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (credentialResponse : CredentialResponse) => {
    localStorage.setItem('token', credentialResponse.credential as string)
    setIsAuthenticated(true)
  }

  return (
    <GoogleOAuthProvider clientId="963423760132-o2fb0vs0egotehr1kbsm98l7uk7e7kfk.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ?
              <Navigate to="/dashboard" /> :
              <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ?
              <Dashboard /> :
              <Navigate to="/login" />
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}
