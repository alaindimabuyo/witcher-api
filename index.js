//handle request
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://alain123:" +
    process.env.MONGO_ATLAS_PW +
    "@witcherapi-rk6ps.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  console.log("MongoDb Connected")
);

//parse incoming requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(morgan("dev"));
//show image publicly
app.use("/uploads", express.static("uploads"));

//Cors Headers | prevent cors errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

//Routes
const characterRoutes = require("./api/routes/character");
const bookRoutes = require("./api/routes/books");
const userRoutes = require("./api/routes/user");
app.use("/characters", characterRoutes);
app.use("/books", bookRoutes);
app.use("/user", userRoutes);

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
