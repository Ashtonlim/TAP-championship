import { Router } from 'express'
import { getAllTeams, registerTeams } from './controller'
const router = Router()

router.get('/', getAllTeams)
router.post('/teams', registerTeams)

export default router
