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

const registerUser = require("./src/routes/userRoute")

app.use("/api/user" , registerUser)


app.listen(PORT,()=>console.log(`server started ${PORT}`))