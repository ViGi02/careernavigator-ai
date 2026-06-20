const express = require("express");

const {
  getProfile,
  addSkill,
} = require("../controllers/userController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getProfile);

router.post("/skills", protect, addSkill);

module.exports = router;