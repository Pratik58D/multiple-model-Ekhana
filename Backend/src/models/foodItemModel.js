const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: false,
    },
    foodCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodCategory',
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    stock: {
        type: Number,
        default: 10, 
    },
    foodPic:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);
module.exports = FoodItem;
