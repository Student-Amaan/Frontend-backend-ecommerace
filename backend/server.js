const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes.js")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)

app.get('/', (req,res) => {
  res.send("API is running ...")
})

connectDB()

app.listen(5001, () => {
  console.log(`app is running on port 5001`)
})