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

const Match = require(
  "../models/Match"
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

    let alignment = "Low";

    if (careerTracks.length >= 3) {
      alignment = "High";
    } else if (careerTracks.length >= 1) {
      alignment = "Medium";
    }

    let assessment = "";

    if (
      score === 0 &&
      careerTracks.length > 0
    ) {
      assessment =
        "Good career alignment but limited technical overlap identified.";
    }
    else if (
      score >= 70
    ) {
      assessment =
        "Strong match for this position.";
    }
    else {
      assessment =
        "Some alignment exists, but additional skills may be required.";
    }

    await Match.create({
      user: req.user.id,
      score,
      matchedSkills,
      missingSkills,
      careerTracks,
    });

    res.json({
      score,
      matchedSkills,
      missingSkills,
      careerTracks,
      alignment,
      assessment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMatchHistory =
  async (req, res) => {
    try {

      const history =
        await Match.find({
          user: req.user.id,
        })
        .sort({
          createdAt: -1,
        });

      res.json(history);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

module.exports = {
  analyzeMatch,
  getMatchHistory,
};