import React, { useState } from 'react'
import { Input, Button } from 'antd'
import dayjs from 'dayjs'

import MainLayout from './layouts/MainLayout'
import { registerTeams } from './api'

const { TextArea } = Input
dayjs.extend(require('dayjs/plugin/customParseFormat'))

const Register = () => {
  const [val, setVal] = useState('')

  const submit = () => {
    registerTeams({ val: val.split('\n') })
  }

  const handleInput = (e) => {
    const { value } = e.target

    const lines = value.split('\n')
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
    setVal(value)
  }

  return (
    <MainLayout>
      <h2>Template {dayjs().year()}</h2>
      <div>
        {' '}
        Format &lt;Team A name&gt; &lt;Team A registration date in DD/MM&gt;
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
      <TextArea onChange={handleInput} rows={4} value={val} allowClear={true} />
      <Button className="mtb-2" onClick={submit} type="primary">
        SUBMIT
      </Button>
    </MainLayout>
  )
}

export default Register
