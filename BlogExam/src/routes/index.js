const express = require("express")

const routes = express.Router();

routes.use("/auth", require("./auth.routes.js"));
routes.use("/blog", require("./blog.routes.js"));
routes.use("/user", require("./user.routes.js"));

module.exports = routes;