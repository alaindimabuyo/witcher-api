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

router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .exec()
    .then(docs => {
      //metada
      const response = {
        count: docs.length,
        products: docs.map(doc => {
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
      };
      res.status(200).json(response);
    })
    .catch(doc => {
      console.log(doc);
      res.status(500).json(doc);
    });
});

router.post("/", auth, upload.single("productImage"), (req, res) => {
  //save to DB
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: " /uploads/" + req.file.filename
  });
  //store to db
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: "Product successfully saved",
        createdProduct: product
      });
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
    .select("name price _id productImage")
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productID", auth, (req, res, next) => {
  const id = req.params.productID;

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product successfully updated"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.delete("/:productID", auth, (req, res, next) => {
  const id = req.params.productID;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product successfully deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
