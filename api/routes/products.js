const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const multer = require("multer");
const auth = require("../middleware/auth");
//image
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
//filter image types
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", async (req, res, next) => {
  try {
    const response = await Product.find().select("name price _id productImage");
    res.json({
      count: response.length,
      products: response.map(doc => {
        return {
          _id: doc._id,
          name: doc.name,
          price: doc.price,
          productImage: doc.productImage,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + doc._id
          }
        };
      })
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
  // Product.find()
  //   .select("name price _id productImage")
  //   .exec()
  //   .then(docs => {
  //     //metada
  //     const response = {
  //       count: docs.length,
  //       products: docs.map(doc => {
  //         return {
  //           _id: doc._id,
  //           name: doc.name,
  //           price: doc.price,
  //           productImage: doc.productImage,
  //           request: {
  //             type: "GET",
  //             url: "http://localhost:3000/products/" + doc._id
  //           }
  //         };
  //       })
  //     };
  //     res.status(200).json(response);
  //   })
  //   .catch(doc => {
  //     console.log(doc);
  //     res.status(500).json(doc);
  //   });
});

router.post("/", auth, upload.single("productImage"), async (req, res) => {
  //save to DB
  try {
    const newProduct = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      productImage: " /uploads/" + req.file.filename
    });

    const product = await newProduct.save();
    res.status(201).json({
      message: "Product successfully saved",
      createdProduct: product
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server ERROR");
  }

  // //store to db
  // product
  //   .save()
  //   .then(result => {
  //     res.status(201).json({
  //       message: "Product successfully saved",
  //       createdProduct: product
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err
  //     });
  //   });
});

router.get("/:productID", async (req, res) => {
  try {
    const response = await Product.findById(req.params.productID).select(
      "name price _id productImage"
    );
    res.json(response);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server ERROR");
  }
  // const id = req.params.productID;
  // Product.findById(id)
  //   .select("name price _id productImage")
  //   .exec()
  //   .then(doc => {
  //     res.status(200).json(doc);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({ error: err });
  //   });
});

router.patch("/:productID", async (req, res, next) => {
  const updateOps = {};
  for (const ops in req.body) {
    updateOps[ops.propName] = ops.value;
  }
  try {
    product = await Product.findByIdAndUpdate(
      req.params.productID,
      { $set: updateOps },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server ERROR");
  }

  // Product.update({ _id: id }, { $set: updateOps })
  //   .exec()
  //   .then(result => {
  //     res.status(200).json({
  //       message: "Product successfully updated"
  //     });
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       error: err
  //     });
  //   });
});
router.delete("/:productID", auth, async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.productID);
    res.json({ message: "Product Removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server ERROR");
  }
  // const id = req.params.productID;
  // Product.remove({ _id: id })
  //   .exec()
  //   .then(result => {
  //     res.status(200).json({
  //       message: "Product successfully deleted"
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err
  //     });
  //   });
});

module.exports = router;
