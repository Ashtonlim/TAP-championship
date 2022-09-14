import React, { useState, useEffect } from 'react'
import { Input, Button, Table } from 'antd'

import { getRegisteredTeams } from './api'

const { TextArea } = Input

const columns = [
  {
    title: 'Team Name',
    dataIndex: 'team_name',
    key: 'team_name',
  },
  {
    title: 'Date Registered',
    dataIndex: 'date_reg',
    key: 'date_reg',
  },
  {
    title: 'Group Number',
    dataIndex: 'grp_num',
    key: 'grp_num',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.grp_num - b.grp_num,
  },
  {
    title: 'Total Points',
    dataIndex: 'total_points',
    key: 'total_points',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.total_points - b.total_points,
  },
]

const Rankings = () => {
  const [teams, setTeams] = useState([0])
  const [val, setVal] = useState('')

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

  const submit = () => {
    console.log('calc ranks')
  }

  const handleInput = (e) => {
    const { value } = e.target

    const lines = value.split('\n')
    for (let i = 0; i < lines.length; i++) {
      console.log(`line ${i + 1}`)

      const [teamA, teamB, aScores, bScores, ...extra] = lines[i]
        .trim()
        .split(' ')

      // const aScores = parseInt(aScores)
      // const bScores = parseInt(bScores)
    }
    setVal(value)
  }

  return (
    <div>
      <h2>Template</h2>
      <span>
        &lt;Team A name&gt; &lt;Team B name&gt; &lt;Team A goals scored&gt; &lt;
        Team B goals scored&gt;
      </span>
      <br />
      <br />

      <h2>Example</h2>
      <span>
        firstTeam secondTeam 0 3<br />
        thirdTeam fourthTeam 1 1
      </span>

      <br />
      <br />

      <TextArea onChange={handleInput} rows={4} value={val} allowClear={true} />
      <Button className="mtb-2" onClick={submit} type="primary">
        SUBMIT
      </Button>
      <Table columns={columns} dataSource={teams} pagination={false} />
    </div>
  )
}

export default Rankings
