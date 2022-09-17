import React, { useState, useEffect } from 'react'
import { Col, Row } from 'antd'
import dayjs from 'dayjs'

dayjs.extend(require('dayjs/plugin/customParseFormat'))
dayjs.extend(require('dayjs/plugin/dayOfYear'))

const Rankings = ({ teams }) => {
  const [masterArr, setMasterArr] = useState([[], []])

  useEffect(() => {
    const curYr = dayjs().year()
    const daysInTheYear = curYr % 4 ? 365 : 366
    const grp1 = []
    const grp2 = []

    for (let i = 0; i < teams.length; i++) {
      if (teams[i]['grp_num'] === 1) {
        grp1.push(teams[i])
      } else {
        grp2.push(teams[i])
      }
    }

    // console.log(teams, grp1, grp2)
    const onlyGrp1 = grp1.map((t) => [
      t.pts,
      t.secondary_pts,
      t.total_goals,
      daysInTheYear -
        dayjs(`${t.date_reg}/${curYr}`, 'DD/MM/YYYY', true).dayOfYear(),
      t.team_name,
    ])
    const onlyGrp2 = grp2.map((t) => [
      t.pts,
      t.secondary_pts,
      t.total_goals,
      daysInTheYear -
        dayjs(`${t.date_reg}/${curYr}`, 'DD/MM/YYYY', true).dayOfYear(),
      t.team_name,
    ])

    console.log(onlyGrp1, onlyGrp2)

    const swap = (l, r, arr) => {
      // 4 is len
      for (let i = 0; i < 4; i++) {
        if (arr[l][i] < arr[r][i]) return true
        else if (arr[l][i] > arr[r][i]) return false
        else continue
      }
      return false
    }
    const sortArr = (arr) => {
      let moved = true
      while (moved) {
        moved = false
        console.log('end??')
        for (let i = 1; i < arr.length; i++) {
          if (swap(i - 1, i, arr)) {
            const temp = arr[i]
            arr[i] = arr[i - 1]
            arr[i - 1] = temp
            moved = true
          }
        }
      }
      return arr
    }
    if (onlyGrp1.length && onlyGrp2.length) {
      console.log('sorted', [sortArr(onlyGrp1), sortArr(onlyGrp2)])
      setMasterArr([
        sortArr(onlyGrp1).slice(0, 4),
        sortArr(onlyGrp2).slice(0, 4),
      ])
    }
  }, [teams])
  return (
    <Row>
      <Col flex={5} className="mr-5">
        <h2>Group 1 Qualified Into Next Round</h2>
        {/* {console.log('master1', masterArr)} */}
        {masterArr[0].map((team, index) => (
          <div key={team[4]}>
            Position {index + 1}: {team[4]}
          </div>
        ))}
      </Col>
      <Col flex={5}>
        <h2>Group 2 Qualified Into Next Round</h2>
        {masterArr[1].map((team, index) => (
          <div key={team[4]}>
            Position {index + 1}: {team[4]}
          </div>
        ))}
      </Col>
    </Row>
  )
  //   return <div></div>
}

export default Rankings
