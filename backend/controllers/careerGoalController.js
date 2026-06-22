const User =
  require("../models/User");

const calculateProgress =
  require(
    "../services/careerGoalProgress"
  );

const getGoalProgress =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        );

      const result =
        calculateProgress(
          user.skills,
          user.careerGoal || ""
        );

      res.json(result);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

module.exports = {
  getGoalProgress,
};