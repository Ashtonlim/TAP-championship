import React from 'react'
import { Button, Table } from 'antd'

import { deleteTeams } from '../api'

const DisplayTeams = ({ teams, setTeams }) => {
  const handleDeleteTeamsSubmit = async () => {
    if (await deleteTeams()) {
      setTeams([])
    }
  }

  return (
    <div>
      <Button
        className="mb-3"
        onClick={handleDeleteTeamsSubmit}
        type="primary"
        danger
        style={{ float: 'right' }}
      >
        Delete All Teams
      </Button>
      <Table
        columns={columns}
        dataSource={teams}
        pagination={false}
        rowKey="_id"
      />
    </div>
  )
}

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

export default DisplayTeams
