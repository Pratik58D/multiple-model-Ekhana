const mongoose =  require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoUrl = process.env.Mongo_url;

const connectionDb =  async()=>{
    try{
        const conn = await mongoose.connect(mongoUrl);
        console.log(`Connected to : ${conn.connection.host}`)

    }
    catch(err){
        console.log("failed",err);
        process.exit(1);
    }
}


module.exports  =  connectionDb;