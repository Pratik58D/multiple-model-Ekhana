const FoodItem = require("../models/profilemodel");

const dotenv = require("dotenv");
dotenv.config();

const domain = process.env.DOMAIN;

///Creatre a Food item
const CreateFoodItem = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      isAvailable,
      stock,
    } = req.body;

   
    const foodPic = req.file ? req.file.filename : null;

    const foodItem = new FoodItem({
        name,
        description,
        price,
        isAvailable,
        stock,
        foodPic
    });
    const fooditem = await foodItem.save()
    return res
      .status(200)
      .json({ msg: "Food item created sucessfully ", foodItem: foodItem });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error", error: err.message });
  }
};


 


module.exports = { 
    CreateFoodItem
 };
