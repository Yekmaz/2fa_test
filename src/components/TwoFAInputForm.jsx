import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormRowVertical from "./ui/FormRowVertical";
import Input from "./ui/Input";
import Form from "./ui/Form";
import Button from "./ui/Button";
import styled from "styled-components";

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

function TwoFAInputForm() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleCheck2fa = async (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("userToken"));
    const config = {
      headers: { Authorization: `Bearer ${storedData.token}` },
    };

    try {
      const response = await axios.post(
        "http://localhost:8443/api/check-2fa",
        {
          token,
        },
        config
      );
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormLayout>
      <Form onSubmit={handleCheck2fa}>
        <FormRowVertical label="2FA Token">
          <Input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="2FA Token"
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button size="medium" type="submit">
            Check 2FA
          </Button>
        </FormRowVertical>
      </Form>
    </FormLayout>
  );
}

export default TwoFAInputForm;
