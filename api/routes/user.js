const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });

    if (user.length >= 1) {
      return res.status(409).json({
        message: "User already exist"
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          try {
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });

            const user = await newUser.save();
            console.log(user);
            res.status(201).json({
              message: "User Created"
            });
          } catch (err) {
            console.log(err.message);
            res.status(500).json(err);
          }
        }
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }

  // User.find({ email: req.body.email })
  //   .exec()
  //   .then(user => {
  //     //mails match throw error
  //     if (user.length >= 1) {
  //       return res.status(409).json({
  //         message: "User already exist"
  //       });
  //     } else {
  //       bcrypt.hash(req.body.password, 10, (err, hash) => {
  //         if (err) {
  //           return res.status(500).json({
  //             error: err
  //           });
  //         } else {
  //           const user = new User({
  //             _id: new mongoose.Types.ObjectId(),
  //             email: req.body.email,
  //             password: hash
  //           });
  //           user
  //             .save()
  //             .then(result => {
  //               console.log(result);
  //               res.status(201).json({
  //                 message: "User Created"
  //               });
  //             })
  //             .catch(err => {
  //               res.status(500).json({
  //                 error: err
  //               });
  //             });
  //         }
  //       });
  //     }
  //   });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    //Error for emails dont match
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    //Error for passwords dont match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    //if match return jwt sign payload
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;

      res.status(200).json({
        message: "Sucesss",
        token: token
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }

  // User.find({ email: req.body.email })
  //   .exec()
  //   .then(user => {
  //     //auth fails if user does not exist
  //     if (user.length < 1) {
  //       //401 for authorization
  //       return res.status(401).json({
  //         message: "Auth failed"
  //       });
  //     }

  // bcrypt.compare(req.body.password, user[0].password, (err, result) => {
  //   if (err) {
  //     return res.status(401).json({
  //       message: "Auth failed"
  //     });
  //   }
  //   //success if match
  //   if (result) {
  //     const token = jwt.sign(
  //       {
  //         email: user[0].email,
  //         userId: user[0]._id
  //       },
  //       process.env.JWT_KEY,
  //       {
  //         expiresIn: "1h"
  //       }
  //     );
  //     return res.status(200).json({
  //       message: "Sucesss",
  //       token: token
  //     });
  //   }
  //   //auth fais is password does not match
  //   res.status(401).json({
  //     message: "Auth failed"
  //   });
  // });
  // })
  // .catch(err => {
  //   console.log(err);
  //   res.status(500).json({
  //     error: err
  //   });
  // });
});
router.delete("/:userId", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.userId);
    res.json({ message: "User Deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
  // User.remove({ _id: req.params.userId })
  //   .exec()
  //   .then(result => {
  //     console.log(result);
  //     res.status(200).json({
  //       message: "User Deleted"
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
