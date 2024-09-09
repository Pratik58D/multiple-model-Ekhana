const User = require("../models/userModel");
const Profile = require("../models/profilemodel");

const registerUser  = async(req,res) =>{
    const {email,name,password,role} = req.body;
    if(!email || !password){
    return res.status(400).json({ msg: "please enter the email and password" });

    }
    try{
        const user = await User.findOne({email:email});
        if(user){
            return res.status(400).json({msg:"user already exits"});
        }
        const newUser = new User({
            email,
            name,
            password,
            role
        }) ;

        const newProfile = new Profile({
            user : newUser._id
        });
        const response = await newUser.save();
        const profileResponse = await newProfile.save();

        return res
        .status(201)
        .json({
            msg: "user registration sucessfull",
            user :response,
            profile : profileResponse
        });



    }catch(err){ 
    console.log(err);
    return res.status(500).json({ msg: "server error", error: err });
  }

}


module.exports = {registerUser}