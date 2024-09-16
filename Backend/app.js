const express =  require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT =  process.env.PORT || 3000;

//Middleware to parse json bodies
app.use(express.json());

//data base connection
const connectionDb = require("./src/config/db");
console.log(connectionDb());

//route for the user 
const registerUser = require("./src/routes/userRoute")
app.use("/api/user" , registerUser);


//route for the Profile
const  updateProfile = require("./src/routes/profileRoute")
app.use("/api/profile",updateProfile)



//router for resturannt

const resturantRoute = require("./src/routes//resturantroute");
app.use("/api/resturant",resturantRoute)


//router for foodCategory
const foodCategoryRoute = require("./src/routes/FoodCategoryRoute");
app.use("/api/foodCategory", foodCategoryRoute);

//router for foodCategory
const foodItemRoute = require("./src/routes/FooditemRoute");
app.use("/api/fooditems", foodItemRoute);


app.listen(PORT,()=>console.log(`server started ${PORT}`))