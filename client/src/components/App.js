import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routing from './Routing'

const App = () => (
  // wrap browserRouter component ard entire app to provide CONTEXT for app to access routes
  <BrowserRouter>
    <Routing></Routing>
  </BrowserRouter>
)

export default App
