 const express = require("express");

 const{registerUser, loginUser} =require("../controllers/userController");


 const router = express.Router();

/**
 * @description To create a user
 * @api /api/user/register
 * @access Public
 * @type post
 * @return response
 */

 
 router.post("/register",registerUser);

 /**
 * @description To login into file
 * @api /api/user/register
 * @access Public
 * @type post
 * @return response
 */

 router.post("/login",loginUser)


 module.exports = router;