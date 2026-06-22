const express =
  require("express");

const {
  saveJob,
  getJobs,
  deleteJob,
  getJobById,
} = require(
  "../controllers/jobController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

router.post(
  "/save",
  protect,
  saveJob
);

router.get(
  "/all",
  protect,
  getJobs
);
    
router.delete(
  "/:id",
  protect,
  deleteJob
);

router.get(
  "/:id",
  protect,
  getJobById
);

module.exports =
  router;