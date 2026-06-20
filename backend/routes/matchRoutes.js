const express = require("express");

const {
  analyzeMatch,
} = require("../controllers/matchController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/analyze",
  protect,
  analyzeMatch
);

module.exports = router;