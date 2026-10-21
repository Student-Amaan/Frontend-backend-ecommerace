const user = require("../models/User")
const bcrypt = require("bcryptjs")

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


module.exports = {signUpUser}