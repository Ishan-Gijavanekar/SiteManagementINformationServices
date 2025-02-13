import express from 'express'
import { protectedRoute } from '../middlewares/auth.middleware.js'
import { addForm, deleteForm, getFormById, getForms, updateForm } from '../controllers/FormDetails.controller.js'

const router = express.Router()


router.route("/addForm").post(protectedRoute, addForm)
router.route("/getForms").get(protectedRoute, getForms)
router.route('/getFormById/:id').get(protectedRoute, getFormById)
router.route("/updateForm/:id").put(protectedRoute, updateForm)
router.route("/deleteForm/:id").delete(protectedRoute, deleteForm)



export default router