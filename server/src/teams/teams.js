import { Router } from 'express'
import { getAllTeams, registerTeams, deleteTeams } from './controller'
const router = Router()

router.get('/', getAllTeams)
router.get('/deleteTeams', deleteTeams)
router.post('/teams', registerTeams)

export default router
