import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "./ui/Button";
import FormRowVertical from "./ui/FormRowVertical";

const FormLayout = styled.main`
  min-height: 100vh;
  min-width: 100vw;
  display: grid;
  grid-template-columns: 25rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

const StyledQRCode = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  align-content: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
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

// eslint-disable-next-line react/prop-types
const Setup2FA = () => {
  const [qrCode, setQrCode] = useState("");
  const storedData = JSON.parse(localStorage.getItem("userId"));
  const setup2FA = async () => {
    try {
      const response = await axios.post("http://localhost:8443/api/setup-2fa", {
        userId: storedData.id,
      });
      setQrCode(response.data.qrCodeUrl);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormLayout>
      <FormRowVertical>
        <Button size="medium" onClick={setup2FA}>
          Setup 2FA
        </Button>
      </FormRowVertical>
      <StyledQRCode>
        {qrCode && <QRCode src={qrCode} alt="2FA QR Code" />}
      </StyledQRCode>
    </FormLayout>
  );
};

export default Setup2FA;
