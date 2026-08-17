const express = require("express");

const router = express.Router();

const {
  createFood,
  getAllFoods,
  getSingleFood,
  updateFood,
  deleteFood,
  searchFood
} = require("../controllers/foodController");

router.post("/", createFood);

router.get("/", getAllFoods);

router.get("/search", searchFood);

router.get("/:id", getSingleFood);

router.put("/:id", updateFood);

router.delete("/:id", deleteFood);

module.exports = router;