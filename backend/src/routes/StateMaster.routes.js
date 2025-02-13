import express from 'express'
import { protectedRoute } from '../middlewares/auth.middleware.js'
import { addState, deleteState, getStateById, getStates, updateState } from '../controllers/StateMaster.controller.js'


const router = express.Router()

router.route("/addState").post(protectedRoute, addState)
router.route("/getStates").get(protectedRoute, getStates)
router.route("/getStateById/:id").get(protectedRoute, getStateById)
router.route("/updateState/:id").put(protectedRoute, updateState)
router.route("/deleteState/:id").delete(protectedRoute, deleteState)


export default router