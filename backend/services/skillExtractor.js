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