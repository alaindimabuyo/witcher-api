const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Orders = require("../models/orders");
const auth = require("../middleware/auth");

//GET
router.get("/", auth, async (req, res) => {
  try {
    const response = await Orders.find()
      .select("quantity _id product")
      .populate("product", "name");

    res.status(200).json({
      count: response.length,
      orders: response.map(doc => {
        return {
          _id: doc._id,
          product: doc.product,
          quantity: doc.quantity,
          request: {
            type: "GET",
            url: "http://localhost:3000/orders/" + doc.id
          }
        };
      })
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
  // Orders.find()
  //   .select("quantity _id product")
  //   .populate("product", "name")
  //   .exec()
  //   .then(docs => {
  //     res.status(200).json({
  //       count: docs.length,
  //       orders: docs.map(doc => {
  //         return {
  //           _id: doc._id,
  //           product: doc.product,
  //           quantity: doc.quantity,
  //           request: {
  //             type: "GET",
  //             url: "http://localhost:3000/orders" + doc.id
  //           }
  //         };
  //       })
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err
  //     });
  //   });
});

//POST
router.post("/", auth, async (req, res, next) => {
  //setup

  try {
    const newOrder = new Orders({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.productId
    });

    const order = await newOrder.save();

    res.status(201).json({
      message: "Order Stored",
      createOrder: {
        _id: order._id,
        product: order.product,
        quantity: order.quantity
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }

  //save db
  // order
  //   .save()
  //   .then(result => {
  //     console.log(result);
  //     res.status(201).json({
  //       message: "Order Stored",
  //       createOrder: {
  //         _id: result._id,
  //         product: result.product,
  //         quantity: result.quantity
  //       }
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err
  //     });
  //   });
});
//GET ID
router.get("/:orderID", auth, async (req, res) => {
  try {
    const order = await Orders.findById(req.params.orderID).populate("product", "name");

    res.json({
      order: order,
      request: {
        type: "GET",
        url: "http://localhost:3000/orders"
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
  // Orders.findById(req.params.orderID)
  //   .populate("product", "name")
  //   .exec()

  //   .then(order => {
  //     res.status(200).json({
  //       order: order,
  //       request: {
  //         type: "GET",
  //         url: "http://localhost:3000/orders"
  //       }
  //     });
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       error: err
  //     });
  //   });
});

//DELETE
router.delete("/:orderID", auth, async (req, res) => {
  try {
    await Orders.findByIdAndRemove(req.params.orderID);
    res.json({ message: "Product Removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server ERROR");
  }
  // Orders.remove({ _id: req.params.orderID })
  //   .exec()

  //   .then(order => {
  //     res.status(200).json({
  //       message: "Order Deleted",
  //       request: {
  //         type: "GET",
  //         url: "http://localhost:3000/orders"
  //       }
  //     });
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       error: err
  //     });
  //   });
});

module.exports = router;
