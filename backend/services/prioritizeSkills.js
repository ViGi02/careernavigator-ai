const prioritizeSkills = (
  jobs
) => {

  const skillCounts = {};

  jobs.forEach((job) => {

    job.missingSkills.forEach(
      (skill) => {

        skillCounts[skill] =
          (skillCounts[skill] || 0) + 1;

      }
    );

  });

  return Object.entries(
    skillCounts
  )
    .sort(
      (a, b) =>
        b[1] - a[1]
    )
    .map(
      ([skill, count]) => ({
        skill,
        count,
      })
    );

};

module.exports =
  prioritizeSkills;