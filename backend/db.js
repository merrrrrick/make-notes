const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://merrickpereira:Merrick12@notes-cluster.ansquow.mongodb.net/";

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(()=>console.log("Connected to MongoDB")).catch((e)=>console.log(e.message));
};

module.exports = connectToMongo;