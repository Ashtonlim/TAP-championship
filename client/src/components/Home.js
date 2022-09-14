import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import Rankings from './Rankings'

const Home = () => {
  return (
    <MainLayout>
      <div>
        <h2>To add more teams</h2>{' '}
        <Button className="mb-3" type="primary">
          <Link to="/register">Register here</Link>
        </Button>
      </div>

      <Rankings></Rankings>
    </MainLayout>
  )
}

export default Home
