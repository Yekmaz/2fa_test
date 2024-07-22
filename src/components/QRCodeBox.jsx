import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const StyledQRCode = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  align-content: center;
  justify-content: center;
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

const QRCodeBox = () => {
  const [qrCode, setQrCode] = useState("");

  const userId = JSON.parse(localStorage.getItem("userId")).id;

  useEffect(() => {
    const createQRCode = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8443/api/setup-2fa",
          {
            userId,
          }
        );
        setQrCode(response.data.qrCodeUrl);
      } catch (err) {
        console.error(err);
      }
    };
    createQRCode();
  }, [userId]);

  return (
    <StyledQRCode>
      {qrCode && <QRCode src={qrCode} alt="2FA QR Code" />}
    </StyledQRCode>
  );
};

export default QRCodeBox;
