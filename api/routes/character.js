const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Characters = require("../models/characters");
const multer = require("multer");
const auth = require("../middleware/auth");
//image
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/characters");
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
    const response = await Characters.find().select("name price _id characterImage");
    res.json({
      count: response.length,
      books: response.map(doc => {
        return {
          _id: doc._id,
          name: doc.name,
          price: doc.price,
          characterImage: doc.characterImage,
          request: {
            type: "GET",
            url: "http://localhost:5000/characters/" + doc._id
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

router.post("/", auth, upload.single("characterImage"), async (req, res) => {
  //save to DB
  try {
    const newCharacters = new Characters({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      characterImage: " /uploads/characters/" + req.file.filename
    });

    const character = await newCharacters.save();
    res.status(201).json({
      message: "Character successfully saved",
      creactedCharacter: character
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

router.get("/:characterID", async (req, res) => {
  try {
    const response = await Characters.findById(req.params.characterID).select(
      "name price _id characterImage"
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

router.patch("/:characterID", async (req, res, next) => {
  const updateOps = {};
  for (const ops in req.body) {
    updateOps[ops.propName] = ops.value;
  }
  try {
    character = await Characters.findByIdAndUpdate(
      req.params.characterID,
      { $set: updateOps },
      { new: true }
    );
    res.json(character);
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
router.delete("/:characterID", auth, async (req, res) => {
  try {
    await Characters.findByIdAndRemove(req.params.characterID);
    res.json({ message: "Character Removed" });
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
