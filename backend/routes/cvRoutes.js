const express =
  require("express");

const upload =
  require(
    "../middleware/uploadMiddleware"
  );

const {
  analyzeCV,
  analyzeTextCV,
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

router.post(
  "/analyze-text",
  protect,
  analyzeTextCV
);

module.exports = router;