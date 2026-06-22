const careerGoalSkills =
  require("./careerGoalSkills");

const calculateProgress = (
  userSkills,
  careerGoal
) => {

  const lowerGoal = (careerGoal || "").toLowerCase();  

  let goalSkills = [];

  if (
    lowerGoal.includes(
      "software engineer"
    )
  ) {
    goalSkills =
      careerGoalSkills[
        "software engineer"
      ];
  }
  else if (
    lowerGoal.includes(
      "frontend")
  ) {
    goalSkills =
      careerGoalSkills[
        "frontend developer"
      ];
  }
  else if (
    lowerGoal.includes(
      "backend"
    )
  ) {
    goalSkills =
      careerGoalSkills[
        "backend developer"
      ];
  }
  else if (
    lowerGoal.includes(
      "cloud"
    )
  ) {
    goalSkills =
      careerGoalSkills[
        "cloud engineer"
      ];
  }

  const achievedSkills =
    goalSkills.filter(
      (skill) =>
        userSkills.includes(skill)
    );

  const missingSkills =
    goalSkills.filter(
      (skill) =>
        !userSkills.includes(skill)
    );

  const progress =
    goalSkills.length > 0
      ? Math.round(
          (
            achievedSkills.length /
            goalSkills.length
          ) * 100
        )
      : 0;

  return {
    progress,
    achievedSkills,
    missingSkills,
  };
};

module.exports =
  calculateProgress;