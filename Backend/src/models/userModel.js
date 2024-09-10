const mongoose = require('mongoose');
const bcrypt = require("bcrypt");



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone_number:{
        type : String,
        required : true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'delivery_person',"resturant_owner"],
        default: 'customer',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})


const User = mongoose.model('User', userSchema);
module.exports = User;
