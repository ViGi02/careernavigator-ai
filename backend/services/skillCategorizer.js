const categorizeSkills = (skills) => {
  return {
    frontend: skills.filter((skill) =>
      [
        "React",
        "React Native",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Bootstrap",
        "Next.js",
        "Redux",
      ].includes(skill)
    ),

    backend: skills.filter((skill) =>
      [
        "Node.js",
        "Express",
        "Java",
        "Python",
        "C#",
      ].includes(skill)
    ),

    database: skills.filter((skill) =>
      [
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "SQL",
      ].includes(skill)
    ),

    cloud: skills.filter((skill) =>
      [
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
      ].includes(skill)
    ),

    support: skills.filter((skill) =>
      [
        "ServiceNow",
        "Microsoft 365",
        "Office 365",
        "Active Directory",
        "Windows Server",
        "ITIL",
        "Troubleshooting",
      ].includes(skill)
    ),
  };
};

module.exports = categorizeSkills;