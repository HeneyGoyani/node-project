const express = require("express");
const DB_connection = require("./config/dbconnect");
const movieRouter = require("./routes/movie.route")
const app = express();
const port = 9000;

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use("/", movieRouter)

app.listen(port, () => {
    DB_connection();
    console.log(`Server running on http://localhost:${port}`);
});
