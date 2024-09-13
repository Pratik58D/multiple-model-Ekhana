const express = require("express");
const authMiddleware = require("../middleware/authenticationmiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");
const { foodImage } = require("../middleware/uploadMiddleware");
const { CreateFoodItem } = require("../controllers/foodController");

const router = express.Router();


/**
 * @description : create a new food item (admin and resturant_owner)
 * @api  : /api/fooditems/create
 * @acess : Private
 * @type : POST
 */


router.post("/create",authMiddleware,authorizeRole("admin","resturant_owner"),foodImage.single("foodPic"),CreateFoodItem);



module.exports = router