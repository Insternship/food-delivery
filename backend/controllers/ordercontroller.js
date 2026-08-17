const Food = require("../models/Food");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const food = await Food.findById(item.food);

      if (!food) {
        return res.status(404).json({
          message: "Food not found"
        });
      }

      if (food.stock < item.quantity) {
        return res.status(400).json({
          message: `${food.name} is out of stock`
        });
      }

      subtotal += food.price * item.quantity;

      orderItems.push({
        food: food._id,
        quantity: item.quantity,
        price: food.price
      });
    }

    const discount = subtotal >= 500 ? 50 : 0;
    const deliveryFee = 40;
    const total = subtotal - discount + deliveryFee;

    const order = await Order.create({
      items: orderItems,
      subtotal,
      discount,
      deliveryFee,
      total
    });

    // Reduce stock
    for (const item of items) {
      await Food.findByIdAndUpdate(item.food, {
        $inc: { stock: -item.quantity }
      });
    }

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to place order",
      error: error.message
    });
  }
};

module.exports = { createOrder };