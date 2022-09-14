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
  const { val } = req.body
  const teams = []

  // if a < b, then a - b < 0, sort as a, b
  // if a > b, then a - b > 0, sort as b, a

  try {
    const [grp1, grp2] = (
      await teamsModel.aggregate([
        { $group: { _id: '$grp_num', count: { $sum: 1 } } },
      ])
    ).sort((a, b) => a._id - b._id)

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

export const deleteTeams = async (req, res) => {
  try {
    res.json(await teamsModel.deleteMany({}))
  } catch (err) {
    res.status(400).json(createErrMsg())
  }
}
