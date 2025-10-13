const mongoose = require('mongoose');

const dbConnnection = () => {
    mongoose.connect("mongodb+srv://bharatgoyani8788_db_user:Heney2015@cluster0.hofojjp.mongodb.net/Bookmyshow")
        .then(() => console.log("DB is Connected"))
        .catch(err => console.log(err));
}

module.exports = dbConnnection;