const generateRoadmap = (
  missingSkills
) => {
  const roadmap = [];

  missingSkills.forEach((skill) => {
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