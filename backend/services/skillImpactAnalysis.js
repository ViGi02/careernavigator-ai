const calculateSkillImpact = (
  jobs
) => {

  const impactMap = {};

  jobs.forEach((job) => {

    job.missingSkills.forEach(
      (skill) => {

        if (!impactMap[skill]) {

          impactMap[skill] = {
            skill,
            affectedJobs: [],
          };

        }

        impactMap[
          skill
        ].affectedJobs.push({
          title: job.title,
          readiness:
            job.readinessScore,
        });

      }
    );

  });

  return Object.values(
    impactMap
  );

};

module.exports =
  calculateSkillImpact;