import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Register from './Register'

const Routing = () => (
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/register" element={<Register />}></Route>
  </Routes>
)
export default Routing
