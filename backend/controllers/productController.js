const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({
      message: "product created sucessfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};

const getproducts = async (req, res) => {
  try {
    const { search, catagory } = req.query;
    let filter = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (catagory) {
      filter.catagory = catagory;
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "cannot find product",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const update = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      message: "product updated sucessfully",
      update,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({
      message: "product deleted sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

module.exports = {
  createProduct,
  getproducts,
  updateProduct,
  deleteProduct,
};
