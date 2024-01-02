const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({path:"backend/config/config.env"});

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        //useCreateIndex:true
      })
      .then((data)=>{
          console.log(`Mongodb connected with server: ${data.connection.host}`)
      })
}
module.exports = connectDatabase
