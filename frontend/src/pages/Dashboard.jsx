import { useContext } from "react";
import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [matchScore, setMatchScore] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const data = await getProfile(user.token);
        setProfile(data);
        setMatchScore(data.matchScore || 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [user]);

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
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            Match Score
          </h2>

          <p className="text-4xl mt-4 text-green-600">
            {matchScore ? `${matchScore}%` : "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;