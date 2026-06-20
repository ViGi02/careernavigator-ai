import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <h1 className="text-4xl font-bold mb-2">
        Dashboard
      </h1>

      <p className="mb-8">
        Welcome {user?.name}
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            Skills
          </h2>

          <p className="text-4xl mt-4">12</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            Career Goal
          </h2>

          <p className="mt-4">
            Full Stack Developer
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            Match Score
          </h2>

          <p className="text-4xl mt-4 text-green-600">
            78%
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;