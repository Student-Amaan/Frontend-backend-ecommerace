const cart = require("../models/cart");

const addToCart = async (req , res) => {
  try {
    const { userId, productId } = req.body;
    let cartDoc = await cart.findOne({ userId });
    if (!cartDoc) {
      cartDoc = new cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const item = cartDoc.items.find((i) => i.productId.toString() === productId);
    
    if (item) {
      item.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }
  }
    await cartDoc.save();
    res.json({
      message: "Item added to cart",
      cartDoc,
    });
  
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
      stack: error.stack,
    });
  }
};

const removeToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cartDoc = await cart.findOne({ userId });
    if (!cartDoc) {
      res.status(400).json({ message: "cartDoc not found" });
    }
    cartDoc.items = cartDoc.items.filter((i) => i.productId.toString() === productId);
    await cartDoc.save();
    res.json({
      message: "item remove sucessfully",
      cartDoc,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error: error.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cartDoc = await cart.findOne({ userId });

    if (!cartDoc) {
      return res.status(400).json({
        message: "cartDoc not updated",
      });
    }

    const item = cartDoc.items.find((i) => i.productId.toString() === productId);

    if (!item) {
      res.status(400).json({
        message: "item not found in cart",
      });
    }

    item.quantity = quantity;

    await cartDoc.save();
    res.json({
      message: "item quantity updated",
      cartDoc,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error : error.message,
    });
  }
};

const getCard = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartDoc = await cart.findOne({ userId }).populate("items.productId");
    res.json(cartDoc);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  removeToCart,
  updateQuantity,
  getCard,
};
