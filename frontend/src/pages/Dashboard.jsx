import { useContext } from "react";
import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";
import { AuthContext } from "../context/AuthContext";
import { getMatchHistory } from "../services/matchService";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [matchScore, setMatchScore] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        const profileData = await getProfile(user.token);
        const historyData = await getMatchHistory(user.token);

        setProfile(profileData);
        setHistory(historyData);
        setMatchScore(historyData && historyData.length > 0 ? historyData[0].score : 0);
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
            {history.length}
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
      </div>
    </div>
  );
}

export default Dashboard;