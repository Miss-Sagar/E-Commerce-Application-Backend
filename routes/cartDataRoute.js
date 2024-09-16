const express = require("express");
const { cartItem, userCartedData, deleteCartItem } = require("../controllers/cartDataController");
const { validateTokenHandler } = require("../middleware/validateTokenHandler");


const router = express.Router();

router.post('/cartData/:id',validateTokenHandler, cartItem);
router.get('/getCartProducts',validateTokenHandler, userCartedData);
router.delete('/removeCartItem/:id',validateTokenHandler, deleteCartItem);

module.exports = router;