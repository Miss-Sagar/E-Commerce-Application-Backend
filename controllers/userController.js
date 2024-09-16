const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc user register
// @route POST /register
// @access public

const userRegister = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        return new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        res.status(400).json({ error: "User already registered" });
        return;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    // console.log("hashPassword", hashPassword);

    const user = await User.create({
        username,
        email,
        password: hashPassword
    });
    // console.log("user created successfully", user);

    if (user) {
        res.status(201).json({message: "User register successfully", _id: user.id, email: user.email});
    } else {
        res.status(400);
        throw new Error("Invalid user");
    }
});

// @desc user login
// @route POST /login
// @access public

const userLogin = asyncHandler(async(req, res) => {
    const { email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email })
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10m'}
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401);
        throw new Error("email and password are not valid");
    }
    // res.json({message:"succesfully login"});
})

// @desc current user
// @route GET /loginUser
// @access public

const loginUser = asyncHandler(async(req, res) => {
    res.json({message:"login user"});
})

module.exports = {userRegister, userLogin, loginUser}