import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import {
  getRoadmaps,
  toggleTask,
} from "../services/roadmapService";

function MyRoadmaps() {

  const { user } =
    useContext(AuthContext);

  const [roadmaps, setRoadmaps] =
    useState([]);

  useEffect(() => {

    const fetchRoadmaps =
      async () => {
        try {

          const data =
            await getRoadmaps(
              user.token
            );

          setRoadmaps(data);

        } catch (error) {

          console.log(error);

        }
      };

    if (user) {
      fetchRoadmaps();
    }

  }, [user]);

  const handleToggle =
    async (
      roadmapId,
      taskIndex
    ) => {

      try {

        await toggleTask(
          roadmapId,
          taskIndex,
          user.token
        );

        const updated =
            await getRoadmaps(
            user.token
            );

        setRoadmaps(
            updated
        );

      } catch (error) {

        console.log(error);

      }
    };

  const getProgress = (
    roadmap
  ) => {

    const completed =
        roadmap.tasks.filter(
        (task) =>
            task.completed
        ).length;

    return Math.round(
        (
        completed /
        roadmap.tasks.length
        ) * 100
    );
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Roadmaps
      </h1>

      {roadmaps.length === 0 ? (

        <p>
          No saved roadmaps yet.
        </p>

      ) : (

        roadmaps.map(
          (roadmap) => (

            <div
              key={roadmap._id}
              className="bg-white rounded shadow p-6 mb-4"
            >

              <h2 className="text-xl font-bold">
                {roadmap.title}
              </h2>

              <p className="mb-4">
                Progress:
                {" "}
                {getProgress(
                    roadmap
                )}%
              </p>

              <p className="text-gray-500 mb-4">
                {new Date(
                  roadmap.createdAt
                ).toLocaleDateString()}
              </p>

              <ul>

                {roadmap.tasks.map(
                  (
                    task,
                    index
                  ) => (

                    <li
                        key={index}
                        className="py-1"
                        >
                        <button
                            onClick={() =>
                            handleToggle(
                                roadmap._id,
                                index
                            )
                            }
                        >
                            {task.completed
                            ? "✅"
                            : "⬜"}
                        </button>

                        {" "}
                        {task.title}
                    </li>
                  )
                )}

              </ul>

            </div>

          )
        )

      )}

    </div>
  );
}

export default MyRoadmaps;