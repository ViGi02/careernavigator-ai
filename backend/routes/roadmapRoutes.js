const express = require("express");

const {
  getRoadmap,
  getRoadmaps,
  saveRoadmap,
  toggleTask,
} = require(
  "../controllers/roadmapController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.post(
  "/generate",
  protect,
  getRoadmap
);

router.get(
  "/all",
  protect,
  getRoadmaps
);

router.post(
  "/save",
  protect,
  saveRoadmap
);

router.post(
  "/toggle-task",
  protect,
  toggleTask
);

module.exports = router;