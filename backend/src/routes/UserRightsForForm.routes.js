import express from 'express'
import { protectedRoute } from '../middlewares/auth.middleware.js'
import { addUserRights, deleteUserRights, getUserRightId, getUserRights, updateUserRights } from '../controllers/UserRightsForForms.controller.js'


const router = express.Router()


router.route("/addUserRights").post(protectedRoute, addUserRights)
router.route("/getUserRights").post(protectedRoute, getUserRights)
router.route("/getUserRightsById/:id").get(protectedRoute, getUserRightId)
router.route("/updateUserRights/:id").put(protectedRoute, updateUserRights)
router.route("/deleteUserRights/:id").delete(protectedRoute, deleteUserRights)


export default router