import {
  useState,
  useContext,
} from "react";

import { AuthContext }
from "../context/AuthContext";

import {
  analyzeCV,
  analyzeCVText,
} from "../services/cvService";

import {
  addMultipleSkills,
} from "../services/userService";

function CVAnalyzer() {

  const { user } =
    useContext(AuthContext);

  const [file, setFile] =
    useState(null);

  const [cvText, setCvText] =
    useState("");

  const [result, setResult] =
    useState({
      skills: [],
      recommendations: [],
      strengths: [],
      growthAreas: [],
      careerPaths: [],
      categories: null,
      summary: "",
    }
  );

  const handleUpload =
    async () => {

      if (!file) return;

      try {

        const data =
          await analyzeCV(
            file,
            user.token
          );

        setResult(data);

      } catch (error) {

        console.log(error);

      }
    };

  const saveSkillsToProfile =
    async () => {
      try {
        await addMultipleSkills(
          result?.skills,
          user.token
        );

        console.log(
          "Skills added successfully"
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleTextAnalysis =
    async () => {
      if (!cvText.trim()) return;

      try {
        const data =
          await analyzeCVText(
            cvText,
            user.token
          );

        setResult(data);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-4">
        CV Analyzer
      </h1>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Analyze Uploaded CV
      </button>

      <div className="mt-8">
        <h2 className="font-bold mb-2">
          Or Paste CV Text
        </h2>

        <textarea
          value={cvText}
          onChange={(e) =>
            setCvText(e.target.value)
          }
          rows="10"
          className="w-full border rounded p-3"
          placeholder="Paste your CV here..."
        />

        <button
          onClick={handleTextAnalysis}
          className="bg-purple-600 text-white px-4 py-2 rounded mt-4"
        >
          Analyze Pasted CV
        </button>
      </div>

      {result && (
        <div className="mt-6">

          <h2 className="font-bold">
            Skills Found
          </h2>

          <ul>
            {result?.skills.map(
              (skill) => (
                <li key={skill}>
                  ✅ {skill}
                </li>
              )
            )}
          </ul>

          <button
            onClick={saveSkillsToProfile}
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
            Add Skills To Profile
          </button>
        </div>
      )}

      {result?.summary && (
        <div className="mt-6">

          <h2 className="font-bold text-xl">
            AI Summary
          </h2>

          <p>
            {result?.summary}
          </p>

        </div>
      )}

      {result?.strengths?.length > 0 && (

        <div className="mt-6">

          <h2 className="font-bold">
            Strengths
          </h2>

          <ul>

            {result?.strengths.map(
              (strength) => (

                <li key={strength}>
                  ✅ {strength}
                </li>

              )
            )}

          </ul>

        </div>

      )}

      {result?.categories && (
        <div className="mt-6">

          <h2 className="text-xl font-bold">
            Skill Categories
          </h2>

          <div className="mt-4">

            <p>
              <strong>Frontend:</strong>
            </p>

            <ul>
              {result?.categories?.frontend.map(
                (skill) => (
                  <li key={skill}>
                    ✅ {skill}
                  </li>
                )
              )}
            </ul>

            <p className="mt-4">
              <strong>Backend:</strong>
            </p>

            <ul>
              {result?.categories?.backend.map(
                (skill) => (
                  <li key={skill}>
                    ✅ {skill}
                  </li>
                )
              )}
            </ul>

            <p className="mt-4">
              <strong>Database:</strong>
            </p>

            <ul>
              {result?.categories?.database.map(
                (skill) => (
                  <li key={skill}>
                    ✅ {skill}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}

      {result?.recommendations?.length > 0 && (
        <div className="mt-6">

          <h2 className="font-bold">
            Recommended Skills
          </h2>

          <ul>
            {result?.recommendations.map(
              (skill) => (
                <li key={skill}>
                  ⚠ {skill}
                </li>
              )
            )}
          </ul>

        </div>
      )}

      {result?.growthAreas?.length > 0 && (

        <div className="mt-6">

          <h2 className="font-bold">
            Growth Areas
          </h2>

          <ul>

            {result?.growthAreas?.map(
              (skill) => (
                <li key={skill}>
                  ⚠ {skill}
                </li>
              )
            )}

          </ul>

        </div>

      )}

      {result?.careerPaths?.length > 0 && (

        <div className="mt-6">

          <h2 className="font-bold">
            Suggested Career Paths
          </h2>

          <ul>

            {result?.careerPaths?.map(
              (path) => (

                <li key={path}>
                  🎯 {path}
                </li>

              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CVAnalyzer;