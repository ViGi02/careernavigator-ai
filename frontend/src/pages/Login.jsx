import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(
        formData
      );

      localStorage.setItem(
        "token",
        data.token
      );

      login(data);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">
          CareerNavigator AI
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded mb-4"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-2 rounded mb-4"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full p-2 rounded"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          No account?{" "}
          <useNavigate to="/register" className="text-blue-600">
            Register
          </useNavigate>
        </p>
      </div>
    </div>
  );
}

export default Login;