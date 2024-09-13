const express = require("express");
const authMiddleware = require("../middleware/authenticationmiddleware");
const { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant } = require("../controllers/resturantController");
const { authorizeRole } = require("../middleware/authorizationMiddleware");

const router = express.Router();

/**
 * @description To create a restaurant (allowed for admin and restaurant owner)
 * @api /api/restaurants/create
 * @access Private
 * @type POST
 */
router.post("/create", authMiddleware, authorizeRole("admin","resturant_owner"), createRestaurant);

/**
 * @description Get all restaurants
 * @api /api/restaurants
 * @access Public
 * @type GET
 */
router.get("/", getRestaurants);

/**
 * @description Get a restaurant by ID
 * @api /api/restaurants/:id
 * @access Public
 * @type GET
 */
router.get("/:id", getRestaurantById);

/**
 * @description Update a restaurant by ID (allowed for admin and restaurant owner)
 * @api /api/restaurants/:id
 * @access Private
 * @type PUT
 */
router.put("/:id", authMiddleware, authorizeRole("admin","resturant_owner"), updateRestaurant);

/**
 * @description Delete a restaurant by ID (allowed for admin)
 * @api /api/restaurants/:id
 * @access Private
 * @type DELETE
 */
router.delete("/:id", authMiddleware, authorizeRole("admin"), deleteRestaurant);

module.exports = router;
