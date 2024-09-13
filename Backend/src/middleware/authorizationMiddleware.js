const User = require("../models/userModel");

//multiple  role are passed
function authorizeRole(...roles) {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ msg: "user not found" }); // User not found
      }

      const userRole = String(user.role).trim();

      // Check if user's role is in the list of allowed roles
      if (!roles.includes(userRole)) {  
        // Forbidden if user does not have any required role
        return res.status(403).json({ msg: "User has no access" });  
      }


      next();
    } catch (error) {
      // console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };
}

module.exports = {
  authorizeRole,

};

