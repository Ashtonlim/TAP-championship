import React, { useState, useEffect } from 'react'
import { Input, Button, Table } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'

import { getRegisteredTeams, submitScores, deleteTeams } from './api'

const { TextArea } = Input

const columns = [
  // {
  //   title: 'Rank',
  //   dataIndex: 'pts',
  //   key: 'team_name',
  //   defaultSortOrder: 'descend',
  //   sorter: (a, b) => a.pts - b.pts,
  // },
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
    dataIndex: 'pts',
    key: 'pts',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.pts - b.pts,
  },
]

const Rankings = () => {
  const [teams, setTeams] = useState([])
  const [val, setVal] = useState('')
  const [loading, setLoading] = useState(false)

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

  const handleScoreSubmit = async () => {
    setLoading(true)
    try {
      if (await submitScores({ val })) {
        setVal('')
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      console.log('asdcas', err)
    }
  }
  const handleDeleteTeamsSubmit = async () => {
    if (await deleteTeams()) {
      setTeams([])
    }
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
      <div className="mtb-2">
        <h2>Template</h2>
        <span>
          &lt;Team A name&gt; &lt;Team B name&gt; &lt;Team A goals scored&gt;
          &lt; Team B goals scored&gt;
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

        <TextArea
          onChange={handleInput}
          rows={4}
          value={val}
          allowClear={true}
        />
        <Button
          value
          className="mtb-2"
          onClick={handleScoreSubmit}
          loading={loading}
          type="primary"
        >
          SUBMIT
        </Button>
      </div>
      <div>
        <Button
          className="mtb-3"
          onClick={handleDeleteTeamsSubmit}
          type="primary"
          danger
        >
          Delete Teams
        </Button>
        <Table
          columns={columns}
          dataSource={teams}
          pagination={false}
          rowKey="_id"
        />
      </div>
    </div>
  )
}

export default Rankings
