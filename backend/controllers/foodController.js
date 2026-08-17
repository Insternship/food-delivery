const Food = require("../models/Food");

// POST - Create Food
const createFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);

    res.status(201).json({
      message: "Food created successfully",
      food
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET - All Foods
const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET - Single Food
const getSingleFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found"
      });
    }

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// PUT - Update Food
const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!food) {
      return res.status(404).json({
        message: "Food not found"
      });
    }

    res.status(200).json({
      message: "Food updated successfully",
      food
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE - Delete Food
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found"
      });
    }

    res.status(200).json({
      message: "Food deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET - Search Food
const searchFood = async (req, res) => {
  try {
    const name = req.query.name;

    if (!name) {
      return res.status(400).json({
        message: "Please provide food name"
      });
    }

    const foods = await Food.find({
      name: {
        $regex: name,
        $options: "i"
      }
    });

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createFood,
  getAllFoods,
  getSingleFood,
  updateFood,
  deleteFood,
  searchFood
};