const express = require("express");
const authMiddleware = require("../middleware/authenticationmiddleware");
const { 
  createFoodCategory, 
  getFoodCategories, 
  getFoodCategoryById, 
  updateFoodCategory, 
  deleteFoodCategory 
} = require("../controllers/foodCategoryController");
const { authorizeRole } = require("../middleware/authorizationMiddleware");

const router = express.Router();

/**
 * @description To create a food category (allowed for admin)
 * @api /api/foodCategory/create
 * @access Private
 * @type POST
 */
router.post("/create", authMiddleware, authorizeRole("admin","resturant_owner"), createFoodCategory);

/**
 * @description Get all food categories
 * @api /api/foodcategories
 * @access Public
 * @type GET
 */
router.get("/", getFoodCategories);

/**
 * @description Get a food category by ID
 * @api /api/foodcategories/:id
 * @access Public
 * @type GET
 */
router.get("/:id", getFoodCategoryById);

/**
 * @description Update a food category by ID (allowed for admin)
 * @api /api/foodcategories/:id
 * @access Private
 * @type PUT
 */
router.put("/:id", authMiddleware, authorizeRole("admin","resturant_owner"), updateFoodCategory);

/**
 * @description Delete a food category by ID (allowed for admin)
 * @api /api/foodcategories/:id
 * @access Private
 * @type DELETE
 */
router.delete("/:id", authMiddleware, authorizeRole("admin","resturant_owner"), deleteFoodCategory);

module.exports = router;
