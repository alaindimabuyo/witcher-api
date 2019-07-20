//handle request
const express = require("express");
const app = express();
const morgan = require("morgan");

//product route
const productRoutes = require("./api/routes/products");
//orders route
const orderRoutes = require("./api/routes/orders");

app.use(morgan("dev"));

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

//error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  //pass the error request
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
