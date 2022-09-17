import React, { useState } from 'react'
import { Input, Button } from 'antd'

import { getRegisteredTeams } from '../api'

const { TextArea } = Input

const Form = ({ setTeams, handleInputValidation, submitDataHandler }) => {
  const [val, setVal] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (await submitDataHandler({ val })) {
        setVal('')
        setLoading(false)
        setTeams(await getRegisteredTeams())
      }
    } catch (err) {
      setLoading(false)
    }
  }

  const handleInput = (e) => {
    const { value } = e.target
    handleInputValidation(value)
    setVal(value)
  }

  return (
    <div>
      <TextArea
        onChange={handleInput}
        rows={7}
        value={val}
        allowClear={true}
        placeholder={`firstTeam 17/05 2\nsecondTeam 07/02 2\n...`}
      />
      <Button
        value
        className="mtb-2"
        onClick={handleSubmit}
        loading={loading}
        type="primary"
      >
        SUBMIT
      </Button>
    </div>
  )
}

export default Form
