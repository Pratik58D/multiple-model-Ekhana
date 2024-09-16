const FoodItem = require("../models/foodItemModel");
const FoodCategory = require("../models/foodCategory");
const dotenv = require("dotenv");
dotenv.config();

// Create a new Food Item
const CreateFoodItem = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      isAvailable,
      stock,
    } = req.body;

    const foodPic = req.file ? req.file.filename : null;

    const foodItem = new FoodItem({
      name,
      description,
      price,
      isAvailable,
      stock,
      foodPic,
    });

    const fooditem = await foodItem.save();
    return res.status(200).json({ msg: "Food item created successfully", foodItem: foodItem });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// Search Food Items by Category
const searchFoodByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params; // Get category name from URL parameter

    // Find the category by name
    const category = await FoodCategory.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ msg: "Food category not found" });
    }

    // Find all food items that belong to the category
    const foodItems = await FoodItem.find({ foodCategoryId: category._id });

    return res.status(200).json({ msg: "Food items found", foodItems });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// Search Food Items by Keyword
const searchFoodByKeyword = async (req, res) => {
  try {
    const { keyword } = req.query; // Get the search keyword from the query parameter

    // Search for food items that contain the keyword in their name or description
    const foodItems = await FoodItem.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },  // 'i' for case-insensitive search
        { description: { $regex: keyword, $options: "i" } }
      ]
    });

    if (foodItems.length === 0) {
      return res.status(404).json({ msg: "No food items found for the keyword" });
    }

    return res.status(200).json({ msg: "Food items found", foodItems });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

module.exports = { 
  CreateFoodItem,
  searchFoodByCategory,
  searchFoodByKeyword,
};
