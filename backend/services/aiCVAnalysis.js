const analyzeCVWithAI = (
  skills,
  categories,
  recommendations
) => {

  let summary =
    "The candidate demonstrates a foundation in technology and software development.";

  const strengths = [];

  const careerPaths = [];

  if (
    categories.frontend.length > 0
  ) {
    strengths.push(
      "Frontend Development"
    );

    careerPaths.push(
      "Frontend Developer"
    );
  }

  if (
    categories.backend.length > 0
  ) {
    strengths.push(
      "Backend Development"
    );

    careerPaths.push(
      "Software Engineer"
    );
  }

  if (
    categories.database.length > 0
  ) {
    strengths.push(
      "Database Management"
    );
  }

  if (
    categories.cloud.length > 0
  ) {
    strengths.push(
      "Cloud Fundamentals"
    );

    careerPaths.push(
      "Cloud Engineer"
    );
  }

  return {
    summary,
    strengths,
    growthAreas:
      recommendations,
    careerPaths,
  };

};

module.exports =
  analyzeCVWithAI;