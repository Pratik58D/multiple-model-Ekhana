const FoodCategory = require('../models/foodCategory');

// CREATE a new food category
const createFoodCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newFoodCategory = new FoodCategory({
            name,
            description
        });
        await newFoodCategory.save();
        res.status(201).json(newFoodCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// READ all food categories
const getFoodCategories = async (req, res) => {
    try {
        const foodCategories = await FoodCategory.find();
        res.status(200).json(foodCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ one food category by ID
const getFoodCategoryById = async (req, res) => {
    try {
        const foodCategory = await FoodCategory.findById(req.params.id);
        if (!foodCategory) {
            return res.status(404).json({ message: 'Food category not found' });
        }
        res.status(200).json(foodCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE a food category by ID
const updateFoodCategory = async (req, res) => {
    try {
        const updatedFoodCategory = await FoodCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            // { new: true, runValidators: true }
        );
        if (!updatedFoodCategory) {
            return res.status(404).json({ message: 'Food category not found' });
        }
        res.status(200).json(updatedFoodCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE a food category by ID
const deleteFoodCategory = async (req, res) => {
    try {
        const deletedFoodCategory = await FoodCategory.findByIdAndDelete(req.params.id);
        if (!deletedFoodCategory) {
            return res.status(404).json({ message: 'Food category not found' });
        }
        res.status(200).json({ message: 'Food category deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createFoodCategory,
    getFoodCategories,
    getFoodCategoryById,
    updateFoodCategory,
    deleteFoodCategory
};
