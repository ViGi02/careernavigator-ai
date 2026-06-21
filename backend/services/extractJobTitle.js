const extractJobTitle = (jobDescription) => {

  const lines =
    jobDescription
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

  return (
    lines[0] || "Untitled Job"
  );
};

module.exports =
  extractJobTitle;