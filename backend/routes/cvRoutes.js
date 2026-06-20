const express =
  require("express");

const upload =
  require(
    "../middleware/uploadMiddleware"
  );

const {
  analyzeCV,
} = require(
  "../controllers/cvController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

router.post(
  "/analyze",
  protect,
  upload.single("cv"),
  analyzeCV
);

module.exports = router;