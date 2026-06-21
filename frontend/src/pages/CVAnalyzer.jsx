import {
  useState,
  useContext,
} from "react";

import { AuthContext }
from "../context/AuthContext";

import {
  analyzeCV,
} from "../services/cvService";

import {
  addMultipleSkills,
} from "../services/userService";

function CVAnalyzer() {

  const { user } =
    useContext(AuthContext);

  const [file, setFile] =
    useState(null);

  const [result, setResult] =
    useState(null);

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
          result.skills,
          user.token
        );

        console.log(
          "Skills added successfully"
        );
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
        className="bg-blue-600 text-white px-4 py-2 rounded ml-4"
      >
        Analyze CV
      </button>

      {result && (
        <div className="mt-6">

          <h2 className="font-bold">
            Skills Found
          </h2>

          <ul>
            {result.skills.map(
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

    </div>
  );
}

export default CVAnalyzer;