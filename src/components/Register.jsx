import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import FormRowVertical from "./ui/FormRowVertical";
import Input from "./ui/Input";
import Form from "./ui/Form";
import Checkbox from "./ui/Checkbox";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";

const FormLayout = styled.main`
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

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [enable2FA, setEnable2FA] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8443/api/register", {
        username,
        password,
      });

      localStorage.setItem(
        "userToken",
        JSON.stringify({ token: response.data.token })
      );

      localStorage.setItem(
        "userId",
        JSON.stringify({ id: response.data.user._id })
      );
      if (enable2FA) navigate("/2fa-check?setup=true");
      else navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormLayout>
      <Form onSubmit={handleRegister}>
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
        <Box>
          <Checkbox
            checked={enable2FA}
            onChange={(e) => setEnable2FA(e.target.checked)}
          >
            Enable 2FA
          </Checkbox>
        </Box>
        <FormRowVertical>
          <Button size="medium" type="submit">
            Register
          </Button>
        </FormRowVertical>
      </Form>
    </FormLayout>
  );
};

export default Register;
