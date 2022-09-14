import { Router } from 'express'
import {
  getAllTeams,
  registerTeams,
  scoresSubmission,
  deleteTeams,
} from './controller'
const router = Router()

router.get('/', getAllTeams)
router.get('/deleteTeams', deleteTeams)
router.post('/scores', scoresSubmission)
router.post('/teams', registerTeams)

export default router
