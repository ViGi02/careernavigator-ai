import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const [skillImpact, setSkillImpact] = useState([]);
  const [jobs, setJobs] = useState([]);

const fetchDashboardData = async () => {
    if (!user) return;

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
        setMatchScore(
          historyData.length > 0
            ? Math.max(
                ...historyData.map(
                  item => item.score
                )
              )
            : 0
        );
        setRoadmaps(roadmapData);
        setRecommendations(recommendationData.recommendations);
        setGoalProgress(progressData);
        setPrioritySkills(insightsData.prioritySkills);
        setSkillImpact(insightsData.impactAnalysis);
        setJobs(jobsData);

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

  useEffect(() => {
    if (!user) return;

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
      <div className="flex items-center justify-between mb-6">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={fetchDashboardData}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Refresh
        </button>

      </div>

      <p className="mb-8">
        Welcome {profile?.name || user?.name}
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-blue-50 p-6 rounded-lg shadow md:col-span-3">

          <h2 className="text-xl font-bold">
            Next Recommended Step
          </h2>

          {!profile?.careerGoal ? (

            <div>

              <p>
                Set a career goal in your profile.
              </p>

              <Link
                to="/profile"
                className="text-blue-600 font-medium"
              >
                Update Profile →
              </Link>

            </div>

          ) : history.length === 0 ? (

            <div>

              <p>
                Analyze your first job description.
              </p>

              <Link
                to="/job-matcher"
                className="text-blue-600 font-medium"
              >
                Go to Job Matcher →
              </Link>

            </div>

          ) : jobs.length === 0 ? (

            <div>
              <p>
                Save a job to track readiness.
              </p>

              <Link
                to="/job-matcher"
                className="text-blue-600 font-medium"
              >
                Analyze a Job →
              </Link>
            </div>

          ) : roadmaps.length === 0 ? (

            <div>
              <p>
                Save a roadmap to begin learning.
              </p>

              <Link
                to="/roadmaps"
                className="text-blue-600 font-medium"
              >
                View Roadmaps →
              </Link>
            </div>

          ) : learningProgress < 100 ? (

            <div>

              <p>
                Continue completing roadmap tasks.
              </p>

              <Link
                to="/my-roadmaps"
                className="text-blue-600 font-medium"
              >
                Open Roadmaps →
              </Link>

            </div>

          ) : (

            <p>
              Great progress! Analyze another job
              to discover new opportunities.
            </p>

          )}

        </div>

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

          <div className="mt-4">

            {history.length > 0 ? (

              <p className="text-4xl text-green-600">
                {matchScore}%
              </p>

            ) : (

              <>
                <p className="text-gray-500">
                  Analyze a job description.
                </p>

                <Link
                  to="/job-matcher"
                  className="text-blue-600"
                >
                  Go to Job Matcher →
                </Link>
              </>

            )}

          </div>
        </div>

        <div className="bg-white p-6 rounded shadow md:col-span-3">

          <h2 className="text-xl font-bold mb-4">
            Recent Analyses
          </h2>

          {history.length === 0 ? (
            <div>

              <p>
                No analyses yet.
              </p>

              <p className="text-gray-500">
                Paste a job description
                in Job Matcher to see
                compatibility scores.
              </p>

            </div>
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

          {history.length === 0 ? (

            <p className="text-gray-500">
              Analyze a job first.
            </p>

          ) : (

            <p className="text-4xl mt-4 text-blue-600">
              {highestScore}%
            </p>

          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            Learning Progress
          </h2>

          {roadmaps.length === 0 ? (
            <p className="text-gray-500">
              Save a roadmap to start
              tracking progress.
            </p>
          ) : (
            <>
            <p className="text-4xl mt-4 text-purple-600">
                {learningProgress}%
              </p>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mt-3">

                <div
                  className="bg-purple-600 h-3 rounded-full"
                  style={{
                    width: `${learningProgress}%`
                  }} />

                </div>
            </>

          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow md:col-span-3">

          <h2 className="text-xl font-bold mb-4">
            Recommended Skills
          </h2>

          {recommendations.length === 0 ? (

            <p>
              Add more skills to your profile
              to receive personalized learning
              recommendations.
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

          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">

            <div
              className="bg-green-600 h-3 rounded-full"
              style={{
                width: `${goalProgress?.progress || 0}%`
              }}
            />

          </div>

          <p className="text-3xl text-green-600">
            {goalProgress?.progress || 0}%
          </p>
          {goalProgress?.progress === 0 && (
            <p className="text-gray-500 mt-2">
              Add skills and define a career goal
              to measure readiness.
            </p>
          )}

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

              <Link
                to="/jobs"
                className="text-blue-600 text-sm"
              >
                View All Jobs →
              </Link>
            </>

          ) : (

            <div>

              <p>
                No saved jobs.
              </p>

              <p className="text-gray-500">
                Analyze and save a job to
                track readiness.
              </p>

              <Link
                to="/job-matcher"
                className="text-blue-600 font-medium"
              >
                Analyze a Job →
              </Link>

            </div>

          )}

        </div>

        <div className="bg-white p-6 rounded-lg shadow md:col-span-3">

          <h2 className="text-xl font-bold mb-4">
            Highest Impact Skills
          </h2>

          {prioritySkills.length === 0 ? (

            <p>
              Save at least one job to
              discover which skills will
              improve the most opportunities.
            </p>

          ) : (

            prioritySkills
              .slice(0, 5)
              .map((item) => (

                <div
                  key={item.skill}
                  className="mb-4"
                >
                  <p className="font-medium">
                    🚀 {item.skill}
                    {" "}
                    ({item.count} jobs)
                  </p>
                  <p className="text-sm text-gray-500">
                      Learning this skill will improve
                      readiness across multiple saved jobs.
                    </p>
                </div>

              ))

          )}

        </div>

        <div className="bg-white p-6 rounded-lg shadow md:col-span-3">

          <h2 className="text-xl font-bold mb-4">
            Skill Impact Analysis
          </h2>

          {skillImpact.length === 0 ? (

            <p>
              Save jobs first so we can
              identify which skills would
              improve the most opportunities.
            </p>

          ) : (

            skillImpact
              .slice(0, 3)
              .map((item) => (

                <div
                  key={item.skill}
                  className="mb-4"
                >

                  <p className="font-bold">
                    🚀 {item.skill}
                  </p>

                  <p>
                    Helps with{" "}
                    {
                      item.affectedJobs.length
                    } jobs
                  </p>


                  <ul className="text-sm text-gray-500">

                    {item.affectedJobs
                      .slice(0, 3)
                      .map((job) => (

                        <li key={job.title}>
                          • {job.title}
                        </li>

                      ))}

                  </ul>

                </div>

              ))

          )}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;