import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import teamsRoute from './teams/teams'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())
app.use('/', teamsRoute)

mongoose.connect(process.env.MONGOAPIKEY).then(() => {
  console.log('mongDB app available')
  app.listen(port, () => {
    console.log(`Server on http://localhost:${port}`)
  })
})
