const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handle GET Request to /products"
  });
});
router.post("/", (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };

  res.status(201).json({
    message: "Handle POST Request to /products",
    createdProduct: product
  });
});

router.get("/:productID", (req, res, next) => {
  const id = req.params.productID;

  if (id === "alain") {
    res.status(200).json({
      message: "You discovered wild pokemons",
      id: id
    });
  } else {
    res.status(200).json({
      message: "You passed an ID"
    });
  }
});

router.patch("/:productID", (req, res, next) => {
  res.status(200).json({
    message: "Updated Product"
  });
});
router.delete("/:productID", (req, res, next) => {
  res.status(200).json({
    message: "You deleted a Product"
  });
});

module.exports = router;
