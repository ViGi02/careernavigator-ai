const express = require("express");

const {
  analyzeMatch,
  getMatchHistory,
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

router.get(
  "/history",
  protect,
  getMatchHistory
);

module.exports = router;