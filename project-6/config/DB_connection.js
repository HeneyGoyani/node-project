const mongoose =   require("mongoose")

const DB_connection = async (req, res) => {
    await mongoose.connect("mongodb+srv://bharatgoyani8788_db_user:Heney2015@cluster0.hofojjp.mongodb.net/Admin-panel")
    .then("connection successfully ")
    .catch((err) =>  console.log(err))
}

module.exports = DB_connection;
