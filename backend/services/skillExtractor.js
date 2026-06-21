const skillsDatabase = [
    {
    name: "React",
    aliases: ["React", "React.js"]
  },
    {
    name: "React Native",
    aliases: ["React Native", "React-Native"]
  },
    {
    name: "JavaScript",
    aliases: ["JavaScript", "JS"]
  },
    {
    name: "TypeScript",
    aliases: ["TypeScript", "TS"]
  },
    {
    name: "Node.js",
    aliases: ["Node.js", "Node", "node"]
  },
    {
    name: "Express",
    aliases: ["Express", "Express.js"]
  },
  "MongoDB",
  "MySQL",
  "SQL",
  "PostgreSQL",
  "Python",
  "Java",
  "C#",
  "C++",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Bootstrap",
  "Git",
  "GitHub",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Linux",
  "REST API",
  "REST APIs",
  "GraphQL",
  "Next.js",
  "Redux",
  "Jest",
  "Postman",
  "Power BI",
  "ServiceNow",
  "Active Directory",
  "Windows Server",
  "Microsoft 365",
  "Office 365",
  "ITIL",
  "Troubleshooting",
  "IT Support",
  "Help Desk",
  "Service Desk",
  "Incident Management",
  "Ticketing Systems",
  "Technical Support",
  "Hardware Troubleshooting",
  "Software Troubleshooting",
  "Networking",
  "TCP/IP",
  "DNS",
  "DHCP",
  "Windows",
  "Windows 10",
  "Windows 11",
  "Microsoft Teams",
  "SharePoint",
  "Microsoft Exchange",
  "Azure AD",
  "Entra ID",
  "Office Apps",
  "Outlook",
  "Copilot",
  "PowerShell",
  "VPN",
  "Remote Desktop",
  "Business Analysis",
  "Software Development",
  "Business Intelligence",
  "Data Engineering",
  "IT Consulting",
  "Problem Solving",
  "Documentation",
  "Requirements Gathering",
  "Stakeholder Management",
  "Data Analytics",
  "Consulting",
  "Agile",
  "Scrum",
  "Software Engineering",
  "Systems Analysis",
  "Informatics",
];

const extractSkills = (text) => {
  const lowerText =
    text.toLowerCase();

  const foundSkills = [];

  skillsDatabase.forEach(
    (skill) => {
      if (
        typeof skill === "string"
      ) {
        if (
          lowerText.includes(
            skill.toLowerCase()
          )
        ) {
          foundSkills.push(skill);
        }
      } else {
        const match =
          skill.aliases.some(
            (alias) =>
              lowerText.includes(
                alias.toLowerCase()
              )
          );

        if (match) {
          foundSkills.push(
            skill.name
          );
        }
      }
    }
  );

  return foundSkills;
};

module.exports = extractSkills;