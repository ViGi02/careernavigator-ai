const User =
  require("../models/User");

const getRecommendations =
  require(
    "../services/skillRecommendations"
  );

const getSkillRecommendations =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        );

      const recommendations =
        getRecommendations(
          user.skills,
          user.careerGoal || ""
        );

      res.json({
        recommendations,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

module.exports = {
  getSkillRecommendations,
};