import React, { useState, useEffect } from 'react'
import { Button, Col, Divider, Row } from 'antd'
import { Link } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import Form from './Home/Form'
import DisplayTeams from './Home/DisplayTeams'
import { getRegisteredTeams, submitScores } from './api'

const Home = () => {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const initData = async () => {
      try {
        let res = await getRegisteredTeams()
        setTeams(res)
      } catch (err) {
        alert(err)
      }
    }
    initData()
  }, [])

  const handleInputValidation = (text) => {
    const lines = text.split('\n')
    for (let i = 0; i < lines.length; i++) {
      console.log(`line ${i + 1}`)

      const [teamA, teamB, aScores, bScores, ...extra] = lines[i]
        .trim()
        .split(' ')

      // const aScores = parseInt(aScores)
      // const bScores = parseInt(bScores)
    }
  }

  return (
    <MainLayout>
      <div>
        <h1>Championship</h1>{' '}
        <Button className="mb-3" type="primary">
          <Link to="/register">Register here</Link>
        </Button>
      </div>

      <div className="mtb-2">
        <Divider orientation="left">
          <h1>Enter Match Scores</h1>
        </Divider>
        <Row>
          <Col flex={5}>
            <div className="mr-5">
              <Form
                setTeams={setTeams}
                handleInputValidation={handleInputValidation}
                submitDataHandler={submitScores}
              ></Form>
            </div>
          </Col>
          <Col flex={3}>
            <div>
              <h2>Template</h2>
              <span>
                &lt;Team A name&gt; &lt;Team B name&gt; &lt;Team A goals
                scored&gt; &lt; Team B goals scored&gt;
              </span>
              <br />
              <br />

              <h2>Example</h2>
              <span>
                teamA teamB 0 1<br />
                teamB teamC 1 3
              </span>

              <br />
              <br />
            </div>
          </Col>
        </Row>
      </div>

      <DisplayTeams teams={teams} setTeams={setTeams}></DisplayTeams>
    </MainLayout>
  )
}

export default Home
