const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes.js")
const productRoutes = require("./routes/productRouter.js")
const cartRoute = require("./routes/cart.js")
const addressRoutes = require('./routes/address.js')
const orderRoutes = require("./routes/order.js")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use("/api/cart", cartRoute)
app.use("/api/address",addressRoutes)
app.use("/api/order", orderRoutes)

app.get('/', (req,res) => {
  res.send("API is running ...")
})

connectDB()

app.listen(5001, () => {
  console.log(`app is running on port 5001`)
})