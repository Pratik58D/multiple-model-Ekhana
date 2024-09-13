const mongoose = require("mongoose");
const schema = mongoose.Schema;

const profileSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
  full_name: {
    type: String,
  },
  address: {
    type: String,
},
  profilePic: {
    type: String,
    required: false,
  },
});

// creating the profile model
const Profile = mongoose.model("profile", profileSchema);
module.exports = Profile;
