const skillsDatabase = [
  "React",
  "JavaScript",
  "Node.js",
  "MongoDB",
  "TypeScript",
  "AWS",
  "Docker",
  "Git",
  "Express",
  "CSS",
  "HTML",
];

const extractSkills = (text) => {
  return skillsDatabase.filter(
    (skill) =>
      text
        .toLowerCase()
        .includes(
          skill.toLowerCase()
        )
  );
};

module.exports = extractSkills;