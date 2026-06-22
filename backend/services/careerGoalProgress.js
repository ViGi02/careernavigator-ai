const careerGoalSkills =
  require("./careerGoalSkills");

const calculateProgress = (
  userSkills,
  careerGoal
) => {

  const goalSkills =
    careerGoalSkills[
      careerGoal.toLowerCase()
    ] || [];

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