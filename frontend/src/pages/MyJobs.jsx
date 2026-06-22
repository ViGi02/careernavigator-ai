import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import {
  getJobs,
  deleteJob,
} from "../services/jobService";

function MyJobs() {

  const { user } =
    useContext(AuthContext);

  const [jobs, setJobs] =
    useState([]);

  useEffect(() => {

    const fetchJobs =
      async () => {
        try {

          const data =
            await getJobs(
              user.token
            );

          setJobs(data);

        } catch (error) {

          console.log(error);

        }
      };

    if (user) {
      fetchJobs();
    }

  }, [user]);

  const handleDelete =
    async (id) => {

      try {

        await deleteJob(
          id,
          user.token
        );

        setJobs(
          jobs.filter(
            (job) =>
              job._id !== id
          )
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Saved Jobs
      </h1>

      {jobs.length === 0 ? (

        <p>
          No saved jobs yet.
        </p>

      ) : (

        jobs.map((job) => (
          <div key={job._id} className="mb-4">
            <div className="bg-white p-6 rounded shadow">
              <Link
                to={`/jobs/${job._id}`}
              >
                <h2 className="text-xl font-bold text-blue-600">
                  {job.title}
                </h2>
              </Link>

              <p
                className={
                  job.readinessScore >= 70
                    ? "text-green-600 font-semibold"
                    : job.readinessScore >= 40
                    ? "text-yellow-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                Readiness:
                {" "}
                {job.readinessScore}%
              </p>

              {job.missingSkills?.length >
                0 && (
                <div className="mt-3">

                  <p className="font-semibold">
                    Missing Skills
                  </p>

                  <ul>

                    {job.missingSkills.map(
                      (skill) => (
                        <li key={skill}>
                          ❌ {skill}
                        </li>
                      )
                    )}

                  </ul>

                </div>
              )}

              <p className="text-gray-500 mb-2">
                {new Date(job.createdAt).toLocaleDateString()}
              </p>

              <p className="line-clamp-3">{job.description}</p>
            </div>

            <button
              onClick={() => handleDelete(job._id)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-3"
            >
              Delete Job
            </button>
          </div>
        ))

      )}

    </div>
  );
}

export default MyJobs;