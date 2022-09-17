import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { Col, Divider, Row } from 'antd'

import MainLayout from './layouts/MainLayout'
import DisplayTeams from './common/DisplayTeams'
import Form from './common/Form'

import { registerTeams, getRegisteredTeams } from './api'

dayjs.extend(require('dayjs/plugin/customParseFormat'))

const Register = () => {
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

      const [, date, ...extra] = lines[i].trim().split(' ')

      if (extra.length > 1) {
        console.log(
          `Has extra args (${extra.slice(
            1
          )}). Ensure format is - <teamName> <DD/MM> <grpNum>`
        )
      }

      if (!dayjs(`${date}/${dayjs().year()}`, 'DD/MM/YYYY', true).isValid()) {
        console.log(
          'date is invalid, ensure in the format DD/MM and is an existing date of this year'
        )
      }

      const grpNum = parseInt(extra[0])

      if (isNaN(grpNum) || grpNum > 2 || grpNum < 1) {
        console.log(`grp number must be 1 or 2, not ${grpNum}`)
      }
    }
  }

  return (
    <MainLayout>
      <div className="mtb-2">
        <Divider orientation="left">
          <h2>Register New Teams for {dayjs().year()} Championship Cup</h2>
        </Divider>
        <Row>
          <Col flex={5}>
            <div className="mr-5">
              <Form
                setTeams={setTeams}
                handleInputValidation={handleInputValidation}
                submitDataHandler={registerTeams}
              ></Form>
            </div>
          </Col>
          <Col flex={3}>
            <div>
              <h2>Template</h2>
              <div>
                &lt;Team A name&gt; &lt;Team A registration date in DD/MM&gt;
                &lt; Team A group number&gt;
              </div>

              <br />

              <h2>Example</h2>
              <div>
                firstTeam 17/05 2<br />
                secondTeam 07/02 2
              </div>

              <br />
              <br />
            </div>
          </Col>
        </Row>
      </div>
      <div className="mt-5">
        <DisplayTeams teams={teams} setTeams={setTeams}></DisplayTeams>
      </div>
    </MainLayout>
  )
}

export default Register
