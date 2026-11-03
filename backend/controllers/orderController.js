const Order = require("../models/Order");
const Cart = require("../models/cart");
const Product = require("../models/product");

const placeOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    console.log("USER ID:", userId);
    console.log("CART DATA:", cart);
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "the cart is empty" });

    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    const totalAmount = orderItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0,
    );

    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity },
      });
    }

    const order = await Order.create({
      userId,
      item: orderItems,
      address,
      totalAmount,
      paymentMethod: "COD",
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "order placed sucessfully",
      order: order._id,
    });
  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { placeOrder };
