import { Router } from 'express';
import { addProductToCart, creatCart, getCartById, purchaseCart } from '../controller/cart.controller.js';
import { checkProductAndCart } from '../middleware/checkProductAndCart.middleware.js';
import { verificarRol } from '../middleware/roleVerify.js';
import { passportCall } from '../utils.js';
export const router=Router()

router.get('/:cid', getCartById)
router.post('/', creatCart)
router.post ('/:cid/products/:pid', passportCall("current"), verificarRol(["user"]),checkProductAndCart, addProductToCart)
router.post ('/:cid/purchase',passportCall("current",{session:false}),purchaseCart)