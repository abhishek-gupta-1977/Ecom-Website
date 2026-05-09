import express from 'express'
import {isAuthenticated} from '../middleware/isAuthenticated.js'
import { getCart,addToCart, updateQuantity, removeFromCart } from '../controller/cartController.js'
const router = express.Router()

router.get('/',isAuthenticated,  getCart)
router.post('/add', isAuthenticated,addToCart)
router.put('/update',isAuthenticated,updateQuantity)
router.delete('/remove', isAuthenticated,removeFromCart)

export default router