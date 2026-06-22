const extractSkills =
  require("./skillExtractor");

const calculateReadiness = (
  userSkills,
  jobDescription
) => {

  const jobSkills =
    extractSkills(
      jobDescription
    );

  const matchedSkills =
    userSkills.filter(
      (skill) =>
        jobSkills.includes(skill)
    );

  const missingSkills =
    jobSkills.filter(
      (skill) =>
        !userSkills.includes(skill)
    );

  const score =
    jobSkills.length > 0
      ? Math.round(
          (
            matchedSkills.length /
            jobSkills.length
          ) * 100
        )
      : 0;

  return {
    score,
    missingSkills,
  };
};

module.exports =
  calculateReadiness;