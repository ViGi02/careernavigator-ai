import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { analyzeMatch } from "../services/matchService";
import { generateRoadmap } from "../services/roadmapService";

function JobMatcher() {
  const [jobDescription, setJobDescription] =
    useState("");

  const { user } =
  useContext(AuthContext);

  const [roadmap, setRoadmap] =
    useState([]);
    
  const [results, setResults] =
    useState(null);

  const analyzeJob = async () => {
    try {
      const data = await analyzeMatch(
        jobDescription,
        user.token
      );

      setResults(data);

      const roadmapData =
        await generateRoadmap(
          data.missingSkills,
          user.token
        );

      setRoadmap(
        roadmapData.roadmap
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Job Matcher
      </h1>

      <textarea
        className="w-full border rounded p-3"
        rows="8"
        placeholder="Paste job description..."
        value={jobDescription}
        onChange={(e) =>
          setJobDescription(
            e.target.value
          )
        }
      />

      <button
        onClick={analyzeJob}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Analyze Match
      </button>

      {results && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold">
            Match Score:
            {" "}
            {results.score}%
          </h2>

          <div className="mt-4">
            <h3 className="font-bold">
              Matched Skills
            </h3>

            <ul>
              {results.matchedSkills.map(
                (skill) => (
                  <li key={skill}>
                    ✅ {skill}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-bold">
              Missing Skills
            </h3>

            <ul>
              {results.missingSkills.map(
                (skill) => (
                  <li key={skill}>
                    ❌ {skill}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}

      {!results && (
        <p className="mt-4 text-gray-500">
          Paste a job description to see
          your match score.
        </p>
      )}

      {roadmap.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold text-xl">
            Learning Roadmap
          </h3>

          <ul className="mt-2">
            {roadmap.map(
              (item, index) => (
                <li key={index}>
                  {index + 1}. {item}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default JobMatcher;