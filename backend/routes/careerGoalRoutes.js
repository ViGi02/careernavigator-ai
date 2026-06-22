const express =
  require("express");

const {
  getGoalProgress,
} = require(
  "../controllers/careerGoalController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

router.get(
  "/progress",
  protect,
  getGoalProgress
);

module.exports =
  router;