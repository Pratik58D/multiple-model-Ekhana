const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    foodCategoryIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodCategory',
        required: false,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
