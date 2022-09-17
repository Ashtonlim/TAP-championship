import React from 'react'
import { Input, Button } from 'antd'

const { TextArea } = Input

const Teamform = ({ handleInput, handleSubmit, val }) => {
  return (
    <div>
      <TextArea onChange={handleInput} rows={4} value={val} allowClear={true} />
      <Button className="mtb-2" onClick={handleSubmit} type="primary">
        SUBMIT
      </Button>
    </div>
  )
}

export default Teamform
