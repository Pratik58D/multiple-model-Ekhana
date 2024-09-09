const mongoose = require('mongoose');

const deliveryPersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'on delivery', 'off duty'],
        default: 'available',
    },
    currentOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }
});

const DeliveryPerson = mongoose.model('DeliveryPerson', deliveryPersonSchema);
module.exports = DeliveryPerson;
