const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
      },
    ],

    address: {
      fullName: String,
      phone: String,
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
    },

    totalAmount: Number,

    paymentMethod: {
      type: String,
      default: "COD",
    },

    status: {
      type: String,
      default: "placed",
    },
  },
  {
    timestamps: true,
  },
);


const Order = mongoose.model("Order", orderSchema)

module.exports = Order
