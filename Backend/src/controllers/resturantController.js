const Restaurant = require('../models/resturantModel');

// CREATE a new restaurant
const createRestaurant = async (req, res) => {
    try {
        const newRestaurant = new Restaurant(req.body);
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// READ all restaurants
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find().populate('foodCategoryIds');
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ one restaurant by ID
const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate('foodCategoryIds');
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE a restaurant by ID
const updateRestaurant = async (req, res) => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE a restaurant by ID
const deleteRestaurant = async (req, res) => {
    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!deletedRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.status(200).json({ message: "Restaurant deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
};
