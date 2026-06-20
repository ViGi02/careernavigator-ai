const generateRoadmap = require(
  "../services/roadmapGenerator"
);

const getRoadmap = async (
  req,
  res
) => {
  try {
    const { missingSkills } =
      req.body;

    const roadmap =
      generateRoadmap(
        missingSkills
      );

    res.json({
      roadmap,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getRoadmap,
};