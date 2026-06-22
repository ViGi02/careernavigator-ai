const Job =
  require("../models/Job");

const prioritizeSkills =
  require(
    "../services/prioritizeSkills"
  );

const getInsights =
  async (req, res) => {

    try {

      const jobs =
        await Job.find({
          user: req.user.id,
        });

      const prioritySkills =
        prioritizeSkills(
          jobs
        );

      res.json({
        prioritySkills,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

module.exports = {
  getInsights,
};