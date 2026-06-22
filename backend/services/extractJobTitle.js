const extractJobTitle = (
  jobDescription
) => {

  const lines =
    jobDescription
      .split("\n")
      .map((line) =>
        line.trim()
      )
      .filter(Boolean);

  const ignoredLines = [
    "about the job",
    "job description",
    "role overview",
    "overview",
  ];

  const titleLine =
    lines.find(
      (line) =>
        !ignoredLines.includes(
          line.toLowerCase()
        ) &&
        line.length > 5
    );

  return (
    titleLine ||
    "Untitled Job"
  );

};

module.exports =
  extractJobTitle;
``