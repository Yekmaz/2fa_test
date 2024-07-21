import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import FormRowVertical from "./ui/FormRowVertical";
import Input from "./ui/Input";
import Form from "./ui/Form";
import Checkbox from "./ui/Checkbox";
import Button from "./ui/Button";

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

const StyledQRCode = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const StyledQRCodeTitle = styled.div`
  font-weight: 400;
  font-size: large;
  text-align: center;
`;

const QRCode = styled.img`
  display: block;
  width: 20rem;
  width: 20rem;
  margin-inline: 3rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [enable2FA, setEnable2FA] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8443/api/register", {
        username,
        password,
        enable2FA,
      });

      if (response.data.qrCodeUrl) {
        setQrCodeUrl(response.data.qrCodeUrl);
      } else {
        // Handle successful registration without 2FA
        console.log("User registered:", response.data.user);
      }
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
      {qrCodeUrl && (
        <Box>
          <StyledQRCodeTitle>
            Scan this QR code with your 2FA app:
          </StyledQRCodeTitle>
          <StyledQRCode>
            <QRCode src={qrCodeUrl} alt="2FA QR Code" />
          </StyledQRCode>
          <Button size="medium" style={{ marginInline: "35%" }}>
            Submit 2FA
          </Button>
        </Box>
      )}
    </FormLayout>
  );
};

export default Register;
