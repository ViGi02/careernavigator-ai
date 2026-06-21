import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { analyzeMatch } from "../services/matchService";
import { generateRoadmap, saveRoadmap } from "../services/roadmapService";

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

  const handleSaveRoadmap =
    async () => {
      try {

        await saveRoadmap(
          results?.careerTracks?.length > 0
            ? `${results.careerTracks[0]} Roadmap`
            : "Learning Plan",
          roadmap,
          user.token
        );

        alert(
          "Roadmap saved"
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
              Matched Technical Skills
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
              Missing Technical Skills
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

      {results?.alignment && (
        <div className="mt-4">
          <h3 className="font-bold">
            Career Alignment
          </h3>

          <p>
            {results.alignment}
          </p>
        </div>
      )}

      {results?.assessment && (
        <div className="mt-4 bg-blue-50 p-4 rounded">
          <h3 className="font-bold">
            Assessment
          </h3>

          <p>
            {results.assessment}
          </p>
        </div>
      )}

      {!results && (
        <p className="mt-4 text-gray-500">
          Paste a job description to see
          your match score.
        </p>
      )}

      {results?.careerTracks?.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">
            Career Paths Detected
          </h3>

          <ul>
            {results?.careerTracks?.map(
              (track) => (
                <li key={track}>
                  🎯 {track}
                </li>
              )
            )}
          </ul>
        </div>
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

          <button
            onClick={
              handleSaveRoadmap
            }
            className="
              bg-green-600
              text-white
              px-4
              py-2
              rounded
              mt-4
            "
          >
            Save Roadmap
          </button>
        </div>
      )}
    </div>
  );
}

export default JobMatcher;