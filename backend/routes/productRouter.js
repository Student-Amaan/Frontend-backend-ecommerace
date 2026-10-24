const express = require("express");
const {
  createProduct,
  getproducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/add", createProduct);

router.get("/", getproducts);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

module.exports = router;
