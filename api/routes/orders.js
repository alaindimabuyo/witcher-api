const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Orders = require("../models/orders");
//GET
router.get("/", (req, res, next) => {
  Orders.find()
    .select("quantity _id product")
    .populate("product", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders" + doc.id
            }
          };
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//POST
router.post("/", (req, res, next) => {
  //setup
  const order = new Orders({
    _id: mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.productId
  });
  //save db
  order
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order Stored",
        createOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
//GET ID
router.get("/:orderID", (req, res, next) => {
  Orders.findById(req.params.orderID)
    .populate("product", "name")
    .exec()

    .then(order => {
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//DELETE
router.delete("/:orderID", (req, res, next) => {
  Orders.remove({ _id: req.params.orderID })
    .exec()

    .then(order => {
      res.status(200).json({
        message: "Order Deleted",
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
