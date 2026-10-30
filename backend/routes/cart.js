const express = require("express");

const {
  addToCart,
  removeToCart,
  updateQuantity,
  getCard,
} = require("../controllers/cartController");

const router = express.Router()

router.post("/add", addToCart)

router.post("/remove", removeToCart)

router.post("/update",updateQuantity)

router.get("/:userId", getCard)


module.exports = router
