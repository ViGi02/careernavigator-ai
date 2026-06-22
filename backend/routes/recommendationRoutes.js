const express =
  require("express");

const {
  getSkillRecommendations,
} = require(
  "../controllers/recommendationController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

router.get(
  "/",
  protect,
  getSkillRecommendations
);

module.exports =
  router;