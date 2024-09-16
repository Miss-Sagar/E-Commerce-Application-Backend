const express = require("express");
const {userRegister, userLogin, loginUser} = require("../controllers/userController");
const {validateTokenHandler} = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", userRegister).post("/login",userLogin);
router.get("/loginUser",validateTokenHandler, loginUser);

module.exports = router;