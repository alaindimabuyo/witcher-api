//handle request
const express = require("express");
const app = express();

//product route
const productRoutes = require("./api/routes/products");

//middleware
app.use("/products", productRoutes);

module.exports = app;
