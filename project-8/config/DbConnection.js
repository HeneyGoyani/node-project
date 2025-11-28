const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
 await mongoose.connect("mongodb+srv://bharatgoyani8788_db_user:Heney2015@cluster0.hofojjp.mongodb.net/Admin-panel")       
 // await mongoose.connect("");
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("Database Connection Failed:", err);
  }
};

module.exports = dbConnect;
