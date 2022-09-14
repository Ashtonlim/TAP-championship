import mongoose from 'mongoose'

const matchSchema = mongoose.Schema(
  {
    against: { type: String, required: true },
    score: { type: Number, required: true, default: 0 },
    opp_score: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)

const teamSchema = mongoose.Schema(
  {
    team_name: {
      type: String,
      required: true,
      unique: true,
      default: 'noNameTeam',
    },
    date_reg: { type: String, required: true },
    grp_num: { type: Number, required: true, enum: [1, 2] },
    total_points: { type: Number, required: true, default: 0 },
    total_goals: { type: Number, required: true, default: 0 },
    matches: [
      {
        type: matchSchema,
        default: [],
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model('Team', teamSchema)
