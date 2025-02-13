import express from 'express'
import { deleteUser, getUsers, login, logout, registerUser } from '../controllers/user.controller.js'

const router = express.Router()


router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route("/getUsers").get(getUsers)
router.route("deleteUser/:id").delete(deleteUser)


export default router