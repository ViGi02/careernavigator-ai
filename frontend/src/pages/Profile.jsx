import { useContext } from "react";
import { useState } from "react";

import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  const [skill, setSkill] =
    useState("");

  const [skills, setSkills] =
    useState([]);

  const addNewSkill = () => {
    if (!skill.trim()) return;

    setSkills([
      ...skills,
      skill,
    ]);

    setSkill("");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Profile
      </h1>

      <div className="bg-white p-6 rounded shadow mb-6">
        <p>
          <strong>Name:</strong>{" "}
          {user?.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user?.email}
        </p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          Skills
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            value={skill}
            onChange={(e) =>
              setSkill(e.target.value)
            }
            className="border p-2 rounded"
            placeholder="Enter skill"
          />

          <button
            onClick={addNewSkill}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        <ul className="mt-4">
          {skills.map(
            (skill, index) => (
              <li key={index}>
                • {skill}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
