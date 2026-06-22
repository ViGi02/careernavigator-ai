import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";

import { useParams } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import {
  getJobById,
} from "../services/jobService";

function JobDetails() {

  const { id } =
    useParams();

  const { user } =
    useContext(AuthContext);

  const [job, setJob] =
    useState(null);

  useEffect(() => {

    const fetchJob =
      async () => {

        try {

          const data =
            await getJobById(
              id,
              user.token
            );

          setJob(data);

        } catch (error) {

          console.log(error);

        }

      };

    if (user) {
      fetchJob();
    }

  }, [id, user]);

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold">
        {job.title}
      </h1>

      <p className="text-green-600 mt-2">
        Readiness:
        {" "}
        {job.readinessScore}%
      </p>

      <h2 className="font-bold mt-6">
        Missing Skills
      </h2>

      <ul>

        {job.missingSkills?.map(
          (skill) => (
            <li key={skill}>
              ❌ {skill}
            </li>
          )
        )}

      </ul>

      <h2 className="font-bold mt-6">
        Job Description
      </h2>

      <p className="whitespace-pre-wrap">
        {job.description}
      </p>

    </div>
  );
}

export default JobDetails;