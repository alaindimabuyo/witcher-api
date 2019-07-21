const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(doc => {
      console.log(doc);
      res.status(500).json(doc);
    });
});
router.post("/", (req, res, next) => {
  //save to DB
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  //store to db
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: "Handle POST Request to /products",
        createdProduct: product
      });
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:productID", (req, res, next) => {
  const id = req.params.productID;

  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productID", (req, res, next) => {
  const id = req.params.productID;

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.delete("/:productID", (req, res, next) => {
  const id = req.params.productID;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json("product Deleted");
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
