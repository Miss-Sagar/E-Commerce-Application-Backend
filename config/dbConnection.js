const mongoose = require("mongoose");

const dbConnection = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("db connected succesfully", connect.connection.host, connect.connection.name)
    }catch(err){
        console.log("error is:", err);
        process.exit(1);
    }
}

module.exports = dbConnection;