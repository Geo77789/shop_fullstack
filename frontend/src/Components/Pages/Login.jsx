import { useEffect, useState } from "react";
import { loginUser } from "../../utils/authService";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await loginUser(email, password);

    if (data.token) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate(from);
    } else {
      alert("login failed");
    }
  };

  return (
    <form>
      <h1>Login to your account</h1>

      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />

      <input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" onClick={handleLogin}>
        Login
      </button>
    </form>
  );
}

export default Login;
