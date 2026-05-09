import express from 'express'
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated.js'
import { createOrder, getAllOrders, getMyOrders, getSalesData, getUserOrders, verifyPayment } from '../controller/orderController.js'

const router = express.Router()


router.post('/create-order',isAuthenticated,createOrder)
router.post('/verify-payment', isAuthenticated,verifyPayment)
router.get('/my-orders', isAuthenticated, getMyOrders)
router.get('/user-orders/:userId',isAuthenticated,isAdmin, getUserOrders)
router.get('/all-orders', isAuthenticated, isAdmin, getAllOrders)
router.get("/sales", isAuthenticated, isAdmin, getSalesData)

export default router 