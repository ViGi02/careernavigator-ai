const express = require("express");

const {
  getProfile,
  addSkill,
  deleteSkill,
  updateCareerGoal,
  addMultipleSkills,
} = require("../controllers/userController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getProfile);

router.post("/skills", protect, addSkill);

router.delete("/skills", protect, deleteSkill);

router.put("/career-goal", protect, updateCareerGoal);

router.post("/skills/bulk", protect, addMultipleSkills);

module.exports = router;