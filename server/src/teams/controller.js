import teamsModel from './model'
import dayjs from 'dayjs'

dayjs.extend(require('dayjs/plugin/customParseFormat'))

export const createErrMsg = ({ message = 'Server Error' } = {}) => {
  return { message }
}

export const getAllTeams = async (req, res) => {
  try {
    res.json(
      await teamsModel.find(
        {},
        {
          _id: 1,
          team_name: 1,
          date_reg: 1,
          grp_num: 1,
          pts: 1,
          secondary_pts: 1,
          total_goals: 1,
        }
      )
    )
  } catch (err) {
    res.status(400).json(createErrMsg())
  }
}

export const registerTeams = async (req, res) => {
  const val = req.body.val.split('\n')
  const teams = []

  try {
    // checks group number count to ensure less than 7 teams in ea grp
    const [grp1, grp2] = (
      await teamsModel.aggregate([
        { $group: { _id: '$grp_num', count: { $sum: 1 } } },
      ])
    ).sort((a, b) => a._id - b._id)
    // if a < b, then a - b < 0, sort as a, b
    // if a > b, then a - b > 0, sort as b, a

    const grpCounts = { 1: 0, 2: 0 }

    if (grp1) grpCounts[1] = grp1.count
    if (grp2) grpCounts[2] = grp2.count

    for (let i = 0; i < val.length; i++) {
      const [team_name, date_reg, ...extra] = val[i].trim().split(' ')

      if (extra.length > 1) {
        console.log(
          `Extra args (${extra.slice(
            1
          )}). format required - <teamName> <DD/MM> <grpNum>`
        )
      }

      if (
        !dayjs(`${date_reg}/${dayjs().year()}`, 'DD/MM/YYYY', true).isValid()
      ) {
        console.log(
          `Invalid date. Ensure ${date_reg} of ${dayjs().year()} exists and is in the format DD/MM`
        )
      }

      const grp_num = parseInt(extra[0])

      if (isNaN(grp_num) || grp_num > 2 || grp_num < 1) {
        res.status(201).json({
          message: `grp number must be 1 or 2, not ${grp_num}`,
        })
      }

      grpCounts[grp_num] += 1
      if (grpCounts[grp_num] > 6) {
        res.status(201).json({
          message: `Adding more teams than the limit of 6 for group ${grp_num}`,
        })
      }

      teams.push({
        team_name,
        date_reg,
        grp_num,
        pts: 0,
        secondary_pts: 0,
        total_goals: 0,
      })
    }

    const savedObj = await teamsModel.insertMany(teams)
    res.status(201).json({ savedObj })
    console.log('@controller.js: registering new user... ', savedObj)
  } catch ({ message }) {
    res.status(400).json(createErrMsg({ message }))
  }
}

export const scoresSubmission = async (req, res) => {
  try {
    const scores = req.body.val.split('\n')

    const mongodbTeamNames = await teamsModel.find({}, { _id: 0, team_name: 1 })
    const calcPoints = mongodbTeamNames.reduce((acc, curr) => {
      acc[curr['team_name']] = { pts: 0, secondary_pts: 0, total_goals: 0 }
      return acc
    }, {})

    for (let i = 0; i < scores.length; i++) {
      let [ta, tb, aScored, bScored, ...extra] = scores[i].trim().split(' ')
      if (ta === tb) {
        console.log(ta, tb)
        res.status(401).json(
          createErrMsg({
            message: `${ta} cannot fight against itself`,
          })
        )
        return
      }

      if (extra.length) {
        console.log(scores[i], extra)
        res.status(400).json(createErrMsg({ message: 'too many args passed' }))
        return
      }

      aScored = parseInt(aScored)
      bScored = parseInt(bScored)

      if (
        ta in calcPoints &&
        tb in calcPoints &&
        !isNaN(aScored) &&
        !isNaN(bScored)
      ) {
        // check if ta and tb exists

        // calc scoring
        if (aScored > bScored) {
          calcPoints[ta]['pts'] += 3
          calcPoints[ta]['secondary_pts'] += 5
          calcPoints[tb]['secondary_pts'] += 5
        } else if (aScored < bScored) {
          calcPoints[ta]['pts'] += 3
          calcPoints[ta]['secondary_pts'] += 5
          calcPoints[tb]['secondary_pts'] += 5
        } else {
          const score = { ta: 1, tb: 1, tas: 3, tbs: 3 }
          calcPoints[ta]['pts'] += 1
          calcPoints[tb]['pts'] += 1
          calcPoints[ta]['secondary_pts'] += 3
          calcPoints[tb]['secondary_pts'] += 3
        }

        calcPoints[ta]['total_goals'] += aScored
        calcPoints[tb]['total_goals'] += bScored
      } else {
        res.status(400).json(createErrMsg('invalid team or score'))
        return
      }
    }

    for (const [team_name, inc] of Object.entries(calcPoints)) {
      await teamsModel.updateOne({ team_name }, { $inc: inc })
    }
    res.status(201).json({ ok: 'ok' })
    return
  } catch (err) {
    res.status(400).json(createErrMsg())
  }
}

export const deleteTeams = async (req, res) => {
  try {
    res.json(await teamsModel.deleteMany({}))
  } catch (err) {
    res.status(400).json(createErrMsg())
  }
}
