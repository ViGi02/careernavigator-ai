import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>CareerNavigator AI</h1>

      <form>
        <div>
          <label>Email</label>
          <br />
          <input type="email" />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input type="password" />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;