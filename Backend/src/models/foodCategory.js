const mongoose = require('mongoose');

const foodCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const FoodCategory = mongoose.model('FoodCategory', foodCategorySchema);
module.exports = FoodCategory;
