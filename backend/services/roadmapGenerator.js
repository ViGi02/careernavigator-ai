const nonTechnicalSkills = [
  "Business Analysis",
  "Software Development",
  "Business Intelligence",
  "Data Engineering",
  "IT Consulting",
  "Documentation",
  "Consulting",
  "Informatics",
];

const generateRoadmap = (
  missingSkills
) => {
  const roadmap = [];

  missingSkills.forEach((skill) => {

    if (
      nonTechnicalSkills.includes(skill)
    ) {
      return;
    }

    switch (skill) {

      case "TypeScript":
        roadmap.push(
          "Learn TypeScript Fundamentals"
        );
        roadmap.push(
          "Build a React + TypeScript Project"
        );
        break;

      case "AWS":
        roadmap.push(
          "Complete AWS Cloud Practitioner"
        );
        break;

      case "Docker":
        roadmap.push(
          "Learn Docker Basics"
        );
        roadmap.push(
          "Containerize a Node.js Application"
        );
        break;

      default:
        roadmap.push(
          `Learn ${skill}`
        );
    }
  });

  return roadmap;
};

module.exports = generateRoadmap;