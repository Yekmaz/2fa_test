import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8443/api/login", {
        username,
        password,
        token,
      });
      console.log("🚀 ~ handleLogin ~ response:", response);
      // handle success, e.g., save token, redirect
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="2FA Token"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
