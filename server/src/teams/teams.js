import { Router } from 'express'
import {
  getAllTeams,
  registerTeams,
  scoresSubmission,
  deleteTeams,
  resetPoints,
} from './controller'
const router = Router()

router.get('/', getAllTeams)
router.get('/deleteTeams', deleteTeams)
router.get('/reset', resetPoints)
router.post('/scores', scoresSubmission)
router.post('/teams', registerTeams)

export default router
