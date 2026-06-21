const fs = require("fs");

const pdfParse =
  require("pdf-parse");

const mammoth =
  require("mammoth");

const extractSkills = require(
  "../services/skillExtractor"
);

const categorizeSkills = require(
  "../services/skillCategorizer"
);

const recommendSkills =
  require(
    "../services/recommendSkills"
  );

const analyzeTextCV = async (
  req,
  res
) => {
  try {
    const { cvText } = req.body;

    const skills =
      extractSkills(cvText);

    res.json({
      skills,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const analyzeCV = async (
  req,
  res
) => {
  try {
    const file =
      req.file;

    let text = "";

    if (
      file.mimetype ===
      "application/pdf"
    ) {
      const data =
        await pdfParse(
          fs.readFileSync(
            file.path
          )
        );

      text = data.text;
    }

    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result =
        await mammoth.extractRawText(
          {
            path: file.path,
          }
        );

      text = result.value;
    }

    const skills =
      extractSkills(text);

    const categories =
      categorizeSkills(skills);

    const recommendations =
      recommendSkills(categories);

    res.json({
      extractedText:
        text.substring(
          0,
          1000
        ),
      skills,
      categories,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  analyzeCV,
  analyzeTextCV,
};