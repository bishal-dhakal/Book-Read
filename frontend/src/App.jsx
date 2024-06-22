import { useState } from 'react'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import Home from './Pages/Dashboard/Dashboard';
import BookDetail from './Pages/BookDetail'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Auth/AuthContext';
import ProtectedRoute from './Auth/ProtectedRoute';


function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={
            <ProtectedRoute>
              <Home />
              </ProtectedRoute>
              } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={
              <ProtectedRoute>
              <Register />
              </ProtectedRoute>
              } />
            <Route path="/books/:id" element={<BookDetail />} />
          </Routes>
        </Router>,
      </AuthProvider>

    </>
  )
}

export default App
