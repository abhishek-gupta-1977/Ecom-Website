import express from 'express'
import { changePassword, forgotPassword, getAllUsers, getUserById, login, logout, register, reverify, updateUser, verify, verifyOTP } from '../controller/userController.js'
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated.js'
import { singleUpload } from '../middleware/multer.js'

const router = express.Router()


router.post('/register',register)
router.post('/verify', verify)
router.post('/resend-verification',reverify)
router.post('/login',login)
router.post('/logout',isAuthenticated,logout)
router.post('/forgot-password',forgotPassword)
router.post('/verify-otp/:email', verifyOTP)
router.put('/change-password/:email',changePassword)
router.get('/all-user',isAuthenticated,isAdmin, getAllUsers)
router.get('/get-user/:userId',isAuthenticated, isAdmin, getUserById)
router.put('/update/:id', isAuthenticated,singleUpload,updateUser)
export default router