const getRecommendations = (
  skills,
  careerGoal
) => {

  const recommendations = [];

  const lowerGoal =
    careerGoal.toLowerCase();

  if (
    lowerGoal.includes(
      "software"
    )
  ) {

    if (
      !skills.includes(
        "TypeScript"
      )
    ) {
      recommendations.push(
        "TypeScript"
      );
    }

    if (
      !skills.includes(
        "Docker"
      )
    ) {
      recommendations.push(
        "Docker"
      );
    }

    if (
      !skills.includes(
        "AWS"
      )
    ) {
      recommendations.push(
        "AWS"
      );
    }

    if (
      !skills.includes(
        "Git"
      )
    ) {
      recommendations.push(
        "Git"
      );
    }

    if (
      !skills.includes(
        "Node.js"
      )
    ) {
      recommendations.push(
        "Node.js"
      );
    }

  }

  return recommendations;
};

module.exports =
  getRecommendations;