import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Form from "./ui/Form";
import FormRowVertical from "./ui/FormRowVertical";
import Input from "./ui/Input";
import Button from "./ui/Button";

const LoginLayout = styled.main`
  min-height: 100vh;
  min-width: 100vw;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8443/api/login", {
        username,
        password,
      });
      console.log("🚀 ~ handleLogin ~ response:", response.data.token);
      localStorage.setItem(
        "userToken",
        JSON.stringify({ token: response.data.token })
      );
      // handle success, e.g., save token, redirect
      navigate("/2fa-check");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LoginLayout>
      <Form onSubmit={handleLogin}>
        <FormRowVertical label="Username">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </FormRowVertical>

        <FormRowVertical>
          <Button size="medium" type="submit">
            Login
          </Button>
        </FormRowVertical>
      </Form>
    </LoginLayout>
  );
};

export default Login;
