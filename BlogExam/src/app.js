require("dotenv").config()

const express = require("express")
const port = process.env.PORT || 8005
const dbConnect = require("./config/dbConnect.config.js")

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use("/api", require('./routes'));

app.listen(port, () => {
  console.log(`Server Start at http://localhost:${port}`);
})