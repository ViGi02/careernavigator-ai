const classifyJob = (text) => {

  const lowerText =
    text.toLowerCase();

  const tracks = [];

  if (
    lowerText.includes(
      "software development"
    )
  ) {
    tracks.push(
      "Software Development"
    );
  }

  if (
    lowerText.includes(
      "business analysis"
    )
  ) {
    tracks.push(
      "Business Analysis"
    );
  }

  if (
    lowerText.includes(
      "business intelligence"
    )
  ) {
    tracks.push(
      "Business Intelligence"
    );
  }

  if (
    lowerText.includes(
      "data engineering"
    )
  ) {
    tracks.push(
      "Data Engineering"
    );
  }

  if (
    lowerText.includes(
      "cloud"
    )
  ) {
    tracks.push(
      "Cloud Engineering"
    );
  }

  return tracks;
};

module.exports = classifyJob;