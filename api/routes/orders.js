const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Orders were taken"
  });
});
router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Orders were created"
  });
});
router.get("/:orderID", (req, res, next) => {
  res.status(200).json({
    message: "Orders details",
    orderID: req.params.orderID
  });
});
router.delete("/:orderID", (req, res, next) => {
  res.status(200).json({
    message: "Orders deleted",
    orderID: req.params.orderID
  });
});

module.exports = router;
