const express = require("express");
const authMiddleware = require("../middleware/authenticationmiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");
const { foodImage } = require("../middleware/uploadMiddleware");
const { 
    CreateFoodItem, 
    searchFoodByCategory, 
    searchFoodByKeyword 
} = require("../controllers/foodController");

const router = express.Router();

/**
 * @description : create a new food item (admin and resturant_owner)
 * @api  : /api/fooditems/create
 * @access : Private
 * @type : POST
 */
router.post("/create", authMiddleware, authorizeRole("admin", "resturant_owner"), foodImage.single("foodPic"), CreateFoodItem);

/**
 * @description : search food items by category
 * @api  : /api/fooditems/search/category/:categoryName
 * @access : Public
 * @type : GET
 */
router.get("/search/category/:categoryName", searchFoodByCategory);

/**
 * @description : search food items by keyword in name or description
 * @api  : /api/fooditems/search
 * @access : Public
 * @type : GET
 * @example : /api/fooditems/search?keyword=burger
 */
router.get("/search", searchFoodByKeyword);

module.exports = router;
