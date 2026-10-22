const user = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require ("jsonwebtoken")

const signUpUser = async (req,res) => {
  try {
    const {name , email , password} = req.body
    const userExist = await user.findOne({email})
    if(userExist){
      return res.status(400).json({
        message : "User already exist"
      })
    }
    const hashPassword = await bcrypt.hash(password , 10)
    // create User

    await user.create({
      name , email, password : hashPassword
    })
    res.status(201).json({
      message : "User register sucessfully"
    })
  } catch (error) {
    res.status(500).json({
      message : error.message
    })
  }
}


const loginUser = async (req , res) => {
  try {
    const {email , password} = req.body
    const users = await user.findOne({email})
    if(!users){
      return res.status(400).json({
        message : "User not found"
      })
    }
    const match = await bcrypt.compare(password , users.password)
    if(!match){
      return res.status(400).json({
        message : "invalid cradiental"
      })
    }
    const token = jwt.sign(
      {id: users._id},
      process.env.JWT_SECREAT,
      {expiresIn : "7d"}
    )
  res.json({
    message: "Login Successfully",
    token,
    users : {
      id : users._id,
      name : users.name,
      email : users.email
    }
  })
} catch (error) {
  console.log("login error", error)
  res.status(500).json({
    message : "Server error",
    error
  })
}
}
module.exports = { signUpUser, loginUser };