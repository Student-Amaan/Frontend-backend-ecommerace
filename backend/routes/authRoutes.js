const express = require("express")
const {signUpUser} = require ( "../controllers/authController")

const router = express.Router()

router.post("/signup", signUpUser)

module.exports = router

