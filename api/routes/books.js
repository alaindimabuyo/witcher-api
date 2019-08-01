const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Books = require("../models/books");
const auth = require("../middleware/auth");
const multer = require("multer");

//image
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/books");
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

//GET
router.get("/", async (req, res) => {
  try {
    const response = await Books.find();

    res.status(200).json({
      count: response.length,
      Books: response.map(doc => {
        return {
          _id: doc._id,
          book: doc.book,
          sypnosis: doc.sypnosis,
          author: doc.author,
          pages: doc.pages,
          published: doc.published,
          bookImage: doc.bookImage,
          request: {
            type: "GET",
            url: "http://localhost:3000/books/" + doc.id
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
router.post("/", upload.single("bookImage"), async (req, res, next) => {
  //setup

  try {
    const newBooks = new Books({
      _id: mongoose.Types.ObjectId(),
      book: req.body.book,
      pages: req.body.pages,
      sypnosis: req.body.sypnosis,
      author: req.body.author,
      published: req.body.published,
      bookImage: " /uploads/books/" + req.file.filename
    });

    const book = await newBooks.save();

    res.status(201).json({
      message: "Book Stored",
      createdBook: book
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
router.get("/:bookID", async (req, res) => {
  try {
    const book = await Books.findById(req.params.bookID).select(
      "book author pages published bookImage sypnosis"
    );

    res.json({
      book: book,
      request: {
        type: "GET",
        url: "http://localhost:3000/books"
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
router.delete("/:bookID", async (req, res) => {
  try {
    await Books.findByIdAndRemove(req.params.bookID);
    res.json({ message: "Book Removed" });
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
