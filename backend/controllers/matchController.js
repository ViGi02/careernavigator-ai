const User = require("../models/User");

const extractSkills = require(
  "../services/skillExtractor"
);

const classifyJob = require(
  "../services/jobClassifier"
);

const technicalSkills = require(
  "../services/isTechnicalSkill"
);

const analyzeMatch = async (
  req,
  res
) => {
  try {
    const { jobDescription } =
      req.body;

    const user =
      await User.findById(
        req.user.id
      );

    const jobSkills =
      extractSkills(
        jobDescription).filter(
          (skill) =>
            technicalSkills.includes(skill)
      );

    const careerTracks =
      classifyJob(
        jobDescription
      );

    const matchedSkills =
      user.skills.filter(
        (skill) =>
          jobSkills.includes(skill)
      );

    const missingSkills =
      jobSkills.filter(
        (skill) =>
          !user.skills.includes(skill)
      );

    const score =
      jobSkills.length > 0
        ? Math.round(
            (matchedSkills.length /
              jobSkills.length) *
              100
          )
        : 0;

    res.json({
      score,
      matchedSkills,
      missingSkills,
      careerTracks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  analyzeMatch,
};