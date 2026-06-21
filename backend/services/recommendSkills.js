const recommendSkills = (
  categories
) => {

  const recommendations = [];

  if (
    categories.frontend.length > 0 &&
    !categories.frontend.includes(
      "TypeScript"
    )
  ) {
    recommendations.push(
      "TypeScript"
    );
  }

  if (
    categories.backend.length > 0 &&
    !categories.cloud.includes(
      "Docker"
    )
  ) {
    recommendations.push(
      "Docker"
    );
  }

  if (
    categories.cloud.length > 0 &&
    !categories.cloud.includes(
      "Kubernetes"
    )
  ) {
    recommendations.push(
      "Kubernetes"
    );
  }

  return recommendations;
};

module.exports =
  recommendSkills;