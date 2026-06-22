import { useContext } from "react";
import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";
import { AuthContext } from "../context/AuthContext";
import { getMatchHistory } from "../services/matchService";
import { getRoadmaps } from "../services/roadmapService";
import { getRecommendations } from "../services/recommendationService";
import { getGoalProgress } from "../services/careerGoalService";
import { getInsights } from "../services/insightService";
import { getJobs } from "../services/jobService";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [matchScore, setMatchScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [learningProgress, setLearningProgress] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [goalProgress, setGoalProgress] = useState(null);
  const [bestJob, setBestJob] = useState(null);
  const [prioritySkills, setPrioritySkills] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        const profileData = await getProfile(user.token);
        const historyData = await getMatchHistory(user.token);
        const roadmapData = await getRoadmaps(user.token);
        const recommendationData = await getRecommendations(user.token);
        const progressData = await getGoalProgress(user.token);
        const insightsData = await getInsights(user.token);
        const jobsData = await getJobs(user.token);

        setProfile(profileData);
        setHistory(historyData);
        setMatchScore(historyData && historyData.length > 0 ? historyData[0].score : 0);
        setRoadmaps(roadmapData);
        setRecommendations(recommendationData.recommendations);
        setGoalProgress(progressData);
        setPrioritySkills(insightsData.prioritySkills);

        if (
          jobsData.length > 0
        ) {

          const best =
            [...jobsData].sort(
              (a, b) =>
                b.readinessScore -
                a.readinessScore
            )[0];

          setBestJob(
            best
          );
        } else {
          setBestJob(null);
        }


        const totalTasks =
          roadmapData.flatMap(
            (roadmap) =>
              roadmap.tasks
          ).length;

        const completedTasks =
          roadmapData
            .flatMap(
              (roadmap) =>
                roadmap.tasks
            )
            .filter(
              (task) =>
                task.completed
            ).length;

        setLearningProgress(
          totalTasks > 0
            ? Math.round(
                (
                  completedTasks /
                  totalTasks
                ) * 100
              )
            : 0
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboardData();

  }, [user]);

  const highestScore =
    history.length > 0
      ? Math.max(
          ...history.map(
            (match) => match.score
          )
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <h1 className="text-4xl font-bold mb-2">
        Dashboard
      </h1>

      <p className="mb-8">
        Welcome {profile?.name || user?.name}
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            Skills
          </h2>

          <p className="text-4xl mt-4">{profile?.skills?.length || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            Career Goal
          </h2>

          <p className="mt-4">
            {profile?.careerGoal || "No goal set"}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Saved Roadmaps:
            {" "}
            {roadmaps.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            Match Score
          </h2>

          <p className="text-4xl mt-4 text-green-600">
            {history.length > 0 ? `${matchScore}%` : "Not available"}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow md:col-span-3">

          <h2 className="text-xl font-bold mb-4">
            Recent Analyses
          </h2>

          {history.length === 0 ? (
            <p>
              No analyses yet.
            </p>
          ) : (
            history.slice(0, 5).map(
              (item) => (
                <div
                  key={item._id}
                  className="border-b py-2"
                >                  
                  <p className="font-semibold">
                    {item.jobTitle}
                  </p>

                  <p>
                    Score: {item.score}%
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    Career Paths:
                    {" "}
                    {item.careerTracks.join(
                      ", "
                    )}
                  </p>
                </div>
              )
            )
          )}

        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            Best Match
          </h2>

          <p className="text-4xl mt-4 text-blue-600">
            {highestScore}%
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            Learning Progress
          </h2>

          <p className="text-4xl mt-4 text-purple-600">
            {learningProgress}%
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow md:col-span-3">

          <h2 className="text-xl font-bold mb-4">
            Recommended Skills
          </h2>

          {recommendations.length === 0 ? (

            <p>
              No recommendations available.
            </p>

          ) : (

            <ul>

              {recommendations.map(
                (skill) => (

                  <li key={skill}>
                    🚀 {skill}
                  </li>

                )
              )}

            </ul>

          )}

        </div>

        <div className="bg-white p-6 rounded-lg shadow md:col-span-3">

          <h2 className="text-xl font-bold mb-4">
            Career Goal Progress
          </h2>

          <p className="text-3xl text-green-600">
            {goalProgress?.progress || 0}%
          </p>

          <h3 className="mt-4 font-semibold">
            Achieved Skills
          </h3>

          <ul>
            {goalProgress?.achievedSkills?.map(
              (skill) => (
                <li key={skill}>
                  ✅ {skill}
                </li>
              )
            )}
          </ul>

          <h3 className="mt-4 font-semibold">
            Missing Skills
          </h3>

          <ul>
            {goalProgress?.missingSkills?.map(
              (skill) => (
                <li key={skill}>
                  🚀 {skill}
                </li>
              )
            )}
          </ul>

        </div>

        <div className="bg-white p-6 rounded-lg shadow">

          <h2 className="text-xl font-semibold">
            Best Opportunity
          </h2>

          {bestJob ? (

            <>
              <p className="mt-4 font-bold">
                {bestJob.title}
              </p>

              <p className="text-green-600 text-2xl">
                {bestJob.readinessScore}%
              </p>
            </>

          ) : (

            <p>
              No saved jobs.
            </p>

          )}

        </div>

        <div className="bg-white p-6 rounded-lg shadow md:col-span-3">

          <h2 className="text-xl font-bold mb-4">
            Highest Impact Skills
          </h2>

          {prioritySkills.length === 0 ? (

            <p>
              Save some jobs to receive insights.
            </p>

          ) : (

            prioritySkills
              .slice(0, 5)
              .map((item) => (

                <p
                  key={item.skill}
                  className="mb-2"
                >
                  🚀 {item.skill}
                  {" "}
                  ({item.count} jobs)
                </p>

              ))

          )}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;