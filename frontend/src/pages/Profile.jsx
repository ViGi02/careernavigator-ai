import { useContext } from "react";
import { useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import {
  getProfile,
  addSkill,
  deleteSkill,
  updateCareerGoal,
} from "../services/userService";

function Profile() {
  const { user } = useContext(AuthContext);

  const [skill, setSkill] =
    useState("");

  const [skills, setSkills] =
    useState([]);

  const [profile, setProfile] =
  useState(null);

  const [careerGoal, setCareerGoal] = useState("");

  const fetchProfile = async () => {
    try {
      const data =
        await getProfile(user.token);

      setProfile(data);

      setSkills(data.skills || []);
      setCareerGoal(data.careerGoal || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const addNewSkill = async () => {
    if (!skill.trim()) return;

    try {
      await addSkill(skill, user.token);

      setSkill("");

      await fetchProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const removeSkill = async (
    skillToDelete
  ) => {
    try {
      await deleteSkill(
        skillToDelete,
        user.token
      );

      await fetchProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const saveCareerGoal =
  async () => {
    try {
      await updateCareerGoal(
        careerGoal,
        user.token
      );

      await fetchProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Profile
      </h1>

      <div className="bg-white p-6 rounded shadow mb-6">
        <p>
          <strong>Name:</strong>{" "}
          {profile?.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {profile?.email}
        </p>

        <div className="mt-4">
          <label className="block mb-2">
            Career Goal
          </label>

          <input
            type="text"
            value={careerGoal}
            onChange={(e) =>
              setCareerGoal(
                e.target.value
              )
            }
            className="border p-2 rounded w-full"
          />

          <button
            onClick={saveCareerGoal}
            className="bg-green-600 text-white px-4 py-2 rounded mt-2"
          >
            Save Goal
          </button>
        </div>
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
              <li
                key={index}
                className="flex justify-between items-center py-2"
              >
                <span>{skill}</span>

                <button
                  onClick={() =>
                    removeSkill(skill)
                  }
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            )
          )}

          {skills.length === 0 && (
            <p className="mt-4 text-gray-500">
              No skills added yet.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
