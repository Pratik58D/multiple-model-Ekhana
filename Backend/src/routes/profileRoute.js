const express = require("express");
const { updateProfile, getProfiles, deleteProfile } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authenticationmiddleware");
const { profileImage } = require("../middleware/uploadMiddleware");
const router = express.Router();

 /**
 * @description To update into file
 * @api /api/profile/update
 *  @access Private
 * @type put
 * @return response
 */

 router.put("/update",authMiddleware,profileImage.single("profilePic"),updateProfile)

 /**
 * @description To retrive into file
 * @api /api/profile/updatee
 *  @access Private
 * @type get
 * @return response
 */
 router.get("/get",authMiddleware,getProfiles);

 /**
 * @description delete a user Profile
 * @api /api/profile/delete
 * @access Private
 * @type delete
 * @return response
 */

router.delete("/delete",authMiddleware, deleteProfile);


 module.exports = router