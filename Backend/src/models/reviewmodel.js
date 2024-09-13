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
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    //for how many people reviews
    numReviews: {
        type: Number,
        default: 0,
    },
    foodCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodCategory',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
