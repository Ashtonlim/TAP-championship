import React from 'react'
import { Button, Table, Col, Row, Statistic, Divider } from 'antd'
import { Link } from 'react-router-dom'

import { deleteTeams } from '../api'

const DisplayTeams = ({ teams, setTeams }) => {
  const handleDeleteTeamsSubmit = async () => {
    if (await deleteTeams()) {
      setTeams([])
    }
  }

  return (
    <div>
      <Divider orientation="left">
        <h1>Current Teams</h1>
      </Divider>
      <div className="mb-3">
        <Row gutter={16} align="middle">
          <Col span={4}>
            <Statistic
              title="Teams in Group 1"
              value={teams.reduce(
                (acc, { grp_num }) => (grp_num === 1 ? acc + 1 : acc),
                0
              )}
            />
          </Col>
          <Col span={4}>
            <Statistic
              title="Teams in Group 2"
              value={teams.reduce(
                (acc, { grp_num }) => (grp_num === 1 ? acc + 1 : acc),
                0
              )}
            />
          </Col>

          <Col span={16}>
            <div style={{ float: 'right', justifyContent: 'middle' }}>
              <Button className="mr-3" type="primary">
                <Link to="/register">Add New Teams</Link>
              </Button>
              <Button onClick={handleDeleteTeamsSubmit} type="primary" danger>
                Delete All Teams
              </Button>
            </div>
          </Col>
        </Row>
      </div>

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
