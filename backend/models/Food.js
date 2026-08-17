const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
  type: String,
  required: true,
  trim: true
},

    description: {
      type: String
    },

    price: {
  type: Number,
  required: true,
  min: 0
},

    category: {
  type: String,
  required: true,
  trim: true
},

    image: {
      type: String
    },

    
    stock: {
  type: Number,
  required: true,
  min: 0
},
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Food", foodSchema);