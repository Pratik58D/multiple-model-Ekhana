const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'delivered', 'cancelled'],
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        enum: ['credit card', 'cash on delivery'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deliveryAddress: {
        type: String,
        required: true,
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
